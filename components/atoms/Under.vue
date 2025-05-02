<template>
    <span class="under">
        <slot />
        <svg>
            <rect x="0" y="0" width="100%" height="1rem" fill="var(--primary-color)" />
        </svg>
    </span>

</template>

<script setup>


onMounted(() => {
    getPosition()
})

const getPosition = () => {


}

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
    animation: grow 0.5s ease-in-out 0.5s forwards;

}

@keyframes grow {
    0% {
        width: 0;
    }

    100% {
        width: calc(100% - 1rem);
    }
}
</style>