<template>
    <v-card>
        <v-form ref="form" v-model="valid">


            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Titulo" prepend-icon="mdi-text" required v-model="promotion.title"
                                :rules="Rules">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :items="['Fijo', 'Porcentual']" prepend-icon=" " label="Tipo*" required
                                v-model="promotion.discount.type" :rules="Rules">
                            </v-select>
                        </v-col>
                        <v-col col="12" sm="6">
                            <v-text-field prepend-icon="mdi-currency-usd " label="Cantidad*" hide-details single-line
                                type="number" v-model="promotion.discount.quantity" :rules="Rules">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                :return-value.sync="promotion.validity" transition="scale-transition" offset-y
                                min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="promotion.validity" label=" Vigencia"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="Rules">
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
                        <v-col col="12" sm="6">
                            <v-switch v-model="all_development" inset label="Aplicar a todo el desarrollo">
                            </v-switch>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete v-if="!all_development" v-model="promotion.properties" :items="properties"
                                chips label="Selecionar propiedades" item-text="code" item-value="_id" multiple
                                prepend-icon="mdi-city">
                                <template v-slot:selection="data">
                                    <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select"
                                        @click:close="remove(data.item)">
                                        {{ data.item.code }} -
                                        {{ data.item.floor }}
                                    </v-chip>
                                </template>
                                <template v-slot:item="data">
                                    <template>
                                        <v-list-item-content>
                                            <v-row>
                                                <v-col>
                                                    <v-list-item-title v-html="data.item.code"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="data.item.floor">
                                                    </v-list-item-subtitle>
                                                </v-col>
                                                <v-spacer></v-spacer>
                                                <v-col v-if="data.item.promos != 0">
                                                    <v-list-item-subtitle
                                                        v-html="`Promos aplicadas:${data.item.promos}`">
                                                    </v-list-item-subtitle>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                    </template>
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea prepend-icon="mdi-text" auto-grow label="Facilidades de pago" rows="2"
                                row-height="20" v-model="promotion.discount.payment_facilities">
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
                <v-btn color="blue darken-1" text @click="save()" :disabled="!valid">
                    Save
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
//import selectProperties from '@/components/selectProperties.vue'
export default {
    props: {
        //Es el prop que recibe el objeto de la promocion
        data: {
            type: Object,
            default: {}
        },
        properties: {
            type: Array,
            default: () => []
        }
    }, data() {
        return {
            all_development: this.data.properties.length <= 0 && this.data.title ? true : false,//Boolean para saber si elige a todo el desarrollo o no
            menu: false,
            code: this.data.real_estate_development.code,
            promotion: JSON.parse(JSON.stringify(this.data)),
            origin: JSON.parse(JSON.stringify(this.data)),
            Rules: [
                v => !!v || 'Campo requerido'
            ],
            valid: true
        }
    }, /*components: {
        selectProperties
    },*/
    created() {
        this.dateFormat();
        //this.listProperties();
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
            //console.log('edit', this.promotion.properties)
            this.promotion = JSON.parse(JSON.stringify(this.origin))
            this.all_development = this.data.properties.length <= 0 ? true : false,
                //console.log('origin', this.origin.properties)
                //console.log('form', this.promotion.real_estate_development.code)

                this.$emit('close', this.origin)
        },
        remove(item) {
            const index = this.promotion.properties.indexOf(item._id)
            if (index >= 0) this.promotion.properties.splice(index, 1)
        },
        reset() {
            this.$refs.form.reset()
            //this.all_development = true;
            //this.promotion.validity = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
        /*listProperties() {
            fetch("http://localhost:3000/api/v2/realEstateDevelopment/propertieslist", {
                method: "POST",
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ real_estate_development_code: this.code })
            }).then(res => res.json()).then(data => { this.properties = data.list; console.log(data) })
        }*/
    }, watch: {
        /*promotion() {
            this.$emit('promo', this.promotion)
            console.log(this.promotion)
        },*/
        all_development() {
            if (this.all_development) this.promotion.properties = []
        },
    },
}
</script>