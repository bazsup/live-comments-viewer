<template>
  <div>
    <button
      :disabled="loading"
      @click="refresh"
    >
      Refresh
    </button>
    <ul v-if="!loading">
      <li
        v-for="comment in comments"
        :key="comment.id">
        <strong>{{ comment.from.name }}</strong>
        {{ comment.message }}
      </li>
    </ul>
  </div>
</template>

<script>
/* global FB */
export default {
  data: () => ({
    loading: true,
    comments: [ ]
  }),
  created () {
    this.fetchComments()
  },
  beforeDestroy () {
    /* ignore this cycle */
  },
  methods: {
    refresh () {
      this.fetchComments()
    },
    async fetchComments () {
      this.loading = true
      try {
        const commentsResponse = await new Promise(resolve => {
          FB.api('/1465763256804241/comments', {
            order: 'reverse_chronological',
            live_filter: 'no_filter',
            filter: 'stream'
          }, resolve)
        })
        console.log(commentsResponse)
        this.comments = commentsResponse.data
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
