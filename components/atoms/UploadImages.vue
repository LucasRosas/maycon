<template>
    <div class='UploadImage flex flex-col gap-2'>

        <input type="file" :id="id" :name="id" accept="image/*" class="hidden" @change="onFileChange" ref="fileInput"
            multiple />
        <input type="file" :id="id" :name="id" accept="image/*" class="hidden" @change="onFileChangeUnique"
            ref="fileInputUnique" />
        <div class="importArea" @click="clickInput">
            Adicionar imagens
        </div>
        <div class="previewArea">

            <template v-for="(image, index) in images" :key="index">
                <div class="image-preview" :class="{ image: image }">
                    <img :src="image" alt="" srcset="">
                    <div class="change flex flex-col gap-2">
                        <Button @click="editImage(index)">
                            <RotateCcw />
                            Alterar imagem
                        </Button>
                        <Button variant="secondary" @click="removeImage(index)">
                            <Trash />
                            Remover imagem
                        </Button>
                        <div class="flex gap-2">
                            <Button :disabled="index == 0" @click="toLeft(index)">
                                <ChevronLeft />
                            </Button>
                            <Button :disabled="index == images.length - 1" @click="toRight(index)">
                                <ChevronRight />
                            </Button>
                        </div>

                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ChevronLeft, ChevronRight, RotateCcw, Trash } from 'lucide-vue-next'
import { deleteObject } from 'firebase/storage'
import { ref as storageRef } from 'firebase/storage'

const emits = defineEmits(['input'])
const props = defineProps({
    id: {
        type: String,
        default: 'thumbnail',
    },
    preImage: {
        type: Array,
        default: [],
    },
})

const images = ref<string[]>([])

watch(() => props.preImage, () => {
    if (props.preImage.length)
        images.value = props.preImage
})

const fileInput = ref<HTMLInputElement | null>(null)
const fileInputUnique = ref<HTMLInputElement | null>(null)
const indexImage = ref(0)
const editImage = (index: number) => {
    indexImage.value = index
    if (fileInputUnique.value) {
        fileInputUnique.value.click()
    }
}

const clickInput = () => {
    if (fileInput.value) {
        fileInput.value.click()
    }
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

const removeImage = async (index) => {
    const item = images.value[index]
    if (!item.startsWith('blob')) {
        await deleteImageFromFirebase(item)
    }
    images.value.splice(index, 1)
}

const onFileChangeUnique = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0]
        const blobURL = URL.createObjectURL(file)
        images.value[indexImage.value] = blobURL
        emits('input', images)
    }
}

const onFileChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
        const files = Array.from(fileInput.files)
        files.forEach((file) => {
            const blobURL = URL.createObjectURL(file)
            images.value.push(blobURL)
        })
        emits('input', images)
    }
}

const toLeft = (index) => {
    let item = images.value[index - 1]
    images.value[index - 1] = images.value[index]
    images.value[index] = item
}
const toRight = (index) => {
    let item = images.value[index + 1]
    images.value[index + 1] = images.value[index]
    images.value[index] = item
}
</script>

<style>
.previewArea {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 1rem;
    width: 100%;
}

.image-preview {
    height: 250px;
    width: 250px;

    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f010;

    position: relative;
    border: 1px solid #ccc;

    img {
        margin: auto;

        min-height: 100%;
        min-width: 100%;
        object-fit: cover;

    }

    &:hover {
        .change {
            display: flex;

        }
    }

    .change {
        position: absolute;
        height: 100%;
        width: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        color: white;
        font-weight: 700;
        background-color: #00000094;
        cursor: pointer;
    }
}

.importArea {
    min-height: 200px;
    width: 100%;
    margin: auto;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f010;
    display: flex;
    justify-content: center;
    border: 1px dashed #ccc;

}
</style>