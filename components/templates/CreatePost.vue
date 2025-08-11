<template>
    <div class='AddPost'>
        <Sheet v-model:open="open">
            <SheetContent class="SheetContent">
                <SheetHeader>
                    <SheetTitle>
                        {{ postId ? 'Editar publicação' : 'Adicionar publicação' }}

                    </SheetTitle>
                    <SheetDescription class="flex flex-col gap-4">

                        <template v-if="loadingData">
                            Buscando publicação....
                        </template>
                        <div v-show="!loadingData" class="flex flex-col gap-4">
                            <div class="flex gap-4">
                                <div class="flex flex-auto flex-col gap-2">
                                    <Label for="title">Título</Label>
                                    <Input id="title" v-model="output.title" placeholder="Digite aqui" />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <Label for="title">Data de publicação (às 00h00)</Label>
                                    <AtomsInputDate v-model="output.publishedDate" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label for="thumbnail">Imagem de capa</Label>
                                <AtomsUploadImage id="thumbnail" :pre-image="output.thumbnail"
                                    @input="output.thumbnail = $event" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label for="content">Descrição</Label>
                                <TextEditor v-model="output.content" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label for="content">Descrição (Inglês)</Label>
                                <TextEditor v-model="output.content_en" />
                            </div>
                            <div class="flex gap-4">
                                <div class="flex flex-auto flex-col gap-2">
                                    <Label for="brand">Marca</Label>
                                    <Input id="brand" v-model="output.metadata.brand" placeholder="Digite aqui" />
                                </div>
                                <div class="flex flex-auto flex-col gap-2">
                                    <Label for="country">País</Label>
                                    <Input id="country" v-model="output.metadata.country" placeholder="Digite aqui" />
                                </div>
                                <div class="flex flex-auto flex-col gap-2">
                                    <Label for="year">Ano</Label>
                                    <Input id="year" v-model="output.metadata.year" type="text"
                                        placeholder="Digite aqui" />
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label for="images">Imagens</Label>
                                <AtomsUploadImages id="images" @input="output.images = $event"
                                    :preImage="output.images" />
                            </div>
                        </div>
                        <div v-show="!loadingData" class="flex justify-between">
                            <Button variant="destructive" @click="deletePost" v-if="postId"> {{ loadingRemove ?
                                'Apagando...' :
                                'Apagar' }} </Button>
                            <Button class="ml-auto" @click="createPost" :disabled="!output.title"> {{ loading ?
                                'Salvando...' : 'Salvar'
                            }}</Button>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>

        </Sheet>
    </div>
</template>

<script setup lang='ts'>
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TextEditor from '../atoms/TextEditor.vue'
import { uploadBlobUrlToFirebase } from '~/services/uploader'
import { getAuth } from "firebase/auth";
import { ref as storageRef, deleteObject } from 'firebase/storage'

const props = defineProps({
    postId: {
        type: [String, null],
        default: null,
    },
})

const auth = getAuth();
const user = auth.currentUser;
const open = ref<Boolean>(true)
const emits = defineEmits(['close'])

const loading = ref(false)
const loadingData = ref(false)
const loadingRemove = ref(false)

const output = ref<Post>({
    title: '',
    title_en: '',
    thumbnail: '',
    content: '',
    content_en: '',
    images: [],
    publishedDate: new Date().toISOString(),
    authorId: '',
    author: '',
    metadata: {
        brand: '',
        country: '',
        year: '',
    },
})

const setOutput = async () => {
    loadingData.value = true
    const { data, error } = await useFetch(`/api/posts/${props.postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (error.value || !data.value) {
        console.error(error.value)
        return
    }
    output.value = data.value
    loadingData.value = false
}


const uploadThumbnail = async () => {
    if (output.value.thumbnail && output.value.thumbnail.startsWith('blob')) {
        // Exemplo de uso:
        const blobUrl = output.value.thumbnail
        const finalUrl = await uploadBlobUrlToFirebase(
            blobUrl,
            `uploads/${Date.now()}.png`
        );
        output.value.thumbnail = finalUrl
    }
}

const uploadImages = async () => {
    const promises = output.value.images.map((i, index) => {
        if (i.startsWith('blob')) {
            return uploadBlobUrlToFirebase(
                i,
                `uploads/${Date.now()}-${index}.png`
            );
        }
        return i
    })
    output.value.images = await Promise.all(promises)
}

watch(() => open.value, (val) => {
    if (!val) {
        emits('close', false)
    }
})

const createPost = async () => {
    loading.value = true
    await uploadThumbnail()
    await uploadImages()
    if (props.postId) {
        const { error } = await useFetch(`/api/posts/${props.postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: output.value
        })
        if (error.value) {
            console.error(error.value)
        }
    } else {
        const { error } = await useFetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: output.value
        })
        if (error.value) {
            console.error(error.value)
        }
    }
    emits('close', true)
}


const deleteImageFromFirebase = async (url) => {
    try {
        const storage = useFirebaseStorage();
        const fileRef = storageRef(storage, url);
        await deleteObject(fileRef);
        console.log("Imagem apagada com sucesso:", url);
    } catch (error) {
        console.error("Erro ao apagar imagem:", error);
    }
}

const deletePost = async () => {
    loadingRemove.value = true
    const images = output.value.images;
    if (output.value.thumbnail) {
        images.push(output.value.thumbnail);
    }
    await Promise.all(images.map((i) => deleteImageFromFirebase(i)));
    const { error } = await useFetch(`/api/posts/${props.postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (error.value) {
        console.error(error.value)
    }
    emits('close', true)
}


onMounted(async () => {
    if (user) {
        output.value.author = String(user.displayName)
        output.value.authorId = user.uid
    }
    if (props.postId) {
        await setOutput()
    }
})

</script>


<style>
.SheetContent {
    min-width: 90vw;
    overflow: auto;
}
</style>