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
            let miliseconds =  (this.global.currentTime.unix - currentSeconds*1000) + eventSeconds*1000 - this.global.currentTime.unix
            let negative = miliseconds < 0
            miliseconds = Math.abs(miliseconds)
            let hours   = Math.trunc(miliseconds/(1000*60*60))
            let minutes = Math.trunc(miliseconds/(1000*60) - hours*60)
            let seconds = Math.trunc(miliseconds/(1000)    - hours*60*60 - minutes*60)
            let output
            if (hours == 0) {
                output = `${negative?'-':''}${minutes}:${padZero(seconds)}`
            } else {
                output = `${negative?'-':''}${hours}:${padZero(minutes)}:${padZero(seconds)}`
            }
            // set the title of the page
            // document.title = output
            return output
        }
    }
}
</script>

<style>

</style>