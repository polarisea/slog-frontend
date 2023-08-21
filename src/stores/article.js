import { defineStore } from "pinia";
import baseAxios from "../services/axios";

export const useArticleStore = defineStore("article", {
  state: () => {
    return {
      article: null,
      subArticles: [],
      articles: [],
      viewType: "Card",
      sortBy: "New",
      editArticle: null,
      recommends: null,
      searchResults: false,
      page: 1,
      tag: null,
      keyword: null
    };
  },
  actions: {
    fetchArticles() {
      baseAxios
        .get(
          `/api/posts?page=${this.page}${this.tag ? "&tags=" + this.tag : ""}`,
        )
        .then((res) => {
          this.articles.splice(this.articles.length, 0, ...res.data);
          this.page += 1;
          console.log(this.articles);
        });
    },
    fetchArticle(articleId) {
      for (const article of this.articles) {
        if (article.id == articleId) {
          this.article = JSON.parse(JSON.stringify(article));
          return true;
        }
      }
      baseAxios.get(`/api/posts/${articleId}`).then((res) => {
        this.article = res.data;
        this.fetchVotes(this.article.id, true);
      });
    },
    postVote(value, post) {
      const body = {
        value,
        user: `/api/users/1`,
        post: `/api/posts/${post}`,
      };
      baseAxios.post(`/api/votes`, body).then((res) => {
        for (let i = 0; i < this.articles.length; i++) {
          if (this.articles[i].id == post) {
            this.articles[i].score += value;
            break;
          }
        }
        console.log(res);
      });
    },
    fetchVotes(post, single = false) {
      baseAxios
        .get(`/api/votes?post=${post}`)
        .then((res) => {
          if (single) {
            this.article.votes = res.data.length;
          } else {
            for (const article of this.articles) {
              // console.log("Id: ",article.id, ' ', post, ' ',res.data)
              if (article.id == post) {
                article.votes = res.data.length;
                break;
              }
            }
          }
        })
        .catch(() => {
          if (single) {
            this.article.votes = 0;
          } else {
            for (const article of this.articles) {
              if (article.id == post) {
                article.votes = 0;
                break;
              }
            }
          }
        });
    },

    fetchByTag(tagId) {
      this.tag = tagId;
      this.page = 1;
      this.articles = [];
    },

    fetchRecommends() {
      console.log("Fetch recommends");

    },

    search(keyword) {
      this.searchResults = null;
      setTimeout(() => {

        baseAxios.get("/api/search").then(res => {
          this.searchResults = res.data;
        }).catch(error => {
          // this.searchResults = [];
          this.searchResults = [
            { name: 'No title', id: 1 },
            { name: "hahahahahahahaahahah haha", id: 2 },

            { name: "hahahahahahahaahahah haha", id: 2 },
            { name: "hahahahahahahaahahah haha", id: 2 },
            { name: "hahahahahahahaahahah haha", id: 2 },
            { name: "hahahahahahahaahahah haha", id: 2 },
          ];
        })
      }, 2000);
    }


  },
});
