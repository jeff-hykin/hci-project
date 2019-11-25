<template>
    <column class=card width=100% height=fit-content>
        <row class=card-body>
            <h3 v-if=this.currentEvent>{{countDown}}</h3>
        </row>
    </column>
</template>

<script>
import { padZero } from '../utils/misc'

export default {
    name: "countDown",
    computed:{
        countDown() {
            let eventSeconds = this.currentEvent.startDateTime.timeOfDayAsSeconds
            let currentSeconds = this.global.currentTime.timeOfDayAsSeconds
            console.log(`this.global.currentTime is:`,this.global.currentTime)
            console.log(`eventSeconds is:`,eventSeconds)
            console.log(`currentSeconds is:`,currentSeconds)
            console.log(`this.global.currentTime.unix - currentSeconds*1000 is:`,this.global.currentTime.unix - currentSeconds*1000)
            let miliseconds =  (this.global.currentTime.unix - currentSeconds*1000) + eventSeconds*1000 - this.global.currentTime.unix
            let negative = miliseconds < 0
            miliseconds = Math.abs(miliseconds)
            let hours   = Math.trunc(miliseconds/(1000*60*60))
            let minutes = Math.trunc(miliseconds/(1000*60) - hours*60)
            let seconds = Math.trunc(miliseconds/(1000)    - hours*60*60 - minutes*60)
            return `${negative?'-':''}${hours}:${padZero(minutes)}:${padZero(seconds)}`
        }
    }
}
</script>

<style>

</style>