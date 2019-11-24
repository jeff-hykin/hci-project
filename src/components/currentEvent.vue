<template>
  <v-card style="width: 100%; height: 100%;">
    <v-card-title>
      {{events[selected]['title']}}
    </v-card-title>
    <v-list>
      <v-list-item v-for="task in events[selected]['tasks']" :key="task.title">
        <v-checkbox v-model="task.done"/>
        <v-list-item-content>
          <v-list-item-title v-text="task.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer/>
    <v-card-actions>
      <v-btn text @click="$emit('prev-event')">Previous</v-btn>
      <v-btn text @click="">View on Calendar</v-btn>
      <v-btn text @click="$emit('next-event')">Next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CurrentEvent',
  props: {
    events: Array,
    selected: Number
  },
  data: () => ({
  }),
};
</script>
