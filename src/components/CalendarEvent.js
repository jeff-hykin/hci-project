class CalendarEvent {
    constructor({ title, date, time, repeatPattern }) {
        this.title = title
        this.time = time
        this.hour = time.split(':')[0]-0
        this.minute = time.split(':')[1]-0
        this.dateTime = new Date(date)
        // correct the timezone (because javascript is dumb)
        this.dateTime = new Date(this.dateTime.getTime() + Math.abs(this.dateTime.getTimezoneOffset()*60000))
        this.dateTime.setHours(this.hour, this.minute)
        this.repeatPattern = repeatPattern
    }
    unixTime() {
        return this.dateTime.getTime()/1000
    }
}

export default CalendarEvent