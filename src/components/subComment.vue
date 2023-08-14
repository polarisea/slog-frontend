<script setup>
import { useUserStore } from "../stores/user";

const { comment } = defineProps(["comment"]);
const userStore = useUserStore();

function handleDeleteUser() {
  console.log("Delete user: ");
}
</script>
<template>
  <div class="flex items-start text-normal-text-color flex-col mb-[0rem]">
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
    <span class="flex ml-[2.5rem] justify-end w-full pr-[2.5rem]">
      <button
        class="z-20 py-[0.5rem] leading-none px-[1rem] w-fit rounded-[1rem] flex items-center text-normal-text-color text-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
        @click=""
      >
        <i class="pi pi-exclamation-triangle mr-[0.25rem]"></i>
        <span>Báo cáo</span>
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
