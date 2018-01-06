<template>
  <div>
    <el-row :gutter="40" align="middle">

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
    </el-row>
  </div>
</template>
<script>
import QuestionList from '@/components/question/QuestionList'
import TopicBlock from '@/components/topic/TopicBlock'

let axios = require('axios');
  export default {
    components: {
      QuestionList,
      TopicBlock,
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
      this.$nextTick(function(){this.nowuser = this.$store.state.nowuser})
    },
  }
</script>
<style>

</style>
