<template>
  <div class="shop-page">
    <!-- 🔶 ส่วนแบนเนอร์โฆษณา -->
    <div class="ad-banner">
      <v-container fluid>
        <v-row no-gutters>
          <!-- ภาพโฆษณาหลัก -->
          <v-col cols="12" md="8">
            <v-img
              src="https://down-th.img.susercontent.com/file/th-11134258-81ztn-mg7il03byznz1b@resize_w797_nl.webp"
              alt="โปร Shopee"
              height="200"
              class="rounded-lg shadow-sm"
              cover
            ></v-img>
          </v-col>

          <!-- ภาพโฆษณาย่อย -->
          <v-col
            cols="12"
            md="4"
            class="d-flex flex-column justify-space-between"
          >
            <v-img
              src="https://down-th.img.susercontent.com/file/th-11134258-81ztn-mg7ssvdilp1n97@resize_w398_nl.webp"
              alt="ดีลลดสูงสุด 80%"
              height="96"
              class="rounded-lg mb-2 shadow-sm"
              cover
            ></v-img>

            <v-img
              src="https://down-th.img.susercontent.com/file/th-11134258-81ztl-mfw4ls33cydm9b@resize_w398_nl.webp"
              alt="โปรพิเศษ Halloween"
              height="96"
              class="rounded-lg shadow-sm"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 🔹 ส่วนสินค้า -->
    <v-container fluid>
      <v-row dense class="px-2 pt-2 justify-start align-start">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(item, index) in products"
          :key="index"
          class="d-flex justify-center"
        >
          <v-card class="product-card" elevation="3">
            <v-img
              height="200"
              src="../assets/productimg.jpg"
              class="rounded-t-lg"
              contain
            ></v-img>

            <v-card-text class="text-center">
              <div class="product-name">{{ item.productName }}</div>
              <div class="product-detail">{{ item.productDetail }}</div>
              <div class="price">฿{{ item.price }}</div>
              <div class="stock">สินค้าในคลัง {{ item.quantity }} ชิ้น</div>
            </v-card-text>

            <v-card-actions class="pa-0 justify-center pb-2">
              <!-- ✅ ถ้ายังไม่อยู่ในตะกร้า -->
              <v-btn
                v-if="!isInCart(item.productCode)"
                color="#FF6600"
                class="add-cart-btn"
                dark
                block
                @click="addToCart(item)"
              >
                <v-icon left>mdi-cart-outline</v-icon>
                ใส่ตะกร้า
              </v-btn>

              <!-- ✅ ถ้าอยู่ในตะกร้าแล้ว -->
              <div
                v-else
                class="d-flex align-center justify-center w-100 py-1"
                style="gap: 6px"
              >
                <v-btn
                  icon
                  small
                  color="#FF6600"
                  @click="decreaseQty(item.productCode)"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>

                <span class="text-subtitle-1 font-weight-bold">
                  {{ getCartQty(item.productCode) }}
                </span>

                <v-btn
                  icon
                  small
                  color="#FF6600"
                  @click="increaseQty(item.productCode)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-btn
                  icon
                  small
                  color="red"
                  @click="removeFromCart(item.productCode)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 🔸 ปุ่มดูตะกร้า -->
    <v-btn color="pink" dark fixed bottom right fab @click="dialogCart = true">
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <!-- Dialog ตะกร้า (เหมือนเดิม) -->
    <v-dialog v-model="dialogCart" max-width="500">
      <v-card>
        <v-card-title class="headline">🛒 ตะกร้าสินค้า</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div v-if="cart.length === 0" class="text-center my-4">
            ไม่มีสินค้าในตะกร้า
          </div>
          <div v-else>
            <div
              v-for="(item, index) in cart"
              :key="index"
              class="d-flex justify-space-between align-center my-2"
            >
              <div>
                <strong>{{ item.productName }}</strong>
                <div class="d-flex align-center mt-1">
                  <v-btn icon x-small @click="decreaseQty(index)">
                    <v-icon color="red">mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ item.qty }}</span>
                  <v-btn icon x-small @click="increaseQty(index)">
                    <v-icon color="green">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <div>
                ฿{{ item.price * item.qty }}
                <v-btn icon x-small @click="removeFromCart(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="text-right font-weight-bold mt-3">
              รวมทั้งหมด: ฿{{ totalPrice }}
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="dialogCart = false">ปิด</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            dark
            @click="checkout"
            :disabled="cart.length === 0"
          >
            <v-icon left>mdi-check</v-icon> Checkout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: [], // ข้อมูลสินค้าจาก backend
      cart: [], // ตะกร้าสินค้า
      dialogCart: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    "$route.query.name": {
      handler() {
        this.fetchProducts();
      },
      immediate: true,
    },
  },

  methods: {
    // ✅ [เพิ่มใหม่] ตรวจว่าสินค้าอยู่ในตะกร้าไหม
    isInCart(productCode) {
      return this.cart.some((item) => item.productCode === productCode);
    },

    // ✅ [เพิ่มใหม่] ดึงจำนวนสินค้าในตะกร้า
    getCartQty(productCode) {
      const item = this.cart.find((i) => i.productCode === productCode);
      return item ? item.qty : 0;
    },
    increaseQty(indexOrCode) {
      // ✅ รองรับทั้ง index และ productCode
      const item =
        typeof indexOrCode === "number"
          ? this.cart[indexOrCode]
          : this.cart.find((p) => p.productCode === indexOrCode);

      if (!item) return;
      const product = this.products.find(
        (p) => p.productCode === item.productCode
      );
      if (item.qty < product.quantity) {
        item.qty += 1;
      } else {
        alert("จำนวนสินค้าเกินสต็อก");
      }
    },

    decreaseQty(index) {
      if (this.cart[index].qty > 1) {
        this.cart[index].qty -= 1;
      } else {
        // ถ้าลดเหลือ 0 ให้ลบสินค้าออกจากตะกร้า
        this.cart.splice(index, 1);
      }
    },

    // ดึงข้อมูลสินค้า
    fetchProducts() {
      const searchName = this.$route.query.name || "";
      this.axios
        .get("http://localhost:5000/products", {
          params: { name: searchName },
        })
        .then((res) => (this.products = res.data))
        .catch((err) => console.error(err));
    },

    // เพิ่มสินค้าในตะกร้า
    addToCart(item) {
      if (item.quantity === 0) return; // ถ้าสินค้าหมด stock

      const index = this.cart.findIndex(
        (i) => i.productCode === item.productCode
      );
      if (index !== -1) {
        // เพิ่มจำนวนในตะกร้า
        if (this.cart[index].qty < item.quantity) {
          this.cart[index].qty += 1;
        } else {
          alert("จำนวนสินค้าเกินสต็อก");
        }
      } else {
        // เพิ่มสินค้าใหม่ในตะกร้า
        this.cart.push({ ...item, qty: 1 });
      }
    },

    // ลบสินค้าออกจากตะกร้า
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },

    // Checkout: สร้าง order
    async checkout() {
      if (this.cart.length === 0) return;

      try {
        const orderCode = "ORD" + Date.now();

        // ✅ เตรียม payload สำหรับ backend
        const payload = {
          orderCode,
          items: this.cart.map((item) => ({
            productCode: item.productCode,
            quantity: item.qty,
          })),
        };

        // ✅ ดึง token จาก localStorage
        const token =
          localStorage.getItem("token") || localStorage.getItem("userToken");

        // ✅ ส่ง token ไป backend
        const res = await axios.post("http://localhost:5000/orders", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Order created:", res.data);
        alert("สั่งซื้อสำเร็จ!");

        // ✅ ล้างตะกร้า
        this.cart = [];
        this.dialogCart = false;

        // ✅ โหลดสินค้าใหม่
        this.fetchProducts();
      } catch (err) {
        console.error("❌ Checkout Error:", err);
        alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
      }
    },
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
  },
};
</script>

<style scoped>
.add-cart-btn {
  border-radius: 0 0 14px 14px;
  font-weight: 500;
  text-transform: none;
}

.w-100 {
  width: 100%;
}
.ad-banner {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.product-card {
  width: 100%;
  border-radius: 14px;
  transition: transform 0.25s, box-shadow 0.25s;
  background: white;
}
.shop-page {
  background-color: #fafafa;
  min-height: 100vh;
}

.product-card {
  width: 100%;
  border-radius: 14px;
  transition: transform 0.25s, box-shadow 0.25s;
  background: white;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}
.product-name {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  line-height: 1.3;
  min-height: 2.5em;
  overflow: hidden;
}
.product-detail {
  font-size: 13px;
  color: #757575;
  height: 2.6em;
  overflow: hidden;
}
.price {
  color: #ff5722;
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
}
.stock {
  color: #9e9e9e;
  font-size: 13px;
}
.add-cart-btn {
  border-radius: 0 0 14px 14px;
  font-weight: 500;
  text-transform: none;
}
</style>
