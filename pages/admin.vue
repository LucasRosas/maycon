<template>
    <div class='Container'>
        <h1>
            Olá, {{ user.displayName }}!
        </h1>
        <Card>
            <CardHeader>
                <div class="flex justify-between items-start">
                    <h1>
                        Gerenciar publicações:
                    </h1>
                    <Button variant="secondary" @click="openCreateModal(null)">
                        <Plus />
                        Adicionar publicação
                    </Button>
                </div>
                <template v-if="!posts.length && !loading">
                    Você ainda não publicou nada! Clique em "Adicionar publicação" para começar.
                </template>

                <div class="posts">
                    <template v-if="loading">
                        <OrganismsLoadingCardPost v-for="value in [1, 2, 3]" :key="value" />
                    </template>
                    <template v-else>
                        <template v-for="post in posts" :key="post.id">
                            <CardPost :title="post.title" :publishedDate="post.publishedDate"
                                :thumbnail="post.thumbnail" @click="openCreateModal(post.id)" />
                        </template>
                    </template>
                </div>
            </CardHeader>
        </Card>
        <CreatePost v-if="openCreate" :postId="itemId" @close="handleClose" />
    </div>
</template>

<script setup lang='ts'>
import CreatePost from '@/components/templates/CreatePost.vue'
import { getAuth } from 'firebase/auth'
import { Plus } from 'lucide-vue-next'
import CardPost from '~/components/organisms/CardPost.vue'
import type { Post } from '~/lib/generated/prisma'

import {
    Card,
    CardHeader,

} from '@/components/ui/card'

definePageMeta({
    middleware: 'auth'
})

const loading = ref(true)
const posts = ref<Post[]>([])
const openCreate = ref(false)
const itemId = ref<string | null>(null)

const auth = getAuth();
const user = auth.currentUser;

console.log(user)

const fetchAllPosts = async () => {
    loading.value = true
    const { data, error } = await useFetch('/api/posts/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (error.value) {
        console.error(error.value)
    }
    loading.value = false
    posts.value = data.value
}


const handleClose = (fetch: boolean) => {
    itemId.value = null
    openCreate.value = false
    if (fetch) {
        fetchAllPosts()
    }
}

const openCreateModal = (id: string | null) => {
    itemId.value = id
    openCreate.value = true
}


onMounted(() => {
    const colorMode = useColorMode()
    colorMode.preference = 'dark'
    fetchAllPosts()
})
</script>

<style>
.Container {
    margin: 136px 8vw;

    h1 {
        font-size: 20px;
        font-weight: 500;
        line-height: 155%;
        margin-bottom: 2rem;
    }

    .posts {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, auto));
        gap: 1rem;
    }
}
</style>