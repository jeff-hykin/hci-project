<script>
import Vue from 'vue'
Vue.config.productionTip = false

import 'css-baseline/css/4.css'
import GoodVue from 'good-vue'
Vue.use(GoodVue)

import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
Vue.use(KeenUI)

import DateTime from 'good-date'

// 
// imported components
// 
import ToDo from './components/to-do'
import MagicBar from './components/magic-bar'
let components = {
    'to-do': ToDo,
    'magic-bar': MagicBar,
}

// 
// globally accessible data
// 
import setupGlobalData from './global-data-setup'
setupGlobalData(Vue)

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
        dummyMethodThatAcessesGlobalData() {
            let firstEvent = this.global.events[0]
        }
    },
    mounted() {
        // for debugging
        window.data = this.global
    },
}
// Since this is root, Load the app immediately after this file loads: setTimeout(0)
// find the '#app' div and replace it with this app
setTimeout(()=>(new (Vue.extend(App))).$mount('#app'),0)
export default App
</script>
<template>
    <column id=app align-v=top align-h=left>
        <magic-bar />
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
