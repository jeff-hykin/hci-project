export default function setupEventClass(getGlobalDataAccessor) {
    // example data 
    //     {
    //         name: "Event1",
    //         description: "Do some stuff",
    //         subTasks: [
    //             "do something beforehand",
    //         ],
    //         startDateTime: new DateTime([2019, 12, 31, 23, 59, 59]),
    //         endDateTime: new DateTime([2020, 1, 1, 0, 0, 0]),
    //         source: "School Calendar",
    //         location: [ 30.618634 /*latitude*/ , -96.324496 /*longitude*/ ],
    //     },
    let globalDataAccessor
    let possibleEventColors = ['#2E93fA', '#546E7A', '#FF9800', '#C792EA', '#E91E63', '#89DDFF']
    let eventClassAttributes = {
        possibleEventColors,
        getColorFor: (source) => {
            if (!globalDataAccessor) {
                globalDataAccessor = getGlobalDataAccessor()
            }
            let theColorIndex = globalDataAccessor.global.eventCategoryColorMapping[source]
            let isANumber = (theColorIndex-0) > -1
            // if the source isn't in the mapping, then add it to the mapping
            if (!(isANumber && possibleEventColors[theColorIndex])) {
                let numberOfExisitngSources = Object.keys(globalDataAccessor.global.eventCategoryColorMapping).length
                theColorIndex = (numberOfExisitngSources+1 % possibleEventColors.length) - 1
                globalDataAccessor.global.eventCategoryColorMapping[source] = theColorIndex
            }
            // always return the color index
            return possibleEventColors[theColorIndex]
        }
    }
    let Event = function(input) {
        // add methods to the object without turning it into a real class
        // this allows Vue to track changes on the object
        Object.defineProperties(input, {
            color: {

                get() {
                    return Event.getColorFor(this.source)
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
            }
        })
        return input
    }
    // attach all the class attributes
    Object.assign(Event, eventClassAttributes)
    return Event
}