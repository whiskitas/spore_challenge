<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" :loading="loading" class="elevation-1">
      <template #item.action="{ item }">
        <!-- Button to open dialog or navigate to another page -->
        <v-btn icon @click="openDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>

      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Cars</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="goToAnotherPage">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <!-- Modified Dialog with Form -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>Car Details</v-card-title>
        <v-card-text>
          <div class="mb-4">
            <p><strong>Plate:</strong> {{ selectedCar.plate }}</p>
            <p><strong>Make:</strong> {{ selectedCar.make }}</p>
            <p><strong>Model:</strong> {{ selectedCar.model }}</p>
            <p><strong>Color:</strong> {{ selectedCar.color }}</p>
          </div>

          <v-form @submit.prevent="updatePosition" ref="form">
            <v-text-field v-model.number="position.latitude" label="Latitude" type="number"
              step="0.000001"></v-text-field>

            <v-text-field v-model.number="position.longitude" label="Longitude" type="number"
              step="0.000001"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="updatePosition">Update Position</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import HttpService from '@/services/HttpService';

export default {
  name: 'DataPage',
  data() {
    return {
      loading: true,
      dialog: false,
      selectedCar: {},
      items: [],
      headers: [
        { title: 'ID', key: 'id' },
        { title: 'User Id', key: 'user_id' },
        { title: 'Plate', key: 'plate' },
        { title: 'Make', key: 'make' },
        { title: 'Model', key: 'model' },
        { title: 'Color', key: 'color' },
        { title: 'Position', key: 'action', sortable: false }, // Edit position
      ],
      position: {
        latitude: null,
        longitude: null
      },
    };
  },
  async mounted() {
    this.loading = true;
    try {
      let httpService = new HttpService();
      if (localStorage.getItem('isAdmin') === 'true') {
        let x = await httpService.get('/user')
        this.items = x.flatMap(item => item.Cars)
      }
      else {
        let x = await httpService.get(`/user/${localStorage.getItem('userId')}`);
        this.items = x.Cars
      }
    } catch (err) {
      this.error = err.message;
      console.log(err.message)
    } finally {
      this.loading = false;
    }
  }, methods: {
    goToAnotherPage() {
      this.$router.push('/createCar');
    },
    openDialog(item) {
      this.selectedCar = item;
      this.dialog = true;
      this.position.latitude = item.latitude || null;
      this.position.longitude = item.longitude || null;
    }, async updatePosition() {
      if (!this.$refs.form.validate()) return;
      console.log({
        car_id: parseInt(this.selectedCar.id),
        lat: parseFloat(this.position.latitude),
        lon: parseFloat(this.position.longitude)
      })
      try {
        const httpService = new HttpService();
        await httpService.put(`/position/`, {
          car_id: parseInt(this.selectedCar.id),
          lat: parseFloat(this.position.latitude),
          lon: parseFloat(this.position.longitude)
        });

        this.dialog = false;
        // this.$emit('update:success', 'Position updated successfully');
      } catch (error) {
        console.error('Error updating position:', error);
        // this.$emit('update:error', 'Failed to update position');
      }
    }
  }

};
</script>