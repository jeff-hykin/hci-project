<template>
     <ui-textbox
            ref='textbox'
            floating-label
            label="Your todo's "
            placeholder="(mm/dd/yyyy hh:mm I need to start typing)"
            :multi-line="true"
            v-model="text"
            style="font-size: 14pt !important; width: 25rem;"
            class="todo-textbox"
            :autosize="true"
        />
</template>

<script>
const convertTime12to24 = (hours, minutes, pmOrAm) => {
    if (hours == "12") {
        hours = "00"
    }
    if (pmOrAm.match(/[pP][mM]/)) {
        hours = parseInt(hours, 10) + 12
    }
    return [hours, minutes]
}


export default {
    data: ()=>({
        text: "",
        tasks: [],
    }),
    methods: {
    },
    watch: {
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>