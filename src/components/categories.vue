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
        <!-- Category Preview -->
        <row class=category-preview height=110% overflow=auto align-h=left align-v=top>
            <row height=100% overflow=visible align-h=left align-v=top>
                <row v-for='each in this.categories' :key="each" height=90.9% align-v=top>
                    <container min-width=2rem />
                    <categoryEvents :category='each' :color='getColorFor(each)' />
                </row>
                <container min-width='calc(var(--width) - var(--min-card-size) - 3rem)' />
            </row>
        </row>
        
        <!-- Fade -->
        <div class=fade>
            
        </div>
    </container>
</template>

<script>
import Event from '../utils/event-class'
import categoryEvents from './categoryEvents'

export default {
    name: "categories",
    components: {
        categoryEvents
    },
    data:()=>({
       categories: [],
    }),
    computed: {
    },
    methods: {
        getColorFor(category) {
            return Event.getColorFor(category)
        },
        selectCategory(category) {
            let index = this.categories.findIndex(each=>each==category)
            delete this.categories[index]
            this.categories.unshift(category)
            this.categories = this.categories.filter(each=>each!=null)
            console.log(`this.categories is:`,this.categories)
        }
    },
    beforeMount() {
        this.categories = Object.keys(globalData.eventCategoryColorMapping)
    }
}
</script>

<style lang='scss' scoped>
::v-deep {
    --min-card-size: 17rem;
}
.categories {
    --legend-element-width: 12rem;
    
    
    height: 100%;
    width: 100%;
    padding: 3rem;
    padding-right: 0;
    
    .legend {
        --margin: 15px;
        
        overflow: auto;
        height: 100%;
        min-width: var(--legend-element-width);
        width: 0;
        
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
    
    --category-preview-width: 90vw;
    .category-preview {
        height: 110%;
        min-width: var(--category-preview-width);
    }
    
    .fade {
        position: fixed;
        bottom: 0;
        right: 0;
        height: 35vh;
        width: calc(100vw - 4rem - var(--legend-element-width) - calc(var(--category-preview-width) / 2));
        background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(245,245,245,1) 100%);
        pointer-events: none;
    }
}
</style>