<<template>
  <div class="sign-page">
    <el-container>
      <div class="sign-content">
        <div class="sign-header">
          <h1>程序园</h1>
          <p>与世界分享你的bug</p>  
        </div>  
        <el-main class="sign-group" v-show="isShow">
          <el-form :model="SigninForm" :rules="rule" status-icon ref="SigninForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input type="text" v-model="SigninForm.name" suffix-icon="el-icon-date" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="SigninForm.password" auto-complete="off" suffix-icon="el-icon-goods" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="sign-btn" type="primary" @click="Signin('SigninForm')">登录</el-button>
            </el-form-item>
            <div class="sign-end">
              <span>没有账号？</span>
              <a class="sign-to" href="javascript:void(0)" @click="ChangeShow()">注册</a>
            </div>
          </el-form>
        </el-main>  

        <!-- 注册 -->
        <el-main class="sign-group" v-show="notShow">
          <el-form :model="SignupForm" :rules="rule" status-icon ref="SignupForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input type="text" v-model="SignupForm.name" placeholder="请输入用户名" suffix-icon="el-icon-date"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input type="password" v-model="SignupForm.password" auto-complete="off" placeholder="请输入密码" suffix-icon="el-icon-goods"></el-input>
            </el-form-item>
            <el-form-item  prop="checkPwd">
              <el-input type="password" v-model="SignupForm.checkPwd" auto-complete="off" placeholder="确认密码" suffix-icon="el-icon-goods"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="sign-btn" type="primary" @click="Signup('SignupForm')">注册</el-button>
            </el-form-item>
            <div class="sign-end">
              <span>已有账号？</span>
              <a class="sign-to" href="javascript:void(0)" @click="ChangeShow()">登录</a>
            </div>
          </el-form>
        </el-main>  

      </div>
    </el-container>
  </div>
</template>

<script>
let axios = require('axios');
export default {
  name: 'SigninPage',
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
      isShow: true,
      notShow: false,
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
  created() {
    if (this.$store.state.islogin) 
      this.$router.push('/');
  },
  mounted() {
    // 组件渲染加载完成之后获取csrftoken
    // axios.get('/api/')
    this.csrftoken = this.$cookie.get('csrftoken');
    console.log(this.csrftoken)
  },
  methods: {
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

              setTimeout(this.$store.commit('login', this.nowuser), 5000)
              console.log(this.$store.state.nowuser)

              this.$message('welcome, '+ this.SignupForm.name);
              setTimeout(()=>{
              this.$router.push('/');
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
          console.log(this.csrftoken)
          instance.post('/api/login/', this.SigninForm).then(res => {
            let data = res.data;
            console.log(data)
            if(data.status !== '1') {
              this.$message.error(data.msg)
            } else {
              this.nowuser = {name:data.name, id:data.id}
              this.$store.commit('login', this.nowuser)
              console.log(this.$store.state.nowuser)

              this.$message('welcome, '+this.SigninForm.name);
              setTimeout(()=>{
              this.$router.push('/');
              },500)
            }
          }).catch((error) => {
              console.log(error)
              this.$message('服务器故障');
          })
          } else {
              this.$message.warning('请正确填写信息');
          }
      });
    }
  }
}
</script>

<<style scoped>
.sign-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  background-image: url("https://static.zhihu.com/heifetz/bg.8ca8122d44fc9a0f7b04.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.el-container {
  padding-top: 54px;
  padding-bottom: 54px;
}

.sign-content {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  background-color: #fff;
  width: 432px;
  height: 550px;
  margin-left: auto;
  margin-right: auto;
}

.sign-header {
  position: relative;
  top: -30px;
  height: 
}

.sign-content h1 {
  font-weight: 450;
  font-size: 60px;
  color: #2488ec;
}

.sign-content p {
  position: relative;
  font-weight: 380;
  font-size: 22px;
  top: -40px;
  color: #4b91e2;
}

.sign-group {
  position: relative;
  top: -60px;
  height: 335px;
  width: 87%;
  left: 29px;
}

.sign-btn {
  width: 100%;
  font-weight: 530;
  font-size: 17px;
}

.sign-end {
  position: absolute;
  bottom: 35px;
  font-size: 18px;
  left: 32%;
  color: #303030;
}

.sign-to {
  color: #2e5ea2;
}

</style>