<template>
  <v-card style="width: 100%; height: 100%;">
    <v-card-title>
      {{events[selected]['title']}}
    </v-card-title>
    <v-list>
      <v-list-item v-for="task in events[selected]['tasks']" :key="task.title" @click="">
        <v-checkbox v-model="task.done"/>
        <v-list-item-content>
          <v-list-item-title v-text="task.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
