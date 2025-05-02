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



const scrollToSection = (section: string) => {
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
            console.log(entry)
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
    z-index: 1;
}

.Header>.menu {
    color: white;
    transform: none;
    display: flex;
    gap: 2.75rem;
    font-weight: 500;
    opacity: 1;
}

.menu-item {
    width: 60px;
    cursor: pointer;
}

.bullet {
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    margin-right: 0.5rem;
    transition: all 0.3s ease-in-out;


    &.home {
        opacity: 0;
        scale: 0;
        translate: 80px 300%;
    }

    &.works {
        translate: 80px 300%;
    }

    &.about {
        translate: 185px 300%;
    }

    &.contact {
        translate: 300px 300%;
    }
}
</style>