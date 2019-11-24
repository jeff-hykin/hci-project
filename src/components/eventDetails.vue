<template>
    <column class=card align-h=left align-v=top style="width: 100%; height: 100%;">
        <h3 v-if=!currentEvent>No Active Event</h3>
        <column v-if=currentEvent style="width: 100%; height: 100%;" align-v=top align-h=left>
            <!-- Title -->
            <h5 class=title>{{ currentEvent.title }}</h5>
            <!-- Description -->
            <p class='description'>{{ currentEvent.description }}</p>
            <!-- SubTasks -->
            <column class=subtasks align-h=left align-v=top>
                <ui-checkbox v-for="task in currentEvent.tasks" :key="task.title" v-model="task.done">{{task.title}}</ui-checkbox>
            </column>
            <div class=spacer></div>
            <div class=spacer></div>
            <!-- Buttons -->
            <row width=100% align-h=space-between>
                <v-btn text @click="$emit('prev-event')">Previous</v-btn>
                <v-btn text >View on Calendar</v-btn>
                <v-btn text @click="$emit('next-event')">Next</v-btn>
            </row>
        </column>
    </column>
</template>

<script>
export default {
    name: "currentEvent",
    props: {
        events: Array,
        selected: Number,
    },
    data: () => ({}),
}
</script>
<style scoped>
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
    overflow: scroll;
    margin-left: 2rem; 
}
.spacer {
    height: 1rem;
}
</style>