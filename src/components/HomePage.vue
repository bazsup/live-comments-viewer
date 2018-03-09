<template lang="html">
  <form @submit="submit($event)">
    <h2>Please enter your Video ID:</h2>
    <input
      v-model="videoUrl"
      type="text"
      placeholder="https://www.facebook.com/yourname/videos/___"
      size="50">
    <input
      type="submit"
      value="View comments" >
    <p>This only works with your own videos, or videos posted by pages.</p>
  </form>
</template>

<script>
/* global window */
export default {
  data () {
    return {
      videoUrl: ''
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      const { videoUrl } = this

      if (videoUrl.match(/^\d+$/)) {
        return this.viewComments(videoUrl)
      }
      const m = videoUrl.match(/videos(?:\/[^/]+)?\/(\d+)(?:\/|\?|$)/) // pattern video/video_id
      if (m) {
        return this.viewComments(m[1])
      }
      window.alert(`Invalid URL format. Please make sure your URL is in format of
      https://facebook.com/youruser/video_url`)
    },
    viewComments (videoId) {
      this.$router.push(`/${videoId}/comments`)
    }
  }
}
</script>

<style lang="css">
</style>
