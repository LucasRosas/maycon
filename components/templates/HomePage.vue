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

</script>

<style>
.homePage {
    animation: homePage 1s ease-in-out;
    position: sticky;
    top: 0vh;

    .home__content {
        position: absolute;
        width: 80vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        gap: 6rem;
        height: calc(100vh - 18rem);

        .TagLine {
            margin-top: auto;
        }


    }


}

@keyframes homePage {

    0%,
    10% {
        transform: translateX(0px);
    }

    25%,
    100% {
        transform: translateX(-100vw);
    }
}
</style>