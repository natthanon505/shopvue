<template>
  <div class="container">
    <v-card-title class="container pink lighten-3"
      >Workshop 2 : คำนวณเกรด</v-card-title
    >
    <label for="score">กรอกคะแนน (0 - 100):</label>
    <v-col cols="12">
      <v-text-field v-model="score" id="score" label="คะแนน"></v-text-field>
    </v-col>

    <v-btn color="container pink lighten-3" @click="calculateGrade">
      คำนวณเกรด
    </v-btn>

    <div v-if="grade" class="result">
      <div class="container pink lighten-3">
        เกรดของคุณ: <strong>{{ grade }}</strong>
      </div>
    </div>

    <div v-if="error" class="error">
      <div class="container pink lighten-3">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const score = ref("");
    const grade = ref("");
    const error = ref("");

    const calculateGrade = () => {
      // ล้างค่าเดิม
      grade.value = "";
      error.value = "";

      // แปลงเป็นตัวเลข
      const num = Number(score.value);

      // ตรวจสอบความถูกต้อง
      if (isNaN(num) || num < 0 || num > 100) {
        error.value = "กรุณากรอกตัวเลขระหว่าง 0 - 100 เท่านั้น";
        return;
      }

      // คำนวณเกรด
      if (num >= 80) grade.value = "A";
      else if (num >= 70) grade.value = "B";
      else if (num >= 60) grade.value = "C";
      else if (num >= 50) grade.value = "D";
      else grade.value = "F";
    };

    return { score, grade, error, calculateGrade };
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}
input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
.result {
  margin-top: 15px;
  font-size: 18px;
  color: green;
}
.error {
  margin-top: 15px;
  font-size: 16px;
  color: red;
}
</style>