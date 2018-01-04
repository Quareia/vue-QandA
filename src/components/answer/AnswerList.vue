<template>
  <div>
    <transition-group tag="div" name="slide">
      <div v-for="item in answerlist" :key="item.id">
        <answer-item
        :answer = "item"
        @edit = "editanswer">
        </answer-item>
      </div>
    </transition-group>
    <el-pagination
      layout="prev, pager, next"
      :total="totalnum"
      @current-change="getnextpage"
      :page-size="5"
      >
    </el-pagination>
    <div>
      <h1>
        {{questionid}}
      </h1>
      <answer-edit
      :questionid = "questionid"
      :islogin = "islogin"
      >
      </answer-edit>
    </div>
  </div>
</template>
<script>
import AnswerEdit from './AnswerEdit'
import AnswerItem from './AnswerItem'
let axios = require('axios');
export default {
  components: {
    AnswerItem, AnswerEdit
  },
  props: {
    nowuser: {
      type: Object,
      required: true
    },
    islogin:'',
    questionid: 0,
    requesturl: '',
  },
  methods: {
    getdata:function() {
      console.log('传过来的是: ' + this.questionid)
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
    }
  },
  mounted () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      //整个视图渲染结束之后挂载
      this.getdata()
    })
  }
}
</script>
<style>

</style>
