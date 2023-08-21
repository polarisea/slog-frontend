<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { formatDistanceToNow } from "date-fns";

import { useArticleStore } from "../stores/article";
import { useLSidebarStore } from "../stores/lSidebar";
import { useCommentStore } from "../stores/comment";
import { useUserStore } from "../stores/user";
import commentFilter from "../components/commentFilter.vue";
import comment from "../components/comment.vue";
import recommend from "../components/recommend.vue";

const route = useRoute();
const articleStore = useArticleStore();
const lSidebarStore = useLSidebarStore();
const commentStore = useCommentStore();
const userStore = useUserStore();

const { article } = storeToRefs(articleStore);
const { comments } = storeToRefs(commentStore);
const showAll = ref(false);
const isHover = ref(false);
const commentValue = ref("");

lSidebarStore.initUserView();
articleStore.fetchArticle(route.params.id);
articleStore.fetchRecommends();
commentStore.firstFetch(route.params.id);

const agoTime = computed(() => {
  console.log(article.value);
  if (article.value.createdAt) {
    return formatDistanceToNow(new Date(article.value.createdAt), {
      addSuffix: true,
    });
  }
  return 0;
});


function handleComment() {
  commentStore.postComment(userStore.info.id, commentValue.value, route.params.id);
}

</script>

<template>
  <div class="relative flex w-full text-normal-text-color max-lg:flex-col">
    <div class="flex-1 px-[1rem] py-[1rem] max-lg:pr-[2rem] " :class="{ 'flex flex-col': !article }">
      <div class="m-auto w-fit h-fit" v-if="!article">
        <i class="pi pi-spin pi-spinner text-[3rem] font-semibold"></i>
      </div>
      <template v-if="article">
        <div class="flex items-start text-normal-text-color">
          <img class="h-[2rem] w-[2rem] rounded-[2rem] bg-gray-300" :src="article.user ? article.user.photo : ''"
            alt="" />
          <span class="ml-[0.5rem] block leading-none">
            {{ article.user ? article.user.name : "" }} &nbsp • &nbsp
            {{ agoTime }}
          </span>
        </div>
        <span class="my-[0.5rem] block text-[1.5rem] font-semibold text-title-text-color">{{ article.title }}</span>
        <div :innerHTML="article.content" class="overflow-y-hidden" :class="{ 'max-h-[15rem]': !showAll }"></div>
        <div class="h-boxshadow relative mt-[-4rem] h-[4rem] w-full px-[1rem]" v-if="article.toHide && showAll == false">
        </div>
        <a @click.prevent="showAll = true" class="mb-[0.5rem] block cursor-pointer text-blue-500"
          v-if="article.toHide && showAll == false">Xem toàn bộ</a>
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
          <!-- <button
          class="z-20 ml-[0.5rem] flex w-fit items-center rounded-[1rem] bg-green-100 px-[1rem] py-[0.25rem] text-[1rem] text-normal-text-color hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="handleViewComments">
          <i class="pi pi-comments"></i>
          <span>{{ article.comments }}</span>
        </button> -->
        </div>
        <comment-filter :comments="article.comments"></comment-filter>

        <span class="relative block">
          <textarea
            class="w-full resize-none rounded-[1rem]  border-[2px] border-border-color px-[1rem] py-[0.25rem] text-[1rem] text-normal-text-color outline-normal-btn-active"
            placeholder="Comment..." rows="2" v-model="commentValue"></textarea>
          <button class="absolute right-[1rem] top-[50%] translate-y-[-50%] text-green-btn-text-color"
            @click="handleComment">
            <i class="pi pi-send text-[1.5rem]"></i>
          </button>
        </span>
        <span class="my-[0.5rem] block h-[1px] w-full bg-line-color"></span>
        <div class="block w-full">
          <template v-for="comment in comments">
            <comment :comment="comment"> </comment>
            <span class="my-[0.5rem] block h-[1px] w-full bg-line-color"></span>
          </template>
          <button class="text-[1rem] text-error-color" @click="commentStore.fetchComments(route.params.id)">
            <!-- v-if="commentStore.comments.length < article.comments" -->
            Xem thêm
          </button>
        </div>
      </template>
    </div>
    <div class="sticky top-[4rem] h-[calc(100vh-4rem)] w-[20rem] px-[1rem] pr-[2rem] pt-[2rem] max-lg:w-full">
      <span class="mb-[1rem] block text-[1.2rem] font-semibold">
        Bài viết liên quan</span>
      <div class="m-auto w-fit h-fit" v-if="!articleStore.recommends">
        <i class="pi pi-spin pi-spinner text-[2rem]"></i>
      </div>
      <template v-if="articleStore.recommends">
        <div :class="{ 'overflow-y-hidden': !isHover }" @mouseenter="isHover = true" @mouseleave="isHover = false"
          class="normal-scrollbar sticky top-[6rem] w-full overflow-y-auto lg:h-[calc(100vh-8rem)]">
          <ul>
            <template v-for="recommend in articleStore.recommends">
              <li>
                <recommend :recommend="recommend"></recommend>
              </li>
              <span class="bg-line-color-200 mx-auto my-[1rem] block h-[1px] w-[100%] max-lg:w-full"></span>
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.h-boxshadow {
  background-image: linear-gradient(to top,
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0));
}
</style>
