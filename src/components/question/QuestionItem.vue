<template>
  <div class="que">
    <div>
      <span class="left_child">
        <i class="el-icon-d-arrow-right"></i>
      </span>
      <span class="right_child">
        {{ question.owner }}
      </span>
    </div>
    <div>
      <span class="left_child">
        <i class="el-icon-d-arrow-right"></i>
      </span>
      <span class="right_child">
        {{ question.topic }}
      </span>
    </div>
    <div>
      <span class="left_child">
        <i class="el-icon-d-arrow-right"></i>
      </span>
      <span class="right_child">
        <h3>
          {{ question.title }}
        </h3>
      </span>
    </div>
    <div>
      <span class="left_child">
        <i class="el-icon-d-arrow-right"></i>
      </span>
      <span class="right_child">
        <p>
          {{ question.description }}
        </p>
      </span>
    </div>

    <div>
      <!-- 问题信息  通过添加slot复用 -->
      <el-badge :value="answernum" class="item">
        <el-button size="small" @click="$emit('answer', question.id)">回答</el-button>
      </el-badge>
      <el-badge :value="follownum" class="item">
        <el-button size="small" @click="addfollow">关注</el-button>
      </el-badge>
      <el-button size="small" @click="$emit('edit', question)">编辑</el-button>
      <el-button size="small" @click="$emit('scan', question.id)">查看</el-button>
    </div>
  </div>
</template>
<script>
let axios = require('axios');
  export default {
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
    mounted () {

    },
    methods: {
      addfollow: function() {
        if(this.question.followers.indexOf(this.nowuser.id) === -1) {
          this.follownum++;
          this.question.followers.push(this.nowuser.id)
          // 然后直接向后端发送更新请求即可
          axios.get('/api/questions/' + this.question.id + '/follow_question/').then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          }) // url末尾要加/
        }
        else {
          this.$message({
          message: '您已经关注过该问题了!',
          type: 'warning'
        });
        }
      },
    }
  }
</script>
<style>
.left_child {
  float: left;
}
.right_child {
  float: right;
}
.que > div {
  font-size: 1em;
  width: 60%;
  display: inline-block;
}
</style>
