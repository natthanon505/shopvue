<template>
  <div >
    <v-toolbar >
      <v-btn text to="/admindashboard" class="menu-btn">edit product</v-btn>
        <v-btn text to="/apicon" class="menu-btn">users</v-btn>
        <v-btn text to="/orderall" class="menu-btn">orders</v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>

    <!-- ตารางคำสั่งซื้อ -->
    <v-simple-table>
      <thead>
        <tr>
          <th>รหัสคำสั่งซื้อ</th>
          <th>จำนวนสินค้า</th>
          <th>ราคารวม (฿)</th>
          <th>ลูกค้า</th>
          <th>ยอดสุทธิ (฿)</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in apidata" :key="index">
          <td>{{ item.orderCode }}</td>
          <!-- จำนวนสินค้า: รวมจำนวนใน items ทั้งหมด -->
          <td>
            {{ item.items.reduce((sum, i) => sum + i.quantity, 0) }}
          </td>
          <!-- ราคารวมต่อออเดอร์: รวม totalPrice ของแต่ละสินค้า -->
          <td>
            {{
              item.items
                .reduce((sum, i) => sum + i.totalPrice, 0)
                .toLocaleString()
            }}
          </td>
          <!-- ชื่อลูกค้า -->
          <td>
            {{ item.customer?.username || "ไม่ระบุ" }}
          </td>
          <!-- ยอดสุทธิ -->
          <td>{{ item.grandTotal.toLocaleString() }}</td>
          <!-- ปุ่มจัดการ -->
          <td>
            <v-btn color="blue" size="small" @click="viewItem(item)"
              >ดูสินค้า</v-btn
            >
           <!--  <v-btn color="red" size="small" @click="deleteItem(item._id)"
              >ลบ</v-btn
            > -->
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- Dialog ฟอร์มเพิ่ม/แก้ไขคำสั่งซื้อ -->
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <!-- ✅ ถ้ามีข้อมูลสินค้าภายใน order -->
        <div v-if="postdata.items && postdata.items.length">
          <v-divider class="my-3"></v-divider>

          <h3 class="text-center font-weight-bold mb-4">
            🛍️ รายการสินค้าในคำสั่งซื้อ
          </h3>

          <!-- ✅ รายการสินค้า -->
          <v-list dense class="text-center">
            <v-list-item
              v-for="(p, i) in postdata.items"
              :key="i"
              class="justify-center"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium text-subtitle-1">
                  {{ p.product?.productName || "สินค้าไม่ระบุ" }}
                </v-list-item-title>
                <v-list-item-subtitle class="grey--text text-body-2">
                  จำนวน: {{ p.quantity }} ชิ้น | รวม: ฿{{
                    p.totalPrice.toLocaleString()
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="my-3"></v-divider>

          <!-- ✅ สรุปรวมทั้งหมด -->
          <div class="text-center mt-3">
            <div class="text-body-1">
              จำนวนสินค้าทั้งหมด:
              <span class="font-weight-bold text-orange">
                {{ totalQuantity }}
              </span>
              ชิ้น
            </div>

            <div class="text-h6 font-weight-bold mt-1">
              ราคารวมทั้งหมด:
              <span class="text-orange">
                ฿{{ totalAmount.toLocaleString() }}
              </span>
            </div>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      id: "",
      //ส่งข้อมูล
      postdata: {
        orderCode: "",
        quantity: "",
        totalPrice: "",
        customer: "",
        grandTotal: "",
      },
      //ส่งข้อมูล
      postdefault: {
        orderCode: "",
        quantity: "",
        totalPrice: "",
        customer: "",
        grandTotal: "",
      },
      dialog: false,
    };
  },
  computed: {
    savemode() {
      return this.id === "" ? "New Item" : "Edit Item";
    },
    totalQuantity() {
      if (!this.postdata.items) return 0;
      return this.postdata.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalAmount() {
      if (!this.postdata.items) return 0;
      return this.postdata.items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },
  },
  created() {
    this.getData();
  },
  methods: {
    newItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialog = true;
    },
    viewItem(item) {
      this.id = item._id;
      this.postdata = {
        ...item,
        // ✅ แปลง customer object ให้แสดงชื่อได้ถูก
        customer: item.customer
          ? `${item.customer.firstname || ""} ${
              item.customer.lastname || item.customer.username || ""
            }`
          : "-",
      };

      // ✅ เปิด dialog หลังจากตั้งค่าข้อมูลแล้ว
      this.dialog = true;
    },

    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialog = false;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutdata();
      } else this.savePostdata();
    },
    getData() {
      this.axios.get("http://localhost:5000/orders/").then((respone) => {
        console.log(respone.data);
        this.apidata = respone.data;
      });
    },
    async savePostdata() {
      try {
        console.log("DATA to send:", this.postdata);
        const { data } = await this.axios.post(
          "http://localhost:5000/orders/",
          this.postdata
        );
        /* {
            headers: {
              Authorization: "Bearer $token",
            },
          }, */

        console.log(data);
        alert("Save Complete");
        this.getData(); // ✅ รีเฟรชข้อมูล
        this.closeItem(); // ✅ ปิด dialog
      } catch (error) {
        if (error.response) {
          console.log("Response error:", error.response.data);
        } else if (error.request) {
          console.log("Request error:", error.request);
        } else {
          console.log("Error message:", error.message);
        }
        alert("error");
      }
    },
    async savePutdata() {
      try {
        const { data } = await this.axios.put(
          "http://localhost:5000/orders/" + this.id,
          this.postdata
        );
        console.log(data);
        alert("Update Complete");
        this.getData(); // ✅ ดึงข้อมูลใหม่หลังอัปเดต
        this.closeItem(); // ✅ ปิด dialog
      } catch (error) {
        console.log(error.message);
        alert("error");
      }
    },
    async deleteItem(item) {
      if (confirm("Delete" + item.username))
        try {
          const { data } = await this.axios.delete(
            "http://localhost:5000/orders/" + item._id
          );
          console.log(data);
          alert("Delete Complete");
          this.getData(); // ✅ รีเฟรชข้อมูล
        } catch (error) {
          console.log(error.message);
          alert("error");
        }
    },
  },
};
</script>

<style>
.text-orange {
  color: #ff5722 !important;
}
</style>