<template>
    <section id="works" class="worksPage">
        <div class="works__content">
            <AtomsWorkItem item="1" />
            <AtomsWorkItem item="2" />
            <AtomsWorkItem item="3" />
            <AtomsWorkItem item="4" />
        </div>
    </section>
</template>

<script setup lang='ts'>
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
        transform: translateX(-33vw);
    }


}

@keyframes worksPage {

    0%,
    10% {
        transform: translateX(100vw);
    }

    25%,
    45% {
        transform: translateX(0vw);
    }

    50%,
    100% {
        transform: translateX(-100vw);
    }
}
</style>