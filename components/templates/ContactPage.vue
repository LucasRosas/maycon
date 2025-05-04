<template>
    <section id="contact" class="contactPage">
        <div class="content">
            <div class="tagline">
                Had an idea? Let's talk
                <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_16_174" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="26"
                        height="22">
                        <rect width="26" height="22" transform="matrix(1 0 0 -1 0 22)" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_16_174)">
                        <path
                            d="M6.36404 -0.109531L4.14404 2.11089L20.7324 18.6992H5.72363V21.8555H26.109V1.47713H22.9457V16.4792L6.36404 -0.109531Z"
                            fill="#1C1B1F" />
                    </g>
                </svg>
            </div>
            <div class="email-container" @mousemove="handleMouseMove" @click="copyLink">
                <div class="--email">
                    portugal.maycon@icloud.com
                </div>
                <div id="ballon">
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                        v-if="text == 'there you go! copied!'">
                        <path
                            d="M3.44792 8.00422L0 4.5563L1.22688 3.32943L3.44792 5.55047L9.00229 -0.00390625L10.2292 1.22297L3.44792 8.00422Z"
                            fill="white" />
                    </svg>
                    {{ text }}
                </div>
            </div>
        </div>
        <div class="about__buttons flex gap-2">
            <AtomsBehanceIcon />
            <AtomsLinkedinIcon />
            <AtomsInstagramIcon />
        </div>
    </section>
</template>

<script setup lang='ts'>

const text = ref('click to copy link')
const handleMouseMove = (event) => {
    const x = event.clientX
    const y = event.clientY - 50
    const ballon = document.getElementById('ballon')
    if (ballon) {
        ballon.style.left = `${x}px`
        ballon.style.top = `${y}px`
    }
}


const copyLink = () => {
    const email = 'portugal.maycon@icloud.com'

    let copied = false

    navigator.clipboard.readText().then((value) => {
        if (value === email) {
            text.value = 'you already did it  :)'
            copied = true
            setTimeout(() => {
                text.value = 'click to copy link'
                copied = false
            }, 4000)
            return
        } else {
            navigator.clipboard.writeText(email).then(() => {
                text.value = 'there you go! copied!'
                setTimeout(() => {
                    text.value = 'click to copy link'
                }, 4000)
            }).catch(err => {
                console.error('Failed to copy: ', err)
            })
        }
    }).catch(err => {
        console.error('Failed to read clipboard: ', err)
    })
}
</script>

<style>
.contactPage {
    animation: contactPage 1s ease-in-out;
    position: sticky;
    bottom: 0vh;
    translate: 0 0vh;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .about__buttons {
        position: absolute;
        bottom: 2.5rem;
        right: 4rem;

    }

    .content {
        margin-top: -100px;
    }

    .tagline {
        font-size: 40px;
        font-weight: 400;
        padding: 2rem;
        margin-bottom: -4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        font-weight: 500;
    }

    .email-container {
        cursor: none;
        padding: 2rem;


        .--email {
            font-weight: 600;
            font-size: 72px;
            line-height: 100%;
            border-bottom: 5px solid black;
            width: fit-content;

        }

        &:hover {
            #ballon {
                opacity: 1;
            }
        }
    }

}

@keyframes contactPage {

    0%,
    74% {
        transform: translateX(100vw);
    }

    75%,
    100% {
        transform: translateX(0vw);
    }
}

#ballon {
    background: black;
    color: white;
    border-radius: 4px 4px 4px 0px;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    position: absolute;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;


    &::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent black;
    }
}
</style>