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
let globalData = {
    ...localStorageData,
    currentEventIndex: null,
    events,
    weather: [
        // not sure how this data will be formatted, could be hourly
    ],
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
}

// 
// Methods
// 
let methods = {
    getNextFutureEvent() {
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

        return { [globalKey]: globalData}
    },
    computed,
    watch,
    methods,
})