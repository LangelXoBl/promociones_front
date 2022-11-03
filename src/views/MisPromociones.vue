<template>
  <v-container>
    <h2>Mis promociones</h2>
    <!--<router-link to="create">
      <v-btn class="mx-2" dark small color="indigo">
        <v-icon dark>mdi-plus</v-icon> nuevo
      </v-btn>
    </router-link>-->
    <crear :develop="development"></crear>
    <input type="text" name="" id="" v-model="development">
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
        <tr v-for="promocion in promociones" :key="promocion._id">
          <td>{{ promocion.titulo }}</td>
          <td>{{ descuento(promocion.descuento.cantidad, promocion.descuento.tipo) }}</td>
          <td>{{ formDate(promocion.vigencia) }}</td>
          <td>{{ formDate(promocion.createdAt) }}</td>
          <formulario :promo="JSON.parse(JSON.stringify(promocion))" tipo="edit"></formulario>
          <v-btn class="mx-2" color="red" fab small dark v-on:click="delet(promocion._id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </v-simple-table>

  </v-container>
</template>

<script>
import formulario from '../components/formPromocione.vue'
import crear from '@/components/crearPromo.vue'

export default {
  name: 'Promociones',
  data() {
    return {
      promociones: [],
      development: "meliora"
    }
  },
  components: {
    formulario,
    crear
  },
  created() {
    this.conect()
  },
  methods: {
    descuento(cant, tipo) {
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
    async conect() {
      const body = { development_code: this.development };
      const res = await fetch('http://localhost:3000/api/v2/myPromotions/show/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(body)
      })
      this.promociones = await res.json()
      console.log(this.promociones);
    },
    formDate(date) {
      return new Date(date).toLocaleDateString()
      //return date.split('T')[0]
    }
  }
}
</script>
