<template>
  <div>
    <el-row :gutter="20">
      <div>
      </div>
    </el-row>
    <el-row :gutter="20">
      <div>
        Hot
        <topic-block
        :nowuser = "nowuser"
        :islogin = "islogin"
        >
        </topic-block>
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          Question
          <question-list
          :requesturl = "requesturl"
          />
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button v-if = "!islogin" type="success" round @click="login" >
            验明正身
          </el-button>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>
<script>
import QuestionList from '@/components/question/QuestionList'
// import SearchFrame from '../components/search/SearchFrame'
import TopicBlock from '@/components/topic/TopicBlock'

let axios = require('axios');
  export default {
    components: {
      QuestionList,
      TopicBlock,
    },
    methods: {
      // login:function() {
      //   this.$router.push('/login')
      // }
    },
    data () {
      return {
        // nowuser 应该作为全局的变量
        nowuser: {
          name: '',
          id: 0,
        },
        requesturl: '/api/questions/',
        islogin:''
      }
    },
    mounted () {
      this.$nextTick(function(){this.nowuser = this.$store.state.nowuser})
      
    },

  }
</script>
<style>

</style>
