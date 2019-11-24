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
import categoryBreakdown from "./components/categoryBreakdown"
import eventDetails from "./components/eventDetails"
import eventMap from "./components/eventMap"
import categories from './components/categories'

// 
// utils
// 
import DateTime from 'good-date'

//
// App
//
let App = {
    name: "App",
    vuetify,
    components: {
        ToDo,
        MagicBar,
        categoryBreakdown,
        eventDetails,
        eventMap,
        categories,
    },
    data: () => ({}),
    computed: {
        nextEvents: function() {
            var temp = []
            for (var event in this.events) {
                if (this.events[event].sHour > this.currentHour || (this.events[event].sHour == this.currentHour && this.events[event].sMinute >= thiscurrentMinute)) temp.push(this.events[event])
            }
            return temp
        },
    },
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
        this.global.currentEventIndex = this.getNextFutureEvent()
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
    <container id="app">
        <div class='magic-bar-container'>
            <magic-bar />
        </div>
        <row class='map-and-preview-container' align-h=space-evenly>
            <container class=map-container height=100% width=65% min-height=20rem>
                <eventMap />
            </container>
            <container class=event-detail-container height=100% width=30% min-height=20rem>
                <eventDetails />
            </container>
        </row>
        <container class=category-container>
            <categories />
        </container>
        <!-- <categoryBreakdown :events="events" v-on:sel-event="selEvent" /> -->
    </container>
</template>
<style lang='scss' scoped>
// pass down to children
::v-deep {
    /* 12 hour view */
    --one-hour-width: calc(100vw / 12);
    --fifteen-min-width: calc(var(--one-hour-width) / 4)
}

/* lock the viewbox for the app */
#app {
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    overflow: visible;
    
    .magic-bar-container {
        height: 10%;
        width: 100%;
    }

    .map-and-preview-container {
        padding: 2rem;
        min-height: min-content;
        height: 50%;
        width: 100%;
    }
    
    .category-container {
        height: 30%;
        width: 100%;
    }
}

</style>

<!-- Global CSS -->
<style lang='scss'>
.card {
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    background: whitesmoke;
    border-radius: 1rem;
}
.card-head {
    width: 100%;
    height: fit-content;
    padding: 0.8rem 1rem;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px;
    
    h1, h2, h3, h4, h5 {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}
.no-word-wrap {
    white-space: pre;
}
.ellipsis-overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.hidden {
    visibility: hidden;
}
</style>