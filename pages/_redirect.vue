<template>
<div>
  <v-row class="justify-center mt-5">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-row>

  <v-row class="justify-center mt-5">
    Redirecting
  </v-row>
</div>
</template>

<script>
export default {
  computed: {
    encodedUrl() {
      return window.location.pathname.replaceAll('/', '')
    }
  },
  async mounted() {
    try {
      await this.$axios.post('/api/decode-url', {
          encodedUrl: this.encodedUrl
        })
        .then(({
          data
        }) => {
          window.location.href = data
        })
    } catch (error) {
      this.$router.push({
        path: '/error'
      })
    }

  },
}
</script>

<style lang="">
  
</style>
