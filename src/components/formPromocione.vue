<template>
    <v-card>


        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Titulo" required v-model="promotion.titulo">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select :items="['Fijo', 'Porcentual']" label="Tipo*" required
                            v-model="promotion.descuento.tipo">
                        </v-select>
                    </v-col>

                    <v-col col="12" sm="6">
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
                    <v-switch v-model="all" inset :label="`Todo el desarrollo: ${all}`"></v-switch>
                    <selectProperties v-if="!all" :propertieSelect="promotion.unidades"
                        v-on:propSelec="value => promotion.unidades = value"></selectProperties>
                    <v-col cols="12">
                        <v-textarea auto-grow label="Facilidades de pago" rows="2" row-height="20"
                            v-model="promotion.descuento.facilidades">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="save()">
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import selectProperties from '@/components/selectProperties.vue'
export default {
    props: {
        data: {
            type: Object,
            default: {}
        },
    }, data() {
        return {
            all: true,
            menu: false,
            promotion: this.data
        }
    }, components: {
        selectProperties
    },
    created() {
        this.dateFormat();
    },
    methods: {
        dateFormat() {
            this.promotion.vigencia = this.promotion.vigencia.split("T")[0];
        },
        save() {
            this.$emit('guardar', this.promotion)
        },
        close() {
            this.$emit('close')
        }
    }, watch: {
        promotion() {
            this.$emit('promo', this.promotion)
            console.log(this.promotion)
        }
    },
}
</script>