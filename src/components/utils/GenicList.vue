<template>
  <div class = "list">
    <div class = "add-button">
      <slot name = "add button"></slot>
    </div>

    <transition-group tag="div" name="slide"
    mode = "out-in" enter-class="bounceInDown"
    leave-class="bounceOutUp">
      <div v-for="item in list" :key="item.id">
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


    <el-dialog :visible.sync="editformvisable" :center="true">
      <!-- 问题标签 -->
      <h3>
        {{edittitle}}
      </h3>
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{ tag }}
      </el-tag>

      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">
        + KeyWords
      </el-button>
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
let axios = require('axios');

export default {
  name: 'QuestionList',
  components: {
    QuestionItem
  },
  props:{
    nowuser:{
      type: Object,
      required: true
    },
    islogin: '',
    requesturl: '',
  },
  methods: {
    scanquestion: function(id) {
      // anonym user
      // 跳转到问题详情页面
      console.log(id)
      this.$router.push({
        path: '/question',
        query: {
          qid: id
        }
      })
    },
    answerquestion: function(id) {
      // after login
      // 跳转到问题详情页面
      this.$router.push({
        path: '/question',
        query: {
          qid: id
        }
      })
    },
    addquestion: function() {
      // after login
      // 弹出问题编辑框
      if(this.islogin == true) {
        this.edittitle = "添加问题"
        this.editformvisable = true
        this.questionedit = {}
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
      }
      else if(this.edittitle === '添加问题') {
        // 添加问题后发送
        console.log('添加')
        let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
        });
        this.questionedit.searchtimes = 0 // 搜索次数0
        this.questionedit.followers = [] // 无关注者
        this.questionedit.topic = 2 // test
        instance.post('/api/questions/', this.questionedit).then(res => {
          let data = res.data
          if(this.questionlist.length < 5) {
            this.questionlist.push(data)
          }
          this.totalnum++
          this.editformvisable = false
          this.$message({
            message: '提问成功!',
            type: 'success'
          });
        })
      }
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        // 添加关键字到问题中
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
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
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      //整个视图渲染结束之后挂载
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
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      edittitle:'',
    }
  }
}
</script>
<style scoped>

</style>
