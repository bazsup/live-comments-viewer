<template lang="html">
  <LiveCommentsviewer :video-id="videoId" />
</template>

<script>
import LiveCommentsviewer from './LiveCommentsViewer'

export default {
  components: {
    LiveCommentsviewer
  },
  computed: {
    videoId () {
      return this.$route.params.id
    }
  }
}
</script>

<style lang="css">
</style>
