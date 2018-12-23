<template>
    <div class="wl-detaction">
        <wl-breadcrumb :data="breadcrumbData"></wl-breadcrumb>
        <div class="wl-detaction__title">检测报告：项目</div>
        <div class="wl-detaction__content">
            <h1>标题</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>宿主机没有权限</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>百度谷歌，总有一款适合你</p></div>
        </div>
        <div class="wl-detaction__content">
            <h1>标题</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>宿主机没有权限</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>百度谷歌，总有一款适合你</p></div>
        </div>
        <div class="wl-detaction__content">
            <h1>标题</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>宿主机没有权限</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>百度谷歌，总有一款适合你</p></div>
        </div>
        <div class="wl-detaction__content">
            <h1>标题</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>宿主机没有权限</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>百度谷歌，总有一款适合你</p></div>
        </div>
        <div class="wl-detaction__content">
            <h1>标题</h1>
            <div class="wl-detaction__item"><span>原因：</span><p>宿主机没有权限</p></div>
            <div class="wl-detaction__item"><span>解决建议：</span><p>百度谷歌，总有一款适合你</p></div>
        </div>
    </div>
</template>

<script>
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
      ]
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
