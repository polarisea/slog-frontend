import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: [],
    };
  },
  actions: {
    fetchComments() {
      this.comments.splice(
        this.comments.length,
        0,
        ...[
          {
            id: "1",
            user: {
              name: "user 1",
              avatar:
                "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
            },
            content: "This is comment by user 1",
            createAt: "23/23/1202",
            countReply: 5,
          },
          {
            id: "2",
            user: {
              name: "user 2",
              avatar:
                "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
            },
            content:
              "This is comment by user 2 This is comment by user 2 This is comment by user 2 This is comment by user 2 This is comment by user 2 This is comment by user 2 This is comment by user 2",
            createAt: "23/23/1202",
            countReply: 0,
          },
        ]
      );
    },
    fetchReplies(commentId) {
      for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].id == commentId) {
          this.comments[i].replies = [
            {
              id: "3",
              user: {
                name: "user 1",
                avatar:
                  "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
              },
              content: "This is reply for comment 1 by someone",
              createAt: "23/23/1202",
            },
            {
              id: "4",
              user: {
                name: "user 1",
                avatar:
                  "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
              },
              content:
                "fjalfj alkj lkaj lkaThis is reply for comment 1 by someone",
              createAt: "23/23/1202",
            },
          ];
          break;
        }
      }
    },
  },
});
