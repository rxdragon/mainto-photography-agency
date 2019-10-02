<template>
    <a-layout id="components-layout-demo-fixed-sider" :style="{ oVueerflow: 'auto', height: '100vh', position: 'fixed', left: 0}">
        <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0,  background: '#273159' }">
            <a-menu mode="inline" :selectedKeys="selectKeys" :openKeys.sync="openKeys">
                <a-sub-menu key="work">
                    <span slot="title">
                        <a-icon type="team" /><span>修图中心</span>
                    </span>
                    <a-menu-item key="upload" @click="routerView('/work')">上传拍摄</a-menu-item>
                    <a-menu-item key="record" @click="routerView('/workRecord')">上传历史记录</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="product" @click="routerView('/product')">
                    <a-icon type="upload" />
                    <span class="nav-text">产品管理</span>
                </a-menu-item>
                <a-menu-item key="customs" @click="routerView('/customs')">
                    <a-icon type="user" />
                    <span class="nav-text">客片中心</span>
                </a-menu-item>
                <a-sub-menu key="manage">
                    <span slot="title">
                        <a-icon type="team" /><span>管理中心</span>
                    </span>
                    <a-menu-item key="account" @click="routerView('/manage')">子账号管理</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
    </a-layout>
</template>
<script>
export default {
    data() {
        return {
            selectKeys: [],
            openKeys: [],
        }
    },
    methods: {
        routerView(address) {
            this.$router.push({ path: address })
        },
        switchRouter(path) {
            switch (path) {
                case '/manage':
                    this.openKeys = ['manage']
                    this.selectKeys = ['account']
                    break
                case '/work':
                    this.openKeys = ['work']
                    this.selectKeys = ['upload']
                    break
                case '/workRecord':
                    this.openKeys = ['work']
                    this.selectKeys = ['record']
                    break
                case '/product':
                    this.openKeys = []
                    this.selectKeys = ['product']
                    break
                case '/customs':
                    this.openKeys = []
                    this.selectKeys = ['customs']
                    break
            }
        }
    },
    watch: {
        '$route': function(route) {
            this.switchRouter(route.path)
        }
    }
}
</script>
<style scoped lang="less">
</style>