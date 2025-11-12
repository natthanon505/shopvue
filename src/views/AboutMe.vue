<template>
  <div>
    
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            src="https://scontent.fnak4-1.fna.fbcdn.net/v/t1.6435-9/71170372_1179024172301822_8498331675539800064_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=106&ccb=1-7&_nc_sid=669761&_nc_ohc=O7e-PXi8aVAQ7kNvwG5z_gQ&_nc_oc=Adm9uW-i0LI5dkUc20PxKurwV2p21wQFHBQe_WdlrWsVSmeNpm25kxcTh22wDgUD9ReoLINYRz566Q_3uBsuBqDw&_nc_zt=23&_nc_ht=scontent.fnak4-1.fna&_nc_gid=YvaK5X5Qm8hf6pthzDDuQQ&oh=00_Afd0Wv6GOQ16xHUKMBPdcd75_z6qJDFQLLQu-h7LReiKzg&oe=6925C825"
            class="my-3"
            contain
            height="350"
          />
        </v-col>

        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Hi, I’m James</h1>

          <p class="subheading font-weight-regular">
            Get to know me better
            <!-- ปุ่มหรือประโยคให้คลิก -->
            <v-btn color="primary" dark @click="dialog = true">
              click here!
            </v-btn>
          </p>
        </v-col>
      </v-row>

      <!-- Popup Card -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-img
            src="https://scontent.fnak4-2.fna.fbcdn.net/v/t1.6435-9/118775790_1891074811033758_6762787465860761810_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=cmqsJbqCuO8Q7kNvwEtWMGl&_nc_oc=Admpag2p1V6lAZc007i9x-5kxb3yLnx9QdggxMM11Yb3rrjsYsBeqLulTLdKxY77wYJp7b7kbWcZ5evecx5MH1mN&_nc_zt=23&_nc_ht=scontent.fnak4-2.fna&_nc_gid=5lCxsdIYribgx5oFWgkQJA&oh=00_AfcgSdGRq-LkiudWkfvPYtlrCGpwQBKwGEoUsavqCmzYqA&oe=6925F0EA"
            height="380px"
            alt="Profile"
          ></v-img>

          <v-card-title class="headline font-weight-bold">
            Natthanon Thathaisong
          </v-card-title>
          <v-card-subtitle>Nickname: James</v-card-subtitle>

          <v-card-text>
            <p>
              <strong>University:</strong> Khon Kaen University, Nong Khai
              Campus
            </p>
            <p><strong>Major:</strong> Computer and Information Science</p>
            <v-divider class="my-2"></v-divider>
            <p>
              <strong>Hobbies:</strong> Coding, Listening to music, Playing
              games
            </p>
            <p><strong>Likes:</strong> Coffee,I enjoy watching anime</p>
            <p><strong>Dislikes:</strong> Unorganized work</p>
            <v-divider class="my-2"></v-divider>
            <p>
              <strong>Strengths:</strong> Team player, Creative problem solver
            </p>
            <p><strong>Favorite team:</strong> Manchester City</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutPopup",
  data() {
    return {
      dialog: false, // ควบคุม popup เปิด/ปิด
    };
  },
};
</script>

<style scoped>
.v-card-title,
.v-card-subtitle {
  text-align: center;
}
.v-card-text p {
  margin: 5px 0;
}
</style>
