<template>
    <div v-if="lang == 'pt'" class='TagLine'>
        opa, beleza? <br />
        eu sou o <Under>Maycon Portugal,</Under><br />
        um UI / Brand Designer<br />
        daqui de Minas Gerais, uai!<br />
    </div>
    <div v-else class='TagLine'>
        hey there, <br />
        I'm <Under>Maycon Portugal,</Under><br />
        an UI / Brand Designer<br />
        based in Sabará, Brazil<br />
    </div>
</template>

<script setup lang='ts'>
import Under from './Under.vue';

const lang = ref('pt')
onMounted(() => {
    lang.value = localStorage.getItem('lang')
})


</script>

<style>
.TagLine {
    font-size: 5rem;
    font-weight: 500;
    line-height: 130%;
    transition: all 0.5s ease-in-out;
}

@media (max-width: 1800px) {
    .TagLine {
        font-size: 4rem;
    }
}

@media (max-width: 1500px) {
    .TagLine {
        font-size: 3.5rem;
    }
}

@media (max-width: 1100px) {
    .TagLine {
        font-size: 3rem;
    }
}

@media (max-width: 900px) {
    .TagLine {
        font-size: 2.5rem;
    }
}

@media (max-width: 700px) {
    .TagLine {
        font-size: 2rem;
    }
}
</style>