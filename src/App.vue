<template>
  <v-app>
    <magicBar          style="top:  1%; left:  1%; height:  3%; width: 98%; position: absolute;" :events="events" :weather="weather"/>
    <eventMap          style="top:  5%; left:  1%; height: 59%; width: 69%; position: absolute;" :position="position"/>
    <currentEvent      style="top:  5%; left: 71%; height: 59%; width: 28%; position: absolute;" :events="nextEvents" :selected="selected"/>
    <categoryBreakdown style="top: 65%; left:  1%; height: 34%; width: 98%; position: absolute;" :events="events" v-on:sel-event="selEvent"/>
  </v-app>
</template>

<script>
import categoryBreakdown from './components/categoryBreakdown';
import currentEvent      from './components/currentEvent';
import eventMap          from './components/eventMap';
import magicBar          from './components/magicBar';

export default {
  name: 'App',

  components: {
    categoryBreakdown,
    currentEvent,
    eventMap,
    magicBar
  },
  methods: {
    selEvent(index) {
      this.selected = index
      console.log('set')
    }
  },
  data: () => ({
    events: [
      {
        title: "CSCE 482 Exam 3",
        sHour: 8,
        sMinute: 0,
        eHour: 9,
        eMinute: 30,
        tag: "CSCE 482",
        description: "This is the third test that will happen and will cover chapters 11, 12, 13, 14",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 0,
        tasks: [
          {title: 'Study', done: false},
          {title: 'Get scantron', done: true},
          {title: 'sharpen pencil', done: false},
          {title: 'cry', done: false}
        ]
      },
      {
        title: "ENG 111 Class",
        sHour: 9,
        sMinute: 50,
        eHour: 10,
        eMinute: 40,
        tag: "ENG 111",
        description: "Make sure to bring the legos",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 1,
        tasks: [
          {title: 'Pre class quiz', done: false},
          {title: 'Reading', done: true},
          {title: 'Remeber to Q drop', done: false},
          {title: 'leave college', done: false}
        ]
      },
      {
        title: "Lunch with Steve",
        sHour: 12,
        sMinute: 0,
        eHour: 13,
        eMinute: 0,
        tag: "Random",
        description: "Meeting at PIADA",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 2,
        tasks: [
          {title: 'Get the student discount', done: false},
        ]
      },
      {
        title: "CSCE 121 Class",
        sHour: 15,
        sMinute: 0,
        eHour: 15,
        eMinute: 50,
        tag: "CSCE 121",
        description: "Regular class",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 3,
        tasks: [
          {title: 'bring computer', done: false},
        ]
      },
      {
        title: "CSCE 121 HW4",
        sHour: 23,
        sMinute: 59,
        tag: "CSCE 121",
        description: "HW4 deadline, turn in on one of the eight turn in places",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 4,
        tasks: [
          {title: 'Complete task 3', done: false},
          {title: 'Turn in on Piazza', done: true},
          {title: 'Turn in on ECampus', done: true},
          {title: 'Turn in on Gradescope', done: true},
          {title: 'Turn in on Google class', done: true},
        ]
      },
      {
        title: "ENG 111 Project Check",
        sHour: 10,
        sMinute: 0,
        day: 1,
        tag: "ENG 111",
        description: "Need to demo labview code turned in",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 5,
        tasks: [
          {title: 'Delete project code', done: false},
        ]
      },
      {
        title: "Eng 111 Team Meeting",
        sHour: 10,
        sMinute: 30,
        day: 1,
        tag: "ENG 111",
        description: "Discussing what to do after turn in",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 6,
        tasks: [
          {title: 'Bring snacks', done: false},
        ]
      },
      {
        title: "Interview with Dell",
        sHour: 13,
        sMinute: 0,
        day: 1,
        tag: "Random",
        description: "Online at link in email",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 7,
        tasks: [
          {title: 'Sign up for position', done: false},
        ]
      },
      {
        title: "CSCE 121 Test",
        sHour: 14,
        sMinute: 30,
        day: 2,
        tag: "CSCE 121",
        description: "Covers data structures",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 8,
        tasks: [
          {title: 'Study', done: false},
          {title: 'Q drop', done: true},
        ]
      },
      {
        title: "CSCE 482 HW 3",
        sHour: 10,
        sMinute: 0,
        day: 3,
        tag: "CSCE 482",
        description: "HW 3 due",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 9,
        tasks: [
          {title: 'Turn in', done: false},
        ]
      },
      {
        title: "CSCE 482 HW 4",
        sHour: 10,
        sMinute: 0,
        day: 4,
        tag: "CSCE 482",
        description: "HW 4 due",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 10,
        tasks: [
          {title: 'Turn in', done: false},
        ]
      },
      {
        title: "Doctors Appointment",
        sHour: 10,
        sMinute: 0,
        day: 4,
        tag: "Random",
        description: "Didn't eat enough apples",
        position: {"lat":35.6432027,"lng":139.6729435},
        index: 11,
        tasks: [
          {title: 'Pick up shot records', done: false},
          {title: 'Get checked for extra-toe-itus', done: false},
        ]
      }
    ],
    weather: [],
    currentHour: 7,
    currentMinute: 30,
    selected: 0,
    position: {"lat":35.6432027,"lng":139.6729435}
  }),
  computed: {
    nextEvents: function () {
      var temp = [];
      for (var event in this.events){
        if (this.events[event].sHour > this.currentHour || (this.events[event].sHour == this.currentHour && this.events[event].sMinute >= thiscurrentMinute))
          temp.push(this.events[event]);
      }
      return temp
    }
  }
};
</script>
