import { defineStore } from "pinia";

export const useArticleStore = defineStore("article", {
  state: () => {
    return {
      article: {},
      subArticles: [],
      articles: [],
      viewType: 0,
      sortBy: 0,
      editArticle: null,
      recommends: [],
    };
  },
  actions: {
    fetchArticles() {
      setTimeout(() => {
        this.articles.splice(
          this.articles.length,
          0,
          ...[
            {
              id: "noting",
              title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
              content: `<h2><strong>I. Mở đầu</strong></h2><p>Trong bài viết này, mình sẽ hướng dẫn mọi người xây dựng mô hình transformer cơ bản cho dịch ngôn ngữ Nhật-Việt, trong bài viết trước đó của mình về Neural Machine Translation mình đã nêu ra một số khái niệm cơ bản của Seq2Seq(link ở phần tài liệu tham khảo), bởi vì trên Viblo đã có khá nhiều bài viết về Transformer cũng như Self-Attention hay, nên mình sẽ tiến hành hướng dẫn mọi người thực hiện code from scratch(một số bài viết về Transformer mình có để bên dưới tại mục tài liệu tham khảo).</p><p></p><h2><strong>II. Tiến hành</strong></h2><h2><strong>Cài đặt số thư viện cần thiết</strong></h2><p>Mình sẽ không hướng dẫn cài PyTorch vì do hardware của mỗi người là khác nhau.</p><p>!pip install pyvi
              !pip install -U pip setuptools wheel
              !pip install -U spacy
              !python -m spacy download ja_core_news_sm
              !pip install torchtext
              </p><h2><strong>Dataset</strong></h2>`,
              user: {
                avatar:
                  "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
                name: "Someone",
              },
              tags: ["Nothing", "Everything"],
              createAt: "23/23/1202",
              rate: 10,
              toHide: true,
              comments: 10,
            },
          ]
        );
      }, 2000);
    },
    fetchArticle(articleId) {
      for (const article of this.articles) {
        if (article.id == articleId) {
          this.article = JSON.parse(JSON.stringify(article));
          return true;
        }
      }
      this.article = {
        id: "noting",
        title: `How old are you.`,
        content: `<h2><strong>I. Mở đầu</strong></h2><p>Trong bài viết này, mình sẽ hướng dẫn mọi người xây dựng mô hình transformer cơ bản cho dịch ngôn ngữ Nhật-Việt, trong bài viết trước đó của mình về Neural Machine Translation mình đã nêu ra một số khái niệm cơ bản của Seq2Seq(link ở phần tài liệu tham khảo), bởi vì trên Viblo đã có khá nhiều bài viết về Transformer cũng như Self-Attention hay, nên mình sẽ tiến hành hướng dẫn mọi người thực hiện code from scratch(một số bài viết về Transformer mình có để bên dưới tại mục tài liệu tham khảo).</p><p></p><h2><strong>II. Tiến hành</strong></h2><h2><strong>Cài đặt số thư viện cần thiết</strong></h2><p>Mình sẽ không hướng dẫn cài PyTorch vì do hardware của mỗi người là khác nhau.</p><p>!pip install pyvi
        !pip install -U pip setuptools wheel
        !pip install -U spacy
        !python -m spacy download ja_core_news_sm
        !pip install torchtext
        </p><h2><strong>Dataset</strong></h2>`,
        user: {
          avatar:
            "https://styles.redditmedia.com/t5_3eb8a/styles/communityIcon_y3i1684w1sd91.png",
          name: "Someone",
        },
        tags: ["near", "Everything"],
        createAt: "23/23/1202",
        rate: 10,
        toHide: true,
        comments: 100,
      };
    },
    fetchRecommends() {
      this.recommends.splice(
        this.recommends.length,
        0,
        ...[
          {
            id: "a1",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s) aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
          },
          {
            id: "12",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "14",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
          {
            id: "noting",
            title: `Prince or Michael Jackson: Which one was your favorite? (1980s)`,
          },
        ]
      );
    },
  },
});
