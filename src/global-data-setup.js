import Vue from 'vue'
import mockData from './mock-data'
import Event from "./utils/event-class"

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
// define globalData
// 
let globalData = {
    ...localStorageData,
    selected: null,
    events,
    weather: [
        // not sure how this data will be formatted, could be hourly
    ],
}

// 
// define computed global properties
// 


// 
// atttach data and watchers to vue
// 
Vue.mixin({
    data() {        
        // make global data accessible on the window object
        window.globalData = globalData; setTimeout(()=>window.globalData=this.$data[globalKey], 0)

        return { [globalKey]: globalData}
    },
    watch,
})