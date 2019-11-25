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
            let miliseconds = this.currentEvent.startDateTime.unix - this.global.currentTime
            let negative = miliseconds < 0
            miliseconds = Math.abs(miliseconds)
            let hours   = Math.trunc(miliseconds/(1000*60*60))
            let minutes = Math.trunc(miliseconds/(1000*60) - hours*60)
            let seconds = Math.trunc(miliseconds/(1000)    - hours*60*60 - minutes*60)
            console.log(`hours is:`,hours)
            console.log(`minutes is:`,minutes)
            console.log(`seconds is:`,seconds)
            return `${negative?'-':''}${hours}:${padZero(minutes)}:${padZero(seconds)}`
        }
    }
}
</script>

<style>

</style>