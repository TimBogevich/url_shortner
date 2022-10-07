<template>
  <v-container>
    {{urlOrig}}
    <v-row class="justify-center mt-5 pa-5">
      <v-card width="500" flat>
        <v-row class="ma-0">
          <v-text-field 
          v-if="!shorten"
          solo name="name" v-model="urlOrig" label="insert your URL"></v-text-field>
          <v-text-field
          readonly
          v-else
          solo name="name" v-model="urlShorten" label="insert your URL"></v-text-field>
        </v-row>
        <v-row class="ma-0 align-center">
          <v-checkbox
            v-if="!shorten"
            :disabled='!urlOrig'
            label="Shorten URL"
            :value="false"
            readonly
            @click='processUrl' >
          </v-checkbox>
          <v-checkbox
            v-else
            :disabled='!urlOrig'
            label="Shorten URL"
            :value="true"
            readonly
            @click='processUrl' >
          </v-checkbox>
          <v-spacer></v-spacer>
          <v-btn text>Cancel</v-btn>
          <v-btn class='ml-1' text>Copy</v-btn>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'


export default defineComponent({

  data() {
    return {
      shorten: false,
      urlOrig: '',
      urlShorten: '',
    }
  },
  methods: {
    async processUrl() {
      try {
        const {data} = await this.$axios.post('api/short-url', {urlOrig: this.urlOrig})
        this.urlShorten = data
        this.shorten = true

      } catch (error) {

      }
    }
  },
})
</script>
