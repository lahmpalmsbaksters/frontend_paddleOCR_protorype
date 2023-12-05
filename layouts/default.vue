<template>
  <v-app>
    <v-app-bar absolute elevation="4" app color="primary">
      <v-toolbar-title class="white--text"
        ><span class="text-h4">Smartvison</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="white"
        dark
        v-bind="attrs"
        v-on="on"
        @click="opennewwindow('http://www.baksters.com')"
      >
        Home
      </v-btn>
      <div class="text-center mr-12">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" dark v-bind="attrs" v-on="on">
              Projects
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title @click="$router.push(item.url)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
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
      items: [
        { title: "Optical Character Recognition", url: "/" },
        { title: "People Detection", url: "/people" },
        { title: "Face Detection", url: "/face" },
        { title: "Gender Classification", url: "/genderclassification" },
      ],
    };
  },
  methods: {
    opennewwindow(url) {
      console.log(url);
      window.location.href = url;
    },
  },
};
</script>
