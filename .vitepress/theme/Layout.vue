<template>
  <div class="antialiased">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">
        <a class="text-xl" href="/" aria-label="Lost in Engineering">
          <img class="inline-block mr-2" style="width: 36px; height: 36px" alt="logo"
            src="https://avatars.githubusercontent.com/u/89473452?s=200&v=4" />
          <span v-if="!isIndex" class="hidden md:inline">Lost in Engineering</span>
        </a>
        <div class="text-base text-gray-500 leading-5 flex">
          <a class="hover:text-gray-700 green" href="#" @click="toggleMode">
            <SunIcon size="1.3x" />
          </a>

          <!-- <a class="hover:text-gray-700" style="margin-left: 15px;" href="https://github.com/mychidarko" target="_blank"
            rel="noopener">@mychidarko →</a> -->
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="isIndex" />
      <Article v-else />
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'
import { SunIcon } from '@zhuowenli/vue-feather-icons'

if (typeof window !== 'undefined') {
  import('twitter-widgets').then((widgets) => {
    widgets.load()
  });
}

let isDark = (typeof window !== 'undefined' && (window.localStorage["isDark"] || false));

const route = useRoute()
const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/');

onMounted(() => {
  applyMode();
});

const applyMode = () => {
  const body = document.body;

  if (isDark === 'true' || isDark === true) {
    body.classList.remove("-light");
  } else {
    body.classList.add("-light");
  }
};

const toggleMode = () => {
  if (typeof window === "undefined") {
    return;
  }

  const newMode = !isDark;

  window.localStorage["isDark"] = newMode;
  isDark = newMode;

  console.log(isDark, window.localStorage["isDark"]);

  applyMode();
};
</script>
