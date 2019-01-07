<template>
    <el-row class="wl-task-project">
        <div class="wl-task-project__search">
          <el-input
            placeholder="请输入项目名称"
            size="small"
            suffix-icon="el-icon-search"
            v-model="value">
              <!-- <el-button slot="append" icon="el-icon-search" @click="getProjects"></el-button> -->
          </el-input>
        </div>
        <div v-if="data.length===0" class="wl-task-project__no-data">这里还没有项目</div>
        <el-row>
          <el-col :span="6" v-for="project in data" :key="project.id">
              <div class="wl-task-project__item" @click="()=>{enter(project)}">{{project.name}}</div>
          </el-col>
        </el-row>
        <el-pagination
          v-if="count>size"
          layout="prev, pager, next"
          :current-page="page"
          :page-size="size"
          :total="count"
          @current-change="currentChange">
        </el-pagination>
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
      data: [],
      value: '',
      size: 5,
      count: 30,
      page: 1
    }
  },
  watch: {
    value () {
      this.getProjects()
    }
  },
  created () {
    this.getProjects()
  },
  methods: {
    async getProjects () {
      let {data: {list, count}} = await getProjects({
        environment_id: this.environmentId,
        kw: this.value,
        size: this.size,
        page: this.page
      }, {
        target: '.wl-task-project'
      })
      this.data = list
      this.count = count
    },
    enter (project) {
      this.$router.push(`/${this.space}/task/create/${project.id}`)
    },
    search ({keyCode}) {
      if (keyCode === 13) {
        this.getProjects()
      }
    },
    currentChange (page) {
      this.page = page
      this.getProjects()
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

    @include e(search) {
      position: absolute;
      top: -40px;
      right: 40px;
    }

    .el-pagination {
      text-align: center;
    }
}
</style>
