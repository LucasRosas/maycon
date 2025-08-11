<template>
    <Card class='CardPost'>
        <div class="img">
            <img :src="thumbnail" alt="Post Image" class="post-card">
        </div>
        <CardHeader>
            <div class="flex justify-between">
                <CardTitle>{{ title }}</CardTitle>
            </div>
            <CardDescription>Data de publicação: {{ date }}</CardDescription>
        </CardHeader>
    </Card>
</template>

<script setup lang='ts'>

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const props = defineProps({
    title: {
        type: String,
        default: 'Título do post',
    },
    publishedDate: Date,
    thumbnail: { type: String, default: '/public/work-1.png' },
    id: { type: String, default: '1234567890' },
});

const date = computed(() => {
    const date = new Date(props.publishedDate)
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
})
</script>

<style>
.CardPost {
    contain: content;
    cursor: pointer;

    .img {
        overflow: hidden;

    }

    img {
        min-width: 200px;
        width: 100%;
        height: 200px;
        object-fit: cover;
        transition: all .25s ease-in-out;
    }

    &:hover {
        img {
            transform: scale(1.1);
        }
    }
}
</style>