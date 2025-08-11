<template>
    <Card class=' card-item LoadingCardPost'>

    </Card>
</template>

<script setup lang='ts'>

import {
    Card,
} from '@/components/ui/card'



</script>

<style>
.LoadingCardPost {
    contain: content;
    height: 250px;
    background: linear-gradient(90deg,
            #EDEDED 30%,
            #DCDCDC 50%,
            #EDEDED 70%);
    background-size: 400%;
    animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
    0% {
        background-position: 100% 100%;
    }

    100% {
        background-position: 0 0;
    }
}
</style>