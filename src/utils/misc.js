let currentUnixTime = () => new Date().getTime() / 1000
let padZero = amount => {
    if (amount < 10) {
        return `0${amount}`
    } else {
        return amount
    }
}