<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <a-layout v-if="getUser.id" id="components-layout-demo-custom-trigger">
        <Sider :collapsed="collapsed" />
        <a-layout class="right-box" style="position: relative;">
          <Header @collapsedEvent="collapsedHandle" />
          <a-layout-content :style="{ background: '#f7f7f7', minHeight: '280px' }">
            <router-view @loading="sendLoding" />
          </a-layout-content>
          <div v-if="loading" class="loading-wrap">
            <a-spin />
          </div>
        </a-layout>
      </a-layout>
      <Welcome v-else />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import Sider from './components/Layout/Sider.vue'
import Welcome from './views/welcome/index.vue'
import Header from './components/Layout/Header.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: { Sider, Header, Welcome },
  data () {
    return {
      loading: false,
      collapsed: false,
      locale: zhCN,
      bodyStyle: {
        marginLeft: '20%'
      },
      contentStyle: {
        padding: '24px',
        background: '#f0f2f5',
        textAlign: 'center',
        minHeight: '700px',
        overflow: 'initial'
      }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  async created () {
    if (this.getUser.id) {
      await this.initUpyun().then().catch((e) => {
        this.$message.error(e.data.error_msg)
      })
    }
  },
  methods: {
    ...mapActions(['initUpyun', 'initHost']),
    sendLoding (state) {
      this.loading = state
    },
    collapsedHandle (type) {
      this.collapsed = type
    }
  }
}
</script>
<style lang="less">
html {
  font-family: var(--fontFamily);
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.loading-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}

.loading-wrap .ant-spin-spinning {
  position: absolute;
  top: 45%;
}

.ant-layout-content {
  height: calc(100vh - 128px);
  overflow-x: auto;
  overflow-y: auto;

  & > div {
    min-width: 1080px;
  }
}

#components-layout-demo-custom-trigger {
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>
