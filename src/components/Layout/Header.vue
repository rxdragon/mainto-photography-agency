<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="triggerCollapsed" />
    <section :style="{ float: 'right', marginRight: '10px'}">
      <span>{{getUser.nick}}</span>
      <a-tag color="#1769FF" class="organization">{{getUser.username}}</a-tag>
      <icon-font class="out" type="icon-tuichu" @click="showConfirm" />
    </section>
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
      collapsed: false
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
  methods: {
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
                window.sessionStorage.clear()
                window.location.reload()
              });
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
section {
  height: 64px;
  font-size: 14px;

  .organization {
    margin: auto 10px;
  }

  .out {
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
  }

  .out:hover {
    cursor: pointer;
  }
}
</style>