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
            this.global.currentTime = now
            
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
        <row class='map-and-details-section' align-h=space-evenly align-v=center>
            <container class=map-section height=30rem>
                <eventMap />
            </container>
            
            <column class=details-container>
                <container margin-bottom=2rem width=100%>
                    <countDown />
                </container>
                <eventDetails />
            </column>
        </row>
        <row class='categories-section'>
            <categories />
        </row>
        <notes />
    </container>
</template>
<style lang='scss' scoped>

$small-screen: 40rem;
$large-screen: 80rem;

// pass down to children
::v-deep {
    --shadow-1: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px;
    --shadow-2: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    /* 12 hour view */
    --one-hour-width: calc(100vw / 12);
    --fifteen-min-width: calc(var(--one-hour-width) / 4);
    --magic-bar-height: 10vh;
    --categories-height: 20rem;
    
    @media screen and (max-width: $small-screen) {
        // only show 5 hours at a time
        --one-hour-width: calc(100vw / 3);
    }
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
        min-height: var(--magic-bar-height);
        width: 100%;
    }

    .map-and-details-section {
        width: 100vw;
        min-height: fit-content;
        flex-wrap: wrap-reverse;
        align-content: flex-end;
        padding: 2rem;
        padding-bottom: 0;
        
        @media not screen and (max-width: $large-screen) {
            --large-padding: calc(3rem + 10vw);
            padding-left: var(--large-padding);
            padding-right: var(--large-padding);
        }
        
        --map-margin: 2rem;
        --map-min-width: 20rem;
        .map-section {
            min-height: 20rem;
            min-width: var(--map-min-width);
            max-width: 80vw;
            max-height: 50vh;
            height: calc(100% - calc(var(--map-margin) * 2));
            margin: var(--map-margin);
            margin-left: 0;
            flex-grow: 1;
        }
        
        .details-container {
            min-width: 20rem;
        }
    }
    
    .categories-section {
        height: var(--categories-height);
        width: 100vw;
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
    z-index: 0;
}

body {
    background-color: whitesmoke;
}
</style>