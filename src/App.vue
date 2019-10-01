<template>
  <div id="app">
    <a-layout>
      <Header />
      <a-layout :style="{ marginLeft: '200px', marginTop: '64px' }">
				<Sider />
        <a-layout-content :style="{ overflow: 'initial' }">
          <section :style="{ padding: '24px', background: '#fff', textAlign: 'center', minHeight: '700px', overflow: 'initial'}">
            <router-view />
          </section>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Sider from './components/Layout/Sider.vue'
import Header from './components/Layout/Header.vue'

export default {
  components: {
      Sider,
      Header
  },
  name: 'app'
}
</script>
<style>
#app {}
</style>