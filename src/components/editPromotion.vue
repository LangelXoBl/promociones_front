<template>
    <v-dialog v-model="form" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="cyan lighten-5" title="Ver y editar" fab elevation="0" small v-bind="attrs" v-on="on">
                <v-icon color="cyan darken-4">mdi-eye</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-toolbar style="background-color: #262d3c;" dark>
                <v-card-title>
                    <span class="text-h5">Editar Promocion</span>
                </v-card-title>
            </v-toolbar>
            <formPromotion :data="promotion" :properties="properties" @close="close()" @save="save"></formPromotion>
        </v-card>
    </v-dialog>
</template>
<script>
import formPromotion from '@/components/formPromocione.vue'
export default {
    props: {
        //Es el prop que recibe el objeto de la promocion
        data: {
            type: Object,
            default: () => { }
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
            promotion: this.data
        }
    },
    methods: {
        async save(value) {
            this.promotion = value;
            const res = await fetch('http://localhost:3000/api/v2/myPromotions/edit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(this.promotion)
                })
            const status = await res.json()
            //console.log(status)
            this.$emit('update');
            this.form = false
        },
        close() {
            this.form = false
        }
    }
}
</script>