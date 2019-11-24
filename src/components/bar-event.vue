<template>
    <row class='bar-event' align-h=left :backgroundColor=event.color :width='`calc(var(--fifteen-min-width) * ${event.numOfFifteenMinuteChunks} )`'>
        <container class=spacer width=2rem />
        <div class=ellipsis-overflow>
            {{event.title}}
        </div>
        <!-- On Hover tooltip -->
        <ui-tooltip animation="shift-away">
            {{ event.title }}
            <br>
            <row >  
                {{ event.startDateTime.time }}
                <container class=spacer width=2rem />
                {{ event.endDateTime.time }}
            </row>
        </ui-tooltip>
        <container class=spacer width=2rem />
    </row>
</template>

<script>
export default {
    props: ['event'],
}
</script>

<style lang='scss' scoped>
/* TODO: ellipses of text if too long */
.bar-event {
    color: white;
    padding: 1rem 0;
    height: 80%;
    border-radius: 0.3rem;
    max-width: 10rem;
    
    .spacer {
        flex-grow: 0;
        flex-shrink: 3;
    }
    
    .ellipsis-overflow {
        width: 100%;
        text-align: left;
        white-space: pre;
    }
}
</style>