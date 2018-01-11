<template>
  <div id="app" v-loading.fullscreen="loading" >
    <router-view v-on:loading="handleLoading"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: false
    }
  },
  methods: {
     handleLoading(loading) {
       this.loading = loading;
     } 
  },
}
</script>

<style>
#app {
  font-family: Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
