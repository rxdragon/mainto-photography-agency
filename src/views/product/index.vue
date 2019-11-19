<template>
  <div id="product">
    <a-button class="add-btn" type="primary" @click="routeView('/addProduct')">新增产品</a-button>
    <a-row class="tab">
      <a-tabs default-active-key="1" :animated="{'tabPane': false}">
        <a-tab-pane key="1" tab="审核通过">
          <passedTab class="content" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="待审核" force-render>
          <notpassTab class="content" />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script>
import PassedTab from './components/passedTab.vue'
import NotpassTab from './components/notpassTab.vue'
export default {
  components: {
    PassedTab,
    NotpassTab
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>
