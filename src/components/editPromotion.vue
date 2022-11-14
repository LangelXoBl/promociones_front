<template>
    <v-dialog v-model="form" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" color="success" fab small dark v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Editar Promociones</span>
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
</template>
<script>
import formPromotion from '@/components/formPromocione.vue'
export default {
    props: {
        data: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            form: false,
            promotion: JSON.parse(JSON.stringify(this.data))
        }
    }, components: {
        formPromotion
    },
    methods: {
        async guardar(value) {
            this.promotion = value;
            this.promotion.vigencia += 'T23:59:59.000Z'
            console.log(this.promotion)
            //console.log(this.promotion.vigencia)
            const res = await fetch('http://localhost:3000/api/v2/myPromotions/edit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(this.promotion)
                })
            this.promotion.vigencia = this.promotion.vigencia.split("T")[0];
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