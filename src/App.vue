<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <a-layout id="components-layout-demo-custom-trigger" v-if="getUser.id">
        <Sider :collapsed="collapsed" />
        <a-layout>
          <Header @collapsedEvent="collapsedHandle" />
          <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
            <router-view />
          </a-layout-content>
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
    ...mapGetters(['getUser'])
  },
  components: {
    Sider,
    Header,
    Welcome
  },
  methods: {
    ...mapActions(['initUpyun']),
    collapsedHandle(type) {
      this.collapsed = type
    }
  },
  async created() {
    this.initUpyun()
  }
}
</script>
<style>
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