<template>
    <div class='MayconGroup'>
        <AtomsAvatarHome />
        <DesignBrandUi />
    </div>
</template>

<script setup lang='ts'>
import DesignBrandUi from '../atoms/DesignBrandUi.vue';

</script>

<style>
.MayconGroup {
    position: relative;
    height: 334px;
    width: 399px;
    animation: paralax-1 1s ease-in-out;
    animation-timeline: scroll();

    .DesignBrandUi {
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
    }
}

@keyframes paralax-1 {

    0%,
    10% {
        transform: translate(0, 0%);
    }

    25%,
    100% {
        transform: translate(-50vw, 0%);
    }
}
</style>