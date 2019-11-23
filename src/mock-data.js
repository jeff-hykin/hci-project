import DateTime from 'good-date'
window.DateTime = DateTime

export default {
    events: [
        // store events in sorted order by start time
        {
            name: "Event1",
            description: "Do some stuff",
            subTasks: [
                "do something beforehand",
            ],
            startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
            endDateTime:   new DateTime([2020,  1,  1,  1,  0,  0]),
            source: "School Calendar",
            location: [ 30.618634 /*latitude*/ , -96.324496 /*longitude*/ ],
        },
        {
            name: "Event2",
            description: "Do some more stuff",
            subTasks: [
                "do something beforehand",
            ],
            startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
            endDateTime: new DateTime([2020, 1, 1, 0, 0, 0]),
            source: "Work Calendar",
            location: [ 30.618634 /*latitude*/ , -96.324496 /*longitude*/ ],
        },
    ]
}