<template>
    <div v-if="!hidden" class='Header'>
        <AtomsLogoIcon color="#fff" @click="goto('home')" />
        <div :style="{ left: leftB + 'px' }" class="bullet" :class="pageActive" />
        <div class="menu">
            <template v-for="[key, value] in Object.entries(menu[lang])" :key="key">
                <div :class="{ active: pageActive == key }" class="menu-item" @click="goto(key)">
                    {{ value }}
                </div>
            </template>
        </div>

    </div>
</template>

<script setup lang='ts'>

const router = useRouter()

const pageActive = ref<String | null>('home')

const menu = {
    pt: {
        works: 'trabalhos',
        about: 'sobre',
        contact: 'contato'
    },
    en: {
        works: 'works',
        about: 'about',
        contact: 'contact'
    }
}

const lang = ref('pt')
const leftB = ref(0)


router.beforeEach((to, from) => {
    if (to.name == 'project-id') {
        pageActive.value = 'works'
    } else {
        pageActive.value = 'home'
    }
})



const scrollToSection = (section) => {
    if (section == 'home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    } else if (section === 'works') {
        window.scrollTo({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        })
    } else if (section === 'about') {
        window.scrollTo({
            top: window.innerHeight * 2,
            behavior: 'smooth'
        })
    } else if (section === 'contact') {
        window.scrollTo({
            top: window.innerHeight * 3,
            behavior: 'smooth'
        })
    }
}

const goto = (section: string) => {
    if (router.currentRoute.value.name !== 'index') {
        router.push({
            name: 'index'
        })
        setTimeout(() => {
            scrollToSection(section)
            configOberver()
        }, 100)
    } else {
        scrollToSection(section)
    }
}

const configOberver = () => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                pageActive.value = entry.target.getAttribute('id')
            }
        })
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    })
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
        intersectionObserver.observe(section)
    })
}

const hidden = computed(() => {
    return router.currentRoute.value.name == 'login' || router.currentRoute.value.name == 'admin'
})


const setBullet = () => {
    nextTick(() => {
        const el = document.querySelector('.menu>.active')
        console.log(el)
        if (el) {
            const { width, left } = el.getBoundingClientRect()
            leftB.value = left + width / 2
        }

    })
}

watch(() => pageActive.value, setBullet)
onMounted(() => {
    lang.value = localStorage.getItem('lang')
    configOberver()
    const to = router.currentRoute.value
    if (to.name == 'works-id') {
        pageActive.value = 'works'
    } else {
        pageActive.value = 'home'
    }
    window.addEventListener('resize', setBullet)
})
onUnmounted(() => {
    window.removeEventListener('resize', setBullet)

})
</script>

<style>
.Header {
    position: absolute;
    width: 100%;
    padding: 56px 56px 40px 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    mix-blend-mode: difference;
    z-index: 2;
    top: 0;
    left: 0;

    &.fixed {
        position: fixed;

    }
}

.Header>.menu {
    color: white;
    transform: none;
    display: flex;
    gap: 44px;
    font-weight: medium;
    opacity: 1;
    align-self: flex-start;
}

.menu-item {
    width: 100px;
    width: fit-content;
    cursor: pointer;
    font-size: 20px;
    height: 14px;
    line-height: 14px;

}

.bullet {
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    margin-right: 0.5rem;
    transition: all 0.2s cubic-bezier(0.6, 0, 0.1, 1);
    position: absolute;
    top: calc(50% + 10px);

    &.home {
        opacity: 0;
    }

}
</style>