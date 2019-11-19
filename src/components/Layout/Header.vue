<template>
  <a-layout-header id="header">
    <a-row class="info">
      <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerCollapsed" />
      <section :style="{ float: 'right' }">
        <span>{{getUser.nick}}</span>
        <a-tag color="#1769FF" class="organization">{{getUser.organization.nick}}</a-tag>
        <icon-font class="out-button" type="icon-tuichu" @click="showConfirm" />
      </section>
    </a-row>
    <a-row class="route-tip">
      <a-col :span="18" class="title">
        <h3>{{title}}</h3>
      </a-col>
      <a-col :span="5" class="back-button" v-if="showButton">
        <a-button type="primary" @click="routeBack">返回</a-button>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<script>
import { mapGetters } from 'vuex'
import { Icon } from 'ant-design-vue'
import Api from '@/api/index.js'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})
export default {
  name: 'Header',
  data() {
    return {
      title: '',
      collapsed: false,
      showButton: false,
    }
  },
  components: {
    IconFont,
  },
  computed: {
    ...mapGetters([
      'getUser',
    ])
  },
  watch: {
    '$route': function(route) {
      this.title = this.switchText(route.name)
      this.showButton = route.meta.showButton
    }
  },
  methods: {
    switchText(name) {
      let text = ''
      switch (name) {
        case 'work':
          text = '上传拍摄'
          break
        case 'workRecord':
          text = '历史记录'
          break
        case 'recordDetail':
          text = '历史详情'
          break
        case 'product':
          text = '产品管理'
          break
        case 'addProduct':
          text = '新增产品'
          break
        case 'productDetail':
          text = '产品详情'
          break
        case 'customs':
          text = '客片中心'
          break
        case 'customDetail':
          text = '客片详情'
          break
        case 'manage':
          text = '子账号管理'
          break
        case 'manageAccount':
          text = '添加子账号'
          break
        default:
          text = '首页'
      }
      return text
    },
    triggerCollapsed() {
      this.collapsed = !this.collapsed
      this.$emit('collapsedEvent', this.collapsed)
    },
    showConfirm() {
      const VM = this
      this.$confirm({
        title: '是否确认退出?',
        onOk() {
          Api.user.loginOut().then((res) => {
            if (res.success) {
              VM.$message.success('登出中...', 2, () => {
                window.localStorage.clear()
                window.location.reload()
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
#header {
  height: 128px;
  background: #fff;
  padding: 0;

  .info {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);

    section {
      font-size: 14px;

      .organization {
        margin: auto 10px;
      }

      .out-button {
        font-size: 18px;
        margin-right: 24px;
        font-weight: bold;
        vertical-align: middle;
      }

      .out-button:hover {
        cursor: pointer;
      }
    }
  }

  .route-tip {
    .title {
      padding-left: 24px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
    }

    .back-button {
      text-align: right;
    }
  }
}
</style>