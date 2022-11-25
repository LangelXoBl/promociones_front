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
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
//import selectProp from '@/components/selectProperties.vue';
import formPromotion from '@/components/formPromocione.vue'

export default {
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
    components: {
        formPromotion
    },
    data() {
        return {
            form: false,
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
        }
    },
    methods: {
        async save(value) {
            const res = await fetch("http://localhost:3000/api/v2/myPromotions/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(value)
            })
            const data = await res.json()
            //console.log(data)
            this.$emit('actu');
            this.form = false;
            this.$refs.form.reset()
        },
        close() {
            this.form = false
            this.$refs.form.reset()
        }
    },
    watch: {
        develop() {
            this.promotion.real_estate_development.code = this.develop
        }
    }
}
</script>