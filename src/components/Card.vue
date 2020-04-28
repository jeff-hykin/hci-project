<template>
    <row class='card' color=gray>
        <slot />
    </row>
</template>

<style scoped lang="scss">
.card {
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    padding: 2rem;
    border-radius: 1rem;
}
.card h5 {
    margin-right: 1rem;
}
</style>