<template>
  <v-row>
    <v-col>
      <v-card class="pa-2 rounded-xl elevation-4">
        <v-card-title>
          <v-row>
            <v-col class="text-center">
              <span class="text-center text-h5 font-weight-bold"
                >Upload image for process
              </span>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider> </v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="urltext" label="URL" variant="underlined">
              </v-text-field>
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
                :disabled="!urltext"
                @click="submitUrl()"
              >
                Upload
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
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
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "IndexPage",
  data() {
    return {
      urltext: "",
      test: "Welcome to Your Vue.js App",
      file: null,
      result: [],
      confident: "",
      imageUrl: [],
      maxFileCount: 100,
      load: true,
      show: false,
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
    async submitUrl() {
      this.show = true;
      const payload = { url: this.urltext };
      const reaponse = await axios({
        method: "post",
        url: `http://3.0.102.165:5000/urls/`,
        // url: `http://127.0.0.1:8000/urls`,
        data: payload,
      });

      console.log(reaponse);
      this.value_from_api = reaponse?.data?.result;
      this.load = false;
    },
    onFileChange() {
      if (this.file.length > this.maxFileCount) {
        this.file.splice(this.maxFileCount);
      }
      for (const item of this.file) {
        if (!!this.file) {
          this.imageUrl.push(URL.createObjectURL(item));
        } else {
          this.file = null;
          this.result = [];
          this.confident = "";
          this.imageUrl = [];
        }
      }
      // if (!!this.file) {
      //   this.imageUrl = URL.createObjectURL(this.file)
      // } else {
      //
      // }
    },
    async submitdata() {
      console.log(this.file);
      await this.onFileChange();
      const formData = new FormData();
      for (const item of this.file) {
        console.log(item);
        formData.append("files", item);
      }
      const reaponse = await axios({
        method: "post",
        url: `http://18.143.76.245:5000/files/`,
        data: formData,
      });
      console.log(reaponse);
      this.load = false;

      // formData.append('file', this.file)

      this.result = reaponse?.data?.result;
      // this.confident = reaponse.data.result[1]
    },
    funcClear() {
      window.location.reload();
    },
  },
};
</script>
