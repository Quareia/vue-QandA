<template>
  <div>
    <div>
      {{question}}
    </div>
    <div>
      <answer-list
      :nowuser = "nowuser"
      :questionid = "questionid"
      :islogin = "islogin"
      :requesturl = "'/api/questions/' + this.questionid + '/get_answers/'"
      >
      </answer-list>
    </div>
  </div>
</template>
<script>
import AnswerList from '@/components/answer/AnswerList'
let axios = require('axios');
  export default {
    components: {
      AnswerList
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
      })
      this.nowuser = this.$store.state.nowuser
      this.islogin = this.$store.state.islogin
    }
  }
</script>
<style>

</style>