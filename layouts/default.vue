<template>
  <v-app>
    <v-app-bar absolute elevation="4" app color="primary">
      <v-toolbar-title class="white--text"
        ><span class="text-h4">Finalscan</span>
        <span>( Panel check)</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="white--text" @click="$router.push('/')">
        upload Image
      </v-btn>
      <v-btn text class="white--text" @click="$router.push('/url')">
        upload url
      </v-btn>
      <v-btn text class="white--text" @click="$router.push('/chooseImage')">
        example image
      </v-btn>
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
