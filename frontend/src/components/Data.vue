<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Cars</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="goToAnotherPage">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import HttpService from '@/services/HttpService';

export default {
  name: 'DataPage',
  data() {
    return {
      items: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'User Id', value: 'user_id' },
        { text: 'Plate', value: 'plate' },
        { text: 'Make', value: 'make' },
        { text: 'Model', value: 'model' },
        { text: 'Color', value: 'color' }
      ]
    };
  },
  async mounted() {
    try {
      console.log(localStorage.getItem('userId'))
      //| id | user_id | plate | make | model | color |
      let httpService = new HttpService();
      if (localStorage.getItem('isAdmin') === 'true')
        this.items = await httpService.get('/user');
      else {
        let x = await httpService.get(`/user/${localStorage.getItem('userId')}`);
        this.items = x.Cars
      }
      console.log(this.items)
    } catch (err) {
      this.error = err.message;
      console.log(err.message)
    }
  }, methods: {
    goToAnotherPage() {
      this.$router.push('/createCar');
    }
  }

};
</script>