<template>
  <v-container>
    <create :develop="dev" :properties="properties" @actu="conect"></create>
    <!--Esto es unicamente para desarrollo-->
    <input type="text" name="" id="" v-model="dev">
    <button @click="conect">buscar</button>
    <v-simple-table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descuento</th>
          <th>Vigencia</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="promotion in promotions" :key="promotion._id">
          <td class="font-weight-bold">{{ promotion.title }}</td>
          <td>{{ discountFormat(promotion.discount.quantity, promotion.discount.type) }}</td>
          <td>{{ dateFormat(promotion.validity) }}</td>
          <td>{{ dateFormat(promotion.createdAt) }}</td>
          <edit :data="promotion" :properties="properties" @actu="conect"></edit>
          <v-btn title="Eliminar" icon class="mx-1" fab small @click="delet(promotion._id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </v-simple-table>
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
      properties: []
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
      return new Date(date).toLocaleDateString()
    },
  }
}
</script>
