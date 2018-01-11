<template>
  <div class = "ans_list" >
    <div v-loading="isloading" class="ans-loading"></div>
    <transition-group tag="div" name="slide" mode = "out-in"
    enter-class="bounceInDown" leave-class="bounceOutUp" v-scroll="loadMore" >
      <div v-for="item in answerlist" :key="item.id" >
        <answer-item
        :nowuser = "nowuser"
        :answer.sync = "item"
        @answer = "answerquestion"
        @scan = "scanquestion"
        />
      </div>
    </transition-group>
    <slot>
      <answer-edit
      :questionid = "questionid"
      :islogin = "islogin"
      @addanswer = "answerquestion"
      >
      </answer-edit>
    </slot>
  </div>
</template>
<script>
// 实现问题的查看，回答，关注，取消关注
// 编辑(只有提出者才有权限)，删除(只有问题的提出者才拥有此权限)
import AnswerEdit from './AnswerEdit'
import AnswerItem from './AnswerItem'
let axios = require('axios');
let scrollDisable = false
export default {
  name: 'AnswerList',
  components: {
    AnswerItem,
    AnswerEdit
  },
  props:{
    requesturl: '',
    // nowuser: {
    //   type: Object,
    //   required: true
    // },
    // islogin:'',
    questionid: 0,
  },
  methods: {
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
      if (this.islogin === true) {
        this.$router.push({
          path: '/question',
          query: {
            qid: id
          }
        })
      } 
      else {
        this.$message({
          message: '请先登陆再提问!',
          type: 'warning'
        });
      }
    },
    getnextpage: function(pageid) {
      console.log('pageid:---' ,pageid)
      axios.get(this.requesturl, {
        params:{
          page: pageid
        }
      }).then(
        response => {
          console.log(response)
          if(response.data.next === null) {
            this.$message.warning('已经是最后一页!')
            scrollDisable = true
          }
          this.answerlist=[...this.answerlist, ...response.data.results.slice(0)]
      });
    }, // 分页
    getdata:function() {
      axios.get(this.requesturl,{
        params:{
          page:1
        }
      }).then(response => {
        console.log('asd', response)
        this.answerlist = response.data.results.slice(0)
        this.totalnum = response.data.count
      }); // 获取第一页列表
      this.csrftoken = this.$cookie.get('csrftoken');
      // 保存csrftoken
      console.log(this.csrftoken)
    
    },
    loadMore() {
      // 开始加载数据，就不能再次触发这个函数了
      scrollDisable = true;
      this.isloading = true;
      this.pageid++
      this.getnextpage(this.pageid)
      // 插入数据完成后  
      setTimeout(()=>{

        this.isloading = false;
      }, 1000) 
      scrollDisable = false;
    }
  },
  created() {

  },
  mounted() {
    setTimeout( ()=> {
      this.nowuser = this.$store.state.nowuser
      this.islogin = this.$store.state.islogin
      console.log('nowuser is:  ' + this.nowuser.name)
      
    this.getdata()
    scrollDisable = false
    }, 300)
  },
  destroyed() {
    scrollDisable = true
  },
  directives: {
    scroll: {
      bind: function (el, binding){
        setTimeout(()=> {
        window.addEventListener('scroll', ()=> {
          // console.log(document.documentElement.scrollTop, window.innerHeight,document.body.clientHeight)
          if (document.documentElement.scrollTop + window.innerHeight >= document.body.clientHeight) {
            if(!scrollDisable) {
              let fnc = binding.value;   
              fnc(); 
            }
              console.log('load data')
            }        
          })
        }, 200)
      }
    }
  },
  data() {
    return {
      pageid:1,
      answerlist:[],
      
      csrftoken:'',
      totalnum:0,
      editformvisable:false,
      questionedit:{},
      edittitle:'',
      seltopic:[], // temperary
      state: '',
      nowuser:'',
      islogin: '',
      isloading: false
    }
  }
}
</script>
<style>

.ans-loading {
  position: fixed;
  width: 706px;
  height: 100px;
  left: 174px;
  bottom: 0px;
  z-index: 1000;
  background-color: transparent
}

.ans_list .h3 {
  text-align: center;
}
.ans_list .el-card {
  margin-bottom: 8px;
}

.ans_list .el-card__body {
  height: auto;
}

</style>




