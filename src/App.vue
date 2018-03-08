<template>
  <div id="app">
    <h1>live-comment-viewer</h1>
    <div v-if="authStatus === 'checking'">
      Checking login status...
    </div>
    <div v-if="authStatus === 'connected'">
      <live-comments-viewer />
    </div>
    <div v-if="['not_authorized', 'unknown'].includes(authStatus)">
      <button @click="signIn">Sign in with Facebook</button>
    </div>

  </div>
</template>

<script>
/* global FB */
import LiveCommentsViewer from './components/LiveCommentViewer'

export default {
  name: 'App',
  components: {
    LiveCommentsViewer
  },
  data: () => ({
    authStatus: 'checking', // checking, connected, notAuthorized
    authResponse: null
  }),
  async created () { // ถูกรันครั้งเดียว
    const FB = await window.facebookSDKPromise
    FB.Event.subscribe(
      'auth.authResponseChange',
      this.onAuthResponseChange
    )
    FB.Event.subscribe(
      'auth.statusChange',
      this.onStatusChange
    )

    FB.getLoginStatus(res => {
      this.onAuthResponseChange(res)
      this.onStatusChange(res)
    })
  },
  methods: {
    async signIn () {
      const result = await new Promise(resolve => {
        FB.login(resolve, { scope: 'user_videos' })
      })
      console.log('Login result', result)
    },
    onAuthResponseChange ({ authResponse }) { // extract authResponse from event
      console.log('onAuthResponseChange', authResponse && authResponse.userID)
    },
    onStatusChange ({ status }) {
      console.log('onStatusChange', status)
      this.authStatus = status
    }
  }
}
</script>

<style>
</style>
