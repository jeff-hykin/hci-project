<template>
    <row class='magic-bar' align-h=left>
        <div class=bar-event-container v-for='event of this.global.events'>
            <bar-event :event=event  />
        </div>
    </row>
</template>

<script>
import BarEvent from './bar-event'
export default {
    components: {
        'bar-event': BarEvent
    }
}
</script>

<style scoped>
>>> {
    --magic-bar-event-height: 10vh;
    /* 12 hour view */
    --one-hour-width: calc(100vw / 12);
    --fifteen-min-width: calc(var(--one-hour-width) / 4)
}
.magic-bar {
    width: 200vw;
    position: relative;
    height: var(--magic-bar-event-height);
    background: whitesmoke;
}
.bar-event-container {
    margin-left: 5px;
}
</style>