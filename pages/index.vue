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
        <v-card-text>
          <v-row v-for="(img, index) in imageUrl" :key="index">
            <v-col :cols="12">
              <v-card>
                <v-img class="my-4" :src="img" height="cover" />
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <span class="font-weight-bold">
                        File name : {{ file[index]?.name }}
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <span class="font-weight-bold">
                        result : {{ result[index] }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!-- <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <h1>{{ test }}</h1>
        <v-file-input
          v-model="file"
          truncate-length="15"
          multiple
          @click:clear="funcClear()"
        ></v-file-input>
      </v-col>
      <v-col>
        <v-btn elevation="2" @click="submitdata()" :disabled="!this.file"
          >UPLOAD</v-btn
        >
      </v-col>
    </v-row>
    <v-row v-for="(img, index) in imageUrl" :key="index">
      <v-col :cols="12">
        <v-card>
          <v-img class="my-4" :src="img" height="cover" />
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <span class="font-weight-bold">
                  File name : {{ file[index]?.name }}
                </span>
              </v-col>
              <v-col cols="12">
                <span class="font-weight-bold">
                  result : {{ result[index] }}
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
  name: "IndexPage",
  data() {
    return {
      test: "Welcome to Your Vue.js App",
      file: null,
      result: [],
      confident: "",
      imageUrl: [],
      maxFileCount: 100,
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
        url: `http://122.248.230.51:5000/files/`,
        data: formData,
      });
      console.log(reaponse.data.result);

      // formData.append('file', this.file)

      this.result = reaponse.data.result;
      // this.confident = reaponse.data.result[1]
    },
    funcClear() {
      window.location.reload();
    },
  },
};
</script>
