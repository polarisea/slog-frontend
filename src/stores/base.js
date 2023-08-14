import { defineStore } from "pinia";

export const useBaseStore = defineStore("base", {
  state: () => {
    return {
      author: {},
      isLogin: true,
    };
  },
  actions: {
    fetchAuthor() {
      this.author = {
        name: "No name",
        avatar:
          "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
        email: "No email",
        description: "This author has no description now",
      };
    },
  },
});
