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
import {getSpace} from '@/services/space.service'
import {mapGetters} from 'vuex'
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
      keyword: '',
      users: []
    }
  },
  created () {
    this.getUsers()
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
    ...mapGetters(['space']),
    userIds () {
      return this.members.map(user => user.id)
    }
  },
  methods: {
    handleSelect (args) {
      this.$emit('select', args)
    },
    async getUsers () {
      let {data: {members}} = await getSpace(this.space.current.id)
      this.users = members
    },
    querySearchAsync (queryString, cb) {
      cb(this.users.filter(user => {
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
