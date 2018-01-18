<template>
  <div>
    <transition-group tag="div" name="slide">
      <div v-for="item in answerlist" :key="item.id">
        <answer-show  class="answer-queue"
        :answer = "item"
        @addanswer = "addanswer"
        @edit = "editanswer">
        </answer-show>
      </div>
    </transition-group>
    <el-pagination
      layout="prev, pager, next"
      :total="totalnum"
      @current-change="getnextpage"
      :page-size="6"
      >
    </el-pagination>
    <div>
      <br />
      <br />
      <br />
      <answer-edit class="answeredit"
      :questionid = "questionid"
      :islogin = "islogin"
      @addanswer = "addanswer"
      >
      </answer-edit>
    </div>
  </div>
</template>
<script>
import AnswerEdit from './AnswerEdit'
import AnswerShow from './AnswerShow'
let axios = require('axios');
export default {
  components: {
    AnswerShow, AnswerEdit
  },
  props: {
    questionid: 0,
    requesturl: '',
  },
  methods: {
    addanswer:function(answer) {
      axios.get('/api/answers/' + answer.id + '/').then((res)=> {
        console.log(res.data)
        this.answerlist.push(res.data)
      })
      // console.log(answer)
      // console.log('already push')
    },
    getdata:function() {
      console.log('传过来的是: ' + this.questionid)
      axios.get('/api/')
      axios.get('/api/questions/' + this.questionid + '/get_answers/',{
        params:{
          page:1
        }
      }).then(response => {
        console.log(response)
        this.answerlist = response.data.results.slice(0)
        this.totalnum = response.data.count
      }); // 获取第一页联系人列表
      this.csrftoken = this.$cookie.get('csrftoken');
      // 保存csrftoken
      console.log(this.csrftoken)
    },
    agreeanswer: function() {
      // after login
    },
    disagreeanswer: function() {
      // after login
    },
    delanswer: function() {
      // owner
    },
    editanswer: function(id) {
      // owner
      console.log(id)
    },
    getnextpage: function(pageid) {
      console.log(pageid)
      axios.get('/api/questions/' + this.questionid + '/get_answers/', {
        params:{
          page: pageid
        }
      }).then(
        response => {
          console.log(response)
          if(response.data.next === null) {
            this.$message.warning('没有更多的答案了!')
          }
          this.answerlist = response.data.results.slice(0)
      });
    }, // 分页
  },
  data () {
    return {
      csrftoken: '',
      answerlist: [],
      totalnum: 0,
      nowuser: '',
      islogin:'',
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      //整个视图渲染结束之后挂载
      setTimeout(()=> {
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
      }, 300)
      this.getdata()
    })
  }
}
</script>
<style>

.answeredit .v-note-wrapper {
  width: 90%;
  left: 5%;
}

.answer-queue .v-note-panel {
  padding-top: 90px;
  padding-bottom: 80px;
}

</style>