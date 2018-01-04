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
    <!-- <el-upload
      class="upload-demo"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
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
          this.file = file
          // let param = new FormData(); //创建form对象
          // param.append('file',file,file.name);//通过append向form对象添加数据
          // param.append('chunk','0');//添加form表单中其他数据
          // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          // let config = {
          //   headers:{'Content-Type':'multipart/form-data'}
          // };  //添加请求头
          // this.axios.post('/api/answers',param,config)
          // .then(response=>{
          //   console.log(response.data);
          // })
      },
      addanswer: function() {
        if(this.islogin) {
          let instance = axios.create({
              headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
          });
          let param = new FormData();
          param.append('ansimg',this.file,this.file.name);
          param.append('ansto',this.questionid);
          param.append('description',this.answer);
          // let config = {
          //   headers:{'Content-Type':'application/form-data'}
          // };  //添加请求头
          // let postdata = {
          //   ansto:this.questionid,
          //   description: this.answer
          // }
          instance.post('/api/answers/', param).then(res => {
            let data = res.data
            console.log(data)
            this.$message({
              message: '回答成功!',
              type: 'success'
            });
            this.answer = ''
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
