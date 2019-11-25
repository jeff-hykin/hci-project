import DateTime from "good-date"

// TODO: this is just for debugging
window.DateTime = DateTime

let events = [
    // store events in sorted order by start time
    {
        name: "Event1",
        description: "Do some stuff",
        subTasks: ["do something beforehand"],
        startDateTime: new DateTime([2019, 11, 24, 18, 30]),
        endDateTime:   new DateTime([2019, 11, 24, 19, 30]),
        source: "School Calendar",
    },
    {
        name: "Event1",
        description: "Do some stuff",
        subTasks: ["do something beforehand"],
        startDateTime: new DateTime([2019, 11, 24, 20, 30]),
        endDateTime:   new DateTime([2019, 11, 24, 22,  0]),
        source: "School Calendar",
    },
    {
        name: "Event2",
        description: "Do some more stuff",
        subTasks: ["do something beforehand"],
        startDateTime: new DateTime([2019, 11, 24, 2, 30]),
        endDateTime:   new DateTime([2019, 11, 24, 3,  0]),
        source: "Work Calendar",
    },
    {
        startDateTime: new DateTime([2019, 11, 24, 3, 30]),
        endDateTime:   new DateTime([2019, 11, 24, 4,  0]),
        title: "CSCE 482 Exam 3",
        sHour: 8,
        sMinute: 0,
        eHour: 9,
        eMinute: 30,
        tag: "CSCE 482",
        description: "This is the third test that will happen and will cover chapters 11, 12, 13, 14",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 0,
        tasks: [
            { title: "Study", done: false },
            { title: "Get scantron", done: true },
            { title: "sharpen pencil", done: false },
            { title: "cry", done: false },
        ],
    },
    {
        title: "ENG 111 Class",
        sHour: 9,
        sMinute: 50,
        eHour: 10,
        eMinute: 40,
        tag: "ENG 111",
        description: "Make sure to bring the legos",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 1,
        tasks: [
            { title: "Pre class quiz", done: false },
            { title: "Reading", done: true },
            { title: "Remeber to Q drop", done: false },
            { title: "leave college", done: false },
        ],
    },
    {
        title: "Lunch with Steve",
        sHour: 12,
        sMinute: 0,
        eHour: 13,
        eMinute: 0,
        tag: "Random",
        description: "Meeting at PIADA",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 2,
        tasks: [{ title: "Get the student discount", done: false }],
    },
    {
        title: "ENG 111 Project Check",
        sHour: 10,
        sMinute: 0,
        day: 1,
        tag: "ENG 111",
        description: "Need to demo labview code turned in",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 3,
        tasks: [{ title: "Delete project code", done: false }],
    },
    {
        title: "Eng 111 Team Meeting",
        sHour: 10,
        sMinute: 30,
        day: 1,
        tag: "ENG 111",
        description: "Discussing what to do after turn in",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 4,
        tasks: [{ title: "Bring snacks", done: false }],
    },
    {
        title: "Interview with Dell",
        sHour: 13,
        sMinute: 0,
        day: 1,
        tag: "Random",
        description: "Online at link in email",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 5,
        tasks: [{ title: "Sign up for position", done: false }],
    },
    {
        title: "CSCE 482 HW 3",
        sHour: 10,
        sMinute: 0,
        day: 3,
        tag: "CSCE 482",
        description: "HW 3 due",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 6,
        tasks: [{ title: "Turn in", done: false }],
    },
    {
        title: "CSCE 482 HW 4",
        sHour: 10,
        sMinute: 0,
        day: 4,
        tag: "CSCE 482",
        description: "HW 4 due",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 7,
        tasks: [{ title: "Turn in", done: false }],
    },
    {
        title: "Doctors Appointment",
        sHour: 10,
        sMinute: 0,
        day: 4,
        tag: "Random",
        description: "Didn't eat enough apples",
        position: { lat: 35.6432027, lng: 139.6729435 },
        index: 8,
        tasks: [
            { title: "Pick up shot records", done: false },
            { title: "Get checked for extra-toe-itus", done: false },
        ],
    },
    {

    }
]


// 
// auto generate missing data
// 
for (let eachIndex in events) {
    // convert it to a number from a string
    eachIndex-=0
    let genericEvent = {
        // finialized data
        description: `do some stuff ${eachIndex}`,
        startDateTime: new DateTime([2019, 11, 24, eachIndex          , 30]),
        endDateTime:   new DateTime([2019, 11, 24, (eachIndex**1.2)%24,  0]),
        position: { lat: 35.6432027 + eachIndex * 2, lng: -96.324496 },
        tasks: [
            { title: "Study", done: false },
            { title: "Get scantron", done: true },
            { title: "sharpen pencil", done: false },
            { title: "cry", done: false },
        ],
        // jeffs data
        subTasks: [`do something beforehand ${eachIndex}`],
        source: events[eachIndex].tag || "School Calendar",
        // nickos data
        title: `CSCE 482 Exam ${eachIndex}`,
        sHour: eachIndex,
        sMinute: 0,
        eHour: eachIndex + 1,
        eMinute: 30,
        tag: `CSCE 482 ${eachIndex}`,
        index: 0,
    }
    // 
    // ensure that every event has something for Jeff's and nickos data
    // 
    events[eachIndex] = {  ...genericEvent, ...events[eachIndex]}
}

events = events.sort((each1, each2)=>{
    each1 = each1.startDateTime.timeOfDayAsSeconds
    each2 = each2.startDateTime.timeOfDayAsSeconds
    if (each1 < each2) {
        return -1;
    }
    if (each1 > each2) {
        return 1;
    }
    return 0;
})

// update the indexes after sorting
for (let each in events) {
    events[each].index = each
}

export default {
    events
}
