<template>
    <v-container>
        <v-dialog v-model="form" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">

                <v-btn class="mx-2" dark small color="indigo" v-bind="attrs" v-on="on">
                    <v-icon dark>mdi-plus</v-icon> nuevo
                </v-btn>
            </template>
            <v-card class="pa-4">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="form = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Nueva Promocion</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="save">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>



                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Titulo" required v-model="promotion.titulo">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-select :items="['Fijo', 'Porcentual']" label="Tipo*" required
                                v-model="promotion.descuento.tipo">
                            </v-select>
                        </v-col>

                        <v-col col="12" sm="4">
                            <v-text-field label="Cantidad*" hide-details single-line type="number"
                                v-model="promotion.descuento.cantidad">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="promotion.vigencia" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="promotion.vigencia" label=" Vigencia"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="promotion.vigencia" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">
                                        Cancel
                                    </v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(promotion.vigencia)">
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <template>
                            <v-container>
                                <v-card v-if="properties.length > 0">
                                    <v-card-title primary-title>
                                        Propiedades: {{ develop }}
                                    </v-card-title>
                                    <template>
                                        <v-card-text>
                                            Propiedades selecionadas:{{ promotion.unidades.length }}
                                        </v-card-text>

                                        <v-treeview v-model="promotion.unidades" selectable :items="properties">
                                        </v-treeview>
                                    </template>
                                </v-card>
                                <div v-else> Cargando propiedades...</div>
                            </v-container>
                        </template>
                        <v-col cols="12">
                            <v-textarea auto-grow label="Facilidades de pago" rows="2" row-height="20"
                                v-model="promotion.descuento.facilidades">
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <small>*indicates required field</small>
                </v-container>

            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            form: false,
            menu: false,
            properties: [],
            //selection: [],
            promotion: {
                titulo: '',
                unidades: [],
                desarrollo: {
                    code: this.develop
                },
                descuento: {
                    tipo: '',
                    cantidad: '',
                    facilidades: ''
                },
                vigencia: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
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
        fetch("http://localhost:3000/api/v2/realEstateDevelopment/order/floor", {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ real_estate_development_code: this.develop })
        }).then(res => res.json()).then(data => this.properties = data)
    },
    methods: {
        async save() {
            this.promotion.vigencia += 'T23:59:59.000Z'
            const res = await fetch("http://localhost:3000/api/v2/myPromotions/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(this.promotion)
            })
            const data = await res.json()
            console.log(data)
        }
    },
}
</script>