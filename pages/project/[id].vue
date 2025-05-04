<template>
  <div v-if="data" class="Project">
    <div class="--header">
      <div class="--header-image" :style="{ backgroundImage: `url(/work-${data.id}.png)` }" />
      <div class="--header-text">
        <h1>{{ data.title }}</h1>
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
        <div v-html="data.content" />
        <div class="images">
          <div v-for="(image, index) in data.images" :key="index" class="--image">
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
    <div class="--other-works">
      Other works
      <div>list</div>
    </div>
    <div class="--footer">
      <div class="--footer-item">
        <div @click="goToTop">back to top</div>
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
const { data } = await useFetch("/api/posts?id=" + route.params.id);
window.scrollTo({ top: 0, behavior: 'instant' })

onMounted(() => {
  const header = document.querySelector('.Header')
  if (header) {
    header.classList.add('absolute')
  }
})

const metadata = computed(() => {
  if (!data.value) return [];
  return Object.entries(data.value.metadata).map(([key, value]) => {
    return { key, value };
  });

});

const goToTop = () => {
  const bridge = document.getElementById("bridge");
  if (bridge) {
    bridge.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style>
.Project {
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
    margin-inline: 96px;
    display: flex;
    gap: 124px;
    position: relative;
    line-height: 155%;
    font-size: 20px;
    font-weight: 400;

  }

  .--metadata {
    position: sticky;
    top: 150px;
    height: fit-content;
    width: 1400px;
    font-size: 20px;
    line-height: 155%;

    .--meta-lable {
      font-weight: 700;
    }

    .--meta-value {
      font-weight: 400;
      margin-bottom: 24px;
    }
  }

  .--other-works {
    padding: 40px 96px;
  }

  .--footer {
    display: flex;
    justify-content: space-between;
    padding: 40px 56px;
  }
}
</style>
