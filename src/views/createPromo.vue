<template>
    <v-container>
        <v-card class="pa-4">


            <v-btn tile color="grey lighten-4" dark small @click="retur()">
                <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>

            <span class="text-h5">Nueva Promocion</span>

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
                                <v-text-field v-model="promotion.vigencia" label=" Vigencia" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on">
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
                    <ListProperties develop="meliora" @propertiesSelec="promotion.unidades = $event"></ListProperties>
                    <v-col cols="12">
                        <v-textarea auto-grow label="Facilidades de pago" rows="2" row-height="20"
                            v-model="promotion.descuento.facilidades">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
            <v-btn color="blue darken-1" text @click="save">
                Save
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
import ListProperties from '@/components/listProperties.vue'
export default {
    data() {
        return {
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
    components: {
        ListProperties
    }
    ,
    props: {
        develop: {
            type: String,
            default: "meliora"
        }
    },
    created() {
    },
    methods: {
        retur() {
            this.$router.go(-1);
        },
        save() {
            this.promotion.vigencia += 'T23:59:59.000Z'
            console.log(this.promotion)
        }

    }
}
</script>