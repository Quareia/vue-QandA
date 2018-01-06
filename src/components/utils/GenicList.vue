<template>
  <div class = "list">
    <div class = "add-button">
      <slot name = "add button"></slot>
    </div>

    <transition-group tag="div" name="slide"
    mode = "out-in" enter-class="bounceInDown"
    leave-class="bounceOutUp">
    </transition-group>


    <el-dialog :visible.sync="editformvisable" :center="true">
      <el-button type="success" @click="confirmedit">确认</el-button>
      <el-button type="info"  @click= "editformvisable = false">取消</el-button>
    </el-dialog>


    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="totalnum"
        @current-change="getnextpage"
        :page-size="5"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
let axios = require('axios');
export default {
  methods: {
    scan: function(id) {

    },
    add: function() {

    },
    edit: function() {
    },
    confirmedit: function() {

    },
    del: function() {
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
            this.$message.warning('没有更多的问题了!')
          }
          this.questionlist = response.data.results.slice(0)
      });
    }, // 分页
    getdata:function() {
  },
  created() {
  },
  data() {
    return {
    }
  }
}
}
</script>
<style scoped>

</style>
