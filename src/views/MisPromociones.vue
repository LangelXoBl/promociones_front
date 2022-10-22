<template>
  <v-container>
    <h2>Mis promociones</h2>
    <v-btn class="mx-2" dark small color="indigo">
      <v-icon dark>
        mdi-plus
      </v-icon>
      nuevo
    </v-btn>
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
          <td>{{ promocion.titulo}}</td>
          <td>{{desc(promocion.descuento.cantidad,promocion.descuento.tipo)}}</td>
          <td>{{ new Date(promocion.vigencia).toLocaleDateString()}}</td>
          <td>{{ new Date(promocion.createdAt).toLocaleDateString()}}</td>
          <formulario :promo="promocion"></formulario>
          <v-btn class="mx-2" color="red" fab small dark>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </v-simple-table>

  </v-container>
</template>

<script>
import formulario from '../components/formPromocione.vue'

export default {
  name: 'Promociones',
  data() {
    return {
      promociones: []
    }
  },
  components: {
    formulario
  },
  created() {
    fetch('http://localhost:3000/api/v2/myPromotions/show/all?desarrollo=the-boat', { method: 'POST' })
      .then(res => res.json())
      .then(data => this.promociones = data)
  },
  methods: {
    desc(cant, tipo) {
      if (tipo == 'Fijo') {
        return `$ ${cant.toLocaleString()} `
      } else return `${cant} %`
    }
  },
}
</script>
