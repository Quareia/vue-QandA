<template>
  <div class="question-item"  >
    <el-card :class="{showall:true,active:showall}">
    <div class="question-item-topic">
      来自话题: {{question.topic.title}}
    </div>
    <div class="question-owner">
        <img class="avatar" style="width: 24px; height: 24px; border-radius:2px" :src="'http://127.0.0.1:8000/' + imgurl"/>
        <div class="name">{{question.owner.username}}</div>

        <div class="something">{{question.owner.info.something}} </div>
    </div>
    <div class="title"><a href="javascipt:void(0)" @click="$emit('scan', question.id)">{{question.title}}</a></div>
    <div class="description" :class="{showall:true,active:showall}">{{question.description}}</div>
    <div class="question-item-end">
      <span>{{answernum}}个回答 · {{follownum}}人关注</span>
      <!-- 问题信息  通过添加slot复用 -->
          <el-button size="small" @click="$emit('answer', question.id)">我要回答</el-button>
          <el-button v-if="!isfollow" size="small" @click="addfollow">关注问题</el-button>
          <el-button v-else size="small" @click="cancelfollow" id="isfollow">已关注</el-button>
        <el-button v-if="myself" size="small" @click="$emit('edit', question)">编辑</el-button>
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
        isfollow: false,
        followbutton: '关注问题'
      }
    },
    props: {
      question: {
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
      cancelfollow: function() {

        axios.get('/api/questions/' + this.question.id + '/cancel_follow/').then(res =>{
          this.follownum--;
          this.$message({
            message: res.data.msg,
            type: 'success',
          })
          this.isfollow = false
        })
      },
      addfollow: function() {
        if(this.question.owner == this.nowuser.name) {
          this.$message({
            message: '您是该问题的拥有者!',
            type: 'warning'
          });
        }
        else if(this.question.followers.indexOf(this.nowuser.id) === -1) {
          this.follownum++;
          //this.question.followers.push(this.nowuser.id)
          // 然后直接向后端发送更新请求即可
          axios.get('/api/questions/' + this.question.id + '/follow_question/').then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.isfollow = true
          }) // url末尾要加/
        }
      },
    },
    mounted() {
        this.imgurl = this.question.owner.info.userimg_url
        if (this.question.owner.username == this.nowuser.name)
          this.myself = true
        if(!(this.question.followers.indexOf(this.nowuser.id) === -1))
          this.isfollow = true
      },
  }
</script>

<style>

.question-item {
  height: auto;
  background-color: #fff;
  margin-bottom: 8px;
  position: relative;
  text-align: left;
}

.question-item .left_child {
  float: left;

}

.question-item .right_child {
  float: right;
}

/* .question .question-topic (

) */

.question-item #isfollow {
  color: #409EFF;
  background-color: #ecf5ff;
  position: relative;
  left: -10px;
}

.question-item .showall {
  /* height: 300px; */
  overflow: hidden;
  clear: both;
  color: rgba(133, 144, 166, 0.7);
}
.question-item .showall.active {
  height: auto;
  min-height: 56px;
}


.question-item-topic {
  /* color: #8590a6; */
  font-size: 15px;
  font-weight: 550;
  margin-bottom: 14px;

}


.question-item .el-card {
  height: 200px;
  padding: 16px 20px;
}

.question-item .el-card__body {
  padding: 0px;
}

.question-item .question-owner {
  position: relative;
  height: 24px;
  left: 36px;
  font-size: 15px;
  font-weight: 1000;
}

.question-item .avatar {
  position: absolute;
  left: -36px;
}

.question-item .name {
  position: relative;
}

.question-item .something {
  font-weight: 600;
  font-size: 15px;
  position: relative;
  top: -20px;
  left: 50px;
}

.question-item .title {
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.question-item a {
  text-decoration-line: none;
  color: #1e1e1e;
}

.question-item a:hover {
  color: #175199;
}

.question-item .description {
  font-size: 16px;
  line-height: 24px;
  height: 48px;
  overflow: hidden;
  color: rgba(133, 144, 166, 0.9);
}

.question-item-end {
  position: relative;
  bottom: -10px;
  font-size: 15px;
}
</style>
