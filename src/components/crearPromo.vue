<template>
    <v-container>
        <v-dialog v-model="form" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">

                <v-btn class="mx-2" dark small color="indigo" v-bind="attrs" v-on="on">
                    <v-icon dark>mdi-plus</v-icon> nuevo
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Crear Promociones</span>
                </v-card-title>
                <formPromotion :data="promotion" @close="close()" @guardar="guardar"></formPromotion>
                <!--<v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="form = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="guardar()">
                        Save
                    </v-btn>
                </v-card-actions>-->
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
//import selectProp from '@/components/selectProperties.vue';
import formPromotion from '@/components/formPromocione.vue'

export default {
    data() {
        return {
            all: true,
            form: false,
            menu: false,
            properties: [],
            promotion: {
                title: '',
                properties: [],
                real_estate_development: {
                    code: this.develop
                },
                discount: {
                    type: '',
                    quantity: '',
                    payment_facilities: ''
                },
                validity: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            },
            cero: {
                title: '',
                properties: [],
                real_estate_development: {
                    code: this.develop
                },
                discount: {
                    type: '',
                    quantity: '',
                    payment_facilities: ''
                },
                validity: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
            },
        }
    },
    props: {
        develop: {
            type: String,
            default: "meliora"
        },

    },
    created() {
    },
    methods: {
        async guardar(value) {
            console.log(value)
            value.validity += 'T23:59:59.000Z'
            const res = await fetch("http://localhost:3000/api/v2/myPromotions/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(value)
            })
            const data = await res.json()
            this.$emit('actu');
            console.log(this.promotion);
            this.promotion.validity = this.promotion.validity.split("T")[0];
            this.form = false;
            this.promotion = this.cero
        },
        close() {
            this.form = false
        }
    },
    components: {
        //selectProp,
        formPromotion
    }
}
</script>