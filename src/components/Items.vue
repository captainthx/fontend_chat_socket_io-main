<script lang="ts" setup>
import { onMounted, ref } from "vue";
let show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>

<template>
  <XyzTransitionGroup
    class="head flex justify-center items-center hover:bg-gray-700 item-group"
    xyz="fade small"
  >
    <div xyz="inherit left" v-if="show">Vite +&nbsp;</div>
    <div xyz="fade big" v-if="show">Vue 3 +&nbsp;</div>
    <div v-if="show">TypeScript +&nbsp;</div>
    <div v-if="show">Tailwind +&nbsp;</div>
    <div xyz="inherit right" v-if="show">Pinia</div>
  </XyzTransitionGroup>

  <p class="text-yellow-300 text-center text-xs sm:text-base">
    The Progressive JavaScript Framework
  </p>

  <XyzTransitionGroup xyz="fade small stagger">
    <main v-if="show" class="grid grid-cols-3 gap-2 text-white p-4 lg:w-[32rem]">
      <div
        class="xyz-in border-2 py-1 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://vitejs.dev" target="_blank">
          <img src="../assets/vite.svg" class="w-16" alt="Vite" />
          <p class="text-center text-xs py-1">Vite</p>
        </a>
      </div>
      <div
        class="xyz-in border-2 py-1 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://vuejs.org/" target="_blank">
          <img src="../assets/vue.svg" class="w-16" alt="Vite" />
          <p class="text-center text-xs py-1">Vue</p>
        </a>
      </div>
      <div
        class="xyz-in border-2 py-1 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://pinia.vuejs.org/" target="_blank">
          <img src="../assets/pinia.svg" class="w-11" alt="Pinia" />
          <p class="text-center text-xs py-1">Pinia</p>
        </a>
      </div>
      <div
        class="xyz-in border-2 py-1 col-span-2 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://animxyz.com/" target="_blank">
          <img src="../assets/anime.svg" class="w-16" alt="Anime" />
          <p class="text-center text-xs py-1">AnimXYZ</p>
        </a>
      </div>
      <div
        class="xyz-in border-2 py-1 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://www.typescriptlang.org" target="_blank">
          <img src="../assets/Typescript.svg" class="w-16" alt="Typescript" />
          <p class="text-center text-xs py-1">Typescript</p>
        </a>
      </div>
      <div
        class="xyz-in border-2 py-1 col-span-3 border-gray-800 rounded-md flex flex-col justify-center items-center hover:bg-gray-700"
      >
        <a href="https://tailwindcss.com" target="_blank">
          <img src="../assets/Tailwind.svg" class="w-16" alt="Tailwind" />
          <p class="text-center text-xs py-1">TailwindCss</p>
        </a>
      </div>
    </main>
  </XyzTransitionGroup>
</template>

<style></style>
