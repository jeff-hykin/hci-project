<template>
    <column>
        <!-- timer -->
        <h5></h5>
    </column>
</template>

<script>
let currentTime = ()=>new Date().getTime()/1000


export default {
    name: 'Main',
    data: ()=> ({
        time: null,
        calendarEvents: [],
    }),
    methods: {
        
    },
    mounted() {
        // start the loop
        // setInterval(()=>{
        //     // when there are calendarEvents
        //     if (this.calendarEvents.length) {
        //         let nextCalendarEvent = this.calendarEvents[0]
        //         if (nextCalendarEvent.dateTime && nextCalendarEvent.dateTime) {
        //         }
        //     }
        // },1000)
    },
}
</script>
<style scoped>

</style>
