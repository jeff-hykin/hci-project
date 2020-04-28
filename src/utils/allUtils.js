export default {
    findMissing: (that, ...keysArray)=> {
        let missingValues = []
        for (const key of keysArray) {
            if (that[key] == null || (typeof that[key] == 'string' && that[key].length == 0)) {
                missingValues.push(key)
            }
        }
        return missingValues
    },
    // returns status 
    calcHandle: (that, objectOfFuncs) => {
        let missingValues = []
        for (const key in objectOfFuncs) {
            if (that[key] == null || (typeof that[key] == 'string' && that[key].length == 0)) {
                missingValues.push(key)
            }
        }
        if (missingValues.length == 0) {
            return "no missing value to solve for"
        } else if (missingValues.length > 1) {
            return `still missing: ${missingValues}`
        } else {
            let missingValue = missingValues[0]
            let output = objectOfFuncs[missingValue]()
            return `solved for ${missingValue} ${output}`
        }
    },
    volumeConvert(value) {
        let diffValue = value.match(/(.+?)\s*(tor|mmhg|p)/i)
        let actualValue
        let unit
        if (diffValue) {
            actualValue = diffValue[1]-0
            unit = diffValue[2]
            // conversion
            // TODO
        }
    },
}