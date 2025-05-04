<template>
    <div class='Header'>
        <AtomsLogoIcon color="#fff" @click="goto('home')" />
        <div class="menu">
            <div class="bullet" :class="pageActive" />
            <div class="menu-item" @click="goto('works')">
                works
            </div>
            <div class="menu-item" @click="goto('about')">about</div>
            <div class=" menu-item" @click="goto('contact')">contact</div>
        </div>

    </div>
</template>

<script setup lang='ts'>

const router = useRouter()

const pageActive = ref<String | null>('home')

router.beforeEach((to, from) => {
    if (to.name == 'works-id') {
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

onMounted(() => {
    configOberver()
    const to = router.currentRoute.value
    if (to.name == 'works-id') {
        pageActive.value = 'works'
    } else {
        pageActive.value = 'home'
    }

})
</script>

<style>
.Header {
    position: fixed;
    width: 100%;
    padding: 56px 56px 40px 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    mix-blend-mode: difference;
    z-index: 2;

    &.absolute {
        position: absolute;

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
    width: 90px;
    width: fit-content;
    cursor: pointer;
    font-size: 20px;

}

.bullet {
    width: 6px;
    height: 6px;
    background-color: white;
    border-radius: 50%;
    margin-right: 0.5rem;
    transition: all 0.5s cubic-bezier(0.6, 0, 0.1, 1);



    &.home {
        opacity: 0;
        scale: 0;
        translate: 85px 36px;
    }

    &.works {
        translate: 85px 36px;
    }

    &.about {
        translate: 186px 36px;
    }

    &.contact {
        translate: 300px 36px;
    }
}
</style>