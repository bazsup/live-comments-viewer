<template lang="html">
  <div>
    <form @submit="submit($event)">
      <h2 class="title is-5">Please enter your Video ID:</h2>
      <div class="field">
        <p class="control">
          <input
            v-model="videoUrl"
            class="input"
            type="text"
            placeholder="https://www.facebook.com/yourname/videos/___"
            size="50"
          >
        </p>
      </div>
      <div class="field">
        <p class="control">
          <input
            class="button is-primary"
            type="submit"
            value="View comments"
          >
        </p>
      </div>

      <p>This only works with your own videos, or videos posted by pages.</p>
    </form>

    <div v-if="liveVideos.length">
      <h1 class="title is-5 c-margin">Live now
      <i class="live" /></h1>
      <ul>
        <li
          v-for="video in liveVideos"
          :key="video.id"
        >
          <span v-html="video.embed_html"/>
          <router-link
            :to="`/${video.id}/comments`"
            class="button is-danger is-outlined"
          >
            View comments this video
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* global window */
/* global FB */
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      videoUrl: '',
      videos: [],
      liveVideos: []
    }
  },
  created () {
    this.fetchLiveVideos()
  },
  methods: {
    async fetchLiveVideos () {
      const liveVideos = await new Promise(resolve => {
        FB.api(`/${this.id}/live_videos`,
          resolve)
      })
      const liveVids = liveVideos.data.filter((data) => data.status === 'LIVE')
      console.log('liveVideos', liveVids)
      this.liveVideos = liveVids
    },
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
  li {
    border: 1px solid #eee;
    padding: .5em;
  }
  .c-margin {
    margin: 1.5rem 0 .5rem !important;
  }
  iframe {
    width: 240px;
    height: 150px;
  }
  @keyframes bounce {
      0%, 100% {
        box-shadow: 0 0 0 0.3rem rgba(255,0,0,0.3);
        margin-left: 5px;
      }
      40% {
        box-shadow: 0 0 0 0rem rgba(255,0,0,0.1);
      }
  }
  .live {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
    animation: bounce 1s ease-in-out infinite;
    margin-left: 5px;
  }

</style>
