<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <a-layout id="components-layout-demo-custom-trigger" v-if="getUser.id">
        <Sider :collapsed="collapsed" />
        <a-layout style="position: relative;">
          <Header @collapsedEvent="collapsedHandle" />
          <a-layout-content :style="{ background: '#f7f7f7', minHeight: '280px' }">
            <router-view @loading="sendLoding" />
          </a-layout-content>
          <div class="loading-wrap" v-if="loading">
            <a-spin />
          </div>
        </a-layout>
      </a-layout>
      <Welcome v-else />
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Sider from './components/Layout/Sider.vue'
import Welcome from './views/welcome/index.vue'
import Header from './components/Layout/Header.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      loading: false,
      collapsed: false,
      locale: zhCN,
      bodyStyle: {
        marginLeft: '20%',
      },
      contentStyle: {
        padding: '24px',
        background: '#f0f2f5',
        textAlign: 'center',
        minHeight: '700px',
        overflow: 'initial',
      }
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  components: {
    Sider,
    Header,
    Welcome
  },
  methods: {
    ...mapActions(['initUpyun', 'initHost']),
    sendLoding(state) {
      this.loading = state
    },
    collapsedHandle(type) {
      this.collapsed = type
    }
  },
  async created() {
    if (this.getUser.id) {
      await this.initUpyun().then().catch((e) => {
        this.$message.error(e.data.error_msg)
      })
    }
  }
}
</script>
<style>
.loading-wrap {
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.loading-wrap .ant-spin-spinning {
  position: absolute;
  top: 45%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>