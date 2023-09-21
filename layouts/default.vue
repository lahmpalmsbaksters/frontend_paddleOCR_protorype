<template>
  <v-app>
    <v-app-bar absolute elevation="4" app color="primary">
      <v-row>
        <v-col cols="12" class="text-center">
          <v-app-bar-title class="white--text text-center">
            <span class="text-h4">Finalscan</span>
            <span>( Panel check)</span>
          </v-app-bar-title>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
