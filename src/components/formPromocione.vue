<template>
    <v-card>


        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Titulo" required v-model="promotion.title">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select :items="['Fijo', 'Porcentual']" label="Tipo*" required
                            v-model="promotion.discount.type">
                        </v-select>
                    </v-col>

                    <v-col col="12" sm="6">
                        <v-text-field label="Cantidad*" hide-details single-line type="number"
                            v-model="promotion.discount.quantity">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                            :return-value.sync="promotion.validity" transition="scale-transition" offset-y
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="promotion.validity" label=" Vigencia" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="promotion.validity" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(promotion.validity)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-switch v-model="all_development" inset :label="`Todo el desarrollo: ${all_development}`">
                    </v-switch>
                    <selectProperties v-if="!all_development" :propertieSelect="promotion.properties"
                        @selected="value => promotion.properties = value"></selectProperties>
                    <v-col cols="12">
                        <v-textarea auto-grow label="Facilidades de pago" rows="2" row-height="20"
                            v-model="promotion.discount.payment_facilities">
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
        //Es el prop que recibe el objeto de la promocion
        data: {
            type: Object,
            default: {}
        },
    }, data() {
        return {
            all_development: true,//Boolean para saber si elige a todo el desarrollo o no
            menu: false,
            promotion: JSON.parse(JSON.stringify(this.data)),
            origin: JSON.parse(JSON.stringify(this.data))
        }
    }, components: {
        selectProperties
    },
    created() {
        this.dateFormat();
    },
    methods: {
        dateFormat() {
            this.promotion.validity = this.promotion.validity.split("T")[0];
            this.origin.validity = this.origin.validity.split("T")[0];
        },
        save() {
            this.origin = JSON.parse(JSON.stringify(this.promotion));
            this.$emit('save', this.promotion);
        },
        close() {
            console.log('edit', this.promotion.title)
            this.promotion = JSON.parse(JSON.stringify(this.origin))
            console.log('origin', this.origin.title)

            this.$emit('close', this.origin)
        }
    }, watch: {
        promotion() {
            this.$emit('promo', this.promotion)
            console.log(this.promotion)
        }
    },
}
</script>