<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useCommentStore } from "../stores/comment";

import subComment from "./subComment.vue";

const { comment } = defineProps(["comment"]);
const userStore = useUserStore();
const commentStore = useCommentStore();

const replies = ref();

const showReplies = ref(false);

function handleDeleteUser() {
  console.log("Delete user: ");
}

function handleViewReplies() {
  console.log("View repies: ");
  commentStore.fetchReplies(comment.id);
  showReplies.value = !showReplies.value;
}
</script>
<template>
  <div class="flex items-start text-normal-text-color flex-col mb-[1rem]">
    <span class="flex justify-between relative w-full">
      <div class="flex items-start">
        <img
          class="w-[2rem] h-[2rem] rounded-[2rem] bg-gray-300"
          :src="comment.user.avatar"
          alt=""
        />
        <span class="block ml-[0.5rem] leading-none">
          {{ comment.user.name }} &nbsp • &nbsp
          {{ comment.createAt }}
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
          class="text-[1rem] block w-full text-error-color text-left py-[0.5rem] px-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active disabled:bg-normal-btn-hover disabled:text-green-btn-text-color"
          @click="handleDeleteUser"
        >
          Xóa tài khoản
        </button>
      </div>
    </span>

    <span class="w-full ml-[2.5rem] mb-[0.5rem] pr-[2.5rem]">
      {{ comment.content }}
    </span>
    <span
      class="flex ml-[2.5rem] w-full pr-[3.5rem]"
      :class="{
        'justify-end': comment.countReply == 0,
        'justify-between': comment.countReply > 0,
      }"
    >
      <button
        class="text-blue-500"
        @click="handleViewReplies"
        v-if="comment.countReply > 0"
      >
        {{ showReplies ? "Ẩn phản hồi" : `Xem ${comment.countReply} phản hồi` }}
      </button>
      <span class="flex">
        <button
          class="z-20 py-[0.5rem] leading-none px-[1rem] w-fit rounded-[1rem] flex items-center text-normal-text-color text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click=""
        >
          <i class="pi pi-exclamation-triangle mr-[0.25rem]"></i>
          <span>Báo cáo</span>
        </button>
        <button
          class="ml-[0.5rem] z-20 py-[0.5rem] leading-none px-[1rem] w-fit rounded-[1rem] flex items-center text-normal-text-color text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
          @click=""
        >
          <i class="pi pi-comment mr-[0.25rem]"></i>
          <span>Phản hồi</span>
        </button>
        <button
          class="ml-[0.5rem] z-20 py-[0.5rem] leading-none px-[1rem] w-fit rounded-[1rem] border-[1px] border-error-color flex items-center text-error-color text-[1rem] hover:bg-red-200 active:bg-red-300"
          @click=""
          v-if="userStore.isAdmin"
        >
          <i class="pi pi-trash mr-[0.25rem]"></i>
          <span>Xóa</span>
        </button>
      </span>
    </span>
    <div class="ml-[2.5rem] mt-[0.5rem] w-full pr-[2.5rem]" v-if="showReplies">
      <sub-comment
        :comment="reply"
        v-for="reply in comment.replies"
      ></sub-comment>
      <span class="relative block">
        <textarea
          class="text-normal-text-color text-[1rem] resize-none rounded-[1rem] w-full border-border-color border-[2px] outline-normal-btn-active py-[0.25rem] px-[1rem]"
          placeholder="Phản hồi..."
          rows="2"
        ></textarea>
        <button
          class="absolute right-[1rem] top-[50%] text-green-btn-text-color translate-y-[-50%]"
        >
          <i class="pi pi-send text-[1.5rem]"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
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
