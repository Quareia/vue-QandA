<template>
  <div>
    <div>
      {{answer.description}}
    </div>
    <div class = "img-dislay">
      <!-- ugly method -->
      <img :src="'http://127.0.0.1:8000/answers/' +answer.ansimage">
    </div>
    <div>
      <el-button type="success" round @click="$emit('edit',answer.id)">编辑</el-button>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    answer:{
      type:Object,
      required:true
    }
  },
  methods: {

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
