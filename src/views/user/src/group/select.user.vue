<template>
   <div class="wl-search">
    <el-autocomplete
      size="small"
      v-model="keyword"
      popper-class="wl-search__input"
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
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    handleSelect (args) {
      this.keyword = args.username
      this.$emit('select', args)
    },
    async querySearchAsync (queryString, cb) {
      let {data: {list}} = await getUsers({
        kw: queryString
      })
      cb(list)
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
