<template>
  <v-container class="py-8">
    <!-- Hero Section -->
    <v-row justify="center" class="text-center mb-12">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold mb-4">
          About Vehicle Tracker
        </h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          Simplifying vehicle management and tracking for businesses and individuals
        </p>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row class="mb-12">
      <v-col cols="12" md="6">
        <v-card class="h-100" elevation="0">
          <v-card-text>
            <div class="text-h5 font-weight-bold mb-4">Our Mission</div>
            <p class="text-body-1 mb-4">
              At Vehicle Tracker, we're committed to providing a simple yet powerful solution for managing and tracking vehicles. 
              Our platform helps businesses and individuals keep track of their fleet with ease and efficiency.
            </p>
            <p class="text-body-1">
              Whether you're managing a single vehicle or an entire fleet, our tools are designed to give you 
              the insights and control you need to make informed decisions.
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-img
          src="/api/placeholder/600/400"
          height="300"
          cover
          class="rounded-lg"
        ></v-img>
      </v-col>
    </v-row>

    <!-- Features Grid -->
    <v-row class="mb-12">
      <v-col cols="12">
        <div class="text-h5 font-weight-bold mb-6 text-center">
          Why Choose Us
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="h-100" elevation="1">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-shield-check" color="primary" class="mr-2"></v-icon>
            Reliable & Secure
          </v-card-title>
          <v-card-text>
            Your data security is our top priority. We use industry-standard encryption 
            and security measures to protect your information.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="h-100" elevation="1">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-speedometer" color="primary" class="mr-2"></v-icon>
            Real-time Tracking
          </v-card-title>
          <v-card-text>
            Monitor your vehicles in real-time with accurate location data and 
            comprehensive tracking features.
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="h-100" elevation="1">
          <v-card-title class="d-flex align-center">
            <v-icon icon="mdi-account-group" color="primary" class="mr-2"></v-icon>
            Customer Support
          </v-card-title>
          <v-card-text>
            Our dedicated support team is here to help you get the most out of our platform,
            whenever you need assistance.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Section -->
    <!-- <v-row justify="center" class="text-center">
      <v-col cols="12" md="8">
        <v-card elevation="1" class="pa-6">
          <div class="text-h5 font-weight-bold mb-4">
            Get in Touch
          </div>
          <p class="text-body-1 mb-4">
            Have questions about our services? We'd love to hear from you.
          </p>
          <v-btn
            color="primary"
            size="large"
            @click="$router.push('/contact')"
          >
            Contact Us
            <v-icon icon="mdi-arrow-right" class="ml-2"></v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row> -->
  </v-container>
</template>
  <script>
  export default {
    name: 'AboutPage'
  };
  </script>
  