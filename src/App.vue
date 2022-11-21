<template>
  <v-app>
    <div>
      <v-toolbar style="background-color: #262d3c;" dark height="48px">
        <v-toolbar-title>Promociones</v-toolbar-title>
      </v-toolbar>
      <v-main>
        <router-view />
      </v-main>
    </div>
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
