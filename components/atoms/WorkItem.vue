<template>
    <div class='WorkItem'>
        <div class="work-image" :style="{ backgroundImage: `url(/work-${item}.png)` }" />
        <div class="overlay">
            <div class="work__title">{{ title }}</div>
            <div class="work__arrow">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.82996 1.90735e-06L0 2.83049L21.1461 23.9766H2.01358V28H28V2.02261H23.9675V21.1466L2.82996 1.90735e-06Z"
                        fill="white" />
                </svg>

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

defineProps({
    item: {
        type: String,
        default: '1',
    },
    title: {
        type: String,
        default: 'Uberaba Sport Club',
    }
})


</script>

<style>
.WorkItem {
    height: 100%;
    width: calc((100vw - 2 * 64px - 2 * 16px) / 3);
    /*  */
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: clip;

    .work-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.3s ease-in-out;

    }


    .overlay {
        height: 100%;
        padding: 40px;
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        align-items: flex-end;
        bottom: 0;
        opacity: 0;
        mix-blend-mode: luminosity;

    }

    &:hover {

        .overlay {
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 1;
        }

        .work-image {
            scale: 1.05;
        }
    }

    .work__title {
        font-size: 48px;
        line-height: 110%;
        font-weight: medium;
        color: white;
        z-index: 1;
    }


}
</style>