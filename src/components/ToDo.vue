<template>
     <ui-textbox
            ref='textbox'
            floating-label
            label="Your todo's "
            placeholder="(mm/dd/yyyy hh:mm I need to start typing)"
            :multi-line="true"
            :maxlength="256"
            v-model="text"
            style="font-size: 14pt !important; width: 25rem;"
            class="todo-textbox"
            :autosize="true"
        />
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


export default {
    data: ()=>({
        text: "",
        tasks: [],
    }),
    methods: {
        parseUpcomingTodos(text, timezoneReference=(new Date())) {
            console.log(`text is:`,text)
            let todos = []
            if (text) {
                let lines = text.split(/\n(?=\S)/)
                for (let each of lines) {
                    let match = each.match(/(\d+\/\d+\/\d+) (\d{1,2}):(\d{1,2})([aA][mM]|[pP][mM]) ([\s\S]*)/)
                    if (match) {
                        let hour = match[2]-0
                        let minute = match[3]-0
                        let pmOrAm = match[4]
                        let time = convertTime12to24(hour, minute, pmOrAm)
                        let dateTime = new Date((new Date(match[1])).getTime() + Math.abs(timezoneReference.getTimezoneOffset()*60000))
                        dateTime.setHours(time[0], time[1])
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
            console.log(`todos is:`,todos)
            return todos
        }
    },
    watch: {
        text() {
            this.tasks = this.parseUpcomingTodos(this.text)
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