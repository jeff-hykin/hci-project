<template>
    <v-card style="width: 100%; height: 100%;">
        <v-card-title>
            Notes
        </v-card-title>
        <v-card-text>
            <v-textarea rounded fill-height outlined v-model="notes" />
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Notes",
    props: {},
    data: () => ({
        notes: "",
    }),
    watch: {
        notes: function() {
            window.localStorage.setItem("notes", this.notes)
        },
    },
    beforeMount() {
        var temp = window.localStorage.getItem("notes")
        if (temp) this.notes = temp
        else this.notes = ""
    },
}
</script>
