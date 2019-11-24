<template>
    <!-- Categories -->
    <container class=categories flex-direction=row>
        <!-- Legend -->
        <container class=legend flex-wrap=wrap flex-direction=row>
            <row class=category-legend-element align-h=left v-for='category in categories' :key="category">
                <row class=category-legend-element-wrapper align-h=left @click='selectCategory(category)'>
                    <container class=color-square :backgroundColor='getColorFor(category)' />
                    <p class='category-name ellipsis-overflow'>{{category}}</p>
                </row>
            </row>
        </container>
        <!-- Card Preview -->
        <container v-if=selectedCategory class=card>
            <container class=card-head :style='{backgroundColor:getColorFor(selectedCategory), color:"white"}' shadow=1>
                <h5>{{this.selectedCategory}}</h5>
            </container>
            
        </container>
    </container>
</template>

<script>
import Event from '../utils/event-class'

export default {
    data:()=>({
       selectedCategory: null 
    }),
    computed: {
        categories() {
            return Object.keys(globalData.eventCategoryColorMapping)
        }
    },
    methods: {
        getColorFor(category) {
            return Event.getColorFor(category)
        },
        selectCategory(category) {
            console.log(`category is:`,category)
            this.selectedCategory = category
        }
    },
    beforeMount() {
        this.selectedCategory = this.categories[0]
    }
}
</script>

<style lang='scss' scoped>
.categories {
    height: 100%;
    padding: 3rem;
    
    .legend {
        --legend-element-width: 12rem;
        --margin: 15px;
        
        overflow: auto;
        height: 100%;
        width: calc(2 * calc(var(--legend-element-width) + calc(2 * var(--margin))));
        
        .category-legend-element {
            margin: var(--margin) var(--margin) 0 0;
            
            .category-legend-element-wrapper {
                cursor: pointer;
                
                width: var(--legend-element-width);
                .color-square {
                    --square-size: 25px;
                    height: var(--square-size);
                    width:  var(--square-size);
                    margin-right: 20px;
                }
                
                .category-name {
                    
                }
            }
        }
    }
    
    .card {
        height: 100%;
        min-width: 20rem;
        min-height: 10rem;
        
        .card-head {
            transition: all 300ms ease-out;
        }
    }
}
</style>