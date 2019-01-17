<template>
   <div class="wl-project-search">
    <el-autocomplete
      size="small"
      v-model="keyword"
      popper-class="wl-project-search__input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入用户名"
      @select="handleSelect">
      <template slot-scope="{ item }">
        <span v-html="resultlight(item.username, keyword)"></span>
      </template>
      <template slot="suffix">
        <i class="el-icon-search"></i>
      </template>
    </el-autocomplete>
   </div>
</template>
<script>
import {getSpaceMembers} from '@/services/space.service'
export default {
  props: {
    members: {
      type: Array,
      default: () => []
    },
    value: String,
    spaceId: [String, Number]
  },
  data () {
    return {
      keyword: '',
      existMembers: [],
      noExist: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.keyword = val
      }
    }
  },
  computed: {
    userIds () {
      return this.members.map(user => user.id)
    }
  },
  methods: {
    handleSelect (args) {
      if (!this.noExist) this.$emit('select', args)
    },
    async querySearchAsync (queryString, cb) {
      let {data: {list}} = await getSpaceMembers(this.spaceId, {
        size: 30,
        kw: queryString
      },
      {
        target: '.wl-project-search__input'
      })
      let mems = list.filter(user => {
        return this.userIds.indexOf(user.id) === -1
      })
      if (mems.length > 0) {
        this.noExist = false
        cb(mems)
      } else {
        const noExist = [{username: '没有可添加的用户了'}]
        this.noExist = true
        cb(noExist)
      }
    },
    resultlight (value, qry) {
      if (!value) {
        return ''
      }
      if (!qry) {
        return value
      }
      const iQuery = new RegExp(qry, 'ig')
      return value.toString().replace(iQuery, function (matchedTxt) {
        return ('<span class=\'highlight\'>' + matchedTxt + '</span>')
      })
    }
  }
}
</script>
<style lang="scss">
@import 'scss';

@include b(project-search) {
  .el-autocomplete {
    width: 400px;
  }

  .el-input__suffix-inner {
    margin-right: 5px;
  }

  @include e(input) {
    .highlight {
        color: $primary;
    }
  }
}
</style>
