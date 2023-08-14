<script setup>
import { onMounted, nextTick } from "vue";
import articleFilter from "../components/articleFilter.vue";
import articleSkeleton from "../components/articleSkeleton.vue";
import myArticle from "../components/article.vue";
import { useBaseStore } from "../stores/base";
import { useLSidebarStore } from "../stores/lSidebar";
import { useArticleStore } from "../stores/article";

const baseStore = useBaseStore();
const lSidebarStore = useLSidebarStore();
const articleStore = useArticleStore();

baseStore.fetchAuthor();
lSidebarStore.initHomeview();

onMounted(async () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  function handleIntersection(entries, _) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        console.log("ok");
        articleStore.fetchArticles();
      }
    });
  }
  await nextTick();
  const skeleton = document.getElementById("user-skeleton");
  observer.observe(skeleton);
});
</script>

<template>
  <div class="flex w-full">
    <div class="flex-1 px-[1rem]">
      <article-filter></article-filter>
      <div class="w-full">
        <template v-for="article in articleStore.articles">
          <my-article :article="article"></my-article>
          <span class="block w-full h-[1px] bg-line-color my-[1rem]"></span>
        </template>
        <article-skeleton></article-skeleton>
        <template v-if="articleStore.articles.length == 0">
          <span class="block h-[1px] bg-line-color my-[1rem]"></span>
          <article-skeleton></article-skeleton>
        </template>
      </div>
    </div>
    <div
      class="w-[20rem] h-[calc(100vh-4rem)] max-lg:hidden relative px-[1rem] pr-[2rem] pt-[2rem]"
    >
      <div
        class="w-auto bg-normal-bg rounded-[1rem] flex py-[2rem] flex-col items-center text-title-text-color"
      >
        <span class="block font-semibold text-[1.2rem] mx-auto"> Tác giả </span>
        <img
          :src="baseStore.author.avatar"
          class="w-[5rem] h-[5rem] rounded-[2.5rem] bg-normal-btn-bg my-[1rem]"
          alt=""
        />
        <span class="block text-[1rem] w-full pl-[1.5rem]">
          <span class="font-semibold">Tên:</span>
          <span class="ml-[0.5rem]">{{ baseStore.author.name }}</span>
        </span>
        <span class="block text-[1rem] w-full pl-[1.5rem]">
          <span class="font-semibold">Email:</span>
          <span class="ml-[0.5rem]">{{ baseStore.author.email }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
