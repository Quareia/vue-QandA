<template>
  <div class="home">
    <div class="home-contain">
    <el-row :gutter="8">
      <el-col :span="17">
        <div class="home-main">
          <!-- <el-card>
            <el-button>提问</el-button>
            <el-button>提问</el-button>
            <el-button>提问</el-button>
          </el-card> -->
          <div class="home-answerList">
            <answer-list :requesturl="requesturl">
              <p> </p>
            </answer-list>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="home-side">
          <el-card>
              123
            </el-card>
            <el-card>
              1233
            </el-card>
            
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import AnswerList from '@/components/answer/AnswerList'

let axios = require('axios');
  export default {
    components: {
      AnswerList,
    },
    methods: {
    },
    data () {
      return {
        nowuser: {
          name: '',
          id: 0,
        },
        requesturl: '/api/answers/',
        islogin:''
      }
    },
    created () {
    },
    mounted() {
      setTimeout( ()=> {
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        console.log('nowuser is:  ' + this.nowuser.name)
      }, 200)
    },
  }
</script>
<style>
.home {
  min-height: 700px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.home-contain {
  width: 100%;
  padding-top: 56px;
  padding-left: 174px;
  padding-right: 174px;
}

.home .home-side {
  position: fixed;
  width: 286px;
  min-width: 286px;
}

.home .home-side .el-card {
  margin-bottom: 8px;
}

.home .home-homeList {
  margin-top: 8px;
}

.home .home-main .el-button {
  border: none;
}

.home .home-main {
  position: relative;
  /* top: -8px; */
}

</style>
