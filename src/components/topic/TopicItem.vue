<template>

  <el-card class="box-card" body-style = "{padding: '0px'}">
    <div class="text item">
      {{ topic.title }}
    </div>
    <div class="text item">
      {{ topic.keywords }}
    </div>
    <div class="inside-button">
      <el-badge :value="follownum" class="item">
      <el-button size="small" @click="addfollow" >关注</el-button>
      </el-badge>
      <el-button @click="$emit('edit', topic)" icon = "el-icon-edit-outline"></el-button>
      <el-button size="small" @click="$emit('scan', topic.id)" icon = "el-icon-zoom-in"></el-button>
    </div>
  </el-card>

</template>
<script>
let axios = require('axios');
  export default {
    props: {
      nowuser: {
        type: Object,
        required: true
      },
      topic: {
        type: Object,
        required: true
      },
      follownum: 0,
      questionnum: 0,
    },
    methods: {
      addfollow: function() {
        if(this.topic.owner == this.nowuser.name) {
          this.$message({
            message: '您是该话题的拥有者!',
            type: 'warning'
          });
        }
        else if(this.topic.followers.indexOf(this.nowuser.id) === -1) {
          this.follownum++;
          this.topic.followers.push(this.nowuser.id)
          // 然后直接向后端发送更新请求即可
          axios.get('/api/topics/' + this.topic.id + '/follow_topic/').then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            });
          }) // url末尾要加/
        }
        else {
          this.$message({
            message: '您已经关注过该话题了!',
            type: 'warning'
          });
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
<style >
.text {
  font-size: 25px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 200px;
}
.inside-button {
  display: inline-flex;
}
</style>
