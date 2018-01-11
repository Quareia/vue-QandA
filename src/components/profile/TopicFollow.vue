<template>
  <div>
    <div >
      <topic-block :requesturl="requesturl">
        
      </topic-block>
    </div>
  </div>
</template>

<script>
import TopicBlock from '@/components/topic/TopicBlock'
let axios = require('axios');
export default {
  name: 'TopicFollow',
  components: {
    TopicBlock
  },
  data() {
    return {
      requesturl: '',
    }
  },
  methods: {

  },
  created() {
    setTimeout(()=> {
      this.requesturl = '/api/userinfos/'+this.$store.state.nowuser.id+'/my_follow_topics/'
    },200)
  }
}
</script>

<style>
/* .question {
  min-height: 700px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.question .question-questionList {
  margin-top: 8px;
}   */
</style>
