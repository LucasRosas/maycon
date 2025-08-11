<template>
    <div class='UploadImage flex flex-col gap-2'>
        <input type="file" :id="id" :name="id" accept="image/*" class="hidden" @change="onFileChange" ref="fileInput" />
        <div class="preview" :class="{ image: image }" @click="clickInput">
            <img v-if="image" :src="image" alt="" srcset="">
            <div v-else>
                Adicionar imagem
            </div>
            <div v-if="image" class="change">
                <Button @click="clickInput">
                    <RotateCcw />
                    Alterar imagem
                </Button>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { RotateCcw } from 'lucide-vue-next'
import Button from '../ui/button/Button.vue'
import { deleteObject } from 'firebase/storage'
import { ref as storageRef } from 'firebase/storage'


const props = defineProps({
    id: {
        type: String,
        default: 'thumbnail',
    },
    preImage: {
        type: String,
        default: '',
    },
})

watch(() => props.preImage, () => {
    if (props.preImage)
        image.value = props.preImage
})


const image = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const emits = defineEmits(['input'])

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

const onFileChange = async (event: Event) => {
    if (!image.value.startsWith('blob')) {
        await deleteImageFromFirebase(image.value)
    }
    const fileInput = event.target as HTMLInputElement
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0]
        const blobURL = URL.createObjectURL(file)

        image.value = blobURL
        emits('input', blobURL)
    }

}

</script>

<style>
.preview {
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
    position: relative;

    &.image {
        border: 1px solid #ccc;
        width: fit-content;
    }

    img {
        margin: auto;
        width: 500px;
        height: 100%;
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
        color: white;
        font-weight: 700;
        background-color: #00000094;
        cursor: pointer;
    }
}
</style>