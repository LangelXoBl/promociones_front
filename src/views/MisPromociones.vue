<template>
  <v-container>
    <!--Esto es unicamente para desarrollo-->
    <v-data-table :headers="headers" :items="promotions" class="elevation-1">
      <template v-slot:top>
        <create :develop="dev" :properties="properties" @update="conect"></create>
      </template>
      <template v-slot:item.discount.quantity="{ item }">
        {{ discountFormat(item.discount.quantity, item.discount.type) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-icon :color="validity(item.validity) ? 'green' : 'red'">
          {{ validity(item.validity) ? 'mdi-checkbox-marked-circle' : 'mdi-alert-circle ' }}
        </v-icon>
        {{ validity(item.validity) ? 'Vigente' : 'Finalizado' }}
      </template>
      <template v-slot:item.aplied="{ item }">
        {{ apliedTo(item.properties) }}
      </template>
      <template v-slot:item.validity="{ item }">
        <!--<v-icon :color="validity(item.validity) ? 'green' : 'red'">
          {{ validity(item.validity) ? 'mdi-checkbox-marked-circle' : 'mdi-cancel' }}
        </v-icon>-->
        {{ dateFormat(item.validity) }}
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ dateFormat(item.createdAt) }}
      </template>
      <v-spacer></v-spacer>
      <template v-slot:item.accions="{ item }">
        <edit :data="item" :properties="properties" @update="conect"></edit>
        <v-btn title="Eliminar" icon fab @click="confirmationDelete(item._id)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!--Dialogo de confirmacion de eliminar-->
    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-card-title class="text-h6">
          Estas seguro de eliminar esta promocion?
        </v-card-title>
        <!--<v-card-text>
              Al eliminar la promotion
            </v-card-text>-->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="delet()">
            Si
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import create from '@/components/crearPromo.vue'
import edit from '@/components/editPromotion.vue'
import moment from 'moment'

export default {
  name: 'Promociones',
  props: {
    //Prop para recibir el code del desarrollo a consultar
    development_code: {
      type: String,
      default: "meliora"
    }
  },
  components: {
    create,
    edit
  },
  data() {
    return {
      dev: this.development_code,
      promotions: [],//Array donde se guardaran las promociones
      properties: [],//se guarda la lista de las propiedades que usa el formulario
      headers: [
        { text: 'Título', align: 'start', sortable: false, value: 'title' },
        { text: 'Estatus', value: 'status', sortable: false, },
        { text: 'Aplicado a', value: 'aplied', sortable: false, },
        { text: 'Descuento', value: 'discount.quantity' },
        { text: 'Vigencia', value: 'validity' },
        { text: 'Creado', value: 'createdAt' },
        { text: 'Acciones', value: 'accions', sortable: false, },
      ],
      dialog: false,
      idDelete: ""
    }
  },
  created() {
    this.conect()
  },
  methods: {
    discountFormat(cant, tipo) {
      if (tipo == 'Fijo') return `$ ${cant.toLocaleString()} `
      else return `${cant} %`
    },
    async delet() {
      //this.dialog = true;
      const body = { promotion_id: this.idDelete }
      //console.log("eliminando", this.idDelete)
      const res = await fetch('http://localhost:3000/api/v2/myPromotions/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      //console.log(data);
      this.conect();
      this.dialog = false
      this.idDelete = ""

    },
    async conect() {//#Este metodo se conectara el API para traer las promociones del desarrollo
      const body = { real_estate_development_code: this.dev/*this.development_code*/ };
      const res = await fetch('http://localhost:3000/api/v2/myPromotions/show/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      })
      this.promotions = await res.json()
      //console.log(this.promotions);
      //trae la lista de las propiedades
      fetch("http://localhost:3000/api/v2/realEstateDevelopment/propertieslist", {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      }).then(res => res.json()).then(data => { this.properties = data.list; /*console.log(data)*/ })
    },
    dateFormat(date) {
      //console.log(date)
      let fecha = new Date(date)
      fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())//Hora ajustada para mostrar al usuario
      return moment(fecha).locale('es-mx').format('DD-MMM-YYYY h:mm a')
    },
    validity(date) {//valida que la promocion no haya vencido
      if (new Date(date) > new Date()) return true
      return false
    },
    apliedTo(properties) {
      if (properties.length != 0) return `${properties.length} propiedades`
      return 'Todo el desarrollo'
    },
    confirmationDelete(id) {
      this.dialog = true;
      this.idDelete = id;
      console.log("Quiere eliminar la promo: ", id)
    }
  }
}
</script>
