<script setup>
import { ref } from "vue";
import { useLSidebarStore } from "../stores/lSidebar";

const lSidebarStore = useLSidebarStore();
const isHover = ref(false);
</script>
<template>
  <div
    class="fixed w-[100vw] h-full top-[4rem] left-[20rem] bg-[rgba(0,0,0,0.2)] z-[110] lg:hidden"
    v-if="lSidebarStore.isOpen"
    @click="lSidebarStore.isOpen = false"
  ></div>
  <div
    class="fixed w-[20rem] h-[calc(100vh-4rem)] top-[4rem] border-r-[1px] border-r-line-color lsidebar-transition overflow-y-auto overflow-x-hidden normal-scrollbar z-[100] bg-white"
    :class="{
      'overflow-y-hidden': !isHover,
      'max-lg:left-0': lSidebarStore.isOpen,
      'max-lg:left-[-20rem]': !lSidebarStore.isOpen,
    }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <ul class="text-normal-text-color pb-[1rem]">
      <li v-for="(item, i) in lSidebarStore.items" :key="i">
        <template v-if="item.type == 'route'">
          <a
            :href="item.route"
            class="w-full flex pl-[2rem] py-[1rem] text-ntext hover:bg-normal-btn-hover active:bg-normal-btn-active"
          >
            <i
              v-if="item.icon"
              :class="'pi pi-icons text-[1.5rem] ' + item.icon"
            ></i>
            <span class="ml-[0.5rem]">
              {{ item.label }}
            </span>
          </a>
        </template>
        <template v-if="item.type == 'line'">
          <span
            class="max-lg:w-full w-[90%] mx-auto h-[1px] bg-line-color block"
          ></span>
        </template>
        <template v-if="item.type == 'title'">
          <span
            class="font-black ml-[1rem] block text-title-text-color mt-[1rem] mb-[0.5rem] leading-none"
          >
            {{ item.label }}
          </span>
        </template>
        <template v-if="item.type == 'tag-container'">
          <div
            class="w-full overflow-hidden block"
            :class="{ 'h-[10.5rem]': !lSidebarStore.isShowAllTags }"
          >
            <div
              class="m-auto text-center my-[3.25rem] block"
              v-if="lSidebarStore.tags.length == 0"
            >
              <i class="pi pi-spin pi-spinner text-[4rem]"></i>
            </div>
            <a
              v-for="(arrItem, arrIdx) in lSidebarStore.tags"
              :href="arrItem.route"
              class="w-full flex pl-[2rem] py-[1rem] text-ntext hover:bg-normal-btn-hover active:bg-normal-btn-active"
            >
              <i
                v-if="arrItem.icon"
                :class="'pi pi-icons text-[1.5rem] ' + arrItem.icon"
              ></i>
              <span class="ml-[0.5rem]">
                {{ arrItem.label }}
              </span>
            </a>
          </div>

          <button
            v-if="lSidebarStore.tags.length > 4"
            @click="lSidebarStore.isShowAllTags = !lSidebarStore.isShowAllTags"
            class="font-black active:text-normal-btn-active w-[20rem] text-center text-normal-text-color my-[1rem]"
          >
            {{ lSidebarStore.isShowAllTags ? "Ẩn bớt" : "Xem thêm" }}
          </button>
        </template>
      </li>
    </ul>
  </div>
</template>

<style>
.lsidebar-transition {
  transition: left 0.2s ease;
}
</style>
