<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref } from "vue";

import { useArticleStore } from "../stores/article";
import { useLSidebarStore } from "../stores/lSidebar";
import { useCommentStore } from "../stores/comment";
import commentFilter from "../components/commentFilter.vue";
import comment from "../components/comment.vue";
import recommend from "../components/recommend.vue";

const route = useRoute();
const articleStore = useArticleStore();
const lSidebarStore = useLSidebarStore();
const commentStore = useCommentStore();

const { article } = storeToRefs(articleStore);
const { comments } = storeToRefs(commentStore);
const showAll = ref(false);
const isHover = ref(false);

lSidebarStore.initHomeview();
articleStore.fetchArticle(route.params.id);
articleStore.fetchRecommends();

commentStore.fetchComments();

function handleRate(direct) {
  console.log("Handle rate: ", direct);
}

function handleViewComments() {
  console.log("Handle view comments");
}
</script>

<template>
  <div class="flex w-full text-normal-text-color max-lg:flex-col relative">
    <div class="flex-1 px-[1rem] py-[1rem] max-lg:pr-[2rem]">
      <div class="flex items-start text-normal-text-color">
        <img
          class="w-[2rem] h-[2rem] rounded-[2rem] bg-gray-300"
          :src="article.user.avatar"
          alt=""
        />
        <span class="block ml-[0.5rem] leading-none">
          {{ article.user.name }} &nbsp • &nbsp
          {{ article.createAt }}
        </span>
      </div>
      <span
        class="text-title-text-color text-[1.5rem] font-semibold block my-[0.5rem]"
        >{{ article.title }}</span
      >
      <div
        :innerHTML="article.content"
        class="overflow-y-hidden"
        :class="{ 'max-h-[15rem]': !showAll }"
      ></div>
      <div
        class="relative h-[4rem] mt-[-4rem] px-[1rem] w-full h-boxshadow"
        v-if="article.toHide && showAll == false"
      ></div>
      <a
        @click.prevent="showAll = true"
        class="block mb-[0.5rem] text-blue-500 cursor-pointer"
        v-if="article.toHide && showAll == false"
        >Xem toàn bộ</a
      >
      <div class="flex items-center mt-[0.5rem]">
        <span
          class="py-[0.25rem] px-[1rem] w-fit rounded-[1rem] bg-green-100 flex text-normal-text-color text-[1rem] items-center"
        >
          <button
            class="hover:bg-normal-btn-hover active:bg-normal-btn-active z-20 leading-none"
            @click="handleRate(1)"
          >
            <i class="pi pi-arrow-up"></i>
          </button>
          <span class="mx-[0.25rem] z-20">{{ article.rate }}</span>
          <button
            class="hover:bg-normal-btn-hover active:bg-normal-btn-active z-20 leading-none"
            @click="handleRate(-1)"
          >
            <i class="pi pi-arrow-down"></i>
          </button>
        </span>
        <button
          class="ml-[0.5rem] z-20 py-[0.25rem] px-[1rem] w-fit rounded-[1rem] bg-green-100 flex items-center text-normal-text-color text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="handleViewComments"
        >
          <i class="pi pi-comments"></i>
          <span>{{ article.comments }}</span>
        </button>
      </div>
      <comment-filter :comments="article.comments"></comment-filter>
      <!-- <input
        type="text"
        class="text-normal-text-color text-[1rem] rounded-[1rem] w-full border-border-color border-[2px] outline-normal-btn-active py-[0.5rem] pl-[1rem]"
        placeholder="Comment..."
      /> -->
      <span class="relative block">
        <textarea
          class="text-normal-text-color text-[1rem] resize-none rounded-[1rem] w-full border-border-color border-[2px] outline-normal-btn-active py-[0.25rem] px-[1rem]"
          placeholder="Comment..."
          rows="2"
        ></textarea>
        <button
          class="absolute right-[1rem] top-[50%] text-green-btn-text-color translate-y-[-50%]"
        >
          <i class="pi pi-send text-[1.5rem]"></i>
        </button>
      </span>
      <span class="block w-full h-[1px] bg-line-color my-[0.5rem]"></span>
      <div class="w-full block">
        <template v-for="comment in comments">
          <comment :comment="comment"> </comment>
          <span class="block w-full h-[1px] bg-line-color my-[0.5rem]"></span>
        </template>
        <button
          class="text-error-color text-[1rem]"
          @click="commentStore.fetchComments()"
          v-if="commentStore.comments.length < article.comments"
        >
          Xem thêm
        </button>
      </div>
    </div>
    <div
      class="w-[20rem] h-[calc(100vh-4rem)] max-lg:w-full px-[1rem] pt-[2rem] pr-[2rem] sticky top-[4rem]"
    >
      <span class="text-[1.2rem] font-semibold mb-[1rem] block">
        Bài viết liên quan</span
      >
      <div
        :class="{ 'overflow-y-hidden': !isHover }"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="w-full sticky top-[6rem] lg:h-[calc(100vh-8rem)] overflow-y-auto normal-scrollbar"
      >
        <ul>
          <template v-for="recommend in articleStore.recommends">
            <li>
              <recommend :recommend="recommend"></recommend>
            </li>
            <span
              class="max-lg:w-full w-[100%] my-[1rem] mx-auto h-[1px] bg-line-color-200 block"
            ></span>
          </template>
        </ul>
      </div>
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
</style>
