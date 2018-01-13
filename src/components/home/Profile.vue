<template>
  <div class="profile">
    <div class="profile-header">
      <el-card>
        <div class="profile-banner">
          <div class="profile-title">
            <i class="iconfont icon-my" style="font-weight:300"></i>
            {{nowuser.name}}
          </div>
          <div class="profile-something">
            {{something}}
          </div>
          <div class="profile-edit">
            <el-button v-if="islogin" @click="editprofile">修改个人信息</el-button>
          </div>
           <el-dialog :visible.sync="editformvisable" :center="true">
            <el-form :model="userinfo">
              <el-form-item label="个人信息">
                <el-input v-model="userinfo.something" auto-complete="off" :placeholder="something"></el-input>
              </el-form-item>
          
            </el-form>
            <el-button @click="confirmedit">确认</el-button>
            <el-button @click="editformvisable = false">取消</el-button>
          </el-dialog>
        </div>
        <div class="profile-avatar">
          <div class="add-avatar" v-if="!hasAvatar" ><i class="iconfont icon-cameraadd" style="font-size: 36px;"></i>
            <input id="upimg" class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update" title="上传头像"/>
          </div>
          <img v-else class="profile-img" :src="'http://127.0.0.1:8000/' + imgurl"/>
          <div class="edit-avatar" v-if="hasAvatar" ><i class="iconfont icon-cameraadd" style="font-size: 36px;"></i>
            <input id="editimg" class="file1" name="file1" type="file" accept="image/png,image/gif,image/jpeg" @change="update" title="更换头像"/>
          </div>
        </div>
      </el-card>
    </div>

    <div class="profile-main">
      <el-row :gutter="8">
        <el-col :span="17">
          <el-card style="min-height: 900px" >

            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" menu-trigger="click">
              <router-link to='/profile'>
                <el-menu-item index="1" @click="changeIndex('1')">动态</el-menu-item>
              </router-link>
              <router-link to='/profile/my_answers'>
                <el-menu-item index="2" @click="changeIndex('2')">回答</el-menu-item>
              </router-link>
              <router-link to='/profile'>
                <el-menu-item index="3" @click="changeIndex('3')">提问</el-menu-item>
              </router-link>
              <el-submenu index="4" @click="changeIndex('1')">
              <template slot="title">关注</template>
                <router-link to='/profile/follow_topic'>
                  <el-menu-item index="4-1">关注的话题</el-menu-item>
                </router-link>
                <router-link to='/profile/follow_question'>
                  <el-menu-item index="4-2">关注的问题</el-menu-item>
                </router-link>
              </el-submenu>
            </el-menu>
            <div class="line"></div>

            <div class="main-content">
              <router-view></router-view>
            </div>
          </el-card>
        </el-col>
        <el-col :span="7" >
          <div class="side-card">
            <el-card>
              <my-message>

            </my-message>
            </el-card>
            
          </div> <!-- end of side-card -->
        </el-col>
      </el-row>
    </div>
  </div>

</template>


<script>
import MyMessage from './MyMessage'
let axios = require('axios');
export default {
  name: 'Profile',
   components: {
      MyMessage,
    },
  data() {
    return {
      // hasAavtar: false,
      nowuser:'',
      islogin: false,
      activeIndex: '1',
      csrftoken:'',
      instance: Object,
      requesturl:'/api/userinfos/',
      imgurl: '',
      hasAvatar: false,
      file:'',
      something:'',
      editformvisable: false,
      userinfo: {},
    };
  },
  mounted() {
    // 组件渲染加载完成之后获取csrftoken
    // axios.get('/api/')
    this.csrftoken = this.$cookie.get('csrftoken');
    // console.log(this.csrftoken)
    // console.log(this.$store.state.nowuser)
    setTimeout( ()=> {
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        console.log('nowuser is:  ' + this.nowuser.name)
        axios.get(this.requesturl + this.nowuser.id + '/').then(res => {
          let data = res.data
          // console.log(data)
          if (data.userimg_url != null) {
            this.hasAvatar = true
            this.imgurl = data.userimg_url
            this.something = data.something
          }
          })
      }, 200)
  },
  methods: {
    editprofile() {
        this.editformvisable = true
    },
    confirmedit() {
        let instance = axios.create({
          headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
        });
         
        instance.put('/api/userinfos/' + this.nowuser.id + '/',param).then(res => {

        })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeIndex(index) {
        this.activeIndex = index;
    },
    update(e) {
      let file = e.target.files[0];
      this.file=file
      this.upload_img()
    },
    upload_img() {
      let instance = axios.create({
        headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
      });
      let param = new FormData();
            // 此处name对应序列化的name
      param.append('userimg',this.file,this.file.name);
      instance.put('/api/userinfos/' + this.nowuser.id + '/',param).then(res => {
        let data = res.data
        // console.log('img' + data)
        this.imgurl = data.userimg_url
        this.$message({
          message: '头像上传成功！',
          type: 'success'
        });
        this.hasAvatar = true
      })
    }

  }
}
</script>

<style>

.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #f4f3f3;
  position: relative;
  top: 0px;
  padding-top: 56px;
}

.profile-header {
  margin-left: 174px;
  margin-right: 174px;
  margin-bottom: 8px;
}

.profile .profile-header .el-card {
  height: 200px;
}

.profile .profile-header .el-card__body {
  padding: 0px;
}

.profile .profile-banner {
  height: 126px;
  background-color: #abb8c2;
}

.profile .profile-avatar {
  position: absolute;
  height: 132px;
  width: 132px;
  border-radius: 50%;
  background-color: #fff;
  top: 116px;
  left: 240px;
  padding: 3px;
}

.profile .profile-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* background-color: #fff; */
}

/* 增加头像 */

.add-avatar {
    height: 100%;
    width: 100%;
    line-height: 132px;
    position: relative;
    cursor: pointer;
    color: #fff;
    background: #abb8c2;
    /* border: 1px solid #ddd; */
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

.add-avatar #upimg {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.add-avatar:hover {
    color: #444;
    background: #abb8c2;
    text-decoration: none
}

/* 修改头像 */
.edit-avatar {
    top: -136px;
    height: 100%;
    width: 100%;
    line-height: 132px;
    position: relative;
    cursor: pointer;
    color: transparent;
    background: transparent;
    /* border: 1px solid #ddd; */
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
}

.edit-avatar #editimg {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.edit-avatar:hover {
    color: #444;
    background: rgba(0, 0, 0, 0.5);
    text-decoration: none
}


/* 用户名 */

.profile .profile-title {
  position: absolute;
  top: 188px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  left: 410px;
}

.profile .profile-something {
  position: absolute;
  top: 220px;
  font-size: 15px;
  left: 430px;
}

.profile .profile-edit {
  position: absolute;
  top: 200px;
  right: 266px;
}

.profile-main {
  margin-top: 0px;
  margin-left: 174px;
  margin-right: 174px;
  margin-bottom: 8px;
}

.profile .el-menu {
  position: relative;
  top: -20px;
}

/* .profile .el-row {
  &:last-child {
    margin-right: 0;
  }
} */

.profile .side-card .el-card {
  margin-bottom: 8px;



}


</style>
