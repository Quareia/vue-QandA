<template>
  <div class="answer-item"  >
    <el-card :class="{showall:true,active:showall}">

    <div class="answer-item-topic">
      来自话题: {{answer.ansto.title}}
    </div>
    <div class="answer-owner">
        <img class="avatar" style="width: 24px; height: 24px; border-radius:2px" :src="'http://127.0.0.1:8000/' + imgurl"/>
        <div class="name">{{answer.owner.username}}</div>
        
        <div class="something">{{answer.owner.info.something}} </div>
    </div>
    <div class="title"><a href="javascipt:void(0)" @click="$emit('scan', answer.id)">{{answer.ansto.title}}</a></div>
    <div class="description" :class="{showall:true,active:showall}">{{answer.description}}</div>
    <div class="answer-item-end">
      <!-- <span>{{answernum}}个回答 · {{follownum}}人关注</span> -->
      <!-- 问题信息  通过添加slot复用 -->
          <el-button class="agree" :class="{isactive1:true,active:isactive1}" size="small" @click="agree()">
            <i class="iconfont icon-agree"></i> {{answer.ansagree}}
          </el-button>
          <el-button class="disagree" :class="{isactive2:true,active:isactive2}" size="small" @click="disagree()">
            <i class="iconfont icon-disagree"></i>
          </el-button>
          <el-button @click="$emit('answer', answer.id)">我要回答</el-button>
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
        this.$emit('agree', this.answer.id)
        this.isactive1 = !this.isactive1
        if (this.isactive1 == true) {
          this.answer.ansagree += 1
          this.isactive2 = false
        }
        else this.answer.ansagree -= 1
      },
      disagree: function() {
        this.$emit('disagree', this.answer.id)
        this.isactive2 = !this.isactive2
         if (this.isactive1 == true) {
          this.isactive1 = false
          this.answer.ansagree -= 1
        }
        else this.answer.ansagree += 1
      }
    },
    mounted() {
      this.imgurl = this.answer.owner.info.userimg_url
      if (this.nowuser.id == this.answer.owner.id) 
        this.myself = true
    },
  }
</script>

<style>

.answer-item {
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
  height: 200px;
  padding: 16px 20px;
}

.answer-item .el-card__body {
  padding: 0px;
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
  left: 36px;
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
  height: 48px;
  overflow: hidden;
  color: rgba(133, 144, 166, 0.9);
}

.answer-item-end {
  position: relative;
  bottom: -10px;
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

</style>
