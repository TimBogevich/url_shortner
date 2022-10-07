<template>
<v-container>
  <v-row class="justify-center mt-5 pa-5">
    <v-card width="500" flat>
      <v-row class="ma-0">
        Link
      </v-row>
      <v-row class="ma-0">
        <v-text-field v-if="!shorten" v-model="urlOrig" :error="isUrlValid || !urlOrig  ? false: true" color="red'" label="insert your URL" />
        <v-text-field v-else v-model="urlShorten" readonly label="insert your URL"></v-text-field>
      </v-row>
      <v-row class="ma-0 align-center">
        <v-checkbox v-if="!shorten" :disabled='!isUrlValid' :ripple="isUrlValid" label="Shorten URL" :value="false" readonly @click='processUrl'>
        </v-checkbox>
        <v-checkbox v-else :disabled='!urlOrig' label="Shorten URL" :value="true" readonly @click='shorten=false'>
        </v-checkbox>
        <v-spacer></v-spacer>
        <v-btn text :disabled="!shorten" @click="cancelAll">Cancel</v-btn>
        <v-btn outlined color="primary" :disabled="!shorten" class='ml-1' text width="100" @click="copyUrl">
          <Transition name="fade">
            <span v-if="!copied">
              Copy
            </span>
            <v-icon v-else>
              mdi-check-circle
            </v-icon>
          </Transition>
        </v-btn>
      </v-row>
    </v-card>
  </v-row>
</v-container>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import isUrl from 'url-validation';

export default defineComponent({

  data() {
    return {
      shorten: false,
      urlOrig: '',
      encryptedUrl: '',
      copied: false,
    }
  },
  computed: {
    server() {
      return window.location.origin
    },
    urlShorten() {
      return new URL(this.encryptedUrl, this.server)
    },
    isUrlValid() {
      return isUrl(this.urlOrig)
    }
  },
  methods: {
    async processUrl() {
      if (!this.isUrlValid) return
      try {
        const {
          data
        } = await this.$axios.post('api/encode-url', {
          urlOrig: this.urlOrig
        })
        this.encryptedUrl = data
        this.shorten = true

      } catch (error) {
        throw new Error(error);

      }
    },
    cancelAll() {
      this.shorten = false;
      this.urlOrig = '';
      this.encryptedUrl = '';
      this.copied = false;
    },
    copyUrl() {
      navigator.clipboard.writeText(this.urlShorten)
      this.copied = true
    }
  },
})
</script>

<style>
.fade-enter-active {
  animation: bounce-in 0.5s;
  position: absolute;
}

.fade-leave-active {
  animation: bounce-in 0.5s reverse;
  position: absolute;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

button {
  text-transform: none !important;
}
</style>
