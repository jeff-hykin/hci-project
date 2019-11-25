<template>
    <row class=bar-wrapper align-h=left>
        <column class=cursor align-v=bottom>
            <p class=triangle>▲</p>
        </column>
        <row class='magic-bar' align-h=left :left='`calc(calc(var(--one-hour-width) * -${global.cursorHour}) + var(--cursor-offset))`'>
            <column class=bar-event-container v-for='event of this.global.events' :key=event.index>
                <bar-event :event=event  />
            </column>
        </row>
    </row>
</template>

<script>
import BarEvent from './bar-event'
export default {
    name: "magic-bar"
    components: {
        'bar-event': BarEvent
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
        width: 3px;
        height: var(--magic-bar-height);
        z-index: 9999;
        box-shadow: var(--shadow-2);
        .triangle {
            position: relative;
            top: 0.90rem;
            left: -0.45px;
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