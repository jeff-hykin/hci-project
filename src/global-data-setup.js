import Vue from 'vue'
import mockData from './mock-data'
import setupEventClass from "./utils/event-class"


let globalDataAccessor
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
// setup the events
// 
let Event = setupEventClass(()=>globalDataAccessor)
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
// atttach data and watchers to vue
// 
Vue.mixin({
    data() {
        globalDataAccessor = this
        return { [globalKey]: globalData}
    },
    watch,
})