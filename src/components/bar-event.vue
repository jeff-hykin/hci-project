<template>
    <row 
        class='bar-event'
        align-h=left
        :backgroundColor=event.color
        :width='`calc(var(--fifteen-min-width) * ${event.numOfFifteenMinuteChunks} )`'
        :left='`calc(var(--one-hour-width) * ${numberOfHoursUntilStart} )`'
        @click="selectEvent"
        >
        <container class=spacer width=2rem />
        <div class=ellipsis-overflow>
            {{event.title}}
        </div>
        <!-- On Hover tooltip -->
        <ui-tooltip animation="shift-away">
            {{ event.title }}
            <br>
            <row >  
                {{ event.startDateTime.time }}
                <container class=spacer width=2rem />
                {{ event.endDateTime.time }}
            </row>
        </ui-tooltip>
        <container class=spacer width=2rem />
    </row>
</template>

<script>
export default {
    name: "bar-event",
    props: ['event'],
    computed: {
        numberOfHoursUntilStart() {
            let time = this.event.startDateTime
            let output = (time.hour24-0)+(time.minute/ 60)
            return output
        }
    },
    methods: {
        selectEvent() {
            this.global.currentEventIndex = this.event.index
        }
    }
}
</script>

<style lang='scss' scoped>
.bar-event {
    color: white;
    padding: 1rem 0;
    height: 80%;
    border-radius: 0.3rem;
    position: absolute;
    overflow: auto;
    border: 2px whitesmoke solid;
    
    .spacer {
        flex-grow: 0;
        flex-shrink: 3;
    }
    
    .ellipsis-overflow {
        width: 100%;
        text-align: left;
        white-space: pre;
    }
}
</style>