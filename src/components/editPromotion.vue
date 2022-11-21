<template>
    <v-dialog v-model="form" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" color="cyan lighten-5" title="Ver y editar" fab elevation="0" small v-bind="attrs"
                v-on="on">
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
    data() {
        return {
            form: false,
            promotion: this.data
        }
    }, components: {
        formPromotion
    },
    methods: {
        async save(value) {
            this.promotion = value;
            //this.promotion.validity += 'T23:59:59.000Z'
            console.log(this.promotion)
            //console.log(this.promotion.vigencia)
            const res = await fetch('http://localhost:3000/api/v2/myPromotions/edit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(this.promotion)
                })
            //this.promotion.validity = this.promotion.validity.split("T")[0];//#corta la fecha y toma la primera parte
            const status = await res.json()
            console.log(status)
            this.$emit('actu');

            this.form = false
            //console.log(this.promotion.vigencia)
        },
        close() {
            this.form = false
        }
    }
}
</script>