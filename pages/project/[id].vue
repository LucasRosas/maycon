<template>
  <div v-if="post" class="Project">
    <div class="--header">
      <div class="--header-image" :style="{ backgroundImage: `url(${post.thumbnail}` }" />
      <div class="--header-text">
        <h1>{{ post.title }}</h1>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_232_311" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40"
            height="40">
            <rect x="40" width="40" height="40" transform="rotate(90 40 0)" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_232_311)">
            <path
              d="M18.6114 28.042L18.6114 6.66699L21.3889 6.66699L21.3889 28.042L31.3889 18.042L33.3335 20.0003L20.0002 33.3337L6.66683 20.0003L8.61141 18.042L18.6114 28.042Z"
              fill="#1C1B1F" />
          </g>
        </svg>

      </div>
    </div>
    <div class="--body">
      <section class="--content">
        <div class="--metadata-top">
          <div v-for="(item, index) in metadata" :key="index" class="--metadata-item">
            <div class="--meta-lable">{{ item.key }}</div>
            <div class="--meta-value">{{ item.value }}</div>
          </div>
        </div>
        <div v-html="lang == 'pt' ? post.content : post.content_en" />
        <div class="images">
          <div v-for="(image, index) in post.images" :key="index" class="--image">
            <img :src="image" alt="">
          </div>
        </div>
      </section>
      <div class="--metadata">
        <div v-for="(item, index) in metadata" :key="index" class="--metadata-item">
          <div class="--meta-lable">{{ item.key }}</div>
          <div class="--meta-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
    <div class="--other-works" v-if="false">
      Other works
      <div>list</div>
    </div>
    <div class="--footer">
      <div class="--footer-item">
        <div @click="goToTop">{{ lang == 'pt' ? 'voltar ao topo' : 'back to top' }}</div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 16V3.825L1.4 9.425L0 8L8 0L16 8L14.6 9.425L9 3.825V16H7Z" fill="#1C1B1F" />
        </svg>

      </div>

      <div class="about__buttons flex gap-2">
        <AtomsBehanceIcon />
        <AtomsLinkedinIcon />
        <AtomsInstagramIcon />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const post = ref(null)
const lang = ref('pt')


window.scrollTo({ top: 0, behavior: 'instant' })

const metadata = computed(() => {
  if (!post.value) return [];
  return Object.entries(post.value.metadata).sort((a, b) => a[0].localeCompare(b[0])).map(([key, value]) => {
    return { key, value };
  });
});

const goToTop = () => {
  const bridge = document.getElementById("bridge");
  if (bridge) {
    bridge.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(async () => {
  lang.value = localStorage.getItem('lang')
  let dataLocal = localStorage.getItem('data')
  const parsedData = dataLocal ? JSON.parse(dataLocal) : null

  if (parsedData.id == route.params.id) {
    post.value = parsedData
  } else {
    const { data } = await useFetch("/api/posts/" + route.params.id);
    post.value = data
  }

  const header = document.querySelector('.Header')
  if (header) {
    header.classList.remove('fixed')
  }
  const colorMode = useColorMode()
  colorMode.preference = 'light'
})
</script>

<style>
.Project {
  font-size: 20px;

  .--header {
    width: 100%;

    .--header-image {
      width: 100%;
      height: 70vh;
      background-size: cover;
      background-position: center;
    }

    .--header-text {
      margin: 110px 96px;
      font-size: 56px;
      font-weight: 500;
      line-height: 125%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  }

  .--body {
    display: flex;
    gap: 96px;
    position: relative;
    line-height: 155%;
    font-size: 20px;
    font-weight: 400;
    justify-content: space-between;
    width: calc(1440px - 192px);
    max-width: calc(100vw - 192px);
    margin-inline: auto;

    .--content {
      color: #4d4d4d;
      flex: auto;

      p:first-of-type {
        margin-top: 0;
      }

      .images {
        display: flex;
        flex-direction: column;
        gap: 80px;
      }
    }
  }

  .--metadata {
    position: sticky;
    top: 80px;
    height: fit-content;
    width: 195px;
    font-size: 20px;
    line-height: 155%;
    flex: none;
    animation: opaci 1s linear;
    animation-timeline: scroll();
  }

  .--metadata-top {
    display: flex;
    gap: 4rem;
    font-size: 20px;
    line-height: 155%;
  }


  .--meta-lable {
    font-weight: 700;
    text-transform: capitalize;
  }

  .--meta-value {
    font-weight: 400;
    margin-bottom: 24px;
    white-space: nowrap;
  }

  .--other-works {
    width: calc(1440px - 192px);
    margin-inline: auto;
  }

  .--footer {
    display: flex;
    justify-content: space-between;
    padding: 40px 56px;
  }

  .--footer-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}


@media screen and (min-width: 834px) {
  .Project .--metadata-top {
    display: none;
  }
}

@media screen and (max-width: 834px) {
  .Project .--metadata {
    display: none;
  }
}

@keyframes opaci {

  0%,
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
