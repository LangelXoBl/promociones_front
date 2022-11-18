<template>
  <v-container>
    <h2>Mis promociones</h2>
    <!--<router-link to="create">
      <v-btn class="mx-2" dark small color="indigo">
        <v-icon dark>mdi-plus</v-icon> nuevo
      </v-btn>
    </router-link>-->
    <create :develop="development_code" @actu="conect"></create>
    <!--Esto es unicamente para desarrollo-->
    <input type="text" name="" id="" v-model="development_code">
    <button @click="conect">buscar</button>
    <v-simple-table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descuento</th>
          <th>Vigencia</th>
          <th>Creado</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="promotion in promotions" :key="promotion._id">
          <td>{{ promotion.title }}</td>
          <td>{{ discountFormat(promotion.discount.quantity, promotion.discount.type) }}</td>
          <td>{{ dateFormat(promotion.validity) }}</td>
          <td>{{ dateFormat(promotion.createdAt) }}</td>
          <edit :data="promotion" @actu="conect"></edit>
          <v-btn class="mx-2" color="red" fab small dark @click="delet(promotion._id)">
            <v-icon>mdi-delete</v-icon>
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
  data() {
    return {
      promotions: [],//Array donde se guardaran las promociones
    }
  },
  components: {
    create,
    edit
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
      console.log(data);
      this.conect();
    },
    async conect() {//#Este metodo se conectara el API para traer las promociones del desarrollo
      const body = { real_estate_development_code: this.development_code };
      const res = await fetch('http://localhost:3000/api/v2/myPromotions/show/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      })
      this.promotions = await res.json()
      console.log(this.promotions);
    },
    dateFormat(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
