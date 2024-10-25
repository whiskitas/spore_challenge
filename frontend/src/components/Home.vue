<template>
  <v-container class="py-8">
    <!-- Welcome Banner -->
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">
          Welcome to Vehicle Tracker
        </h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Manage and track your vehicles in one place
        </p>
      </v-col>
    </v-row>

    <!-- Main Actions -->
    <v-row justify="center">
      <v-col cols="12" sm="6" md="5">
        <v-card @click="$router.push('/data')" elevation="2" class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-car" class="mr-2"></v-icon>
            View Vehicles
          </v-card-title>
          <v-card-text>
            See all your registered vehicles
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="5">
        <v-card @click="$router.push('/createCar')" elevation="2" class="h-100" hover>
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-plus" class="mr-2"></v-icon>
            Add Vehicle
          </v-card-title>
          <v-card-text>
            Register a new vehicle
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>