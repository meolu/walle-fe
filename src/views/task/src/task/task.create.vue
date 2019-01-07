<template>
    <div class="wl-task-create">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="environment in environments" :key="environment.id" :title="environment.env_name" :name="environment.id">
                <project :environmentId="environment.id" :space="space"></project>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import {getEnvironments} from '@/services/environment.service'
import Project from './project.vue'
export default {
  created () {
    this.getEnvironments()
  },
  props: {
    space: {
      type: String,
      required: true
    }
  },
  components: {Project},
  data () {
    return {
      breadcrumbData: [
        {
          to: `/${this.space}/deploy/index`,
          name: '上线单'
        },
        {
          to: '',
          name: '创建'
        }
      ],
      activeName: -1,
      environments: []
    }
  },
  methods: {
    async getEnvironments () {
      let {data: {list}} = await getEnvironments()
      this.environments = list
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(task-create) {
   margin: 20px;
   box-sizing: border-box;
   background: #fff;
   min-height: calc(100% - 40px);
   padding: 10px;
   display: flex;
   flex-direction: column;

   .el-collapse-item__wrap {
     overflow: unset;
   }
}
</style>
