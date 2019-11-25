import Vue from 'vue'
import mockData from './mock-data'
import Event from "./utils/event-class"
import DateTime from 'good-date'

let globalKey = 'global'

// 
// load stuff from localStorage
// 
let localStorageData = {
    notes: "",
    eventCategoryColorMapping: {}
}
for (let eachKey in localStorageData) {
    let savedData = localStorage.getItem(eachKey)
    if (savedData != null) {
        localStorageData[eachKey] = JSON.parse(savedData)
    }
}

// 
// setup watchers for all localStorage items
// 
let watch = {}
for (let eachKey in localStorageData) {
    let fullKey = `${globalKey}.${eachKey}`
    watch[fullKey] = function(newValue, oldValue) {
        localStorage.setItem(eachKey, JSON.stringify(newValue))
    }
}

// 
// setup the calendar events
// 
let events = mockData.events.map(each=>Event(each))

// 
// Data
// 
let now = new DateTime()
let globalData = {
    ...localStorageData,
    currentEventIndex: null,
    events,
    lockedOntoEvent: false,
    cursorHour: now.timeOfDayAsSeconds/(60*60),
    currentTime: now.unix,
    weather: [
        // not sure how this data will be formatted, could be hourly
    ],
}

// 
// setup additional watchers
// 
watch = {
    ...watch,
    'global.currentEventIndex': function(newValue) {
        if (this.lockedOntoEvent) {
            this.global.cursorHour = this.currentEvent.startDateTime.timeOfDayAsSeconds/(60*60)
            console.log(`this.global.cursorHour is:`,this.global.cursorHour)
        }
    }
}

// 
// Computed
// 
let computed = {
    currentEvent() {
        if (this.$data.global.currentEventIndex != null) {
            return this.$data.global.events[this.$data.global.currentEventIndex]
        }
    },
    lockedOntoEvent() {
        // if event is the current event
        if (this.$data.global.currentEventIndex == null || this.global.currentEventIndex == this.getNextFutureEventIndex()) {
            return false
        // if on any other event, then the current event must be locked onto something
        } else {
            return true
        }
    }
}

// 
// Methods
// 
let methods = {
    getNextFutureEventIndex() {
        // compute the next event ignoring the date and only looking at 24 hour times
        let now = new DateTime().timeOfDayAsSeconds
        let indexOfNextEvent = this.$data.global.events.findIndex(eachEvent=>eachEvent.startDateTime && (eachEvent.startDateTime.timeOfDayAsSeconds > now))
        if (indexOfNextEvent == -1) {
            return null
        } else {
            return indexOfNextEvent
        }
    }
}

// 
// atttach data and watchers to vue
// 
Vue.mixin({
    data() {
        // make global data accessible on the window object
        window.globalData = globalData; setTimeout(()=>window.globalData=this.$data[globalKey], 0)
        window.data = this

        return { [globalKey]: globalData}
    },
    computed,
    watch,
    methods,
})