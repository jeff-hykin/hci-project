<template>
    <row align-h=space-between align-v=top :wrap=true>
        <!-- spacing -->
        <!-- <column margin=2rem>
        </column> -->
        
        <!-- timer area -->
        <column margin=2rem>
            <row class='card no-word-wrap' color=gray>
                <h3 style='width: max-content'>{{calendarEventName}}</h3>
            </row>
            <row>
                <h1 v-if="daysUntil">{{daysUntil}}:</h1>
                <h1 v-if="hoursUntil">{{hoursUntil}}:</h1>
                <h1 v-if="minutesUntil">{{minutesUntil}}:</h1>
                <h1>{{secondsUntil}}</h1>
            </row>
        </column>
        <!-- Events -->
        <column class=event-container>
            <!-- <column class=card>
                <md-datepicker v-model="selectedDate" md-immediately />
                <row class=card-row>
                    <h5>Title</h5>
                    <input type="text" v-model="calendarEvent.title">
                </row>
                <row class=card-row>
                    <h5>Date</h5>
                    <input type="date" v-model="calendarEvent.date">
                </row>
                <row class=card-row>
                    <h5>Time</h5>
                    <input type="time" v-model="calendarEvent.time">
                </row>
                <button @click="submitCalendarEvent">
                    Submit
                </button>
            </column> -->
            <row height=2rem />
            <to-do @taskChange='updateCalendarEvents' />
        </column>
    </row>
</template>

<script>
import ToDo from './components/ToDo'

let currentUnixTime = ()=>new Date().getTime()/1000
let padZero = (amount)=> {
    if (amount < 10) {
        return `0${amount}`
    } else {
        return amount
    }
}
export default {
    name: 'Main',
    components: {
        ToDo,
    },
    data: ()=> ({
        timeUntil: null,
        calendarEventName: null,
        nextCalendarEventTime: null,
        calendarEvent: {
            time: null,
            date: null,
            title: null,
        },
        calendarEvents: [
        ],
    }),
    computed: {
        secondsUntil() {
            return padZero(Math.floor(this.timeUntil % 60))
        },
        minutesUntil() {
            return padZero(Math.floor((this.timeUntil/60) % 60))
        },
        hoursUntil() {
            return Math.floor((this.timeUntil/3600) % 24)
        },
        daysUntil() {
            return Math.floor((this.timeUntil/86400))
        },
        countdown() {
            let time = this.secondsUntil
            if (this.minutesUntil) {
                time = `${this.minutesUntil}:${time}`
            }
            if (this.hoursUntil) {
                time = `${this.hoursUntil}:${time}`
            }
            if (this.daysUntil) {
                time = `${this.daysUntil}:${time}`
            }
            return time
        }
    },
    watch: {
        timeUntil() {
            document.title = this.countdown
        }
    },
    methods: {
        timeUntilNextCaledarEvent() {
            if (this.nextCalendarEventTime) {
                return this.nextCalendarEventTime - currentUnixTime()
            } else {
                return -Infinity
            }
        },
        updateCalendarEvents(tasks) {
            // erase the calendar events
            this.calendarEvents = []
            for (let each of tasks) {
                this.calendarEvents.push({ unixTime: each.dateTime.getTime()/1000, title: each.content })
            }
            // reset the time
            this.nextCalendarEventTime = null
            this.timeUntil = null
            this.updateTime()
        },
        updateTime() {
            let timeUntil = this.timeUntilNextCaledarEvent()
            if (timeUntil > 0) {
                this.timeUntil = timeUntil
            } else {
                // if no more events
                if (!this.calendarEvents.length) {
                    this.timeUntil = 0
                // if there are calendarEvents 
                } else if (this.calendarEvents.length) {
                    // if not on the first event
                    if (this.timeUntil != null) {
                        // remove the event that was just completed
                        this.calendarEvents.shift()
                    }
                    // schedule the next event
                    if (this.calendarEvents[0]) {
                        this.nextCalendarEventTime = this.calendarEvents[0].unixTime
                        this.calendarEventName = this.calendarEvents[0].title
                        // immediately update the time again (kinda recursion)
                        this.updateTime()
                    } else {
                        this.timeUntil = 0
                    }
                }                
            }
        }
    },
    mounted() {
        // start update loop
        setInterval(this.updateTime,1000)
        console.log(`here2`)
    },
}
</script>
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
