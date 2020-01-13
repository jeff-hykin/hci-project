import DateTime from "good-date"


// hack into the current time to be whatever time of day we want
window.now = (...dateTimeArgs)=>{
    let actualTime = new DateTime(...dateTimeArgs)
    let twoHoursInMiliseconds = 7.2e+6 // 2 * 60 *60 * 1000 
    actualTime.time = `${actualTime.hour24 - 5}:${actualTime.minute}:${actualTime.second}`
    return actualTime
}

window.DateTime = DateTime

let events = [
    // store events in sorted order by start time
    {
        title: "Friendsgiving!",
        description: "Party at Nicko's",
        tasks: [{ title: "Make coconut cream pie", done: false }],
        position: { lat: 30.608256, lng: -96.324508 },
        startDateTime:  new DateTime([2019, 11, 24, 20, 45]),
        endDateTime:    new DateTime([2019, 11, 24, 22, 30]),
        source: "Friends Calendar"
    },
    {
        title: "Office Hours",
        description: "Help students with their homework",
        tasks: [{ title: "Read the lecture slides", done: true }],
        startDateTime:  new DateTime([2019, 11, 24, 12, 30]),
        endDateTime:    new DateTime([2019, 11, 24, 14, 0]),
        position: { lat: 30.62119, lng: -96.340342 },
        source: "Work Calendar"
    },
    {
        startDateTime:  new DateTime([2019, 11, 24, 15, 0]),
        endDateTime:    new DateTime([2019, 11, 24, 16, 0]),
        title: "CSCE 436 Lecture",
        description: "Poster presentation day",
        position: { lat: 30.62119, lng: -96.340342 },
        index: 0,
        tasks: [
            { title: "Finish code", done: false },
            { title: "Finish presentation", done: false },
            { title: "Cry", done: true }
        ],
        source: "School Calendar"
    },
    {
        title: "Interview with Dell",
        day: 1,
        source: "Appointments",
        description: "Dress is business casual",
        position: { lat: 30.612498, lng: -96.339338 },
        startDateTime:  new DateTime([2019, 11, 24,  7+12,  0]),
        endDateTime:      new DateTime([2019, 11, 24,  8+12, 30]),
        index: 5,
        tasks: [
            { title: "Apply on Hireaggies", done: true },
            { title: "Print resume", done: false }
        ]
    },
    {
        title: "Dinner with Jeff Bezos",
        source: "Appointments",
        description: "Meeting at PIADA",
        position: { lat: 30.624192, lng: -96.339576 },
        startDateTime:  new DateTime([2019, 11, 24, 16, 30]),
        endDateTime:      new DateTime([2019, 11, 24, 18, 0]),
        index: 2,
        tasks: [{ title: "Ask for a gift card", done: true }]
    },
    {
        title: "CSCE 482 Essay",
        day: 4,
        description: "Turn in by 8am on ecampus",
        // position: { lat: 35.6432027, lng: 139.6729435 },
        index: 7,
        tasks: [{ title: "Turn in", done: true }],
        source: "School Calendar"
    },
    {
        title: "Doctors Meeting",
        day: 4,
        source: "Random",
        description: "Didn't eat enough apples",
        position: { lat: 30.638748, lng: -96.311661 },
        index: 8,
        tasks: [
            { title: "Pick up shot records", done: true },
            { title: "Get checked for extra-toe-itus", done: true }
        ]
    }
]

//
// auto generate missing data
//
for (let eachIndex in events) {
    // convert it to a number from a string
    eachIndex -= 0
    let genericEvent = {
        // finialized data
        title: `CSCE 482 Exam ${eachIndex}`,
        description: `do some stuff ${eachIndex}`,
        startDateTime:  new DateTime([2019, 11, 24, eachIndex, 0]),
        endDateTime:    new DateTime([2019, 11, 24, (eachIndex + 1) % 24, 0]),
        position: { lat: 35.6432027 + eachIndex * 2, lng: -96.324496 },
        tasks: [
            // { title: "Study", done: false },
            // { title: "Get scantron", done: true },
            // { title: "sharpen pencil", done: false },
            // { title: "cry", done: false }
        ],
        index: 0,
        // jeffs data
        source: events[eachIndex].source || events[eachIndex].tag || "Random"
        // nickos data
        // tag: `CSCE 482 ${eachIndex}`
    }
    //
    // ensure that every event has something for Jeff's and nickos data
    //
    events[eachIndex] = { ...genericEvent, ...events[eachIndex] }
}

events = events.sort((each1, each2) => {
    each1 = each1.startDateTime.timeOfDayAsSeconds
    each2 = each2.startDateTime.timeOfDayAsSeconds
    if (each1 < each2) {
        return -1
    }
    if (each1 > each2) {
        return 1
    }
    return 0
})

// update the indexes after sorting
for (let each in events) {
    events[each].index = each
}

export default {
    events
}
