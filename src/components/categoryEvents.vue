<template>
  <v-card style="width: 100%; height: 100%;">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>{{tag}}</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="event in events" :key="event.title" @click="$emit('sel-event', event.index)">
        <v-list-item-content>
          <v-list-item-title v-text="event.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "CategoryEvents",
  props: {
    events: Array,
    tag: String
  },
  data: () => ({})
};
</script>
