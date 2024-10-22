<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="text-center">
                        Upload Vehicle Information
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="handleSubmit" ref="form">
                            <!-- Plate Field -->
                            <v-text-field label="Plate" v-model="form.plate" :rules="[rules.required, rules.plate]"
                                maxlength="7" required></v-text-field>

                            <!-- Make Field -->
                            <v-text-field label="Make" v-model="form.make"
                                :rules="[rules.required, rules.maxLength(30)]" required></v-text-field>

                            <!-- Model Field -->
                            <v-text-field label="Model" v-model="form.model"
                                :rules="[rules.required, rules.maxLength(30)]" required></v-text-field>

                            <!-- Color Field -->
                            <v-text-field label="Color" v-model="form.color"
                                :rules="[rules.required, rules.maxLength(30)]" required></v-text-field>

                            <!-- Submit Button -->
                            <v-btn color="primary" type="submit" block>
                                Upload
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HttpService from '@/services/HttpService';

export default {
    name: 'PostCarPage',
    data() {
        return {
            form: {
                user_id: localStorage.getItem('userId'),
                plate: '',
                make: '',
                model: '',
                color: '',
            },
            rules: {
                required: (value) => !!value || 'Required.',
                plate: (value) =>
                    /^[A-Za-z0-9]{7}$/.test(value) || 'Plate must be 7 characters.',
                maxLength: (max) => (value) =>
                    value.length <= max || `Max ${max} characters.`,
            },
        };
    },
    methods: {
        async handleSubmit() {
            if (this.$refs.form.validate()) {
                let httpService = new HttpService();

                try {
                    const result = await httpService.post('/car', {
                        user_id: this.form.user_id,
                        plate: this.form.plate,
                        make: this.form.make,
                        model: this.form.model,
                        color: this.form.color
                    });
                    console.log(result);
                    this.$router.push('/data');
                } catch (err) {
                    alert("registration failed")
                    console.log(err);
                }
            }
        },
    },
};
</script>

<style scoped></style>