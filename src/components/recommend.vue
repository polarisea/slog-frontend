<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBaseStore } from "../stores/base";

const baseStore = useBaseStore();

baseStore.fetchAuthor();
const props = defineProps(["recommend"]);
const router = useRouter();
const shortTitle = computed(() => {
  const maxCharacters = 60;
  if (props.recommend.title.length <= maxCharacters) {
    return props.recommend.title;
  } else {
    return props.recommend.title.substring(0, maxCharacters) + "  ...";
  }
});
</script>
<template>
  <div class="w-full">
    <div class="flex justify-between text-ntext flex-col">
      <span class="flex items-center w-full">
        <a
          @click.prevent="console.log('click')"
          href="/"
          class="rounded-[2rem] text-ntext h-[2rem] w-full flex items-center hover:text-green-500 z-[20]"
        >
          <img
            class="w-[2rem] h-full bg-green-100 rounded-[2rem] mr-[0.5rem]"
            :src="baseStore.author.avatar"
            alt=""
          />
          <span>{{ baseStore.author.name }}</span>
        </a>
      </span>
      <a
        :title="props.recommend.title"
        class="hover:underline text-ntext block font-[500] my-[0.5rem] text-[1rem] max-lg:hidden"
        :href="`/article/${props.recommend.id}`"
        >{{ shortTitle }}
      </a>
      <a
        :title="props.recommend.title"
        class="hover:underline text-ntext block font-[500] my-[0.5rem] text-[1rem] lg:hidden"
        :href="`/article/${props.recommend.id}`"
        >{{ props.recommend.title }}
      </a>
      <span class="text-ntext text-[0.9rem]"
        >{{ props.recommend.rate }} rates &nbsp&nbsp•&nbsp&nbsp
        {{ props.recommend.comments }} comments</span
      >
    </div>
  </div>
</template>
