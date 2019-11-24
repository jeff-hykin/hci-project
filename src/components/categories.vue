<template>
    <container class=legend flex-wrap=wrap flex-direction=row>
        <row class=category-legend-element align-h=left v-for='category in categories' :key="category">
            <container class=color-square :backgroundColor='getColorFor(category)' />
            <p class='category-name ellipsis-overflow'>{{category}}</p>
        </row>
    </container>  
</template>

<script>
import Event from '../utils/event-class'

export default {
    computed: {
        categories() {
            console.log(`globalData.eventCategoryColorMapping is:`,globalData.eventCategoryColorMapping)
            return Object.keys(globalData.eventCategoryColorMapping)
        }
    },
    methods: {
        getColorFor(category) {
            return Event.getColorFor(category)
        }
    }
}
</script>

<style lang='scss' scoped>
.legend {
    --legend-element-width: 12rem;
    
    height: 100%;
    width: calc(2 * var(--legend-element-width));
    
    .category-legend-element {
        width: var(--legend-element-width);
        
        .color-square {
            --square-size: 25px;
            height: var(--square-size);
            width:  var(--square-size);
            margin: 20px;
        }
        
        .category-name {
            // width: calc(var(--width) );
        }
    }
}
</style>