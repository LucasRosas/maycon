<template>
    <span class="under">
        <slot />
        <svg>
            <rect x="0" y="0" width="100%" height="1rem" fill="var(--primary-color)" />
        </svg>
    </span>

</template>

<script setup>

const setObserver = () => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = '100%'
            } else {
                entry.target.style.width = '0'
            }
        })
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    })

    const sections = document.querySelectorAll('.under>svg')
    sections.forEach(section => {
        intersectionObserver.observe(section)
    })

}


onMounted(() => {
    setObserver()
})


</script>

<style>
.under {
    display: inline;
    position: relative;
}


.under>svg {
    position: absolute;
    left: 1.5rem;
    top: calc(72px - 0.5rem);
    z-index: -1;
    width: 0;
    height: 1.5rem;
    transition: all 0.5s ease-in-out;

}
</style>