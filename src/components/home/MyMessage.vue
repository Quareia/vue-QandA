<template>
  <div class="topic">
    <div v-for="item in messagelist" :key="item.id">
      <div>{{item.content}}</div>
      <el-button size="mini" round @click="readmessage(item)">我知道了</el-button>
    </div>
    <!-- <el-button type="success" round @click="addmessage">发送消息</el-button> -->
    <el-pagination
      layout="prev, pager, next"
      :total="totalnum"
      @current-change="getnextpage"
      :page-size="5"
      >
    </el-pagination>
    <!-- <el-dialog :visible.sync="editformvisable" :center="true" title="发送消息">
      <dynamic-sel
      :selectlist = "seluser"
      v-model="state"
      @select = "it => {this.messageedit.destination = it}">
      </dynamic-sel>
      <el-form :model="messageedit">
        <el-form-item label="标题">
          <el-input v-model="messageedit.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="confirmedit">确认</el-button>
      <el-button type="info"  @click= "editformvisable = false">取消</el-button>
    </el-dialog> -->
  </div>
</template>
<script>
import DynamicSel from '@/components/utils/DynamicSel'
let axios = require('axios');
  export default {
    components: {
      DynamicSel
    },
    methods: {
      getseluser: function() {
        axios.get('/api/users/get_sel_user/',).then(response => {
          console.log(response)
          this.seluser = response.data.slice(0)
          this.seluser.map(el => {
            el.title = el.username
          })
        })
      },
      addmessage: function() {
        if(this.islogin == true) {
          this.editformvisable = true
        }
        else {
          this.$message({
            message: '请先登陆再添加!',
            type: 'warning'
          });
        }
      },
      confirmedit: function() {
        console.log('添加')
        let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
        });
        this.messageedit.origin = this.nowuser.id
        instance.post('/api/messages/', this.messageedit).then(res => {
          let data = res.data
          if(this.messagelist.length < 5) {
            this.messagelist.push(data)
          }
          this.totalnum++
          this.$message({
            message: '消息发送成功!',
            type: 'success'
          });
        })
        this.editformvisable = false
      },
      readmessage:function(item) {
        // 发送已读
        console.log('read')
        axios.get('/api/messages/' + item.id + '/is_read/').then(res => {
          this.messagelist.splice(this.messagelist.indexOf(item), 1)
          console.log(res)
        })
      },
      delmessage: function() {
        // 删除消息
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
              this.$message.warning('没有更多的消息了!')
            }
            this.messagelist = response.data.results.slice(0)
        });
      },
      getdata:function() {
        axios.get(this.requesturl,{
          params:{
            page:1
          }
        }).then(response => {
          this.messagelist = response.data.results.slice(0)
          this.totalnum = response.data.count
        }); // 获取第一页话题列表
        this.csrftoken = this.$cookie.get('csrftoken');
      }
    },
    data () {
      return {
        csrftoken:'',
        totalnum:0,
        messagelist:[],
        messageedit:{},
        editformvisable:false,
        inputVisible: false,
        inputValue: '',
        nowuser:{},
        islogin: '',
        requesturl: '/api/messages/my_receive_messages/',
        seluser:[],
        state: '',
      }
    },
    created() {
    },
    mounted () {
      setTimeout(()=> {
        this.csrftoken = this.$cookie.get('csrftoken')
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        this.getdata()
        this.getseluser()
      }, 200)
    }
  }
</script>
<style>
</style>
