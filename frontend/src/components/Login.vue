  <template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field label="Email" v-model="email" type="email" required></v-text-field>

                <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
                <v-btn color="primary" type="submit" block>Login</v-btn>

                <!-- Link to the Register Page -->
                <v-row justify="center" class="mt-4">
                  <v-col class="text-center">
                    <span class="grey--text">Don't have an account?</span>
                    <v-btn class="ml-2" color="primary" text to="/register">
                      Register here
                    </v-btn>
                  </v-col>
                </v-row>


              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
// import { useRouter } from 'vue-router';
import HttpService from '@/services/HttpService';
export default {
  name: 'LoginPage',
  setup() {

  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {

      // const router = useRouter();
      let httpService = new HttpService();
      // const registerUser = async () => {
      //   if (registerForm.value.validate()) {
      //     try {
      //       const result = await httpService.post('/user', {
      //         username: user.value.name,
      //         email: user.value.email,
      //         password: user.value.password
      //       });
      //       console.log(result);
      //       router.push('/login');
      //     } catch (err) {
      //       alert("registration failed")
      //       console.log(err);
      //     }
      //   }
      // };

      try {
        const result = await httpService.post('/user/login', {
          email: this.email,
          password: this.password
        });
        console.log(result);
        localStorage.setItem('isAuthenticated', "true");
        localStorage.setItem('isAdmin', String(result.is_admin));
        localStorage.setItem('JWTtoken', result.token);
        localStorage.setItem('userId', String(result.id));
        this.$router.push('/');
        // router.push('/login');
      } catch (err) {
        alert("registration failed")
        console.log(err);
      }

      // // Example login logic: Check for hardcoded email and password
      // if (this.email === 'admin@example.com' && this.password === 'password') {
      //   alert('Login successful!');
      //   localStorage.setItem('isAuthenticated', 'true');
      //   this.$router.push('/'); // Redirect to home page
      // } else {
      //   alert('Invalid email or password.');
      // }
    }
  }
};
</script>
