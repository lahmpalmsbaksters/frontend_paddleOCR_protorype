<template>
  <v-container class="pa-4 text-center">
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

                  <div>
                    <p
                      class="ma-0 text-body-1 font-weight-bold font-italic text-left"
                    >
                      {{ item.text }}
                    </p>
                    <p
                      class="text-caption font-weight-medium font-italic text-left"
                    >
                      resss
                    </p>
                  </div>

                  <div class="align-self-center">
                    <v-btn
                      v-for="(icon, index) in icons"
                      :key="index"
                      :class="{ 'show-btns': hover }"
                      :color="transparent"
                      icon
                    >
                      <v-icon
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                      >
                        {{ icon }}
                      </v-icon>
                    </v-btn>
                  </div>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
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
  }),
  methods: {
    test() {
      console.log("sss");
    },
  },
};
</script>
