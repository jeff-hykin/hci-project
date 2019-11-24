<template>
    <v-card style="width: 100%; height: 100%;">
        <v-card-title>
            Notes
        </v-card-title>
        <v-card-text>
            <v-textarea rounded fill-height outlined v-model="global.notes" />
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "Notes",
}
</script>
