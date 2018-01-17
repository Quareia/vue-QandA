<template>
  <div class="answer-item"  >
    <el-card :class="{showall:true,active:showall}">

    <div class="answer-item-topic">
      <!-- 来自话题: {{answer.ansto.title}} -->
      
    </div>
    <div class="answer-owner">
        <img class="avatar" style="width: 24px; height: 24px; border-radius:2px" :src="'http://127.0.0.1:8000/' + answer.owner.info.userimg_url"/>
        <div class="name">{{answer.owner.username}}</div>
        <div class="something">{{answer.owner.info.something}} </div>
    </div>
    <div class="title"><a href="javascipt:void(0)" @click="$emit('scan', answer.ansto.id)">{{answer.ansto.title}}</a></div>
    <div class="description" :class="{showall:true,active:showall}">
      <mavon-editor ref=md :toolbarsFlag="false" :subfield="false" default_open="preview" :value="answer.description"></mavon-editor>
    </div>
    <div class="answer-item-end">
      <!-- <span>{{answernum}}个回答 · {{follownum}}人关注</span> -->
      <!-- 问题信息  通过添加slot复用 -->
          <el-button class="agree" :class="{isactive1:true,active:isactive1}"  type="small" @click="agree">
            <i class="iconfont icon-agree"></i> {{answer.ansagree}}
          </el-button>
          <el-button class="disagree" :class="{isactive2:true,active:isactive2}" type="small"  @click="against">
            <i class="iconfont icon-disagree"></i>
          </el-button>
          <el-button @click="$emit('answer', answer.ansto.id)">我要回答</el-button>
        <!-- <el-badge :value="follownum" class="item"> -->
        <!-- </el-badge> -->
        <el-button v-if="myself" @click="$emit('edit', answer)">编辑</el-button>
      <el-button v-if="!showall" @click="changeall()" class="right_child">
        查看更多 <i class="iconfont icon-unfold" style="font-size:8px"></i>
      </el-button>
      <el-button v-if="showall" @click="changeall()" class="right_child">
        收起 <i class="iconfont icon-fold" style="font-size:8px"></i>
      </el-button>
    </div>
    </el-card>
  </div>
</template>

<script>
let axios = require('axios');
  export default {
    data() {
      return {
        showall: false,
        imgurl: '',
        myself: false,
        isactive1: false,
        isactive2: false,
      }
    },
    props: {
      answer: {
        type: Object,
        required: true
      },
      nowuser: {
        type: Object,
        required: true
      },
      follownum:0,
      answernum:0
    },
    methods: {
      changeall: function() {
        console.log(this.showall)
        this.showall = !this.showall
        console.log(this.showall)
      },
      agree: function() {
        if (this.isactive1 == true) {
          this.answer.ansagree--
          this.isactive1 = false      
          return
        }
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
          this.isactive1 = true
        }) // url末尾要加/
      }
    },
    against: function() {
      if (this.isactive2 == true) {
          this.isactive2 = false      
          return
        }
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
    mounted() {
      this.imgurl = this.answer.owner.info.userimg_url
      if (this.nowuser.id == this.answer.owner.id)
        this.myself = true
    },
  }}
</script>

<style>

.answer-item {
  z-index: 1;
  height: auto;
  background-color: #fff;
  margin-bottom: 8px;
  position: relative;
  text-align: left;
}

.answer-item .left_child {
  float: left;

}

.answer-item .right_child {
  float: right;
}

/* .answer .answer-topic (

) */

.answer-item .showall {
  /* height: 300px; */
  overflow: hidden;
  clear: both;
  color: rgba(133, 144, 166, 0.7);
}

.answer-item .showall.active {
  height: auto;
  min-height: 56px;
}

.answer-item-topic {
  /* color: #8590a6; */
  font-size: 15px;
  font-weight: 550;
  margin-bottom: 14px;

}


.answer-item .el-card {
  height: 202px;
  padding: 16px 20px;
}

.answer-item .el-card__body {
  padding: 0px;
  padding-bottom: 14px;
}

.answer-item .answer-owner {
  position: relative;
  height: 24px;
  left: 36px;
  font-size: 15px;
  font-weight: 1000;
}

.answer-item .avatar {
  position: absolute;
  left: -36px;
}

.answer-item .name {
  position: relative;
}

.answer-item .something {
  font-weight: 600;
  font-size: 15px;
  position: relative;
  top: -20px;
  left: 48px;
}

.answer-item .title {
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.answer-item a {
  text-decoration-line: none;
  color: #1e1e1e;
}

.answer-item a:hover {
  color: #175199;
}

.answer-item .description {
  font-size: 16px;
  line-height: 24px;
  height: 56px;
  overflow: hidden;
  color: rgba(133, 144, 166, 0.9);
}

.answer-item-end {
  position: relative;
  bottom: -18px;
  font-size: 15px;
}

.answer-item-end .showall.active{
  position: relative;
  font-size: 15px;
}

.answer-item .isactive1 {
  color: #409eff;
  background-color: #ecf5ff;
}

.answer-item .isactive2 {
  position: relative;
  left: -8px;
  color: #409eff;
  background-color: #ecf5ff;
}

.answer-item .isactive1:hover {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-item .isactive2:hover {
  position: relative;
  left: -8px;
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-item .isactive1.active {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-item .isactive2.active {
  color: #ecf5ff;
  background-color: #409eff;
}

.answer-item .v-show-content .scroll-style {
  height: auto;
}

</style>
