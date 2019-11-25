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
import MagicBar from "./components/magic-bar"
import eventDetails from "./components/eventDetails"
import eventMap from "./components/eventMap"
import categories from './components/categories'
import notes from './components/notes'
import countDown from './components/countDown'

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
        MagicBar,
        eventDetails,
        eventMap,
        categories,
        notes,
        countDown,
    },
    data: () => ({}),
    computed: {},
    watch: {},
    methods: {},
    mounted() {
        this.global.currentEventIndex = this.getNextFutureEventIndex()
        // setup the countdown
        setInterval(() => {
            let now = new DateTime()
            // set the new time
            this.global.currentTime = now.unix
            
            let nextEvent = this.getNextFutureEventIndex()
            // if not locked onto an event
            if (!this.lockedOntoEvent) {

                // check to see if the current event has passed its start time
                if (this.currentEventIndex && this.currentEvent.startDateTime < now && nextEvent) {
                    // this assignment should be done even when nextFutureEventIndex is null
                    this.global.currentEventIndex = nextEvent
                }
                
                // then update the cursor hour
                this.global.cursorHour = now.timeOfDayAsSeconds/(60*60)
            }
            
        }, 1000)
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
        <row class='main-body' align-h=space-evenly align-v=top>
            <column width=65% height=100%>
                <container class=map-container height=60% width=100% min-height=20rem>
                    <eventMap />
                </container>
                <row class=category-container>
                    <categories />
                </row>
            </column>
            <column class=event-detail-container height=50% width=30% min-height=20rem align-v=top>
                <container margin-bottom=2rem width=100%>
                    <countDown />
                </container>
                <eventDetails />
            </column>
        </row>
        <notes />
    </container>
</template>
<style lang='scss' scoped>
// pass down to children
::v-deep {
    --shadow-1: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px;
    --shadow-2: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    /* 12 hour view */
    --one-hour-width: calc(100vw / 12);
    --fifteen-min-width: calc(var(--one-hour-width) / 4);
    --magic-bar-height: 10vh;
}

/* lock the viewbox for the app */
#app {
    height: 100vh;
    max-height: 100vh;
    width: 100vw;
    max-width: 100vw;
    overflow: visible;
    
    .magic-bar-container {
        height: var(--magic-bar-height);
        width: 100%;
    }

    .main-body {
        padding: 2rem;
        min-height: min-content;
        height: 90%;
        width: 100%;
    }
    
    .category-container {
        height: 40%;
        width: 100%;
    }
}

</style>

<!-- Global CSS -->
<style lang='scss'>
.card {
    --padding: 0.8rem 1rem;
    
    box-shadow: var(--shadow-2);
    background: white;
    border-radius: 1rem;
    
    .card-head {
        width: 100%;
        height: fit-content;
        padding: var(--padding);
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        box-shadow: var(--shadow-1);
        
        h1, h2, h3, h4, h5 {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    
    .card-body {
        padding: var(--padding);
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

// disable the garbage vuetify
button.ui-button {
    -webkit-box-shadow: none;
    box-shadow: none;
}

body {
    background-color: whitesmoke;
}
</style>