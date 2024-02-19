<template>
  <v-row>
    <v-col>
      <v-card class="pa-2 rounded-xl elevation-4">
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <span class="text-center text-h5 font-weight-bold"
                >Upload Image for Gauge Detection
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider> </v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-file-input
                v-model="file"
                truncate-length="15"
                multiple
                @click:clear="funcClear()"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col class="text-center">
              <span class="text-center text-h6">
                {{ !!file ? file.length : 0 }} files selected
              </span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                class="rounded-xl"
                block
                color="primary"
                @click="submitdata()"
                :disabled="!this.file"
                >Upload</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-card class="my-6 rounded-xl pa-2" v-if="imageUrl.length != 0">
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <span> Result </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-if="load == false">
          <v-row v-for="(img, index) in imageUrl" :key="index">
            <v-col :cols="12">
              <v-card>
                <v-row>
                  <v-col :cols="6">
                    <v-img class="my-4" :src="previewImageurl" :width="400" />
                  </v-col>
                  <v-col :cols="6">
                    <v-img class="my-4" :src="img" :width="400" />
                  </v-col>
                </v-row>

                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <span class="font-weight-bold">
                        File name : {{ file[index]?.name }}
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <p class="font-weight-bold">
                        Angle : {{ result?.angle_blue }}
                        <!-- <li v-for="face in result">
                          {{ face }}
                        </li> -->
                      </p>
                      <p class="font-weight-bold">
                        Position : {{ result?.position_text }}
                      </p>
                      <p class="font-weight-bold">
                        Quadrant : {{ result?.quadrant_text }}
                      </p>
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
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      test: "Face Detection",
      file: null,
      result: [],
      confident: "",
      imageUrl: [],
      maxFileCount: 100,
      load: true,
      previewImageurl: "",
    };
  },
  watch: {
    file: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
  methods: {
    onFileChange() {
      if (this.file && this.file.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImageurl = e.target.result;
        };
        reader.readAsDataURL(this.file[0]);
      }
    },
    async submitdata() {
      console.log(this.file);
      await this.onFileChange();
      const formData = new FormData();
      for (const item of this.file) {
        console.log(item);
        formData.append("file", item);
      }

      const response = await this.$axios.post(
        `${process.env.GAUGEDETECT_URL}/process_image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response.data.data);

      const base64Image = response?.data?.data?.processed_image;
      if (base64Image) {
        const img = new Image();
        img.src = "data:image/png;base64," + base64Image;

        img.onload = () => {
          this.imageUrl.push(img.src);
        };
      }

      this.load = false;
      this.result = response?.data?.data;
    },
    funcClear() {
      window.location.reload();
    },
  },
};
</script>
