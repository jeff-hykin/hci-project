<template>
    <div class=my-card style="height: 100%; width: 100%;">
        <div id="map" style="width: 100%; height: 100%; poisition: fixed; top: 0%; left: 0%;"></div>
    </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader"
export default {
    name: "EventMap",
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
            const mapContainer = this.$el.querySelector("#map")
            const { Map } = this.google.maps
            this.map = new Map(mapContainer, this.mapConfig)
            const { Marker } = this.google.maps
            this.marker = new Marker({
                position: this.currentEvent.position,
                map: this.map,
                title: "Child marker!",
            })
        },
    },
    mounted() {
        GoogleMapsApiLoader({
            apiKey: this.apiKey,
        }).then(google => {
            this.google = google
            this.initializeMap()
        })
    },
}
</script>

<style scoped>
.my-card {
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px, rgba(0, 0, 0, 0.3) 0px 2px 4px -1px;
    background-color: whitesmoke;
}
</style>