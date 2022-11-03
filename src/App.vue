<template>
  <v-app>
    <v-app-bar app color="grey darken-4" dark>
      <div class="d-flex align-center">
        <h1>Promociones-CRUD</h1>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
