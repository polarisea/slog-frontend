import { defineStore } from "pinia";
import baseAxios from "../services/axios";

export const useBaseStore = defineStore("base", {
  state: () => {
    return {
      author: null,
      isLogin: false,
      overlayVisible: false,
    };
  },
  actions: {
    fetchAuthor() {
      baseAxios.get("/api/author").then(res => {
        this.author = res.data
      }).catch(err => {
        console.log("Fetch author failed")
      })
    },
  },
});
