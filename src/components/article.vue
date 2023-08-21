<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { computed } from "vue";
// import {agoTime} from "../utils/date"
import { formatDistanceToNow } from "date-fns";

import { useArticleStore } from "../stores/article";
import { useUserStore } from "../stores/user";

const articleStore = useArticleStore();
const userStore = useUserStore();

const { article } = defineProps(["article"]);
const { viewType } = storeToRefs(articleStore);
const router = useRouter();

const agoTime = computed(() => {
  return formatDistanceToNow(new Date(article.createdAt), { addSuffix: true });
});

console.log(article);

articleStore.fetchVotes(article.id);

function handleEditArticle() {
  articleStore.editArticle = article;
  router.push("/upload");
}

function handleOpenArticle() {
  router.push(`/article/${article.id}`);
}
</script>

<template>
  <div class="relative w-full rounded-[1rem] p-[1rem] text-[1rem] text-normal-text-color hover:bg-normal-bg">
    <a class="absolute left-0 top-0 z-[5] h-full w-full" @click.self="handleOpenArticle"></a>
    <span class="relative flex justify-between">
      <div class="flex items-start">
        <img class="h-[2rem] w-[2rem] rounded-[2rem] bg-gray-300" :src="article.user.photo" alt="" />
        <span class="ml-[0.5rem] block leading-none">
          {{ article.user.name }} &nbsp • &nbsp
          {{ agoTime }}
        </span>
      </div>
      <button
        class="editbox-openbtn z-[20] h-[2rem] w-[2rem] rounded-[1rem] hover:bg-normal-btn-hover focus:bg-normal-btn-hover active:bg-normal-btn-active"
        v-if="userStore.isAdmin">
        <i class="pi pi-ellipsis-v"></i>
      </button>
      <div v-if="userStore.isAdmin"
        class="editbox absolute right-0 top-[calc(100%+0.5rem)] z-30 w-[10rem] bg-gray-50 py-[0.5rem] shadow-md">
        <button
          class="block w-full px-[1rem] py-[0.5rem] text-left text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          @click="handleEditArticle">
          Sửa bài viết
        </button>
        <button
          class="block w-full px-[1rem] py-[0.5rem] text-left text-[1rem] text-error-color hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color">
          Xóa bài viết
        </button>
      </div>
    </span>
    <span class="my-[0.5rem] block text-[1.2rem] font-semibold text-title-text-color">{{ article.title }}</span>
    <div :innerHTML="article.content" class="max-h-[15rem] overflow-y-hidden" v-if="viewType == 'Card'"></div>
    <div class="h-boxshadow relative mt-[-4rem] h-[4rem] w-full px-[1rem]" v-if="article.toHide && viewType == 'Card'">
    </div>
    <a @click.prevent="router.push(`/article/${article.id}`)" class="mb-[0.5rem] block text-blue-500"
      v-if="article.toHide && viewType == 'Card'">Xem toàn bộ</a>
    <div class="mt-[0.5rem] flex items-center">
      <span
        class="flex w-fit items-center rounded-[1rem] bg-green-100 px-[1rem] py-[0.25rem] text-[1rem] text-normal-text-color">
        <button class="z-20 leading-none hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="articleStore.postVote(1, article.id)">
          <i class="pi pi-arrow-up"></i>
        </button>
        <span class="z-20 mx-[0.25rem]">{{ article.score }}</span>
        <button class="z-20 leading-none hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="articleStore.postVote(-1, article.id)">
          <i class="pi pi-arrow-down"></i>
        </button>
      </span>
      <button
        class="z-20 ml-[0.5rem] flex w-fit items-center rounded-[1rem] bg-green-100 px-[1rem] py-[0.25rem] text-[1rem] text-normal-text-color hover:bg-normal-btn-hover active:bg-normal-btn-active"
        @click="handleOpenArticle">
        <i class="pi pi-comments"></i>
        <span>{{ article.comments }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.h-boxshadow {
  background-image: linear-gradient(to top,
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0));
}

.editbox-openbtn:focus+.editbox {
  display: block;
}

.editbox {
  display: none;
}

.editbox:hover {
  display: block;
}
</style>
