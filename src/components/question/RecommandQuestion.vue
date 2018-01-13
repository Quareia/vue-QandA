<template>
  <div>
    <question-list :requesturl="requesturl"/>
  </div>
</template>
<script>
import QuestionList from '@/components/question/QuestionList'
  export default {
    components: {
      QuestionList
    },
    data () {
      return {
        requesturl: '/api/questions/get_hot_question/'
      }
    },
    mounted(){
    }
  }
</script>
<style>

</style>
