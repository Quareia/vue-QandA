<template>
  <div class="topic">
    <el-button type="primary" class="topic-btn" @click="addtopic">提出话题</el-button>
    <el-row :gutter="20" >
      <el-col :span="4.5" v-for = "item in topiclist" :key = "item.id">
        <topic-item
        :topic = "item"
        :nowuser = "nowuser"
        @edit = "edittopic"
        @scan = "scantopic"
        :follownum = "item.followers.length"
        :questionnum = "item.questions.length"
        >
        </topic-item>
      </el-col>
    </el-row>
    
    <el-pagination
      layout="prev, pager, next"
      :total="totalnum"
      @current-change="getnextpage"
      :page-size="5"
      >
    </el-pagination>
    <el-dialog :visible.sync="editformvisable" :center="true" :title="edittitle">
      <el-form :model="topicedit">
        <el-form-item label="标题">
          <el-input v-model="topicedit.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

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
        + 关键词
      </el-button>

      <el-button type="primary" @click="confirmedit">确认</el-button>
      <el-button type="info"  @click= "editformvisable = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import TopicItem from './TopicItem'
let axios = require('axios');
  export default {
    components: {
      TopicItem,
    },
    props: {
      requesturl: '',
    },
    methods: {
      scantopic: function(id) {
      // anonym user
      // 跳转到话题详情页面
        this.$router.push({
          path: '/topic',
          query: {
            qid: id
          }
        })
      },
      addtopic: function() {
      // after login
      // 弹出问题编辑框
        if(this.islogin == true) {
          this.edittitle = "添加话题"
          this.editformvisable = true
          this.topicedit = {}
          this.dynamicTags = []
        }
        else {
          this.$message({
            message: '请先登陆再添加!',
            type: 'warning'
          });
        }
      },
      edittopic: function(topic) {
        console.log(topic)
        if(topic.owner !== this.nowuser.name) {
          this.$message({
            message: '您不是该话题的拥有者,无法编辑话题!',
            type: 'warning'
          });
        }
        else {
          // 弹出问题编辑框
          this.edittitle = "编辑话题"
          this.topicedit = JSON.parse(JSON.stringify(topic)) // 深拷贝
          this.dynamicTags = this.topicedit.keywords.split(',')
          this.editformvisable = true
        }
      },
      confirmedit: function() {
        console.log(this.dynamicTags)
        if(this.edittitle === '编辑话题') {
          // 编辑问题后发送
          console.log('编辑')
          let instance = axios.create({
              headers: {"X-CSRFToken": this.csrftoken}
          });
          this.topicedit.keywords = this.dynamicTags.join(',')
          instance.patch(this.requesturl + this.topicedit.id + '/', this.topicedit).then(res => {
            let data = res.data
            this.topiclist = this.topiclist.filter(item =>{
                return item.id !== this.topicedit.id
            })
            console.log(data)
            this.topiclist.push(data)
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
        }
        else if(this.edittitle === '添加话题') {
          // 添加问题后发送
          console.log('添加')
          let instance = axios.create({
              headers: {"X-CSRFToken": this.csrftoken}
          });
          this.topicedit.searchtimes = 0 // 搜索次数0
          this.topicedit.followers = [] // 无关注者
          this.topicedit.keywords = this.dynamicTags.join(',')
          instance.post(this.requesturl, this.topicedit).then(res => {
            let data = res.data
            if(this.topiclist.length < 5) {
              this.topiclist.push(data)
            }
            this.totalnum++
            this.$message({
              message: '话题添加成功!',
              type: 'success'
            });
          })
        }
        this.editformvisable = false
        // 将选择的关键字加到问题的关键字中
      },
      deltopic: function() {
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
              this.$message.warning('没有更多的话题了!')
            }
            this.topiclist = response.data.results.slice(0)
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
          // console.log('kkkk' + response)
          // console.log(response.data)
          this.topiclist = response.data.results.slice(0)
          this.totalnum = response.data.count
        }); // 获取第一页话题列表
        this.csrftoken = this.$cookie.get('csrftoken');
        // 保存csrftoken
        // console.log(this.csrftoken)
      }
    },
    data () {
      return {
        csrftoken:'',
        totalnum:0,
        topiclist:[],
        topicedit:{},
        editformvisable:false,
        edittitle:'',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        nowuser:{},
        islogin: '',
      }
    },
    created() {

    },
    mounted () {

        // Code that will run only after the
        // entire view has been rendered
        //整个视图渲染结束之后挂载
      setTimeout(()=> {
        this.csrftoken = this.$cookie.get('csrftoken')
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        this.getdata()

      }, 200)
    }
  }
</script>
<style>
.topic {
  height: 400px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.topic-btn {

}

</style>
