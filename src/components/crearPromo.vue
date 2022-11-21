<template>
    <v-container>
        <v-dialog v-model="form" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">

                <v-btn class="mx-2" dark outlined color="blue" v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon> añadir promocion
                </v-btn>
            </template>
            <v-card>
                <v-toolbar style="background-color: #262d3c;" dark>
                    <v-card-title>
                        <span class="text-h5">Nueva Promocion</span>
                    </v-card-title>

                </v-toolbar>
                <formPromotion ref="form" :data="promotion" :properties="properties" @close="close()" @save="save">
                </formPromotion>
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
            //all: true,
            form: false,
            //menu: false,
            //properties: [],
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
                validity: ""
            },
            /*cero: {
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
            },*/
        }
    },
    props: {
        develop: {
            type: String,
            default: ""
        },
        properties: {
            type: Array,
            default: () => []
        }

    },
    created() {
    },
    methods: {
        async save(value) {
            console.log(value)
            //value.validity += 'T23:59:59.000Z'
            const res = await fetch("http://localhost:3000/api/v2/myPromotions/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(value)
            })
            const data = await res.json()
            console.log(data)
            this.$emit('actu');
            console.log(this.promotion);
            //this.promotion.validity = this.promotion.validity.split("T")[0];
            this.form = false;
            //this.promotion = this.cero
            this.$refs.form.reset()
        },
        close() {
            console.log(this.develop)
            console.log('promo', this.promotion.real_estate_development.code)
            this.form = false
            this.$refs.form.reset()
        }
    },
    components: {
        //selectProp,
        formPromotion
    },
    watch: {
        develop() {
            this.promotion.real_estate_development.code = this.develop
        }
    }
}
</script>