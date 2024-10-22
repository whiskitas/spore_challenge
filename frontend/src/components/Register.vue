<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Register</v-card-title>
                    <v-card-text>
                        <v-form ref="registerForm" v-model="valid">
                            <!-- Name Input -->
                            <v-text-field v-model="user.name" :rules="[v => !!v || 'Name is required']" label="Name"
                                required></v-text-field>

                            <!-- Email Input -->
                            <v-text-field v-model="user.email"
                                :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
                                label="Email" required></v-text-field>

                            <!-- Password Input -->
                            <v-text-field v-model="user.password"
                                :rules="[v => !!v || 'Password is required', v => v.length >= 6 || 'Password must be at least 6 characters']"
                                label="Password" type="password" required></v-text-field>

                            Confirm Password Input
                            <v-text-field v-model="user.confirmPassword"
                                :rules="[v => !!v || 'Confirmation is required', v => v === user.password || 'Passwords must match']"
                                label="Confirm Password" type="password" required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" :disabled="!valid" @click="registerUser">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HttpService from '@/services/HttpService';

export default {
    name: 'RegisterPage',
    setup() {
        const user = ref({
            username/*name*/: '',
            email: '',
            password: '',
            confirmPassword: '',
        });

        const valid = ref(false);
        const registerForm = ref(null);
        const router = useRouter();

        let httpService = new HttpService();
        const registerUser = async () => {
            if (registerForm.value.validate()) {
                try {
                    const result = await httpService.post('/user', {
                        username: user.value.name,
                        email: user.value.email,
                        password: user.value.password
                    });
                    console.log(result);
                    router.push('/login');
                } catch (err) {
                    alert("registration failed")
                    console.log(err);
                }


            }
        };


        return {
            user,
            valid,
            registerForm,
            registerUser,
            // httpService: null
        };
    }
};
</script>

<style scoped>
/* Optional styles */
</style>