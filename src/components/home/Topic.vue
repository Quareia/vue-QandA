<template>
  <div class="Topic">
    <el-row :gutter="40" align="middle">

    </el-row>
    <el-row :gutter="20">
      <div>
        <topic-block
        :nowuser = "nowuser"
        :islogin = "islogin"
        >
        </topic-block>
      </div>
    </el-row>
    
  </div>
</template>

<script>
import TopicBlock from '@/components/topic/TopicBlock'

let axios = require('axios');
  export default {
    components: {
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
.Topic {
  position: relative;
  padding-top: 50px;
  width: 100ch;
  height: 100vh;
}
</style>
