<template>
    <el-row class="wl-task-project">
        <div v-if="data.length===0" class="wl-task-project__no-data">这里还没有项目</div>
        <el-col :span="6" v-for="project in data" :key="project.id">
            <div class="wl-task-project__item" @click="()=>{enter(project)}">{{project.name}}</div>
        </el-col>
    </el-row>
</template>

<script>
import {getProjects} from '@/services/project.service'
export default {
  props: {
    environmentId: Number,
    space: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getProjects()
  },
  methods: {
    async getProjects () {
      let {data: {list}} = await getProjects({
        environment_id: this.environmentId
      }, {
        target: '.wl-task-project'
      })
      this.data = list
    },
    enter (project) {
      this.$router.push(`/${this.space}/task/create/${project.id}`)
    }
  }
}
</script>
<style lang="scss">
@import 'scss';

@include b(task-project) {
    @include e(item) {
        @include text-overflow-1;

        margin: 20px 40px;
        border: 1px solid #eee;
        border-radius: 5px;
        background: $primary;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 14px;
        font-weight: 900;
        cursor: pointer;
        opacity: 0.8;

        &:hover {
            font-size: 15px;
            opacity: 1;
        }
    }

    @include e(no-data) {
      text-align: center;
    }
}
</style>
