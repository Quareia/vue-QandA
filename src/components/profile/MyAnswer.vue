<template>
  <div >
    <div class="answer-answerList">
      <answer-list :requesturl="requesturl">
      <br />
      </answer-list>
    </div>
  </div>
</template>

<script>
import AnswerList from '@/components/answer/AnswerList'
let axios = require('axios');
export default {
  name: 'MyAnswer',
  components: {
    AnswerList
  },
  data() {
    return {
      requesturl: '/api/answers/my_answers/',
    }
  },
  methods: {

  }
}
</script>

<style>
/* .answer {
  min-height: 700px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.answer .answer-answerList {
  margin-top: 8px;
}   */
</style>
