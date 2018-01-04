<template>
<div class="nav">
  <el-menu :default-active="1" class="el-menu-demo" mode="horizontal">
    <span class="left-child">
      <search-frame/>
    </span>
    <span class="right-child">
      <router-link to='/'>
        <el-menu-item index="1">首页</el-menu-item>
      </router-link>
      <el-submenu index="2" v-if="islogin">
        <template slot="title">{{nowuser.name}}</template>

        <router-link to='/profile'>
        <el-menu-item index="2-1">个人中心</el-menu-item>
        </router-link>

        <el-menu-item @click="logout">注销</el-menu-item>
      </el-submenu>
      <el-menu-item v-else @click="login">登陆</el-menu-item>
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
    props: {

    },
    data() {
      return {
        nowuser:'',
        islogin: false
      }
    },
    mounted() {
      this.$nextTick(function(){
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
      })
    },
    methods: {
      login: function() {
        console.log('login')
        this.$router.push('/signin')
      },
      logout: function() {
        this.$store.commit('logout')
        axios.get('/api/logout').then(res => {
          let data = res.data
          console.log(data);
        })
        console.log('logout')
        this.$router.push('/signin')
      },
      profile: function() {
        this.$router.push('/profile')
      }
    },
  }
</script>
<style>
.left-child {
  float: left;
}
.right-child {
  float: right;
}
.nav {
  width:90%;
  height:48px;
  position:fixed;
  top:0;
  z-index: 999;
}
</style>

