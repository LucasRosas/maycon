<template>
    <section id="works" class="worksPage">
        <div class="works__content">
            <template v-for="value in posts">
                <AtomsWorkItem :item="value.id" :title="value.title" :thumbnail="value.thumbnail" :data="value" />
            </template>
        </div>
    </section>
</template>

<script setup lang='ts'>


const loading = ref(true)
const posts = ref<Post[]>([])

const fetchPosts = async () => {
    let storagedData = localStorage.getItem('posts')
    posts.value = storagedData ? JSON.parse(storagedData) : []
    loading.value = true
    const { data, error } = await useFetch('/api/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (error.value) {
        console.error(error.value)
    }
    loading.value = false
    posts.value = data.value
    localStorage.setItem('posts', JSON.stringify(data.value))
}

onMounted(async () => {
    await fetchPosts()
})

</script>

<style>
.worksPage {
    animation: worksPage 1s ease-in-out;
    position: sticky;
    top: 100vh;
    translate: 0 -100vh;

    .works__content {
        padding: 0 40px 56px 56px;
        display: flex;
        gap: 16px;
        height: calc(100% - 150px);
        min-width: 100vw;
        position: absolute;

        overflow: auto;
        animation: carrossel 1s ease-in-out;
        animation-timeline: scroll();
        transition: all 1s ease-in-out;
    }
}

@keyframes carrossel {

    0%,
    28% {
        transform: translateX(0px);
    }

    43%,
    100% {
        transform: translateX(calc(-100% + 100vw));
    }


}

@keyframes worksPage {

    0%,
    24% {
        transform: translateX(100vw);
    }

    25%,
    49% {
        transform: translateX(0vw);
    }

    50%,
    100% {
        transform: translateX(-100vw);
    }
}
</style>