<template>
    <v-card>
        <v-form>
            <v-container>
                <v-autocomplete v-model="selected" :items="properties" filled chips color="blue-grey lighten-2"
                    label="Propiedades" item-text="code" item-value="_id" multiple>
                    <template v-slot:selection="data">
                        <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select"
                            @click:close="remove(data.item)">
                            {{ data.item.code }}
                            {{ data.item.floor }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template>
                            <v-list-item-content>
                                <v-row>
                                    <v-col>
                                        <v-list-item-title v-html="data.item.code"></v-list-item-title>
                                        <v-list-item-subtitle v-html="data.item.floor"></v-list-item-subtitle>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col>
                                        <v-list-item-subtitle v-html="`Promos aplicadas:${data.item.promos}`">
                                        </v-list-item-subtitle>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </template>
                    </template>
                </v-autocomplete>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
export default {
    props: {
        //prop para hacer la peticion de las propiedades a la API
        development_code: {
            type: String,
            default: 'meliora'
        },
        //Son las propiedades que el formulario le manda
        propertieSelect: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            properties: [],//Es donde se guardan las propiedades que devuelve el API
            selected: this.propertieSelect//Es donde se guardan las propiedades seleccionadas
        }
    },
    created() {
        fetch("http://localhost:3000/api/v2/realEstateDevelopment/propertieslist", {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ real_estate_development_code: this.development_code })
        }).then(res => res.json()).then(data => { this.properties = data.list; console.log(data.list) })
    },
    watch: {
        selected() {
            console.log('propertiesSelect', this.propertieSelect)
            this.$emit('selected', this.selected)
            console.log(this.selected)
        }
    },
    methods: {
        remove(item) {
            const index = this.selected.indexOf(item._id)
            if (index >= 0) this.selected.splice(index, 1)
        },
    },
}
</script>