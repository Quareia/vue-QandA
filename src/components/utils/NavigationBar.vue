<template>
  <div class="nav">
    <div class="nav-search">
      <search-frame/>
    </div>
    <el-menu :default-active="navActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <span class="left-nav">
        <router-link to='/'>
          <el-menu-item index="1" @click="navChangeIndex('1')"><i class="iconfont icon-home"></i> 主页</el-menu-item>
        </router-link>
        <router-link to='/'>
          <el-menu-item index="2" @click="navChangeIndex('2')"><i class="iconfont icon-focus"></i> 发现</el-menu-item>
        </router-link>
        <router-link to='/'>
          <el-menu-item index="3" @click="navChangeIndex('3')"><i class="iconfont icon-link"></i> 话题</el-menu-item>
        </router-link>
        <router-link to='/'>
          <el-menu-item index="4" @click="navChangeIndex('4')"><i class="iconfont icon-message"></i> 消息</el-menu-item>
        </router-link>
      </span>
      <span class="right-nav">
        <el-submenu index="5" v-if="islogin">
          <template slot="title">{{nowuser.name}}</template>

          <router-link to='/profile'>
          <el-menu-item index="5-1"><i class="iconfont icon-profile"></i> 个人中心</el-menu-item>
          </router-link>

          <el-menu-item @click="logout" index="5-2"><i class="iconfont icon-exit"></i> 注销</el-menu-item>
        </el-submenu>
        <el-menu-item v-else @click="login" index="6">登陆</el-menu-item>
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
        navActiveIndex: '1',
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
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      },
      navChangeIndex(index) {
        this.navActiveIndex = index
      },
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
  position: relative;
  float: left;
  left: 100px;
}
.right-nav {
  position: relative;
  float: right;
  right: 120px;
}

.nav {
  width: 100%;
  height: 48px;
  position: fixed;
  top: 0px;
  z-index: 999;
  font-weight: 600;
}

.nav-search {
  position: absolute;
  z-index: 999;
  left: 740px;
  top: 4px;
}

.nav .el-menu {
  height: 48px;
}

.nav .el-submenu .el-submenu__title {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-bottom: none;
}
.right-nav {
  border: none;
  outline: none;
}

.right-nav .el-submenu>.el-menu {
  top: 52px;
  left: 0px;
  height: 70px;
} 

.right-nav .el-submenu>.el-menu .el-menu-item {
  min-width: 60px;
  width: 60px;
}

.nav .el-menu-item {
  height: 48px;
  line-height: 48px;
  font-size: 15px;
  text-align: left;
}

.nav .el-menu-item.is-active {
  color: #c4c5c8;
}

.nav .el-submenu .router-link-active{
  text-decoration-line: none;
}

.nav a {
  text-decoration-line: none;
}

</style>

