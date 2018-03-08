<template>
  <ul>
    <li v-for="comment in comments" :key="comment.id">
      <strong>{{ comment.from.name }}</strong>
      {{ comment.message }}
    </li>
  </ul>
</template>

<script>
/* global FB */
export default {
  data: () => ({
    loading: true,
    comments: [ ]
  }),
  methods: {
    async fetchComments() {
      this.loading = true
      try {
        const commentsResponse = await new Promise(resolve => {
          FB.api('/video-id/comments', {
            order: 'reverse_chronological',
            live_filter: 'no_filter',
            filter: 'stream'
          }, resolve)
        })
        this.comments = commentsResponse.data
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    this.comments = [ { from: { name: 'Bas' }, message: 'helloworld' },
                      { from: { name: 'Bas2' }, message: 'test' }
                    ]
    // this.fetchComments()
  }
}
</script>

<style scoped>

</style>


