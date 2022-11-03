<template>
    <v-dialog v-model="form" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" color="success" fab small dark v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Editar Promocion</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Titulo" required v-model="promo.titulo">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :items="['Fijo', 'Porcentual']" label="Tipo*" required
                                v-model="promo.descuento.tipo">
                            </v-select>
                        </v-col>

                        <v-col col="12" sm="6">
                            <v-text-field label="Cantidad*" hide-details single-line type="number"
                                v-model="promo.descuento.cantidad">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="promo.vigencia" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="promo.vigencia" label=" Vigencia" prepend-icon="mdi-calendar"
                                        readonly v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="promo.vigencia" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(promo.vigencia)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>

                        <ListProperties :develop="promo.desarrollo.code"></ListProperties>
                        <v-col cols="12">
                            <v-textarea auto-grow label="Facilidades de pago" rows="2" row-height="20"
                                v-model="promo.descuento.facilidades">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="form = false">
                    Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="guardar()">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ListProperties from '@/components/listProperties.vue'
export default {
    data() {
        return {
            form: false,
            menu: false,
            //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString(),
        }
    }, components: {
        ListProperties
    },
    props: {
        promo: {
            type: Object,
            default: {}
        },
    }, created() {
        this.promo.vigencia = this.promo.vigencia.split('T')[0]
    },
    computed: {

    },
    methods: {
        async guardar() {
            this.promo.vigencia += 'T23:59:59.000Z'
            console.log(this.promo)
            const res = await fetch('http://localhost:3000/api/v2/myPromotions/edit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json;charset=utf-8' },
                    body: JSON.stringify(this.promo)
                })
            const status = await res.json()
            console.log(status)
            this.form = false
        }
    }
}
</script>