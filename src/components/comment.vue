<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useCommentStore } from "../stores/comment";

import subComment from "./subComment.vue";

const { comment } = defineProps(["comment"]);
const userStore = useUserStore();
const commentStore = useCommentStore();

const replyValue = ref("");

const showReplies = ref(false);

function handleDeleteUser() {
  console.log("Delete user: ");
}

function handleViewReplies() {
  console.log("View repies: ");
  showReplies.value = !showReplies.value;
}

function handleReply() {
  commentStore.postComment(userStore.info.id, replyValue.value, comment.post, comment.id);
}

</script>
<template>
  <div class="mb-[1rem] flex flex-col items-start text-normal-text-color">
    <span class="relative flex w-full justify-between">
      <div class="flex items-start">
        <img class="h-[2rem] w-[2rem] rounded-[2rem] bg-gray-300" :src="comment.user.photo" alt="" />
        <span class="ml-[0.5rem] block leading-none">
          {{ comment.user.name }} &nbsp • &nbsp
          {{ comment.createAt }}
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
          class="block w-full px-[1rem] py-[0.5rem] text-left text-[1rem] text-error-color hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          @click="handleDeleteUser">
          Xóa tài khoản
        </button>
      </div>
    </span>

    <span class="mb-[0.5rem] ml-[2.5rem] w-full pr-[2.5rem]">
      {{ comment.content }}
    </span>
    <span class="ml-[2.5rem] flex w-full pr-[3.5rem]" :class="{
      'justify-end': comment.comments.length == 0,
      'justify-between': comment.comments.length > 0,
    }">
      <button class="text-blue-500" @click="handleViewReplies" v-if="comment.comments.length > 0">
        {{
          showReplies
          ? "Ẩn phản hồi"
          : `Xem ${comment.comments.length} phản hồi`
        }}
      </button>
      <span class="flex">
        <button
          class="z-20 flex w-fit items-center rounded-[1rem] px-[1rem] py-[0.5rem] text-[1rem] leading-none text-normal-text-color hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="">
          <i class="pi pi-exclamation-triangle mr-[0.25rem]"></i>
          <span>Báo cáo</span>
        </button>
        <button
          class="z-20 ml-[0.5rem] flex w-fit items-center rounded-[1rem] px-[1rem] py-[0.5rem] text-[1rem] leading-none text-normal-text-color hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click="">
          <i class="pi pi-comment mr-[0.25rem]"></i>
          <span>Phản hồi</span>
        </button>
        <button
          class="z-20 ml-[0.5rem] flex w-fit items-center rounded-[1rem] border-[1px] border-error-color px-[1rem] py-[0.5rem] text-[1rem] leading-none text-error-color hover:bg-red-200 active:bg-red-300"
          @click="" v-if="userStore.isAdmin">
          <i class="pi pi-trash mr-[0.25rem]"></i>
          <span>Xóa</span>
        </button>
      </span>
    </span>
    <div class="ml-[2.5rem] mt-[0.5rem] w-full pr-[2.5rem]" v-if="showReplies">
      <sub-comment :comment="reply" v-for="reply in comment.comments"></sub-comment>
      <span class="relative block">
        <textarea v-model="replyValue"
          class="w-full resize-none rounded-[1rem] border-[2px] border-border-color px-[1rem] py-[0.25rem] text-[1rem] text-normal-text-color outline-normal-btn-active"
          placeholder="Phản hồi..." rows="2"></textarea>
        <button class="absolute right-[1rem] top-[50%] translate-y-[-50%] text-green-btn-text-color" @click="handleReply">
          <i class="pi pi-send text-[1.5rem]"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
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
