<template>
    <row class='magic-bar' align-h=left>
        <column class=bar-event-container v-for='event of this.global.events'>
            <bar-event :event=event  />
        </column>
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
.magic-bar {
    height: 100%;
    width: 200vw;
    position: relative;
    background: whitesmoke;
}
.bar-event-container {
    margin-left: 5px;
    height: 100%;
}
</style>