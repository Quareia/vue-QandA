<template>
  <div class="answer-show">
    <div class="answer-show-title">
      <img class="avatar" style="width: 38px; height: 38px; border-radius:4px" :src="'http://127.0.0.1:8000/' + answer.owner.info.userimg_url"/>
      <div class="name">{{answer.owner.username}}</div>
      <div class="something">1{{answer.owner.info.something}}</div>
      <div class="agree">{{answer.ansagree}}人赞同了该回答</div>
    </div>
    <div>
      <mavon-editor ref=md :toolbarsFlag="false" :subfield="false"  default_open="preview" :value="answer.description"></mavon-editor>
    </div>
    <div class="answerend">
      <div class="answertime">
        发布于 {{answer.created.substring(0,10)}} {{answer.created.substring(11,16)}}
      </div>
      <br />
      <div class="ans-btn">
          <el-button :class="{isactive1:true,active:isactive1}"  type="small" @click="agree">
            <i class="iconfont icon-agree"></i> {{answer.ansagree}}
          </el-button>
          <el-button :class="{isactive2:true,active:isactive2}" type="small"  @click="against">
            <i class="iconfont icon-disagree"></i> {{answer.ansagainst}}
          </el-button>
      </div>
    </div>
  </div>
</template>
<script>
let axios = require('axios');
export default {
  props: {
    answer:{
      type:Object,
      required:true
    }
  },
  methods: {
    agree: function() {
      console.log(this.answer)
      if(this.answer.owner == this.$store.state.nowuser.name) {
        this.$message({
          message: '您是该答案的拥有者!',
          type: 'warning'
        });
      }
      else {
        this.answer.ansagree++;
        // 然后直接向后端发送更新请求即可
        let id = this.answer.id
        axios.get('/api/answers/' + id + '/agree_answer/').then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.isactive1 = true;
        }) // url末尾要加/
      }
    },
    against: function() {
      console.log(this.answer)
      if(this.answer.owner == this.$store.state.nowuser.name) {
        this.$message({
          message: '您是该答案的拥有者!',
          type: 'warning'
        });
      }
      else {
        this.answer.ansagainst++;
        let id = this.answer.id
        // 然后直接向后端发送更新请求即可
        axios.get('/api/answers/' + id + '/against_answer/').then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.isactive2 = true
        }) // url末尾要加/
      }
    },

  },
  data () {
    return {
      isactive1: false,
      isactive2: false,
    }
  },
  mounted () {

  }
}
</script>
<style>
.img-display {
  width: 200px;
  height: auto;
}

.answer-show {
  z-index: 1;
  position: relative;
  width: 800px;
  left: 280px;
}

.answer-show .avatar {
  z-index: 2000;
  position: absolute;
  top: 18px;
  left: 25px;
}

.answer-show .name {
  position: absolute;
  left:79px;
  z-index: 2000;
  top: 12px;
  font-weight: 600;
}

.answer-show .something {
  position: absolute;
  left: 79px;
  z-index: 2000;
  top: 36px;
}

.answer-show .agree {
  position: absolute;
  left: 24px;
  z-index: 2000;
  top: 66px;
  font-size: 16px;
  color: #8590a6;
}

.answerend {
  position: absolute;
  bottom: 22px;
  z-index: 2000;
  left: 24px;
}

.answer-show .answertime {
  font-size: 16px;
  color: #8590a6;
  float: left;
}

.answer-show .isactive1 {
  color: #409eff;
  background-color: #ecf5ff;
}

.answer-show .isactive2 {
  position: relative;
  left: -8px;
  color: #409eff;
  background-color: #ecf5ff;
}

.answer-show .isactive1:hover {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-show .isactive2:hover {
  position: relative;
  left: -8px;
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-show .isactive1.active {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-show .isactive2.active {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-show .ans-btn {
  position: relative;
  bottom: -8px;
  left: -20px;
}

</style>
