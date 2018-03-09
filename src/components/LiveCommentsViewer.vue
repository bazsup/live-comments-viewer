<template>
  <div>
    <button
      :disabled="loading"
      class="button"
      @click="refresh">
      Refresh
    </button>
    <button
      @click="logout"
      class="button is-danger is-outlined"
      style="margin-left: 10px;"
    >logout
    </button>
    <p><b><u>NOTE:</u></b> Click on a comment to view it in full screen</p>
    <ul v-if="!loading">
      <li
        v-for="comment in comments"
        :key="comment.id"
        @click="fullscreen($event.currentTarget)"
      >
        <strong>{{ comment.from.name }}</strong>
        {{ comment.message }}
        <small>{{ time(comment.created_time) }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
/* global FB */
import moment from 'moment'

export default {
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: true,
    comments: []
  }),
  created () {
    this.fetchComments()
    this.refreshInterval = setInterval(
      () => this.fetchComments(),
      15000
    )
  },
  beforeDestroy () {
    clearInterval(this.refreshInterval)
  },
  methods: {
    refresh () {
      this.fetchComments()
    },
    logout () {
      FB.logout()
    },
    fullscreen (el) {
      el.webkitRequestFullscreen()
    },
    time (time) {
      return moment(time).format('DD MMM YYYY, hh:mm:ss a')
    },
    async fetchComments () {
      this.loading = true
      try {
        const commentsResponse = await new Promise(resolve => {
          FB.api(`/${this.videoId}/comments`, {
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
  ul {
    border: 1px solid #eee;
    margin: 1em 0;
  }

  li:not(:first-child) {
    border-top: 1px solid #eee;
  }

  li {
    padding: 0.5em;
  }

  li:fullscreen {
    font-size: 70px;
    background: black;
    color: #e9e8e7;
    border: 0;
    text-align: center;
  }

  li:fullscreen strong {
    color: #bef;
    display: block;
  }

  li:fullscreen small {
    color: #bef;
    display: none;
  }

  li small {
    float: right;
  }

  .level {
    margin-bottom: 0;
  }
</style>
