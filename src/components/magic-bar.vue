<template>
    <div class=bar-wrapper>
        <row class='magic-bar' align-h=left :left='`calc(var(--one-hour-width) * -${global.cursorHour})`'>
            <column class=bar-event-container v-for='event of this.global.events' :key=event.index>
                <bar-event :event=event  />
            </column>
        </row>
    </div>
</template>

<script>
import BarEvent from './bar-event'
export default {
    components: {
        'bar-event': BarEvent
    },
    computed: {
    }
}
</script>

<style lang='scss' scoped>
.bar-wrapper {
    background: whitesmoke;
    height: 100%;
    
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