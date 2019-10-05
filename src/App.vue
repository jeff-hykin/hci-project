<template>
    <column>
        <!-- timer -->
        <h5>{{timeUntil}}</h5>
        <input type="text" v-model="calendarEvent.title">
        <input type="date" v-model="calendarEvent.date">
        <input type="time" v-model="calendarEvent.time">
        <button @click="submitCalendarEvent">
            Submit
        </button>
    </column>
</template>

<script>
import CalendarEvent from './components/CalendarEvent'

let currentUnixTime = ()=>new Date().getTime()/1000


export default {
    name: 'Main',
    data: ()=> ({
        timeUntil: null,
        nextCalendarEventTime: null,
        calendarEvent: {
            time: null,
            date: null,
            title: null,
        },
        calendarEvents: [
        ],
    }),
    methods: {
        submitCalendarEvent() {
            let { time, date, title } = this.calendarEvent
            if (time && date) {
                this.calendarEvents.push(new CalendarEvent({
                    time, date, title
                }))
                console.log(`this.calendarEvents is:`,this.calendarEvents)
            }
        },
        timeUntilNextCaledarEvent() {
            if (this.nextCalendarEventTime) {
                return this.nextCalendarEventTime - currentUnixTime()
            } else {
                return -Infinity
            }
        },
        updateTime() {
            let timeUntil = this.timeUntilNextCaledarEvent()
            console.log(`timeUntil is:`,timeUntil)
            if (timeUntil > 0) {
                this.timeUntil = timeUntil
            } else {
                // if on the first event
                if (this.timeUntil == null && this.calendarEvents.length) {
                    this.nextCalendarEventTime = this.calendarEvents[0].unixTime()
                    
                // move on to the next event
                } else if (this.calendarEvents.length > 1) {
                    // remove the past event
                    this.calendarEvents.shift()
                    // schedule the next event
                    this.nextCalendarEventTime = this.calendarEvents[0].unixTime()
                    // immediately update the time again (kinda recursion)
                    this.updateTime()
                }
            }
        }
    },
    mounted() {
        // start update loop
        setInterval(this.updateTime,1000)
    },
}
</script>
<style scoped>

</style>
