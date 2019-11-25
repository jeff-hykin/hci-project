let possibleEventColors = ['#2E93fA', '#546E7A', '#FF9800', '#C792EA', '#E91E63', '#89DDFF']
let eventClassAttributes = {

    possibleEventColors,
    // create a method for getting the color of an event
    getColorFor: (source) => {
        let theColorIndex = globalData.eventCategoryColorMapping[source]
        let isANumber = (theColorIndex-0) > -1
        // if the source isn't in the mapping, then add it to the mapping
        if (!(isANumber && possibleEventColors[theColorIndex])) {
            let numberOfExisitngSources = Object.keys(globalData.eventCategoryColorMapping).length
            theColorIndex = (numberOfExisitngSources % (possibleEventColors.length-1))
            globalData.eventCategoryColorMapping[source] = theColorIndex
        }
        // always return the color index
        return possibleEventColors[theColorIndex]
    }
}


// input is expected to have:
//     {
//         startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
//         endDateTime: new DateTime([2020, 1, 1, 0, 0, 0]),
//         source: "School Calendar",
//     },
let Event = function(input) {
    // add methods to the object without turning it into a real class
    // this allows Vue to track changes on the object
    Object.defineProperties(input, {
        color: {

            get() {
                return Event.getColorFor(this.source)
            }
        },
        durationInSeconds: {
            get() {
                return (this.startDateTime.unix - this.endDateTime.unix)/1000
            }
        },
        numOfFifteenMinuteChunks: {
            get() {
                let start = this.startDateTime.unix/1000;
                let end = this.endDateTime.unix/1000;
                let durationInSeconds = Math.abs(end-start);
                let numberOfSecsIn15Minutes = 15 * 60;
                // always round up, no 0-duration events 
                return Math.trunc((durationInSeconds-0.01) / numberOfSecsIn15Minutes) + 1
            }
        },
        startsInFuture: {
            get() {
                return (new DateTime().timeOfDayAsSeconds) < this.startDateTime.timeOfDayAsSeconds
            }
        },
        info: {
            get() {
                return `title: "${this.title}"\nfrom: ${this.startDateTime.toString()}     to: ${this.startDateTime.toString()}\nsource: ${this.source}\ndurationSec: ${this.durationInSeconds}\nstartsInFuture: ${this.startsInFuture}`
            }
        }
    })
    return input
}
// attach all the class attributes
Object.assign(Event, eventClassAttributes)

export default Event