<template>
  <div>
    <div>
      {{answer.description}}
    </div>
    <div class = "img-dislay">
      <!-- ugly method -->
      <img :src="'http://127.0.0.1:8000/answers/' + answer.ansimage" v-if= "answer.ansimage" height="200" width="200">
    </div>
    <div>
      <el-badge :value="answer.ansagree" class="item">
        <el-button size="small" @click="agree">赞同</el-button>
      </el-badge>
      <el-badge :value="answer.ansagainst" class="item">
        <el-button size="small" @click="against">反对</el-button>
      </el-badge>
      <el-button type="success" round @click="$emit('edit',answer.id)">编辑</el-button>
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
        }) // url末尾要加/
      }
    },

  },
  data () {
    return {
    }
  },
  mounted () {

  }
}
</script>
<style>
.img-display {
  width: 200px;
  height: 200px;
}
</style>
