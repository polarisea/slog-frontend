import { defineStore } from "pinia";
import baseAxios from "../services/axios";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: [],
      page: 1,
    };
  },
  actions: {
    firstFetch(articleId) {
      this.page = 1;
      this.comments = [];
      this.fetchComments(articleId)
    },

    fetchComments(articleId) {
      baseAxios
        .get(`api/comments?post=${articleId}&page=${this.page}`)
        .then((res) => {
          this.comments.splice(this.comments.length, 0, ...res.data);
          this.page += 1;
        });
    },

    postComment(user, content, post, parent) {
      const body = {
        content,
        user: `/api/users/${user}`,
        comments: [],
        post: `/api/posts/${post}`,
        parent,
      };

      baseAxios
        .post("/api/comments", body)
        .then((response) => {
          if (parent) {
            for (let i = 0; i < this.comments.length; i++) {
              if (this.comments[i].id == parent) {
                this.comments[i].comments.unshift(response.data);
                return;
              }
            }
          }

          this.comments.unshift(response.data);

        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
