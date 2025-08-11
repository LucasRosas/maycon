<template>
    <div>
        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(
                    'w-[280px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
                <Calendar v-model="value" initial-focus />
            </PopoverContent>
        </Popover>

    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
    DateFormatter,
    getLocalTimeZone,
    type DateValue,
    fromDate
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'


const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}

const df = new DateFormatter('pt-BR', {
    dateStyle: 'long',
})

const value = ref<DateValue>()

watch(value, (newValue) => {
    modelValue.value = newValue ? newValue.toDate(getLocalTimeZone()) : ''
})



const modelValue = defineModel('modelValue', {
    type: String,
    default: '',
})

onMounted(() => {
    if (modelValue.value) {
        value.value = fromDate(new Date(modelValue.value), getLocalTimeZone())
    }
})
</script>
