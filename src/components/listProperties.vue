<template>
    <v-container>
        <v-card v-if="properties.length > 0">
            <v-card-title primary-title>
                Propiedades: {{ develop }}
            </v-card-title>
            <template>
                <v-card-text>
                    Propiedades selecionadas:{{ selection.length }}
                </v-card-text>

                <v-treeview v-model="selection" selectable :items="properties"></v-treeview>
            </template>
        </v-card>
        <div v-else> Cargando propiedades...</div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            properties: [],
            selection: [...this.unitys]
        }
    },
    props: {
        develop: {
            type: String,
            default: ""
        },
        unitys: {
            type: Array,
            default: []
        }
    },
    created() {
        fetch("http://localhost:3000/api/v2/realEstateDevelopment/order/floor", {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ real_estate_development_code: this.develop })
        }).then(res => res.json()).then(data => this.properties = data)
    },
    beforeUpdate() {
        this.$emit('propertiesSelec', this.selection)
        console.log(this.selection)
    }
}
</script>