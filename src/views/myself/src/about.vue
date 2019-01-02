<template>
    <div class="wl-about">
        <div class="wl-about__row">
            <h1 class="wl-about__title"> 关于瓦力</h1>
        </div>
        <div class="wl-about__row">
            <div class="wl-about__strong"><p>我们期望打造一个比 jenkins 更为好用的的部署平台，walle团队孜孜不倦地做免费开源。<br>
            愿 walle 能真真切切为你解决 DevOps 的问题，也愿能与志同道合之人相知畅聊。</p></div>
        </div>
        <div class="wl-about__row">
            <a class="wl-about__walle" href="https://walle-web.io/" target="_blank">官网 (walle-web.io)</a> | <a class="wl-about__walle" href="https://github.com/meolu/walle-web" target="_blank">github (walle-web)</a>
        </div>
        <div class="wl-about__row">
            <div>
                <iframe src="https://ghbtns.com/github-btn.html?user=meolu&repo=walle-web&type=star&count=true" frameborder="0" scrolling="0" width="110px" height="20px"></iframe>
                <iframe src="https://ghbtns.com/github-btn.html?user=meolu&repo=walle-web&type=fork&count=true" frameborder="0" scrolling="0" width="110px" height="20px"></iframe>
            </div>
        </div>
        <div class="wl-about__row">
            <div class="wl-about__name">walle 版本</div>
            <span class="wl-about__desc">{{`${version}`}}</span>
        </div>
        <div class="wl-about__row">
            <div class="wl-about__name">walle commit</div>
            <span class="wl-about__desc">{{`${commit}`}}</span>
        </div>
        <div class="wl-about__row">
            <div class="wl-about__name">服务器信息</div>
            <span class="wl-about__desc">{{`${server}`}}</span>
        </div>
        <div class="wl-about__row">
            <div class="wl-about__name">Python</div>
            <span class="wl-about__desc">{{`${python}`}}</span>
        </div>
        <div class="wl-about__footer">如果喜欢，请不吝为我们github项目点个星<a href="https://github.com/meolu/walle-web" target="_blank">star</a>，关注公众号 <a href="http://walle-web.io/about/" target="_blank">walle-web</a> 了解更多</div>
    </div>
</template>

<script>
import {getWalleInfo} from '@/services/user.service'
export default {
  name: 'wl-about',
  data () {
    return {
      commit: '',
      version: '',
      server: '',
      python: ''
    }
  },
  created () {
    this.getWalleInfo()
  },
  methods: {
    async getWalleInfo () {
      const {data: {commit, version, server, python}} = await getWalleInfo()
      this.commit = commit
      this.version = version
      this.server = server
      this.python = python
    }
  }
}
</script>

<style lang="scss">
@import 'scss';

@include b(about) {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: auto;
    // background-size: cover;
    // background-image: url('~assets/img/welcom.jpg');

    @include e(row) {
        display: flex;
        color: #606266;
        padding: 15px 0;
        font-size: 14px;
        justify-content: center;
    }

    @include e(title) {
        font-size: 22px;
        line-height: 30px;
        font-weight: 500;
    }

    @include e(name) {
        width: 220px;
        color: rgb(153, 153, 153);
        font-size: 16px;
        margin-right: 20px;
        text-align: right;
    }

    @include e(walle) {
        color: #409EFF;
        font-size: 16px;

        &:hover {
            text-decoration: underline;
        }
    }

    @include e(desc) {
        font-size: 14px;
        line-height: 16px;
        width: 350px;
    }

    @include e(strong) {
        text-align: center;
        margin: 10px auto;

        p {
            line-height: 30px;
            font-size: 18px;
            width: 800px;
        }
    }

    @include e(footer) {
        position: absolute;
        bottom: 20px;
        text-align: center;
        width: 100%;
        color: #909399;

        a {
            color: #409EFF;
            margin: 0 4px;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
