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
        localStorageData[eachKey] = JSON.parse()
    }
}

// 
// setup watchers for all localStorage items
// 
let watchers = {}
for (let eachKey in localStorageData) {
    watchers[`${globalKey}.${eachKey}`] = function(newValue, oldValue) {
        localStorage.setItem(JSON.stringify(newValue))
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
    watchers,
})