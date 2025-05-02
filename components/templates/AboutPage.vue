<template>
    <section id="about" class="aboutPage">
        <div class="content">
            <AtomsMayconAvatar :size="96" />
            <div class="about__text">
                <div>
                    I am currently a Senior UI Designer at Dentsu World Services Brazil, where I use my expertise in
                    Figma and other
                    design tools to create user interfaces that are both visually appealing and functional. With a
                    background in
                    Multimedia Production and certifications in Visual Communication, I focus on balancing aesthetics
                    and usability,
                    always creating efficient and creative solutions that elevate user experiences and deliver business
                    value.
                </div>
                <div>
                    Throughout my career, I’ve worked on projects that enhance clients' digital experiences, always
                    striving for
                    innovation and results in various sectors, from education to health companies. My skills in layout
                    design,
                    branding, and interface design, combined with fluent communication in Portuguese and English, enable
                    me to
                    collaborate effectively in multicultural teams.
                </div>
                <div class="about__buttons flex gap-2">
                    <AtomsBehanceIcon />
                    <AtomsLinkedinIcon />
                    <AtomsInstagramIcon />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
</script>

<style>
.aboutPage .content {
    display: flex;
    gap: 32px;
    width: calc(32px + 96px + 660px);
    /* max-width: 1200px; */
    margin: 2rem auto;
    font-size: 20px;
    line-height: 155%;
    color: var(--black-color-800);
    font-weight: 400;
    /*TODO: Se diminuir mais, vira tablet e a largura ocupa tudo menor margem */
}

.aboutPage {
    animation: aboutPage 1s ease-in-out;
    position: sticky;
    bottom: 100vh;
    translate: 0 100vh;
}

.about__text {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

@keyframes aboutPage {

    0%,
    45% {
        transform: translateX(100vw);

    }

    50%,
    70% {
        transform: translateX(0vw);
    }

    75%,
    100% {
        transform: translateX(-100vw);
    }
}
</style>