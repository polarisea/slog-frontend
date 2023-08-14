<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/article";
import { useUserStore } from "../stores/user";
const articleStore = useArticleStore();
const userStore = useUserStore();

const props = defineProps(["article"]);
const { viewType } = storeToRefs(articleStore);
const router = useRouter();

function handleEditArticle() {
  articleStore.editArticle = props.article;
  router.push("/upload");
}

function handleRate(direct) {
  console.log("Handle rate: ", direct);
}

function handleOpenArticle() {
  router.push(`/article/${props.article.id}`);
}
</script>

<template>
  <div
    class="w-full text-normal-text-color text-[1rem] hover:bg-normal-bg p-[1rem] rounded-[1rem] relative"
  >
    <a
      class="absolute w-full h-full top-0 left-0 z-[5]"
      @click.self="handleOpenArticle"
    ></a>
    <span class="flex justify-between relative">
      <div class="flex items-start">
        <img
          class="w-[2rem] h-[2rem] rounded-[2rem] bg-gray-300"
          :src="props.article.user.avatar"
          alt=""
        />
        <span class="block ml-[0.5rem] leading-none">
          {{ props.article.user.name }} &nbsp • &nbsp
          {{ props.article.createAt }}
        </span>
      </div>
      <button
        class="editbox-openbtn z-[20] hover:bg-normal-btn-hover focus:bg-normal-btn-hover w-[2rem] h-[2rem] rounded-[1rem] active:bg-normal-btn-active"
        v-if="userStore.isAdmin"
      >
        <i class="pi pi-ellipsis-v"></i>
      </button>
      <div
        v-if="userStore.isAdmin"
        class="absolute w-[10rem] py-[0.5rem] shadow-md z-30 right-0 bg-gray-50 top-[calc(100%+0.5rem)] editbox"
      >
        <button
          class="text-[1rem] block w-full text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          @click="handleEditArticle"
        >
          Sửa bài viết
        </button>
        <button
          class="text-[1rem] block w-full text-error-color text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
        >
          Xóa bài viết
        </button>
      </div>
    </span>
    <span
      class="text-title-text-color text-[1.2rem] font-semibold block my-[0.5rem]"
      >{{ props.article.title }}</span
    >
    <div
      :innerHTML="props.article.content"
      class="max-h-[15rem] overflow-y-hidden"
      v-if="viewType == 0"
    ></div>
    <div
      class="relative h-[4rem] mt-[-4rem] px-[1rem] w-full h-boxshadow"
      v-if="props.article.toHide && viewType == 0"
    ></div>
    <a
      @click.prevent="router.push(`/article/${props.article.id}`)"
      class="block mb-[0.5rem] text-blue-500"
      v-if="props.article.toHide && viewType == 0"
      >Xem toàn bộ</a
    >
    <div class="flex items-center">
      <span
        class="py-[0.25rem] px-[1rem] w-fit rounded-[1rem] bg-green-100 flex items-center text-normal-text-color text-[1rem]"
      >
        <button
          class="hover:bg-normal-btn-hover active:bg-normal-btn-active z-20 leading-none"
          @click="handleRate(1)"
        >
          <i class="pi pi-arrow-up"></i>
        </button>
        <span class="mx-[0.25rem] z-20">{{ props.article.rate }}</span>
        <button
          class="hover:bg-normal-btn-hover active:bg-normal-btn-active z-20 leading-none"
          @click="handleRate(-1)"
        >
          <i class="pi pi-arrow-down"></i>
        </button>
      </span>
      <button
        class="ml-[0.5rem] z-20 py-[0.25rem] px-[1rem] w-fit rounded-[1rem] bg-green-100 flex items-center text-normal-text-color text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
        @click="handleOpenArticle"
      >
        <i class="pi pi-comments"></i>
        <span>{{ props.article.comments }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.h-boxshadow {
  background-image: linear-gradient(
    to top,
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0)
  );
}

.editbox-openbtn:focus + .editbox {
  display: block;
}
.editbox {
  display: none;
}

.editbox:hover {
  display: block;
}
</style>
