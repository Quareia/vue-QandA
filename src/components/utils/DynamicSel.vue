<template>
  <el-autocomplete
    class="inline-input"
    :fetch-suggestions="querySearch"
    placeholder=""
    v-model="state"
    @select="handleSelect"
  ></el-autocomplete>
</template>
<script>
export default {
  data() {
    return {
      state:''
    }
  },// data 必须写在props之前？
  props: {
    selectlist:{
      type: Array,
      required: true
    },
  },
  methods: {
    querySearch(queryString, cb) {
      this.$nextTick(function () {
        this.selectlist.map(el => {
          el.value = el.title
        })
        cb(this.selectlist)
      })
    },
    handleSelect(item) {
      console.log(item)
      this.$emit('select', item.id)
    },
  },
}
</script>
<style>

</style>
