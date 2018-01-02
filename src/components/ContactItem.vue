<template>
  <div class = "information">
    <div>
      姓名:   {{iteminfo.name}}
    </div>
    <div>
      电话:   {{iteminfo.phone}}
    </div>
    <div>
      QQ:   {{iteminfo.qq}}
    </div>
    <div>
      邮箱:   {{iteminfo.email}}
    </div>
    <el-button round icon="el-icon-edit-outline" @click="$emit('edititem', iteminfo.id)"></el-button>
    <el-button round icon="el-icon-delete" @click="$emit('delitem', iteminfo.id)"></el-button>
  </div>
</template>
<script>
  export default {
    name: 'ContactItem',
    props: {
      iteminfo: Object,
      required: true
    }
  }
</script>
<style>
.information {

}
</style>
