<script>
import Vue from 'vue'
Vue.config.productionTip = false

import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
Vue.use(KeenUI)

import 'css-baseline/css/3.css'
import GoodVue from 'good-vue'
Vue.use(GoodVue)

import DateTime from 'good-date'

// 
// imported components
// 
import ToDo from './components/to-do'
let components = {
    'to-do': ToDo,
}

// 
// globally accessible data
// 
let globalDataDefaultValues = {
    events: [
        {
            name: "Event1",
            description: "Do some stuff",
            subTasks: [
                "do something beforehand",
            ],
            startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
            endDateTime: new DateTime([2020, 1, 1, 0, 0, 0]),
            source: "School Calendar",
            location: [ 30.618634 /*latitude*/ , -96.324496 /*longitude*/ ],
        },
    ],
    weather: [
        
    ],
}
Vue.mixin({
    data: ()=>({
        $global: globalDataDefaultValues
    })
})

// 
// helper functions
// 
let currentUnixTime = ()=>new Date().getTime()/1000
let padZero = (amount)=> {
    if (amount < 10) {
        return `0${amount}`
    } else {
        return amount
    }
}

// 
// App
// 
let App = {
    name: 'Main',
    components,
    data: ()=> ({
    }),
    computed: {
    },
    watch: {
    },
    methods: {
    },
    mounted() {
    },
}
// Since this is root, Load the app immediately after this file loads: setTimeout(0)
// find the '#app' div and replace it with this app
setTimeout(()=>(new (Vue.extend(App))).$mount('#app'),0)
export default App
</script>
<template>
    <column align-v=top :wrap=true>
        <h2>Test Title</h2>
    </column>
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
