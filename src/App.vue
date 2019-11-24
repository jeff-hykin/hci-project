<script>
import Vue from "vue"
Vue.config.productionTip = false

//
// plugins
//
import "./plugins/css-baseline"
import "./plugins/good-vue"
import "./plugins/keen-ui"
import vuetify from "./plugins/vuetify"

//
// globally accessible data
//
import setupGlobalData from "./global-data-setup"

//
// imported components
//
import ToDo from "./components/to-do"
import MagicBar from "./components/magic-bar"
import CategoryBreakdown from "./components/categoryBreakdown"
import CurrentEvent from "./components/currentEvent"
import EventMap from "./components/eventMap"

//
// App
//
let App = {
    name: "Main",
    vuetify,
    components: {
        ToDo,
        MagicBar,
        CategoryBreakdown,
        CurrentEvent,
        EventMap,
    },
    data: () => ({}),
    computed: {},
    watch: {},
    methods: {
        selEvent(index) {
            this.selected = index
            console.log(index)
        },
        nextEvent() {
            console.log("next")
            if (this.selected < this.events.length - 1) {
                this.selected += 1
            }
        },
        prevEvent() {
            console.log("prev")
            if (this.selected > 0) {
                this.selected -= 1
            }
        },
    },
    mounted() {
        // for debugging
        window.data = this.global
    },
}

// 
// attach app to dom
// 
// Since this is root, Load the app immediately after this file loads: setTimeout(0)
// find the '#app' div and replace it with this app
setTimeout(() => new (Vue.extend(App))().$mount("#app"), 0)
export default App
</script>
<template>
    <v-app>
        <magic-bar />
        <!-- <magicBar style="top:  1%; left:  1%; height:  3%; width: 98%; position: absolute;" :events="events" :weather="weather" /> -->
        <eventMap style="top:  5%; left:  1%; height: 59%; width: 69%; position: absolute;" :position="position" />
        <currentEvent style="top:  5%; left: 71%; height: 59%; width: 28%; position: absolute;" :events="events" :selected="selected" v-on:next-event="nextEvent()" v-on:prev-event="prevEvent()" />
        <categoryBreakdown style="top: 65%; left:  1%; height: 34%; width: 98%; position: absolute;" :events="events" v-on:sel-event="selEvent" />
    </v-app>
    <!-- <column id="app" align-v="top" align-h="left">
    </column> -->
</template>
<style scoped>
.card {
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    padding: 2rem;
    border-radius: 1rem;
}
.card h5 {
    margin-right: 1rem;
}
.row.card-row {
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
}
.event-container {
    padding: 2rem;
}
.no-word-wrap {
    white-space: pre;
}
</style>
