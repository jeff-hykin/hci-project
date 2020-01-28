<template>
    <div>
        <ui-textbox
                ref='textbox'
                floating-label
                label="Your todo's "
                placeholder="(mm/dd/yyyy hh:mm I need to start typing)"
                :multi-line="true"
                v-model="text"
                style="font-size: 14pt !important; width: 25rem;"
                :rows=5
                class="todo-textbox"
                :autosize="true"
            />
        <column v-for="each in reocurringTasks" v-bind:key='each&&Math.random()' class=card align-h=left padding=1.2rem margin-top=1rem  width=-webkit-fill-available>
            <row >
                <b>{{each.start}}</b> <div style="width: 0.8rem" ></div> {{each.description}}
            </row >
            <row >
                <b>Days:</b><div style="width: 0.8rem" ></div> {{each.days.join(", ")}}
            </row>
        </column>    
    </div>
</template>

<script>
const convertTime12to24 = (hours, minutes, pmOrAm) => {
    if (hours == "12") {
        hours = "00"
    }
    if (pmOrAm.match(/[pP][mM]/)) {
        hours = parseInt(hours, 10) + 12
    }
    return [hours, minutes]
}
import DateTime from 'good-date'


export default {
    data: ()=>({
        text: "",
        tasks: [],
        reocurringTasks: [
            {
                description: "Chem",
                start: "9:10am",
                days: [ "Monday", "Wednesday", "Friday" ],
            },
            {
                description: "Capstone",
                start: "11:15am",
                days: [ "Monday", "Wednesday", ],
            },
            {
                description: "Geo Lab",
                start: "5:45pm",
                days: [ "Monday" ],
            },
            {
                description: "Geo",
                start: "2:20pm",
                days: [ "Tuesday", "Thursday" ],
            },
            {
                description: "Chem Lab",
                start: "6:30pm",
                days: [ "Tuesday",],
            },
            {
                description: "Kine",
                start: "9:30pm",
                days: [ "Thursday",],
            },
        ],
    }),
    methods: {
        generateReocurringTasks() {
            let now = new DateTime
            let todayName = now.dayName
            let tomorrowName = now.add({days: 1}).dayName
            
            let activeTasks = []
            for (let each of this.reocurringTasks) {
                // add to today
                if (each.days.includes(todayName)) {
                    let eventDateTime = new DateTime()
                    eventDateTime.time = each.start
                    activeTasks.push({
                        dateTime: eventDateTime,
                        date: eventDateTime.date,
                        hour: eventDateTime.hour24,
                        minute: eventDateTime.minute,
                        content: each.description,
                    })
                }
                // add to tomorrow
                if (each.days.includes(tomorrowName)) {
                    let eventDateTime = new DateTime().add({days: 1})
                    eventDateTime.time = each.start
                    activeTasks.push({
                        dateTime: eventDateTime,
                        date: eventDateTime.date,
                        hour: eventDateTime.hour24,
                        minute: eventDateTime.minute,
                        content: each.description,
                    })
                }
            }
            return activeTasks
        },
        
        parseUpcomingTodos(text, timezoneReference=(new Date())) {
            let todos = []
            if (text) {
                let lines = text.split(/\n(?=\S)/)
                for (let each of lines) {
                    let match = each.match(/(?:(\d+\/\d+\/\d+) )?(\d{1,2}):(\d{1,2})([aA][mM]|[pP][mM]) ([\s\S]*)/)
                    if (match) {
                        let hour = match[2]-0
                        let minute = match[3]-0
                        let pmOrAm = match[4]
                        let time = convertTime12to24(hour, minute, pmOrAm)
                        let dateTime = new Date()
                        if (match[1] != null) {
                            dateTime = new Date((new Date(match[1])).getTime() + Math.abs(timezoneReference.getTimezoneOffset()*60000))
                        }
                        dateTime.setHours(time[0], time[1])
                        if (match[1] == null) {
                            if (dateTime.getTime() <= (new Date()).getTime()) {
                                let oneDayInMiliseconds = 24*60*60*1000
                                dateTime = new Date(dateTime.getTime()+oneDayInMiliseconds)
                            }
                        }
                        // if it is a future event
                        if (dateTime.getTime() > (new Date()).getTime()) {
                            todos.push({
                                dateTime,
                                date: match[1],
                                hour,
                                minute,
                                content: match[5],
                            })
                        }
                    }
                }
            }
            todos = todos.sort((a,b)=>a.dateTime.getTime() - b.dateTime.getTime())
            return todos
        },
        
        generateOrderedTasks() {
            let unsortedTasks = this.parseUpcomingTodos(this.text).concat(this.generateReocurringTasks())
            let now = new Date().getTime()
            let byTime = (a,b)=>a.dateTime.getTime()-b.dateTime.getTime()
            let isInTheFuture = each=>(each.dateTime.getTime()-now)>0
            let sortedTasks = ([...unsortedTasks]).filter(isInTheFuture).sort(byTime)
            return this.tasks = sortedTasks
        }
    },
    watch: {
        text() {
            window.tasks = this.generateOrderedTasks()
            console.log(`window.tasks is:`,this.tasks)
            localStorage.setItem('todos',this.text)
        },
        tasks() {
            this.$emit('taskChange', this.tasks)
        }
    },
    mounted() {
        let todos = localStorage.getItem('todos')
        if (todos) {
            this.text = todos
            this.tasks = this.parseUpcomingTodos(this.text)
        }
        // force the component to update its size
        setTimeout(this.$refs.textbox.refreshSize, 0)
    }
}
</script>

<style>
.todo-textbox * {
    font-size: 14pt !important;
}
</style>