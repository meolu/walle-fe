<template>
    <div class="wl-detaction">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-detaction__title" v-if="project">检测报告：{{project.name}}</div>
        <div class="wl-detaction__success" v-if="data&&data.length===0">
            <i class="el-icon-success"></i>
            <span>恭喜，检测通过</span>
        </div>
        <div class="wl-detaction__content" v-for="(item,i) in data" :key="i+'detaction'">
            <h1>{{item.title}}</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>{{item.why}}</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>{{item.how}}</p></div>
        </div>
    </div>
</template>

<script>
import {detectProject, getProject} from '@/services/project.service'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    space: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      breadcrumbData: [
        {
          to: `/${this.space}/project/index`,
          name: '项目'
        },
        {
          to: '',
          name: '检测报告'
        }
      ],
      data: null,
      project: null
    }
  },
  created () {
    this.getProject()
    this.getDetactions()
  },
  methods: {
    async getDetactions () {
      const {data} = await detectProject(this.id)
      this.data = data
    },
    async getProject () {
      const {data} = await getProject(this.id)
      this.project = data
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(detaction){
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;
   color: #606266;

   @include e(title) {
       line-height: 30px;
       font-size: 16px;
       color: #1890ff;
   }

   @include e(success) {
       margin: 100px auto;
       color: #67c23a;

       i,span {
           font-size: 20px;
       }
   }

   @include e(content) {
       h1 {
           font-size: 16px;
           font-weight: 500;
           line-height: 30px;
           border-bottom: 1px solid #606266;
       }
   }

   @include e (item) {
        margin: 10px 0;
        padding: 0 20px;
        line-height: 20px;

        span {
            color: #1890ff;
        }
    }
}

</style>
