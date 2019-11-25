<template>
    <container class='map-container card' height=100% width=100%>
        <div id="map"></div>
    </container>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader"
export default {
    name: "eventMap",
    data: () => ({
        apiKey: "AIzaSyD86cLvPkOdZXVKMrQUvFkkrydo-HW5XH8",
        google: null,
        map: null,
        marker: null,
    }),
    computed: {
        mapConfig() {
            return { zoom: 17, center: this.currentEvent.position }
        },
    },
    methods: {
        initializeMap() {
            GoogleMapsApiLoader({
                apiKey: this.apiKey,
            }).then(google => {
                this.google = google
                const mapContainer = this.$el.querySelector("#map")
                const { Map } = this.google.maps
                this.map = new Map(mapContainer, this.mapConfig)
                const { Marker } = this.google.maps
                this.marker = new Marker({
                    position: this.currentEvent.position,
                    map: this.map,
                    title: "Child marker!",
                })
            })
        },
    },
    watch: {
        'global.currentEventIndex': function(newValue) {
            this.initializeMap()
        }
    },
    mounted() {
        this.initializeMap()
    },
}
</script>

<style lang='scss' scoped>
.map-container {
    * {
        height: 100%;
        width: 100%;
    }
}
</style>