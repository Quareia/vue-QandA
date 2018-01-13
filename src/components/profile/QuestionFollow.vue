<template>
  <div>
    <div class="question-questionList">
      <question-list :requesturl="requesturl">
      </question-list>
    </div>
  </div>
</template>

<script>
import QuestionList from '@/components/question/QuestionList'
let axios = require('axios');
export default {
  name: 'QuestionFollow',
  components: {
    QuestionList
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
      this.requesturl = '/api/userinfos/'+this.$store.state.nowuser.id+'/my_follow_questions/'
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
