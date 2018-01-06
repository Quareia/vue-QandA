<template>
  <div>
    <div>
      {{topic}}
    </div>
    <div>
      <question-list
        :nowuser="nowuser"
        :islogin="islogin"
        :requesturl = "requesturl"
      >
      </question-list>
    </div>
  </div>
</template>
<script>
import QuestionList from '@/components/question/QuestionList'
let axios = require('axios');
  export default {
    components: {
      QuestionList
    },
    methods: {
      getdata: function() {
      }
    },
    data () {
      return {
        nowuser: {
          name: '',
          id: 0,
        },
        topicid: '',
        topic: '',
        islogin: '',
        requesturl: ''
      }
    },
    mounted () {
      this.topicid = this.$route.query.qid
      this.requesturl = '/api/topics/'+ this.topicid + '/get_questions/'
      axios.get('/api/topics/' + this.topicid + '/').then(res => {
        this.topic = res.data
      })
      this.nowuser = this.$store.state.nowuser
    },
  }
</script>
<style>

</style>
