<template>
    <container>
        <!-- duplicate used for shadow -->
        <container class='card notes shadow'/>
        <!-- actual notepad -->
        <container class='card notes' shadow=0>
            <container class=card-head shadow=1>
                <h5>Notes</h5>
            </container>
            <container class=card-body>
                <v-textarea rounded fill-height outlined v-model="global.notes" />
            </container>
        </container>
    </container>
</template>

<script>
let color = 'rgb(242,177,51)'
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
    background-color: rgb(242,177,51);
    width: 20rem;
    height: 17rem;
    
    &.shadow {
        transform: rotate(calc(var(--rotation) + 4deg + 90deg)) translate(35px, 9px) scaleX(0.95);
        background-color: purple;
        box-shadow: 0 15px 10px #777;
    }
}
</style>
