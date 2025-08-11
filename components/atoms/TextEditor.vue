<template>
    <div class='TextEditor'>
        <EchoEditor v-model="modelValue" :extensions="extensions" hideMenubar :maxHeight="512" output="html" dark />
    </div>

</template>

<script setup lang='ts'>
import {
    Heading,
    BaseKit, EchoEditor, Bold,
    BulletList,
    Italic,
    Underline,
    Strike,
    LineHeight,
    locale, FontFamily, FontSize, TextAlign, Link
} from 'echo-editor'
import 'echo-editor/style.css'

locale.setLang('en')

const modelValue = defineModel('modelValue', {
    type: String,
    default: '',
})

const extensions = [
    BaseKit.configure({
        placeholder: {
            placeholder: 'Digite aqui...',
        },
    }),
    Heading,
    FontFamily,
    Bold,
    BulletList,
    Italic,
    FontSize,
    Underline,
    Strike,
    LineHeight,
    TextAlign,
    Link
]

</script>

<style></style>