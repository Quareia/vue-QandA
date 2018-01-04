<template>
  <el-autocomplete
    class="inline-input"
    :fetch-suggestions="querySearch"
    placeholder=""
    @select="handleSelect"
  ></el-autocomplete>
</template>
<script>
export default {
  props: {
    selectlist:[],
  },
  methods: {
    querySearch(queryString, cb) {
      this.$nextTick(function () {
        // let results = queryString ? this.selectlist.filter(el => el.includes(queryString)) : this.selectlist
        // // results.map(el => {el.value = el.name}) // 必须使用参数中的value属性来查找
        // cb(results);
        // 没有网络时locahost可能不可用
        cb(this.selectlist)
      })
    },
    handleSelect(item) {
      console.log(item)
      this.$emit('select', item)
    },
  },
  mounted () {

  }
}
</script>
<style>

</style>
