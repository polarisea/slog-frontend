<template>
  <div id="user-skeleton" class="w-[100%] rounded-[1rem] p-[1rem] relative z-0">
    <div class="flex justify-between text-ntext">
      <div class="flex items-start">
        <div
          class="w-[2rem] h-[2rem] rounded-[2rem] bg-normal-btn-bg shine"
        ></div>
        <div
          class="w-[5rem] h-[1.2rem] ml-[0.5rem] rounded-[1rem] bg-normal-btn-bg shine"
        ></div>
        <span class="mx-[0.5rem]">•</span>
        <div
          class="w-[3rem] h-[1.2rem] rounded-[1rem] bg-normal-btn-bg shine"
        ></div>
      </div>
      <div
        class="w-[4rem] h-[1.5rem] bg-normal-btn-bg shine rounded-[1rem]"
      ></div>
    </div>
    <div
      class="mt-[0.5rem] w-full h-[20rem] bg-normal-btn-bg shine rounded-[1rem]"
    ></div>
  </div>
</template>

<style scoped>
.shine {
  background-image: linear-gradient(
    to left,
    rgb(220 252 231) 1%,
    white,
    rgb(220 252 231)
  );
  background-size: 300% 100%;
  background-position: right bottom;
  transition: all 3s cubic-bezier(0.4, 0, 1, 1);
}
@keyframes slideIn {
  0% {
    background-position: 300% 0;
  }
  100% {
    background-position: 150% 0;
  }
}

.shine {
  animation: slideIn 3s ease-in-out infinite;
}
</style>
