<template>
  <div>
    <div ref="mapContainer" class="map-container"></div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="text-lg font-medium">Vehicle Details</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div v-if="loading" class="modal-body flex justify-center items-center py-4">
          Loading...
        </div>
        <div v-else class="modal-body">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <p><strong>ID:</strong> {{ carDetails.id }}</p>
              <!-- <p><strong>User ID:</strong> {{ carDetails.user_id }}</p> -->
              <p><strong>Plate:</strong> {{ carDetails.plate }}</p>
            </div>
            <div class="space-y-2">
              <p><strong>Make:</strong> {{ carDetails.make }}</p>
              <p><strong>Model:</strong> {{ carDetails.model }}</p>
              <p><strong>Color:</strong> {{ carDetails.color }}</p>
            </div>
          </div>
          <div class="mt-4">
            <p><strong>Location:</strong></p>
            <p>Latitude: {{ selectedCar.lat }}</p>
            <p>Longitude: {{ selectedCar.lon }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import HttpService from '@/services/HttpService';

export default {
  name: 'MapViewPage',
  setup() {
    /* eslint-disable */
    const mapContainer = ref(null);
    const showModal = ref(false);
    const selectedCar = ref({});
    const carDetails = ref({});
    const loading = ref(false);
    const carIconUrl = '/images/car.png';
    let httpService = new HttpService();
    const carIcon = L.icon({
      iconUrl: carIconUrl,
      iconSize: [40, 20],//[width, height]
      // iconAnchor: [100, 100]/*[50, 0]*//*[25, 25]*/,      // Anchor point of the icon (relative to its top-left corner)
      popupAnchor: [-15, -40]// Position of the popup relative to the icon
    });

    const fetchCarDetails = async (carId) => {
      try {
        // let httpService = new HttpService();
        loading.value = true;
        console.log("entro")
        const response = await httpService.get(`/car/${carId}`);
        console.log("carro",response)
        carDetails.value = response;
      } catch (error) {
        console.error('Error fetching car details:', error);
        carDetails.value = {
          id: 'Error loading',
          user_id: 'Error loading',
          plate: 'Error loading',
          make: 'Error loading',
          model: 'Error loading',
          color: 'Error loading'
        };
      } finally {
        loading.value = false;
      }
    };


    const openModal = async (car) => {
      selectedCar.value = car;
      showModal.value = true;
      await fetchCarDetails(car.car_id);
    };

    const closeModal = () => {
      showModal.value = false;
      selectedCar.value = {};
      carDetails.value = {};
    };

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
        // let httpService = new HttpService();
        let positions

        if (localStorage.getItem('isAdmin') === 'true') {
          let x = await httpService.get('/user')
          let flat = x.flatMap(user => user.Cars)
          positions = flat.flatMap(car => car.Positions)
        } else {
          let x = await httpService.get(`/user/${localStorage.getItem('userId')}`);
          positions = x.Cars.flatMap(obj => obj.Positions)
          // console.log("user", positions)
        }

        const map = L.map(mapContainer.value).setView(calculateCentroid(positions)/*[20.71056, -103.4125]*/, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, }).addTo(map);

        positions.forEach(car => {
          console.log("car",car)
          L.marker([car.lat, car.lon], { icon: carIcon })
            .addTo(map)
            .bindPopup(
              L.popup({
                closeButton: false,
                className: 'custom-popup'
              }).setContent('<div class="popup-content" style="color:blue">Click for details</div>'))
            .on('popupopen', () => {
              // Add click event listener to popup content
              setTimeout(() => {
                const popupContent = document.querySelector('.popup-content');
                if (popupContent) {
                  popupContent.addEventListener('click', () => openModal(car));
                }
              }, 0);
            });
          // .openPopup();
        });
      } catch (err) { console.log(err.message) }
    });

    return {
      mapContainer,
      showModal,
      selectedCar,
      closeModal,
      loading,
      carDetails
    };
  }
};
</script>

<style>
.map-container {
  height: 90vh;
  width: 80vw;
}
</style>

<style scoped>
.map-container {
  height: 90vh;
  width: 80vw;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-header button {
  font-size: 1.5rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.modal-body {
  margin-top: 1rem;
}

.custom-popup .leaflet-popup-content-wrapper {
  background: white;
  color: #333;
  border-radius: 4px;
  padding: 0.5rem;
}

.popup-content {
  cursor: pointer;
  padding: 0.25rem;
  color: #2563eb;
}

.popup-content:hover {
  text-decoration: underline;
}
</style>