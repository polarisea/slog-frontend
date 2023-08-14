import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isAdmin: false,
      avatar:
        "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
    };
  },
  actions: {},
});
