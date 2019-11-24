<template>
    <column class='bar-event' :backgroundColor=event.color :width='`calc(var(--fifteen-min-width) * ${event.numOfFifteenMinuteChunks} )`'>
        {{event.name}}
    </column>
</template>

<script>
export default {
    props: ['event'],
}
</script>

<style scoped>
/* TODO: ellipses of text if too long */
.bar-event {
    color: white;
    padding: 1rem 2rem;
    height: 80%;
    border-radius: 0.3rem;
    max-width: 10rem;
}
</style>