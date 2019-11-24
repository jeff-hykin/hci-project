import DateTime from "good-date"

// TODO: this is just for debugging
window.DateTime = DateTime

let events = [
    // store events in sorted order by start time
    {
        name: "Event1",
        description: "Do some stuff",
        subTasks: ["do something beforehand"],
        startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
        endDateTime: new DateTime([2020, 1, 1, 1, 0, 0]),
        source: "School Calendar",
        location: [30.618634 /*latitude*/, -96.324496 /*longitude*/],
    },
    {
        name: "Event2",
        description: "Do some more stuff",
        subTasks: ["do something beforehand"],
        startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
        endDateTime: new DateTime([2020, 1, 1, 0, 0, 0]),
        source: "Work Calendar",
        location: [30.618634 /*latitude*/, -96.324496 /*longitude*/],
    },
    {
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
]


// 
// auto generate missing data
// 
for (let eachIndex in events) {
    let genericEvent = {
        // jeffs data
        name: `Event${eachIndex}`,
        description: `do some stuff ${eachIndex}`,
        subTasks: [`do something beforehand ${eachIndex}`],
        startDateTime: new DateTime([2019, 11, 24, eachIndex, 30]),
        endDateTime: new DateTime([2020, 1, 1, eachIndex * 2, 0]),
        source: "School Calendar",
        location: [30.618634 + eachIndex /*latitude*/, -96.324496 /*longitude*/],
        // nickos data
        title: `CSCE 482 Exam ${eachIndex}`,
        sHour: eachIndex,
        sMinute: 0,
        eHour: eachIndex + 1,
        eMinute: 30,
        tag: `CSCE 482 ${eachIndex}`,
        position: { lat: 35.6432027 + eachIndex * 2, lng: -96.324496 },
        index: 0,
        tasks: [
            { title: "Study", done: false },
            { title: "Get scantron", done: true },
            { title: "sharpen pencil", done: false },
            { title: "cry", done: false },
        ],
    }
    // 
    // ensure that every event has something for Jeff's and nickos data
    // 
    events[eachIndex] = {  ...genericEvent, ...events[eachIndex], index: eachIndex }
}

export default {
    events
}
