<template>
  <div class="question">
    <div class="question-contain">
    <el-row :gutter="8">
      <el-col :span="17">
        <div class="question-main">
          <!-- <el-card>
            <el-button>提问</el-button>
            <el-button>提问</el-button>
            <el-button>提问</el-button>
          </el-card> -->
          <div class="question-questionList">
            <question-list :requesturl="requesturl"/>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="question-side">
          <el-card>
              123
            </el-card>
            <el-card>
              1233
            </el-card>
            <el-card>
              123
            </el-card>
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import QuestionList from '@/components/question/QuestionList'

let axios = require('axios');
  export default {
    components: {
      QuestionList,
    },
    methods: {
    },
    data () {
      return {
        nowuser: {
          name: '',
          id: 0,
        },
        requesturl: '/api/questions/',
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
.question {
  min-height: 700px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.question-contain {
  width: 100%;
  padding-top: 56px;
  padding-left: 174px;
  padding-right: 174px;
}

.question .question-side {
  position: fixed;
  width: 286px;
  min-width: 286px;
}

.question .question-side .el-card {
  margin-bottom: 8px;
}

.question .question-questionList {
  margin-top: 8px;
}

.question .question-main .el-button {
  border: none;
}

.question .question-main {
  position: relative;
  top: -8px;
}

</style>
