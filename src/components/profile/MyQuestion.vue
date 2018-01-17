<template>
  <div >
    <div class="question-questionList">
      <question-list :requesturl="requesturl">
        <br />
      </question-list>
    </div>
  </div>
</template>

<script>
import QuestionList from '@/components/question/QuestionList'
let axios = require('axios');
export default {
  name: 'MyQuestion',
  components: {
    QuestionList
  },
  data() {
    return {
      requesturl: '/api/questions/my_questions/',
    }
  },
  methods: {

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
