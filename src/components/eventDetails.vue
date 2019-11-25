<template>
    <container class=card>
        <h3 v-if=!currentEvent>No Active Event</h3>
        <column v-if=currentEvent style="width: 100%; height: 100%;" align-v=top align-h=left>
            <!-- Title -->
            <h5 class=title>{{ currentEvent.title }}</h5>
            <!-- Description -->
            <p class='description'>{{ currentEvent.description }}</p>
            <!-- SubTasks -->
            <container class=subtasks width=100%>
                <ui-checkbox v-for="task in currentEvent.tasks" :key="task.title" v-model="task.done">{{task.title}}</ui-checkbox>
            </container>
            <div class=spacer></div>
            <div class=spacer></div>
            <!-- Buttons -->
            <row v-if=currentEvent.url width=100% align-h=space-between>
                <!-- Open in Calendar -->
                <v-btn :class="['calendarButton']" text >
                    View on Calendar
                </v-btn>
            </row>
            <row width=100% align-h=space-between>
                <!-- Previous -->
                <v-btn :class="['button', {hidden:hidePreviousEventButton}]" text @click="prevEvent">
                    Prev
                </v-btn>
                <!-- Next -->
                <v-btn :class="['button', {hidden:hideNextEventButton}]" text @click="nextEvent">
                    Next
                </v-btn>
            </row>
        </column>
    </container>
</template>

<script>
export default {
    name: "eventDetails",
    computed: {
        hideNextEventButton() {
            return !this.global.events[this.global.currentEventIndex+1]
        },
        hidePreviousEventButton() {
            return !this.global.events[this.global.currentEventIndex-1]
        }
    },
    methods: {
        nextEvent() {
            this.global.currentEventIndex += 1
        },
        prevEvent() {
            this.global.currentEventIndex -= 1
        }
    }
}
</script>
<style lang='scss' scoped>
.card {
    width: 100%;
    height: 35rem;
    padding: 2rem;
    background: white;
    
    .title {
        height: 1em;
        max-width: 100%;
        margin-bottom: 1rem;
    }
    .description {
        height: 4em;
        margin-bottom: 1rem;
        overflow: auto;
    }
    .subtasks {
        height: 40%;
        overflow: auto;
        padding-left: 2rem; 
    }
    .spacer {
        height: 1rem;
    }
    .button {
        background: gray;
        color: white;
    }
}
</style>