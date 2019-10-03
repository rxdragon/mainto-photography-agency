<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <a-layout>
        <Header />
        <a-layout :style="bodyStyle">
          <Sider />
          <a-layout-content :style="{ overflow: 'initial' }">
            <section :style="contentStyle">
              <router-view />
            </section>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-locale-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import Sider from './components/Layout/Sider.vue'
import Header from './components/Layout/Header.vue'

export default {
  name: 'app',
  data() {
    return {
      locale: zhCN,
      bodyStyle: {
        marginLeft: '200px',
        marginTop: '64px'
      },
      contentStyle: {
        padding: '24px',
        background: '#fff',
        textAlign: 'center',
        minHeight: '700px',
        overflow: 'initial'
      }
    }
  },
  components: {
    Sider,
    Header
  }
}
</script>
<style>
#app {}
</style>