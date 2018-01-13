<template>
  <div class="home-page">
    <navigation-bar/>
    <router-view></router-view>
  </div>
</template>


<script>
let axios = require('axios')
import NavigationBar from '@/components/utils/NavigationBar'
export default {
  components: {
    NavigationBar,
  },
  created() {
    let test = this.$cookie.get('nowuser')
    // console.log('she  ' + test)
    if(test !== null) {
      axios.get('/api/users/' + base64decode(test) + '/').then(res => {
        let data = res.data
        let nowuser = {
          name: data.username,
          id: data.id
        }
        this.$store.commit('login', nowuser)
      })
    }
  },
  data() {
    return {
    }
  }
}
</script>


<style scoped>
.home-page {
  width: 100%;
  background-color: #f4f4f3;

}
.home-page div:last-child {
  /* margin-top: 80px; */
}
</style>
