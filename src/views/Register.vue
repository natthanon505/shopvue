<template>
  <div class="register-page">
    <div class="register-card">
      <p v-if="registerError" class="error-message">
        {{ registerError }}
      </p>
      <div class="logo-container">
        <span class="app-name">MShop Register</span>
      </div>
      <p class="subtitle">สร้างบัญชีใหม่</p>

      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          placeholder=" "
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          placeholder=" "
        />
      </div>

      <div class="form-group">
        <label for="firstname">Firstname</label>
        <input
          type="text"
          id="firstname"
          v-model="formData.firstname"
          placeholder=" "
        />
      </div>

      <div class="form-group">
        <label for="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          v-model="formData.lastname"
          placeholder=" "
        />
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" v-model="formData.age" placeholder=" " />
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="formData.gender">
          <option disabled value="">เลือกเพศ</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="other">อื่น ๆ</option>
        </select>
      </div>

      <button class="sign-up-button" @click="register" :disabled="isLoading">
        <span v-if="isLoading">กำลังสร้างบัญชี...</span>
        <span v-else>Sign Up</span>
      </button>

      <div class="login-row">
        Already have an account? <a @click="$router.push('/login')">Login here</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        rol:""
      },
      isLoading: false,
      registerError: null,
    };
  },
  methods: {
    async register() {
      if (this.isLoading) return;
      this.registerError = null;

      if (!this.formData.username || !this.formData.password) {
        this.registerError = "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน";
        return;
      }

      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register/",
          this.formData
        );

        if (response.data && response.data.success) {
          alert("สมัครสมาชิกสำเร็จ! กรุณาล็อกอิน");
          this.$router.push("/login");
        } else {
          this.registerError =
            response.data.message || "สมัครสมาชิกไม่สำเร็จ";
        }
      } catch (error) {
        console.error("Register API Error:", error);
        this.registerError =
          "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

.register-card {
  width: 100%;
  max-width: 400px;
  padding: 40px 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(175, 182, 217, 0.2),
    0 0 0 1px rgba(230, 235, 248, 1);
  text-align: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.sign-up-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
}

.sign-up-button:hover {
  background-color: #0056b3;
}

.login-row {
  margin-top: 25px;
  font-size: 14px;
  color: #777;
}

.login-row a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.login-row a:hover {
  text-decoration: underline;
}

.error-message {
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>
