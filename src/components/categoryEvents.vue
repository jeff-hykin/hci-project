<template>
    <container v-if=category class=card>
        <container class=card-head :style='{backgroundColor:color, color:"white"}' shadow=1>
            <h5>{{category}}</h5>
        </container>
        <container class=card-body>
            <ui-button class=category-event v-for='each in events' :key=each.title align-h=left @click='selectEvent(each)'>
                {{each.title}}
            </ui-button>
        </container>
    </container>
</template>

<script>
export default {
    name: "categoryEvents",
    props: {
        category: String,
        color: String,
    },
    data: () => ({}),
    computed: {
        events() {
            return this.global.events.filter(each => each.startsInFuture && each.source == this.category)
        }
    },
    methods: {
        selectEvent(event) {
            this.global.currentEventIndex = event.index-0
        }
    }
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
    
    .card-body {
        width: 100%;
        .category-event {
            cursor: pointer;
            text-align: left;
            justify-content: flex-start;
            background-color: #bdbdbd;
            padding: 0 1rem;
            border-radius: 0.5rem;
            width: 100%;
            margin-bottom: 0.3rem;
        }
    }
}
</style>