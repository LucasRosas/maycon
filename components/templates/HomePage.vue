<template>
    <section id="home" class="homePage">
        <div class="home__content">
            <AtomsTagLine />
            <MayconGroup />
        </div>
    </section>
</template>

<script setup lang='ts'>
import MayconGroup from '../molecules/MayconGroup.vue';
const header = document.querySelector('.Header')
if (header) {
    header.classList.remove('absolute')
}

</script>

<style>
.homePage {
    animation: homePage 1s ease-in-out;
    position: sticky;
    top: 0vh;

    .home__content {
        position: absolute;
        width: calc(100vw - 192px);
        bottom: 96px;
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        gap: 6rem;
        height: calc(100vh - 232px);

        .TagLine {
            margin-top: auto;
        }

        .MayconGroup {
            margin-inline: auto;
        }


    }


}

@keyframes homePage {

    0%,
    24% {
        transform: translateX(0px);
    }

    25%,
    100% {
        transform: translateX(-100vw);
    }
}
</style>