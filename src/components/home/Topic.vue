<template>
  <div class="topics">
    <div class="topic-contain">
    <el-row :gutter="8">
      <el-col :span="17">
        <div class="topic-main">
          
          <!-- <div class="topic-answerList">
            <topic-block :requesturl="requesturl">
              <p> </p>
            </topic-block>
          </div> -->
          <el-carousel :interval="5000" arrow="always" style="margin-bottom:8px;">
            <el-carousel-item v-for="item in hotTopic" :key="item.id">
              <el-button @click="gotoTopic(item.id)">{{item.title}}</el-button>
            </el-carousel-item>
          </el-carousel>

          <el-tabs type="border-card">
            <el-tab-pane label="为你推荐">
              <recommand-question :requesturl="requesturl">
                <p> </p>
              </recommand-question>
            </el-tab-pane>
            <el-tab-pane label="所有话题">
               <topic-block :requesturl="requestall">
                <p> </p>
              </topic-block>
            </el-tab-pane>
          </el-tabs>
          
        </div>
      </el-col>
      <el-col :span="7">
        <div class="topic-side">
          <el-card>
              <my-message>

            </my-message>
            </el-card>
          
            
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
import TopicBlock from '@/components/topic/TopicBlock'
import RecommandQuestion from '@/components/question/RecommandQuestion'
import MyMessage from './MyMessage'

let axios = require('axios');
  export default {
    components: {
      TopicBlock,
      RecommandQuestion,
      MyMessage
    },
    methods: {
    },
    data () {
      return {
        nowuser: {
          name: '',
          id: 0,
        },
        requesturl: '/api/questions/get_hot_question/',
        requestall: '/api/topics/',
        islogin:'',
        hotTopic: [],
      }
    },
    created () {
    },
    mounted() {
      setTimeout( ()=> {
        this.nowuser = this.$store.state.nowuser
        this.islogin = this.$store.state.islogin
        console.log('nowuser is:  ' + this.nowuser.name)
      }, 200)
      this.getdata()
    },
    methods: {
      getdata() {
        axios.get('/api/topics/get_hot_topic/?page=1').then(res => {
          this.hotTopic = res.data.slice(0)
        })
      },
      gotoTopic(id) {
        this.requesturl = '/api/topics/' + id + '/get_questions'
      }
    }
  }
</script>
<style>
.topics {
  min-height: 700px;
  position: relative;
  width: 100%;
  display: flex;
}

.topic-contain {
  width: 100%;
  padding-top: 56px;
  padding-left: 174px;
  padding-right: 174px;
}

.topics .topic-side {
  position: fixed;
  width: 286px;
  min-width: 286px;
}

.topics .topic-side .el-card {
  margin-bottom: 8px;
}

.topics .topic-topicList {
  margin-top: 8px;
}

.topics .topic-main .el-button {
  border: none;
}

.topics .topic-main {
  position: relative;
  /* top: -8px; */
}

.el-carousel__item .el-button {
  color: #475669;
  font-size: 40px;
  opacity: 0.75;
  line-height: 220px;
  margin: 0;
  height: 100%;
  width: 100%;
  background: transparent;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-carousel__container {
  height: 220px;
}

</style>
