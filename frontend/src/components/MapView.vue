<template>
  <!-- <img src="/images/image.png" alt=""> -->
  <div ref="mapContainer" class="map-container"> </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import HttpService from '@/services/HttpService';

export default {
  name: 'MapViewPage',
  setup() {
    const mapContainer = ref(null);
    // let map = ref(null);
    const carIconUrl = '/images/car.png';
    const carIcon = L.icon({
      iconUrl: carIconUrl,       // Path to the car image
      iconSize: [40, 20]/*[150, 100]*//*[75, 50]*/,        // Size of the icon [width, height]
      // iconAnchor: [100, 100]/*[50, 0]*//*[25, 25]*/,      // Anchor point of the icon (relative to its top-left corner)
      popupAnchor: [-15, -40]/*[25, 25]*//*[0, -25]*/,     // Position of the popup relative to the icon
    });

    onMounted(async () => {
      const calculateCentroid = (points) => {
        console.log(points)
        let pointLen = points.length
        if (pointLen === 0) { throw new Error("Array must not be empty"); }
        let totalLat = 0;
        let totalLon = 0;

        points.forEach(point => {
          if (point.length != 0) {
            totalLat += point.lat;
            totalLon += point.lon;
          } else { pointLen -= 1 }
        });
        return [totalLat / pointLen, totalLon / pointLen];
      };


      try {
        let httpService = new HttpService();
        let positions
        // eslint-disable-next-line
        if (localStorage.getItem('isAdmin') === 'true') {
          let x = await httpService.get('/user')
          let flat = x.flatMap(user => user.Cars)
          positions = flat.flatMap(car => car.Positions)
        } else {
          let x = await httpService.get(`/user/${localStorage.getItem('userId')}`);
          positions = x.Cars.flatMap(obj => obj.Positions)
          console.log("user", positions)
        }

        const map = L.map(mapContainer.value).setView(calculateCentroid(positions)/*[20.71056, -103.4125]*/, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, }).addTo(map);
        positions.forEach(car => {
          L.marker([car.lat, car.lon], { icon: carIcon })
            .addTo(map/*.value*/)
            .bindPopup('<b>Car Marker</b><br>This is a car.')
            .openPopup();
        });
      } catch (err) { console.log(err.message) }
    });

    return { mapContainer };
  }
};
</script>

<style>
.map-container {
  height: 90vh;
  width: 80vw;
}
</style>