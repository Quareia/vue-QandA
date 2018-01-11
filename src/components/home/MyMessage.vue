<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="收到的消息">
        <div v-for="item in myrecv" :key="item.id">
            {{item.content}}
        </div>
      </el-tab-pane>
      <el-tab-pane label="发送的消息">
        <div v-for="item in mysend" :key="item.id">
            {{item.content}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

let axios = require('axios');
  export default {
    components: {
    },
    methods: {
    },
    data () {
      return {
        mysend: [],
        myrecv: [],
      }
    },
    created () {
    },
    mounted() {
     
      this.getdata()
    },
    methods: {
      getdata() {
        axios.get('/api/messages/my_send_messages/?page=1').then(res => {
          this.mysend = res.data.results.slice(0)})
        axios.get('/api/messages/my_receive_messages/?page=1').then(res => {
        this.myrecv = res.data.results.slice(0)
        })
      },
    },
  }
</script>
<style>

</style>
