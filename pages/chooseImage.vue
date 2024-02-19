<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" v-for="(item, i) in items" :key="i">
        <v-hover v-slot="{ hover }">
          <v-card
            @onclick="test()"
            class="rounded-xl"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
          >
            <v-img :src="item.img" :aspect-ratio="16 / 9" />
            <v-card-text class="px-4">
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
    </v-row>
    <v-row>
      <v-col cols="12">
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
            <v-row class="text-center">
              <v-col :cols="12">
                <v-card>
                  <v-img class="my-4" :src="urltext" :aspect-ratio="16 / 9" />
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
                          :items="!!value_from_api ? value_from_api : []"
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
      </v-col>
    </v-row>
  </div>
  <!-- <v-row class="fill-height">
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
            <v-card-text class="px-4">
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
    <v-col cosl="12">
      <template>
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
                          :items="!!value_from_api ? value_from_api : []"
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
      </template>
    </v-col>
  </v-row> -->
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
        title: "Plain text",
        text: "Plain text",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/monitor_.png",
      },
      {
        title: "Text on product",
        text: "Text on product",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/bestbefore_BK.png",
      },
      {
        title: "Text on electrolytic capacitor",
        text: "Text on electrolytic capacitor",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/CE85T.png",
      },
      {
        title: "Text on electrolytic capacitor",
        text: "Text on electrolytic capacitor",
        img: "https://storage.googleapis.com/medical-alarm/ocrdata/KE43M_.jpg",
      },
      // {
      //   title: "Text on computer hardware",
      //   text: "Text on computer hardware",
      //   img: "https://storage.googleapis.com/medical-alarm/ocrdata/Ryzen3pro2100ge-ph-gerald.jpg",
      // },
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
        url: `${process.env.PADDLEOCR_URL}/urls/`,
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
