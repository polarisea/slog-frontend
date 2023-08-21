import { defineStore } from "pinia";
import baseAxios from "../services/axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isAdmin: false,
      info: {},
      isLogin: false,
    };
  },
  actions: {
    fetchInfor() {
      baseAxios
        .get("/user/info")
        .then((res) => {
          this.info = res.data;
          if (this.info.roles.includeof("ROLE_ADMIN")) {
            this.isAdmin = true;
          }
          this.isLogin = true;
        })
        .catch(() => {
          this.info = {};
        });
      // this.info = {
      //     "id": 8,
      //     "googleId": "108262624784925882711",
      //     "roles": [
      //     "ROLE_USER"
      //     ],
      //     "name": "Đình Dũng Vũ",
      //     "photo": "https://lh3.googleusercontent.com/a/AAcHTtfLN-wtAsQX4i1tnHGvAu7SpFq0TtgqaNvhwpML8-E=s96-c",
      //     "userIdentifier": "108262624784925882711"
      // }
    },
  },
});
