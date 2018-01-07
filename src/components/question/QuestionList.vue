<template>
  <div class = "que_list">
    <el-button type="success" round @click="addquestion">
      我要提问
    </el-button>
    <transition-group tag="div" name="slide" mode = "out-in"
    enter-class="bounceInDown" leave-class="bounceOutUp">
      <div v-for="item in questionlist" :key="item.id">
        <question-item
        :nowuser = "nowuser"
        :question = "item"
        :follownum = "item.followers.length"
        :answernum = "item.answers.length"
        @answer = "answerquestion"
        @edit = "editquestion"
        @scan = "scanquestion"
        />
      </div>
    </transition-group>

    <el-dialog :visible.sync="editformvisable" :center="true" :title="edittitle">
      <dynamic-sel
      v-if = "edittitle == '添加问题'"
      :selectlist = "seltopic"
      v-model="state"
      @select = "it => {this.questionedit.topic = it}">
      </dynamic-sel>

      <el-form :model="questionedit">
        <el-form-item label="标题">
          <el-input v-model="questionedit.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input
          type="textarea"
          :rows="2"
          autosize
          placeholder="请输入问题描述"
          v-model="questionedit.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="confirmedit">确认</el-button>
      <el-button type="info"  @click= "editformvisable = false">取消</el-button>
    </el-dialog>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalnum"
        @current-change="getnextpage"
        :page-size="5"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// 实现问题的查看，回答，关注，取消关注
// 编辑(只有提出者才有权限)，删除(只有问题的提出者才拥有此权限)
import QuestionItem from './QuestionItem'
import DynamicSel from '../utils/DynamicSel'
let axios = require('axios');

export default {
  name: 'QuestionList',
  components: {
    QuestionItem, DynamicSel
  },
  props:{
    requesturl: '',
  },
  methods: {
    getseltopic: function() {
      // 话题应该获取多少
      axios.get('/api/topics/get_sel_topic/',).then(response => {
          console.log(response)
          this.seltopic = response.data.slice(0)
        })
    },
    scanquestion: function(id) {
      console.log(id)
      this.$router.push({
        path: '/question',
        query: {
          qid: id
        }
      })
    },
    answerquestion: function(id) {
      this.$router.push({
        path: '/question',
        query: {
          qid: id
        }
      })
    },
    addquestion() {
      console.log('login state' + this.islogin)
      if(this.islogin === true) {
        this.edittitle = "添加问题"
        this.editformvisable = true
        this.questionedit = {}
        this.getseltopic()
      }
      else {
        this.$message({
          message: '请先登陆再提问!',
          type: 'warning'
        });
      }
    },
    editquestion: function(question) {
      console.log(question)
      if(question.owner !== this.nowuser.name) {
        this.$message({
          message: '您不是该问题的拥有者,无法编辑问题!',
          type: 'warning'
        });
      }
      else {
        // 弹出问题编辑框
        this.edittitle = "编辑问题"
        this.questionedit = JSON.parse(JSON.stringify(question)) // 深拷贝
        this.editformvisable = true
      }
    },
    confirmedit: function() {
      console.log(this.dynamicTags)
      if(this.edittitle === '编辑问题') {
        // 编辑问题后发送
        console.log('编辑')
        let instance = axios.create({
          headers: {"X-CSRFToken": this.csrftoken}
        });
        instance.patch('/api/questions/' + this.questionedit.id + '/', this.questionedit).then(res => {
          let data = res.data
          this.questionlist = this.questionlist.filter(item =>{
              return item.id !== this.questionedit.id
          })
          console.log(data)
          this.questionlist.push(data)
          this.$message({
            type: 'success',
            message: '修改成功!'
          }) // 重新排列元素会导致搜索的选择改变？
        })
      }
      else if(this.edittitle === '添加问题') {
        // 添加问题后发送
        console.log('添加')
        let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
        });
        this.questionedit.searchtimes = 0 // 搜索次数0
        this.questionedit.followers = [] // 无关注者
        console.log('topic is ' + this.questionedit.topic)
        instance.post('/api/questions/', this.questionedit).then(res => {
          let data = res.data
          if(this.questionlist.length < 5) {
            this.questionlist.push(data)
          }
          this.totalnum++

          this.$message({
            message: '提问成功!',
            type: 'success'
          });
        })
      }
      this.state = ''
      this.editformvisable = false
      // 将选择的关键字加到问题的关键字中
    },
    delquestion: function() {
      // owner
      // 向后端发送请求删除问题
      // 最后写
    },
    getnextpage: function(pageid) {
      console.log(pageid)
      axios.get(this.requesturl, {
        params:{
          page: pageid
        }
      }).then(
        response => {
          console.log(response)
          if(response.data.next === null) {
            this.$message.warning('没有更多的问题了!')
          }
          this.questionlist = response.data.results.slice(0)
      });
    }, // 分页
    getdata:function() {
      axios.get(this.requesturl,{
        params:{
          page:1
        }
      }).then(response => {
        console.log(response)
        this.questionlist = response.data.results.slice(0)
        this.totalnum = response.data.count
      }); // 获取第一页联系人列表
      this.csrftoken = this.$cookie.get('csrftoken');
      // 保存csrftoken
      console.log(this.csrftoken)
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(function () {
      //整个视图渲染结束之后挂载
      this.nowuser = this.$store.state.nowuser
      this.islogin = this.$store.state.islogin
      this.getdata()
    })
  },
  data() {
    return {
      questionlist:[],
      csrftoken:'',
      totalnum:0,
      editformvisable:false,
      questionedit:{},
      edittitle:'',
      seltopic:[], // temperary
      state: '',
      nowuser:'',
      islogin: ''
    }
  }
}
</script>
<style scoped>
h3 {
  text-align: center;
}
</style>
