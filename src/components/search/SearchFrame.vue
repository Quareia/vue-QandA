<template>
  <div>
    <el-popover
      ref="search-content"
      placement="bottom"
      width="400"
      :trigger="trigger">
      <h3>话题</h3>
      <el-table :data="searchtopic" @row-click = "gototopic">
        <el-table-column width="200" property="title" label="名称"></el-table-column>
        <el-table-column width="200" property="keywords" label="关键字"></el-table-column>
      </el-table>
      <h3>问题</h3>
      <el-table :data="searchquestion" @row-click = "gotoquestion">
        <el-table-column width="200" property="title" label="名称"></el-table-column>
        <el-table-column width="200" property="description" label="描述"></el-table-column>
      </el-table>
    </el-popover>
    <div class = "inpu">
      <el-input v-model="input" v-popover:search-content
      placeholder="请输入话题名称或者问题名称"
      prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
  </div>
</template>

<script type="text/javascript">
let axios = require('axios')

export default {
  data() {
    return {
      searchtopic: [],
      searchquestion: [],
      input:'',
      trigger:'focus'
    }
  },
  watch: {
    input (val) {
     this.getdata()
    }
  },
  methods: {
    getdata: function() {
        if(this.input !== '') {
          console.log(this.input)
          this.gettopic()
          this.getquestion()
        }
        else {
          this.searchtopic = []
          this.searchquestion = []
        }
    },
    // 跳转到用户点击的话题页面
    gototopic: function(row) {
      // 需要在此处增加话题的搜索次数
      console.log(row)
      this.$router.push({
        path: '/topic',
        query: {
          qid: row.id
        }
      })
    },
    // 跳转到用户点击的问题页面
    gotoquestion: function(row) {
      // 需要在此处增加话题的搜索次数
      this.$router.push({
        path: '/question',
        query: {
          qid: row.id
        }
      })
    },
    // 获取用户搜索的话题
    gettopic: function() {
      axios.get('/api/topics/search/',{
        params:{
          title:this.input
        }
      }).then(res => {
        this.searchtopic=res.data.slice(0)
      })
    },
    // 获取用户搜索的问题
    getquestion: function() {
      axios.get('/api/questions/search/',{
        params:{
          title:this.input
        }
      }).then(res => {
        this.searchquestion=res.data.slice(0)
      })
    },
  },
  mounted() {

  }
}
</script>

<style scoped>
.inpu
{
  display: contents;
  width:200px;
  transition:width 1s;
  -moz-transition:width 1s; /* Firefox 4 */
  -webkit-transition:width 1s; /* Safari and Chrome */
  -o-transition:width 1s; /* Opera */
}

.inpu:hover
{
  width:500px;
}
</style>
