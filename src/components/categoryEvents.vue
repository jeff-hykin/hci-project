<template>
    <container v-if=category class=card>
        <container class=card-head :style='{backgroundColor:color, color:"white"}' shadow=1>
            <h5>{{category}}</h5>
        </container>
        <!-- padding -->
        <container class=card-body>
            <!-- bounding box for scrolling -->
            <container overflow=auto height=100% width=100%>
                <!-- overflow box for scrolling -->
                <container height=max-content width=100%>
                    <!-- actuall buttons -->
                    <ui-button class=category-event v-for='each in events' :key=each.title align-h=left @click='selectEvent(each)'>
                        {{each.title}}
                    </ui-button>
                </container>
            </container>
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
            return this.global.events.filter(each => each.source == this.category)
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
    min-width: var(--min-card-size);
    min-height: 10rem;
    
    .card-head {
        transition: all 300ms ease-out;
    }
    
    .card-body {
        width: 100%;
        overflow: hidden;
        
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