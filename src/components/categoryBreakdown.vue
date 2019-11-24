<template>
    <v-container fluid style="width: 100%; height: 100%; display: flex; padding: 0px;">
        <categoryEvents style="flex-grow: 1;" :events="cat1" :tag="tag1" v-on:sel-event="$emit('sel-event', $event)" />
        <div style="width: 1%; height: 100%;" />
        <categoryEvents style="flex-grow: 1;" :events="cat2" :tag="tag2" v-on:sel-event="selEvent" />
        <div style="width: 1%; height: 100%;" />
        <categoryEvents style="flex-grow: 1;" :events="cat3" :tag="tag3" v-on:sel-event="selEvent" />
        <div style="width: 1%; height: 100%;" />
        <notes style="flex-grow: 1;" />
    </v-container>
</template>

<script>
import categoryEvents from "./categoryEvents"
import notes from "./notes"
export default {
    name: "categoryBreakdown",
    components: {
        categoryEvents,
        notes,
    },
    props: {
        events: Array,
        selected: Number,
    },
    data: () => ({
        cat1: null,
        cat2: null,
        cat3: null,
        tag1: null,
        tag2: null,
        tag3: null,
    }),
    methods: {
        selEvent(index) {
            this.$emit("sel-event", index)
        },
    },
    mounted: function() {
        var cats = {}
        for (var e in this.global.events) {
            var event = this.global.events[e]
            if (event.tag in cats) {
                cats[event.tag].push(event)
            } else {
                cats[event.tag] = [event]
            }
        }
        var tags = Object.keys(cats)
        this.tag1 = tags[0]
        this.tag2 = tags[1]
        this.tag3 = tags[2]
        this.cat1 = cats[tags[0]]
        this.cat2 = cats[tags[1]]
        this.cat3 = cats[tags[2]]
    },
}
</script>
