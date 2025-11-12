<template>
  <div class="login-page">
    <div class="login-card">
      <p v-if="loginError" class="error-message">
        {{ loginError }}
      </p>
      <div class="logo-container">
        <span class="app-name">MShop Login</span>
      </div>
      <p class="subtitle">เข้าสู่ระบบ</p>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="postdata.username"
          placeholder=" "
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="postdata.password"
          placeholder=" "
        />
      </div>

      <button class="sign-in-button" @click="signIn" :disabled="isLoading">
        <span v-if="isLoading">กำลังเข้าสู่ระบบ...</span>
        <span v-else>Sign In</span>
      </button>

      <div class="signup-row">
        New to Spike?
        <a href="/register/" class="create-account">Create an account</a>
      </div>
    </div>
  </div>
</template>
<script>
// นำเข้า Axios
import axios from "axios";
export default {
  data() {
    return {
      apidata: [],
      id: "",
      //ส่งข้อมูล (Sending data - relevant properties used)
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
      // สถานะเพิ่มเติมสำหรับ Login
      isLoading: false, // เพื่อป้องกันการกดปุ่มซ้ำ
      loginError: null, // สำหรับเก็บข้อความผิดพลาด
    };
  },
  methods: {
    async signIn() {
      if (this.isLoading) return;
      this.loginError = null;
      this.isLoading = true;

      if (!this.postdata.username || !this.postdata.password) {
        this.loginError = "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน";
        this.isLoading = false;
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username: this.postdata.username,
          password: this.postdata.password,
        });
        //test

        if (response.data && response.data.token) {
          const username =
            response.data.user?.username || response.data.username;
          const role = response.data.user?.role || response.data.role;
          console.log(role);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);

          alert("Login สำเร็จ! ยินดีต้อนรับเข้าสู่ระบบ");

          if (role === "admin") {
            this.$router.push("/admindashboard").catch(() => {});
          } else {
            this.$router.push("/products").catch(() => {});
          }
        } else {
          this.loginError = response.data.message || "เข้าสู่ระบบไม่สำเร็จ";
        }
      } catch (error) {
        if (error.response?.status === 401) {
          this.loginError = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        } else {
          this.loginError = "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์";
          console.error("Login API Error:", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style>
/* Global Styles for Centering */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Light background color to match the image's context */
  background-color: #f0f4f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.error-message {
  color: #d9534f; /* สีแดงสำหรับข้อผิดพลาด */
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
}
/* Card Container Styling */
.login-card {
  width: 100%;
  max-width: 400px; /* Set max width for the card */
  padding: 40px 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(175, 182, 217, 0.2),
    0 0 0 1px rgba(230, 235, 248, 1); /* Subtle shadow and border */
  text-align: center;
}

/* Header/Logo Section */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.rocket-icon {
  width: 28px;
  height: 28px;
  color: #007bff; /* Primary blue color */
  margin-right: 8px;
}

.app-name {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #999;
  margin-top: 0;
  margin-bottom: 30px;
}

/* Form Group Styling */
.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #555;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box; /* Include padding/border in element's total width/height */
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Options Row (Remember Me & Forgot Password) */
.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  color: #555;
}

.remember-me input[type="checkbox"] {
  margin-right: 8px;
  /* Basic checkbox styling, could be improved with custom checkbox CSS */
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Sign In Button */
.sign-in-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff; /* Primary blue color */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
}

.sign-in-button:hover {
  background-color: #0056b3;
}

.sign-in-button:active {
  background-color: #004085;
}

/* Signup Row */
.signup-row {
  margin-top: 25px;
  font-size: 14px;
  color: #777;
}

.create-account {
  color: #007bff;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 500;
}

.create-account:hover {
  text-decoration: underline;
}
</style>