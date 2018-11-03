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
import {getUsers} from '@/services/user.service'
export default {
  props: {
    members: {
      type: Array,
      default: () => []
    },
    value: String
  },
  data () {
    return {
      keyword: ''
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
      this.$emit('select', args)
    },
    async querySearchAsync (queryString, cb) {
      let {data: {list}} = await getUsers({
        kw: queryString
      })
      cb(list.filter(user => {
        return this.userIds.indexOf(user.id) === -1
      }))
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
  @include e(input) {
    .highlight {
        color: $primary;
    }
  }
}
</style>
