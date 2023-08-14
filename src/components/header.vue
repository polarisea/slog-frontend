<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "../stores/base";
import { useLSidebarStore } from "../stores/lSidebar";
import { useUserStore } from "../stores/user";
import mobileSearch from "./mobileSearch.vue";

const router = useRouter();
const baseStore = useBaseStore();
const lSidebarStore = useLSidebarStore();
const userStore = useUserStore();
const moblieSearchVisible = ref();
const searchValue = ref();

function handleSearch(keyword) {
  console.log("Handle search", keyword);
}

function handleLogin() {
  console.log("Handle login: ");
}

function handleOpenSummary() {
  console.log("Handle open summary");
}

function handleSignOut() {
  console.log("Handle sign out");
}
</script>

<template>
  <div
    class="fixed bg-white z-[100] w-full py-[8px] flex justify-between px-[2rem] h-[4rem] items-center top-0 left-0 border-b-[1px] border-line-color"
  >
    <span class="flex items-center text-title-text-color">
      <button
        class="mr-[1rem] leading-[0] lg:hidden hover:bg-normal-bg active:bg-normal-btn-active p-[0.5rem] rounded-[1rem]"
        @click="lSidebarStore.isOpen = !lSidebarStore.isOpen"
      >
        <i class="pi pi-bars text-[1.25rem]"></i>
      </button>
      <a href="/">
        <span class="text-[1.5rem] font-semibold">Slog</span>
      </a>
    </span>

    <span
      class="text-normal-text-color w-[calc(100vw-40rem)] max-lg:flex-1 lg:absolute lg:left-[20rem] max-lg:mx-[1rem] max-sm:hidden"
    >
      <i
        class="pi pi-search absolute text-[1.2rem] top-[50%] translate-y-[-50%] ml-[1rem]"
      ></i>
      <input
        v-model="searchValue"
        type="text"
        class="text-[1rem] bg-normal-bg py-[0.62rem] pl-[2.75rem] rounded-[2rem] outline-normal-btn-active w-full"
        placeholder="Tìm kiếm..."
        @keypress.enter="handleSearch(searchValue)"
      />
    </span>
    <span class="flex items-center relative">
      <button
        class="sm:hidden text-title-text-color block w-[2rem] h-[2rem] leading-none font-semibold mr-[0.5rem] hover:bg-normal-btn-hover active:bg-normal-btn-active rounded-[1rem]"
        @click="moblieSearchVisible = true"
      >
        <i class="pi pi-search text-[1.5rem]"></i>
      </button>
      <mobile-search
        class="sm:hidden"
        v-if="moblieSearchVisible"
        @close="moblieSearchVisible = false"
        @search="handleSearch"
      ></mobile-search>
      <button
        class="py-[0.5rem] px-[1rem] text-[1rem] text-green-btn-text-color border-[1px] leading-[110%] border-green-btn-text-color rounded-[1rem] hover:bg-normal-btn-hover active:bg-normal-btn-active"
        @click="handleLogin"
        v-if="!baseStore.isLogin"
      >
        Đăng nhập
      </button>
      <button class="w-[2.5rem] h-[2.5rem] rounded-[2rem] userbox-openbtn">
        <img :src="userStore.avatar" alt="" class="rounded-[2rem]" />
      </button>
      <div
        class="userbox w-[15rem] py-[0.5rem] bg-gray-50 shadow-md text-normal-text-color absolute right-0 top-[calc(100%+0.5rem)] z-[200]"
      >
        <button
          class="w-full hover:bg-normal-btn-hover active:bg-normal-btn-active block text-left pl-[1rem] py-[1rem]"
          @click="handleOpenSummary"
        >
          <i class="pi pi-book"></i>
          <span class="ml-[0.5rem]">Trang quản trị</span>
        </button>
        <button
          class="w-full hover:bg-normal-btn-hover active:bg-normal-btn-active block text-left pl-[1rem] py-[1rem]"
          @click="handleSignOut"
        >
          <i class="pi pi-sign-out"></i>
          <span class="ml-[0.5rem]">Đăng xuất</span>
        </button>
      </div>
    </span>
  </div>
</template>

<style scoped>
.userbox-openbtn:focus + .userbox {
  display: block;
}
.userbox {
  display: none;
}

.userbox:hover {
  display: block;
}
</style>
