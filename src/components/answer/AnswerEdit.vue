<template>
  <div>
    <h3>写下回答</h3>
    <el-input
      placeholder="写下您的回答"
      v-model="answer"
      :disabled="!islogin"
      clearable
      autosize
      type="textarea"
    >
    </el-input>
    <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>

    <el-button type="success" round @click="addanswer">
      提交答案
    </el-button>
  </div>
</template>
<script>
let axios = require('axios');
  export default {
    props: {
      questionid: '',
      islogin: '',
    },
    methods: {
      update(e){
          let file = e.target.files[0];
          this.file=file
      },
      addanswer: function() {
        if(this.islogin) {
          let instance = axios.create({
              headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
          });
          let firstdata = {
            'ansto': this.questionid,
            'description': this.answer
          }
          instance.post('/api/answers/', firstdata).then(res => {
            let receivedata = res.data
            console.log(receivedata)
            let instance = axios.create({
              headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
            });
            let param = new FormData();
            // 此处name对应序列化的name
            param.append('ansimg',this.file,this.file.name);

            instance.post('/api/answers/' + receivedata.id + '/upload_image/', param).then(res => {
              let data = res.data
              console.log('img' + data)
              this.$message({
                message: '回答成功!',
                type: 'success'
              });
              this.answer = ''
            })
          })
        }

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    },
    data () {
      return {
        answer:'',
        file:'',
      }
    },
    mounted () {
    }
  }
</script>
<style>

</style>
