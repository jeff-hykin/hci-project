<template>
    <container v-if=category class=card>
        <container class=card-head :style='{backgroundColor:color, color:"white"}' shadow=1>
            <h5>{{category}}</h5>
        </container>
        <container class=card-body>
            <row >
                testing 1 2 3
            </row>  
        </container>
    </container>
    <!-- <v-card style="width: 100%; height: 100%;">
        <v-toolbar color="indigo" dark>
            <v-toolbar-title>{{ tag }}</v-toolbar-title>
        </v-toolbar>
        <v-list>
            <v-list-item v-for="event in events" :key="event.title" @click="$emit('sel-event', event.index)">
                <v-list-item-content>
                    <v-list-item-title v-text="event.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card> -->
</template>

<script>
export default {
    name: "categoryEvents",
    props: {
        category: String,
        color: String,
    },
    data: () => ({}),
}
</script>
<style lang="scss" scoped>
.card {
    height: 100%;
    min-width: 20rem;
    min-height: 10rem;
    
    .card-head {
        transition: all 300ms ease-out;
    }
}
</style>