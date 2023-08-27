import { defineStore } from "pinia";
import baseAxios from "../services/axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isAdmin: false,
      info: null,
      isLogin: false,
    };
  },
  actions: {
    fetchInfor() {

      console.log("Fetch infor")
      baseAxios
        .get("/user/info")
        .then((res) => {
          this.info = res.data.user;
          if (this.info.roles.includeof("ROLE_ADMIN")) {
            this.isAdmin = true;
          }
          this.isLogin = true;
        })
        .catch(() => {
          this.info = {
            "id": 2,
            "googleId": "108262624784925882711",
            "roles": [
              "ROLE_USER"
            ],
            "name": "Đình Dũng Vũ",
            "photo": "https://lh3.googleusercontent.com/a/AAcHTtfLN-wtAsQX4i1tnHGvAu7SpFq0TtgqaNvhwpML8-E=s96-c",
            "posts": [],
            "userIdentifier": "108262624784925882711"
          }
          this.isLogin = true;
          if (this.info.roles.includeof("ROLE_ADMIN")) {
            this.isAdmin = true
          } else {
            this.isAdmin = false
          }
          // this.info = null;
        });
    },

    logOut() {
      this.isLogin = false;
      this.info = null;
    }
  },
});
