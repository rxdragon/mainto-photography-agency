<template>
    <a-layout id="components-layout-demo-fixed-sider" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}">
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0,  background: '#273159' }">
            <a-menu mode="inline" :defaultSelectedKeys="['1-1']" :collapsible="false">
                <a-sub-menu key="1">
                    <span slot="title">
                        <a-icon type="team" /><span>修图中心</span>
                    </span>
                    <a-menu-item key="1-1" @click="routerView('/work')">上传拍摄</a-menu-item>
                    <a-menu-item key="1-2" @click="routerView('/workRecord')">上传历史记录</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="2" @click="routerView('/product')">
                    <a-icon type="upload" />
                    <span class="nav-text">产品管理</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <a-icon type="user" />
                    <span class="nav-text" @click="routerView('/custom')">客片中心</span>
                </a-menu-item>
                <a-sub-menu key="4">
                    <span slot="title">
                        <a-icon type="team" /><span>管理中心</span>
                    </span>
                    <a-menu-item key="4-1" @click="routerView('/manage')">子账号管理</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
    </a-layout>
</template>
<script>
export default {
  methods: {
    /**
     * [routerView 路由页面]
     * @param  {String} pathAddress [页面地址]
     */
    routerView (pathAddress) {
      this.$router.push({path: pathAddress})
    }
  }
}
</script>
<style scoped lang="less">

</style>
