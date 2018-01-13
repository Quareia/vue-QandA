<template>
  <div class="search">
    <el-popover
      ref="search-content"
      placement="bottom"
      width="400"
      :trigger="trigger">
      <!-- <h3>话题</h3>
      <el-table :data="searchtopic" @row-click = "gototopic">
        <el-table-column width="200" property="title" label="名称"></el-table-column>
        <el-table-column width="200" property="keywords" label="关键字"></el-table-column>
      </el-table> -->
      <h3>问题</h3>
      <el-table :data="searchquestion" @row-click = "gotoquestion">
        <el-table-column width="200" property="title" label="名称"></el-table-column>
        <el-table-column width="200" property="description" label="描述"></el-table-column>
      </el-table>
    </el-popover>
    <div class="inpu">
      <div class="search-icon">
        <i class="iconfont icon-search"></i>
      </div>
      <el-input v-model="input" v-popover:search-content
      placeholder="搜索你感兴趣的内容..."
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
          // this.gettopic()
          this.getquestion()
        }
        else {
          this.searchtopic = []
          this.searchquestion = []
        }
    },
    // 跳转到用户点击的话题页面
    // gototopic: function(row) {
    //   // 需要在此处增加话题的搜索次数
    //   console.log(row)
    //   this.$router.push({
    //     path: '/topic',
    //     query: {
    //       qid: row.id
    //     }
    //   })
    // },
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
    // gettopic: function() {
    //   axios.get('/api/topics/search/',{
    //     params:{
    //       title:this.input,
    //       page:1
    //     }
    //   }).then(res => {
    //     this.searchtopic=res.data.results.slice(0)
    //   })
    // },
    // 获取用户搜索的问题
    getquestion: function() {
      axios.get('/api/questions/search/',{
        params:{
          title:this.input,
          page:1
        }
      }).then(res => {
        this.searchquestion=res.data.results.slice(0)
      })
    },
  },
  mounted() {

  }
}
</script>

<style>
.search .search-icon {
  position: relative;
  top: 6px;
  z-index: 10;
  text-align: end;
  padding-right: 17px;
  font-weight: 600;
  color: #c0c4cc;
  height: 0;
}

.search .el-input__inner {
  z-index: 1001;
  height: 36px;
  border-radius: 36px;
  font-weight: 400;
  background-color: #f4f4f3;
}

.search .el-input__inner::-webkit-transition {
  width: 0.4s;
}

.search .el-input__inner::-moz-transition {
  width: 0.4s;
}

.search .el-input__inner::-o-transition {
  width: 0.4s;
}

.search .inpu {
  display: contents;
  width: 250px;
  transition: width 0.4s;
  top: 2px;
  position: relative;
  height: 36px;
}

.search .inpu:hover {
  width: 320px;
}

.search .el-input__inner:focus {
  border-color: #8f9299;
}
</style>
