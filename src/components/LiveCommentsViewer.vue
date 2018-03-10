<template>
  <div>
    <button
      :disabled="loading"
      class="button"
      @click="refresh">
      Refresh
    </button>
    <button
      style="margin-left: 10px;"
      class="button is-danger is-outlined"
      @click="logout"
    >logout
    </button>
    <p><b><u>NOTE:</u></b> Click on a comment to view it in full screen</p>
    <ul v-if="!loading">
      <li
        v-for="comment in comments"
        :key="comment.id"
        @click="fullscreen($event.currentTarget)"
      >
        <div class="inline">
          <strong v-if="getName(comment)">
            {{ comment.from.name }}
          </strong>
          <span
          >{{ comment.message }}</span>
        </div>
        <div class="right">
          <a
            :href="'https://facebook.com/' + comment.id"
            target="_blank"
            class="button is-outlined is-link is-small"
          >link to comment</a>&nbsp;
          <small>
            {{ time(comment.created_time) }}
          </small>
        </div>
        <span class="clear-float" />
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
    getName (comment) {
      return comment.from && comment.from.name
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
    clear: both;
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

  li:fullscreen .right {
    color: #bef;
    display: none;
  }

  .right {
    float: right;
    position: relative;
    z-index: 2;
  }
  .inline {
    display: inline-block;
  }
  .clear-float {
    clear: both;
    display:block;
  }
</style>
