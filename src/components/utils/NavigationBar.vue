<template>
  <div class="nav">
    <el-menu :default-active="1" class="el-menu-demo" mode="horizontal">
      <span class="left-nav">
        <search-frame/>
        <el-menu-item index="1"><i class="iconfont icon-process"></i>首页</el-menu-item>
      </span>
      <span class="right-nav">
        <router-link to='/'>
          <el-menu-item index="2">首页</el-menu-item>
        </router-link>
        <el-submenu index="3" v-if="islogin">
          <template slot="title">{{nowuser.name}}</template>

          <router-link to='/profile'>
          <el-menu-item index="3-1">个人中心</el-menu-item>
          </router-link>

          <el-menu-item @click="logout" index="4">注销</el-menu-item>
        </el-submenu>
        <el-menu-item v-else @click="login" index="5">登陆</el-menu-item>
      </span>
    </el-menu>
  </div>
</template>

<script>
let axios = require('axios');
import SearchFrame from '@/components/search/SearchFrame'
  export default {
    components: {
      SearchFrame
    },
    data() {
      return {
        nowuser:'',
        islogin: false
      }
    },
    mounted() {
      setTimeout( ()=> {
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        console.log('nownnnnnn  ' + this.nowuser.name)
      }, 200)
    },
    methods: {
      login: function() {
        console.log('login')
        this.$router.push('/signin')
      },
      logout: function() {
        this.$store.commit('logout')
        axios.get('/api/logout/').then(res => {
          let data = res.data
          console.log(data);
        })
        this.$router.push('/signin')
        this.$cookie.delete('nowuser')
      },
      profile: function() {
        this.$router.push('/profile')
      }
    },
  }
</script>

<style>
.left-nav {
  float: left;
}
.right-nav {
  float: right;
}
.nav {
  width: 100%;
  height: 48px;
  position:fixed;
  top: 0px;
  z-index: 999;
}
</style>

