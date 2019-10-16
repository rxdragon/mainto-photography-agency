<template>
  <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="256px" :style="{ overflow: 'auto', minHeight: '100vh',}">
    <p class="wrap" :style="{height: '64px', padding: '20px 40px',}">
      <img :src="logo" :style="{width: '100%'}" v-if="!collapsed">
      <img :src="singleLogo" :style="{width: '100%'}" v-else>
    </p>
    <a-menu mode="inline" theme="dark" :selectedKeys="selectedKeys" :openKeys.sync="openKeys">
      <a-sub-menu key="work">
        <span slot="title">
          <a-icon type="team" /><span>修图中心</span>
        </span>
        <a-menu-item key="upload" @click="routeView('/work')">上传拍摄</a-menu-item>
        <a-menu-item key="record" @click="routeView('/workRecord')">上传历史记录</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="product" @click="routeView('/product')">
        <a-icon type="upload" />
        <span class="nav-text">产品管理</span>
      </a-menu-item>
      <a-menu-item key="customs" @click="routeView('/customs')">
        <a-icon type="user" />
        <span class="nav-text">客片中心</span>
      </a-menu-item>
      <a-sub-menu key="manage">
        <span slot="title">
          <a-icon type="team" /><span>管理中心</span>
        </span>
        <a-menu-item key="account" @click="routeView('/manage')">子账号管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
const RouteConfig = [{
  path: ['manage', 'manageAccount'],
  selectedKeys: ['account'],
  openKeys: ['manage']
}, {
  path: ['workRecord', 'recordDetail'],
  selectedKeys: ['record'],
  openKeys: ['work']
}, {
  path: ['work'],
  selectedKeys: ['upload'],
  openKeys: ['work']
}, {
  path: ['product', 'addProduct', 'productDetail'],
  selectedKeys: ['product'],
  openKeys: []
}, {
  path: ['customs', 'customDetail'],
  selectedKeys: ['customs'],
  openKeys: []
}]
export default {
  name: 'Sider',
  data() {
    return {
      logo: require("@/assets/img/logo.png"),
      singleLogo: require("@/assets/img/single-logo.png"),
      selectedKeys: [],
      openKeys: [],
    }
  },
  props: {
    collapsed: Boolean
  },
  watch: {
    '$route': function(route) {
      this.checkRoute(route.name)
    }
  },
  methods: {
    checkRoute(path) {
      RouteConfig.map(item => {
        if (item.path.indexOf(path) > -1) {
          this.openKeys = item.openKeys
          this.selectedKeys = item.selectedKeys
        }
      })
    }
  }
}
</script>