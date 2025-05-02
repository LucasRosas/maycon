<template>
    <div class='logoIcon'>
        <svg :width="size" :height="size" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.9997 0H21.333V32H31.9997V0Z" :fill="color" />
            <path d="M10.6667 0H5.32428H0V32H5.32428V15.9909L13.3288 32L21.3333 15.9909L10.6667 0Z" :fill="color" />
        </svg>
    </div>
</template>

<script setup lang='ts'>
defineProps({
    size: {
        type: Number,
        default: 32
    },
    color: {
        type: String,
        default: '#1D1D1B'
    }
})
</script>

<style>
.logoIcon {
    cursor: pointer;
}
</style>