<template>
  <v-row class="fill-height" align="center" justify="center">
    <template v-for="(item, i) in items">
      <v-col :key="i" cols="12" md="4">
        <v-hover v-slot="{ hover }">
          <v-card
            @onclick="test()"
            class="rounded-xl"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-img :src="item.img" :aspect-ratio="16 / 9" />
            <v-card-text>
              <v-row class="fill-height flex-column" justify="space-between">
                <p class="mt-4 subheading text-left">
                  {{ item.title }}
                </p>
                <p
                  class="ma-0 text-body-1 font-weight-bold font-italic text-left"
                >
                  {{ item.text }}
                </p>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="primary"
                class="rounded-xl"
                @click="callApi(item.img)"
                >result</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </template>
    <v-card class="my-6 rounded-xl pa-2" v-if="show == true">
      <v-card-title>
        <v-row>
          <v-col class="text-center">
            <span> Result </span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="load == false">
        <v-row>
          <v-col :cols="12">
            <v-card>
              <v-img class="my-4" :src="urltext" height="cover" />
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <span class="font-weight-bold">
                      File name : {{ urltext }}
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <v-data-table
                      :headers="headers"
                      :items="value_from_api"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <v-skeleton-loader type="article, actions"></v-skeleton-loader>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "InspirePage",
  data: () => ({
    icons: ["mdi-rewind", "mdi-play", "mdi-fast-forward"],
    items: [
      {
        title: "Panel LED",
        text: `Panel LED`,
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/1.png",
      },
      {
        title: "OCR A",
        text: "OCR A",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/ocr-font-_ocra.fit_lim.size_1050x.jpg",
      },

      {
        title: "Plain text",
        text: "Plain text",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/testocr.png",
      },
    ],
    transparent: "rgba(255, 255, 255, 0)",
    load: true,
    show: false,
    urltext: "",
    headers: [
      {
        text: "result",
        align: "start",
        sortable: false,
        value: "result",
      },
      { text: "confident", value: "confident" },
    ],
    value_from_api: [],
  }),
  methods: {
    async callApi(url) {
      this.load = true;
      this.urltext = url;
      this.show = true;
      const payload = { url };
      const reaponse = await axios({
        method: "post",
        url: `http://122.248.230.51:5000/urls/`,
        // url: `http://127.0.0.1:8000/urls`,
        data: payload,
      });

      console.log(reaponse);
      this.value_from_api = reaponse?.data?.result;
      this.load = false;
    },
  },
};
</script>
