<template>
  <div>
    <v-toolbar>
      <v-btn text to="/admindashboard" class="menu-btn">edit product</v-btn>
      <v-btn text to="/apicon" class="menu-btn">user</v-btn>
      <v-btn text to="/orderall" class="menu-btn">orders</v-btn>

      <v-spacer></v-spacer>

      <!-- <v-btn  color="primary" dark class="mb-2" @click="newItem()">
        New Item
      </v-btn> -->
    </v-toolbar>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ชื่อผู้ใช้</th>
            <th class="text-left">รหัสผ่าน</th>
            <th class="text-left">ชื่อ</th>
            <th class="text-left">สกุล</th>
            <th class="text-left">เพศ</th>
            <th class="text-left">อายุ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in apidata" :key="index">
            <td>{{ item.username }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.age }}</td>
            <td>
              <!-- <v-btn color="success" class="mr-2" @click="editItem(item)"
                >edit</v-btn
              > -->
              <v-btn color="error" @click="deleteItem(item)">delete</v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- dialog -->
    <v-dialog v-model="dialog" max-width="500px"
      ><v-card>
        <v-card-title primary-title>
          {{ savemode }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="productCode"
                label="productCode"
                id="productCode"
                v-model="postdata.productCode"
              >
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                name="productName"
                label="productName"
                id="productName"
                v-model="postdata.productName"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6"
              ><!-- เพิ่มช่องให้ใหญ่กว่านี้ -->
              <v-text-field
                name="productDetail"
                label="productDetail"
                id="productDetail"
                v-model="postdata.productDetail"
              >
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                name="price"
                label="price"
                id="price"
                v-model="postdata.price"
              >
              </v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                name="quantity"
                label="quantity"
                id="quantity"
                v-model="postdata.quantity"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="closeItem()">cancel</v-btn>
          <v-btn color="info" @click="saveSelect()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--end dialog -->
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
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        role: "",
      },
      //เคลียร์ข้อมูล
      postdefault: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        role: "",
      },
      dialogedit: false,
    };
  },
  computed: {
    savemode() {
      return this.id === "" ? "NewItem" : "EditItem";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    newItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = true;
    },
    editItem(item) {
      this.id = item._id;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = false;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutdata();
      } else this.savePostdata();
    },
    getData() {
      this.axios.get("http://localhost:5000/users/").then((respone) => {
        console.log(respone.data);
        this.apidata = respone.data;
      });
    },
    async savePostdata() {
      try {
        console.log("DATA to send:", this.postdata);
        const { data } = await this.axios.post(
          "http://localhost:5000/users/",
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
          "http://localhost:5000/users/" + this.id,
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
            "http://localhost:5000/users/" + item._id
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
</style>