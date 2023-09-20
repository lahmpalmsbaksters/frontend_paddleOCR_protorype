<template>
  <div>
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
      <!-- <v-img v-if="imageUrl" :src="imageUrl" max-width="300" max-height="300" /> -->
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
    <!-- <v-row>
      <v-col>
        <h1>
          TEXT : <span class="red--text">{{ result }}</span>
        </h1>
      </v-col>
      <v-col>
        <h1>
          Confident : <span class="red--text"> {{ confident }} </span>
        </h1>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  data() {
    return {
      test: 'Welcome to Your Vue.js App',
      file: null,
      result: [],
      confident: '',
      imageUrl: [],
      maxFileCount: 100,
    }
  },
  watch: {
    file: {
      handler(val) {
        console.log(val)
      },
      deep: true,
    },
  },
  methods: {
    onFileChange() {
      if (this.file.length > this.maxFileCount) {
        this.file.splice(this.maxFileCount)
      }
      for (const item of this.file) {
        if (!!this.file) {
          this.imageUrl.push(URL.createObjectURL(item))
        } else {
          this.file = null
          this.result = []
          this.confident = ''
          this.imageUrl = []
        }
      }
      // if (!!this.file) {
      //   this.imageUrl = URL.createObjectURL(this.file)
      // } else {
      //
      // }
    },
    async submitdata() {
      console.log(this.file)
      await this.onFileChange()
      const formData = new FormData()
      for (const item of this.file) {
        console.log(item)
        formData.append('files', item)
      }
      const reaponse = await axios({
        method: 'post',
        url: `http://127.0.0.1:8000/files/`,
        data: formData,
      })
      console.log(reaponse.data.result)

      // formData.append('file', this.file)

      this.result = reaponse.data.result
      // this.confident = reaponse.data.result[1]
    },
    funcClear() {
      window.location.reload()
    },
  },
}
</script>
