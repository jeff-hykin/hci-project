<template>
    <container>
        <!-- duplicate used for shadow -->
        <container class='card notes shadow'/>
        <!-- actual notepad -->
        <container class='card notes' shadow=0>
            <container class=card-head>
                <h5>Notes</h5>
            </container>
            <container class=card-body>
                <textarea rows="6" cols="32" v-model="global.notes" />
            </container>
        </container>
    </container>
</template>

<script>
export default {
    name: "Notes",
}
</script>

<style lang="scss" scoped>
.notes {
    --rotation: -11deg;
    position: fixed;
    right: 0;
    bottom: -2.5rem;
    transform: rotate(var(--rotation));
    background-color: rgb(243, 195, 99);
    width: 20rem;
    height: 17rem;
    border-radius: 0;
    
    .card-head {
        padding-top: 0;
        padding-bottom: 0;
        box-shadow: none;
        
        h5 {
            font-family: Shadows Into Light;
            font-size: 30pt;
            color: rgb(66, 77, 87);
        }
    }
    
    .card-body {
        textarea {
            resize: none;
            font-family: Kalam;
            line-height: 1.1em;
            font-size: 14pt;
        }
    }
    
    &.shadow {
        transform: rotate(calc(var(--rotation) + 4deg + 90deg)) translate(35px, 9px) scaleX(0.95);
        background-color: purple;
        box-shadow: 0 15px 10px #777;
    }
}
</style>
