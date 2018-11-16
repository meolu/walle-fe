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
import {mapGetters, mapActions} from 'vuex'

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
      existMembers: [],
      noExist: false
    }
  },
  async created () {
    if (!this.user) {
      await this.getUserInfo()
    }
    this.getExistMembers()
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
    ...mapGetters(['space', 'user']),
    userIds () {
      return this.members.map(user => user.id)
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: 'FETCH_USER_INFO'
    }),
    handleSelect (args) {
      if (!this.noExist) this.$emit('select', args)
    },
    async getExistMembers () {
      let {data: {members}} = await getSpace(this.space.current.id)
      this.existMembers = members
    },
    querySearchAsync (queryString, cb) {
      let mems = this.existMembers.filter(user => {
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
