<template>
   <div class="wl-search">
    <el-autocomplete
      size="small"
      v-model="keyword"
      popper-class="wl-search__input"
      :fetch-suggestions="querySearchAsync"
      :placeholder="placeholder"
      :style="{width: '400px'}"
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
    groupUserList: {
      type: Array,
      default: () => []
    },
    // 搜索用户列表，如果传space_id则空间下搜索，否则全局搜索
    spaceId: String,
    value: String,
    placeholder: {
      type: String,
      default: '请输入用户名'
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
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    userIds () {
      return this.groupUserList.map(user => user.id)
    }
  },
  methods: {
    handleSelect (args) {
      this.$emit('select', args)
    },
    async querySearchAsync (queryString, cb) {
      let {data: {list}} = await getUsers({
        kw: queryString,
        space_id: this.spaceId
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

@include b(search) {
  @include e(input) {
    .highlight {
        color: $primary;
    }
  }

  .el-input__suffix-inner {
    position: absolute;
    top: 9px;
    left: -14px;
  }
}
</style>
