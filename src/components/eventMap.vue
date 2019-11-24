<template>
  <v-card>
    <div id="map" style="width: 100%; height: 100%; poisition: fixed; top: 0%; left: 0%;">
    </div>
  </v-card>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
export default {
  name: 'EventMap',
  props: {
    position: Object
  },
  data: () => ({
    apiKey: 'AIzaSyD86cLvPkOdZXVKMrQUvFkkrydo-HW5XH8',
    google: null,
    map: null,
    marker: null
  }),
  computed: {
    mapConfig: function () {
      return {zoom: 17, center: this.position}
    },
  },
  methods: {
    initializeMap (){
      const mapContainer = this.$el.querySelector('#map')
      const { Map } = this.google.maps
      this.map = new Map(mapContainer, this.mapConfig)
      const { Marker } = this.google.maps
      this.marker = new Marker({
        position: this.position,
        map: this.map,
        title: "Child marker!"
      })
    }
  },
  mounted() {
    GoogleMapsApiLoader({
      apiKey: this.apiKey
    }).then((google) => {
      this.google = google
      this.initializeMap()
    })
  }
};
</script>
