<template>
    <row class=bar-wrapper align-h=left>
        <column class=cursor align-v=bottom>
            <div class=circle ></div>
        </column>
        <row class='magic-bar' align-h=left :left='`calc(calc(var(--one-hour-width) * -${global.cursorHour}) + var(--cursor-offset))`'>
            <column class=bar-event-container v-for='event of this.global.events' :key=event.index>
                <bar-event :event=event  />
            </column>
            <weather-icon />
        </row>
    </row>
</template>

<script>
import BarEvent from './bar-event'
import WeatherIcon from './weather-icon'

export default {
    name: "magic-bar",
    components: {
        'bar-event': BarEvent,
        WeatherIcon,
    },
    computed: {
    }
}
</script>

<style lang='scss' scoped>
.bar-wrapper {
    --cursor-offset: 5vw;
    
    background: whitesmoke;
    height: 100%;
    
    .cursor {
        color: red;
        background-color: red;
        position: fixed;
        left: calc(1 * var(--cursor-offset));
        top: 0;
        width: 4px;
        height: calc(var(--magic-bar-height) * 1.2);
        z-index: 9999;
        box-shadow: var(--shadow-2);
        .circle {
            --size: 15px;
            height: var(--size);
            width: var(--size);
            background-color: inherit;
            box-shadow: inherit;
            border-radius: 100vw;
        }
    }
    
    .magic-bar {
        height: 100%;
        width: calc(var(--one-hour-width) * 48);
        min-width: 200vw;
        position: relative;
        background: whitesmoke;
        min-height: 2rem;
        left: calc(var(--one-hour-width) * 48);
        transition: all 1000ms ease;
        
        
        .bar-event-container {
            margin-left: 5px;
            height: 100%;
        }
    }
}
</style>