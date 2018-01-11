<template>
  <div>
    <mavon-editor ref=md @imgAdd="$imgAdd" @save="upload" :toolbars = "toolbars" :value="test1"></mavon-editor>
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
      $imgAdd(pos, $file){
          // 第一步.将图片上传到服务器.
        let instance = axios.create({
            headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
        });
        var formdata = new FormData();
        formdata.append('image', $file);
        instance({
            url: '/api/answerimages/',
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
            // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
            /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          let url = 'http://127.0.0.1:8000/' + res.data.image_url
          console.log(res.data.image_url) // 设置
          this.$refs.md.$img2Url(pos, url);
        })
      },
      upload: function(value, render) {
        // 只需要将value上传到服务器的答案的描述中，然后用mavon显示即可
        console.log(value)
        let instance = axios.create({
          headers: {"X-CSRFToken": this.$cookie.get('csrftoken')}
        });
        let param = new FormData();
        param.append('ansto', this.questionid)
        param.append('description',value);
        instance.post('/api/answers/', param).then(res => {
          console.log(res)
          this.$emit('addanswer', res)
            this.$message({
              message: '回答成功!',
              type: 'success'
            });
            this.answer = ''
        })
      },
    },
    data () {
      return {
        answer:'',
        file:'',
        test1:'',
        toolbars: {
          link: true, // 链接
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          imagelink: true, // 图片链接
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
      }
      }
    },
    mounted () {
    }
  }
</script>
<style>

</style>
