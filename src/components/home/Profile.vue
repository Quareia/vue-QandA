<template>
  <div class="profile">
    <el-header style="background-color:#ddd">
      123
    </el-header>
    <el-main>
      <div class="profile-header">
        <el-card>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
         </div>
        </el-card>
      </div>
      <div class="profile-main">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-card style="min-height: 900px" >
              
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" menu-trigger="click">
                <router-link to='/profile'>
                  <el-menu-item index="1" @click="changeIndex('1')">动态</el-menu-item>
                </router-link>
                <router-link to='/profile'>
                  <el-menu-item index="2" @click="changeIndex('2')">回答</el-menu-item>
                </router-link>
                <router-link to='/profile'>
                  <el-menu-item index="3" @click="changeIndex('3')">提问</el-menu-item>
                </router-link>  
                <el-submenu index="4" @click="changeIndex('1')">
                <template slot="title">关注</template>
                  <el-menu-item index="4-1">关注的话题</el-menu-item>
                  <el-menu-item index="4-2">关注的问题</el-menu-item>
                  <el-menu-item index="4-3">关注的用户</el-menu-item>
                </el-submenu>
              </el-menu>
              <div class="line"></div>
              
              <div class="main-content">
                <router-view></router-view>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <div class="side-card">
              <el-card>
                123
              </el-card>
              <el-card>
                1233
              </el-card>
              <el-card>
                123
              </el-card>
            </div> <!-- end of side-card -->
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>

</template>


<<script>
let axios = require('axios');
export default {
  name: 'Profile',
  data() {
    var validateSamePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.SignupForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeIndex: '1',
      csrftoken:'',
      instance: Object,
      SigninForm: {
        name: '',
        password: ''
      },
      SignupForm: {
        name: '',
        password: '',
        checkPwd: ''
      },
      rule: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
          { type: 'string',
            min: 2,
            max: 6,
            message: '请输入2至6个字符的用户名',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' },
          { type: 'string',
            min: 6,
            max: 10,
            message: '请输入6至10位的密码',
            trigger: 'blur'
          }
        ],
        checkPwd: [
          { required: true, message: ' ', trigger: 'blur' },
          { validator: validateSamePwd, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    // 组件渲染加载完成之后获取csrftoken
    // axios.get('/api/')
    this.csrftoken = this.$cookie.get('csrftoken');
    console.log(this.csrftoken)

    console.log(this.$store.state.nowuser)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeIndex(index) {
        this.activeIndex = index;
    },
    ChangeShow(isShow, notShow) {
      this.isShow = !this.isShow;
      this.notShow = !this.notShow;
    },
    Signup(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
          });
          instance.post('/api/login/', this.SignupForm).then(res => {
          let data = res.data
          console.log(data);
            if(data.status !== '1') {
              console.log(data.msg)
              this.$message.error(data.msg);
            } else {
              this.$message('welcome, '+ this.SignupForm.name);
              setTimeout(()=>{
              this.$router.push('/Contacts');
              },500)
            }
          });
        } else {
          this.$message.warning('请正确填写信息')
        }}
      );
    },
    Signin(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          console.log(this.SigninForm);
          let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
          });

          instance.post('/api/login/', this.SigninForm).then(res => {
            let data = res.data;
            console.log(res.data);
            if(data.status !== '1') {
              this.$message.error(data.msg)
            } else {
              this.$message('welcome, '+this.SigninForm.name);
              setTimeout(()=>{
              this.$router.push('/Contacts');
              },500)
            }
          }).catch((error) => {
              console.log(error)
              this.$message('服务器故障');
          })
          } else {
              this.$message.warning('请正确填写信息')
          }
      });
    }
  }
}
</script>

<<style scoped>

.profile {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f4f3f3;
}

.profile-header {
  margin-left: 150px;
  margin-right: 150px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.profile-main {
  margin-top: 0px;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 10px;
}

.el-menu {
  position: relative;
  top: -20px;
}

.el-row {
  &:last-child {
    margin-right: 0;
  }
}

.side-card .el-card {
  margin-bottom: 10px;
}


</style>