<template>
  <div id="detail">
    <div class="detail-title">
      <!-- <div>来自话题：{{question.topic.title}}</div>
      <div>{{question.title}}</div>
      <div>{{question.description}}</div> -->

      <!-- {{question}} -->

      <question-item
        :nowuser = "nowuser"
        :question = "question"
        :follownum = "question.followers.length"
        :answernum = "question.answers.length"
        />


    </div>
    <div>
      <answer-queue
      :questionid = "questionid"
      :requesturl = "'/api/questions/' + this.questionid + '/get_answers/'"
      >
      </answer-queue>
    </div>
  </div>
</template>
<script>
import AnswerQueue from '@/components/answer/AnswerQueue'
import QuestionItem from '@/components/question/QuestionItem'
let axios = require('axios');
  export default {
    components: {
      AnswerQueue,
      QuestionItem
    },
    methods: {
    },
    data () {
      return {
        nowuser: {
          name: '',
          id: 0,
        },
        questionid: '',
        question: '',
        islogin: ''
      }
    },
    mounted () {
      this.questionid = this.$route.query.qid
      console.log("问题页面: " + this.questionid)
      axios.get('/api/questions/' + this.questionid + '/').then(res => {
        this.question = res.data
        console.log('receive question' + this.question)
      })
      this.nowuser = this.$store.state.nowuser
      this.islogin = this.$store.state.islogin
    }
  }
</script>
<style>
#detail {
  padding-top: 50px;
}

.detail-title {
  /* background-color: #fff; */
  height: 300px;
  padding-left: 174px;
  padding-right: 174px;
}

</style>