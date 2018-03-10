<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-3">live-comment-viewer</h1>
      <div v-if="authStatus === 'checking'">
        Checking login status...
      </div>
      <div v-if="authStatus === 'connected'">
        <router-view :id="id"/>
      </div>
      <div v-if="['not_authorized', 'unknown'].includes(authStatus)">
        <button
          class="button is-link"
          @click="signIn"
        >Sign in with Facebook
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* global FB */

export default {
  name: 'App',
  data: () => ({
    authStatus: 'checking', // checking, connected, notAuthorized
    authResponse: null,
    id: null
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
      this.id = authResponse.userID
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
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
</style>
