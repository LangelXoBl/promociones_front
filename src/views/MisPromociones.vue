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
      <!--<template v-slot:item.status="{ item }">
        {{  }}
      </template>-->
      <template v-slot:item.validity="{ item }">
        {{ dateFormat(item.validity) }}
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ dateFormat(item.createdAt) }}
      </template>
      <v-spacer></v-spacer>
      <template v-slot:item.accions="{ item }">
        <edit :data="item" :properties="properties" @update="conect"></edit>
        <v-btn title="Eliminar" icon fab @click="delet(item._id)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import create from '@/components/crearPromo.vue'
import edit from '@/components/editPromotion.vue'

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
        //{ text: 'Estatus', value: 'status' },
        { text: 'Descuento', value: 'discount.quantity' },
        { text: 'Vigencia', value: 'validity' },
        { text: 'Creado', value: 'createdAt' },
        { text: 'Acciones', value: 'accions', sortable: false, },
      ],
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
    async delet(id) {
      const body = { promotion_id: id }
      const res = await fetch('http://localhost:3000/api/v2/myPromotions/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      //console.log(data);
      this.conect();
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
      date = date.split('T')[0];
      return date
    },
  }
}
</script>
