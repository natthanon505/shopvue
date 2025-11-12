 <template>
  <div>
    <v-app-bar app color="white" flat class="px-10">
      <v-spacer></v-spacer>

      <div class="d-flex justify-center align-center search-container">
        <!-- โลโก้ Lazada -->
        <v-img
          src="../assets/logoImage.png"
          alt="Lazada Logo"
          max-width="120"
          class="mr-6"
        ></v-img>
        </div>
        <!-- ✅ ช่องค้นหา (อยู่ตรงกลางและยาวเต็ม) -->
        <div class="flex-grow-1 d-flex align-center">
          <v-text-field
            v-model="search"
            placeholder="ค้นหาสินค้า"
            solo
            hide-details
            flat
            dense
            class="search-bar mr-2"
            @keyup.enter="searchProduct"
          ></v-text-field>

          <v-btn color="#FF6600" height="40" width="60" @click="searchProduct">
            <v-icon color="white">mdi-magnify</v-icon>
          </v-btn>
        </div>
      

      <v-spacer></v-spacer>

      <!-- ไอคอนตะกร้า -->
      <!-- <v-btn icon>
        <v-icon size="28" color="indigo darken-4">mdi-cart-outline</v-icon>
      </v-btn> -->

      <!-- ส่วน user -->
      <template v-if="username">
        <v-btn text to="/products" class="menu-btn">หน้าหลัก</v-btn>
        <v-btn text to="/orderme" class="menu-btn">คำสั่งซื้อของฉัน</v-btn>

        <!-- แสดงชื่อผู้ใช้ -->
        <span class="ml-4 mr-2 username-text">สวัสดี, {{ username }}</span>

        <v-btn text small color="grey darken-2" @click="logout"
          >ออกจากระบบ</v-btn
        >
      </template>

      <template v-else>
        <v-btn text small color="grey darken-2" @click="goLogin"
          >เข้าสู่ระบบ</v-btn
        >
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  search: "",
  data() {
    return {
      username: null,
      role: null,
    };
  },
  created() {
    // ดึงชื่อผู้ใช้จาก localStorage ตอน component เริ่มทำงาน
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
  },
  methods: {
    logout() {
      // ล้างข้อมูล token และ username
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.$router.push("/login");
    },

    goLogin() {
      this.$router.push("/login");
    },
    goproduct() {
      this.$router.push("/products");
    },
    ordersme() {
      this.$router.push("/orderme/");
    },
    searchProduct() {
      // ถ้าช่องค้นหาว่าง ให้โหลดสินค้าทั้งหมด
      const query = this.search.trim() === "" ? {} : { name: this.search };
      this.$router.replace({ path: "/products", query }).catch(() => {});
    },
  },
};
</script>

<style scoped>
.search-container {
  flex: 1;
  max-width: 800px; /* ปรับได้ตามต้องการ เช่น 700px - 900px */
  margin-right: 60px;
}

.search-bar {
  background-color: #f5f6fa;
  border-radius: 8px;
}

/* ✅ ปุ่มเมนูด้านขวา */
.menu-btn {
  text-transform: none;
  color: #444;
  font-weight: 500;
}

/* ✅ สีตัวหนังสือของ “สวัสดี, user01” */
.username-text {
  color: #ff6600; /* 🔥 เปลี่ยนเป็นสีส้ม */
  font-weight: 600;
}

/* ทำให้ app-bar สูงและมีระยะห่าง */
.v-app-bar {
  height: 70px;
}
</style>