<template>
  <div>
    <a-row class="search">
      <a-col :span="8" class="date">
        <span class="tip">选择状态: </span>
        <a-select defaultValue="0" style="width: 50%">
          <a-select-option value="0">全部</a-select-option>
          <a-select-option value="1">待审核</a-select-option>
          <a-select-option value="2">审核拒绝</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="1" style="text-align: right;">
        <a-button type="primary">查 询</a-button>
      </a-col>
    </a-row>
    <a-table class="table" :columns="columns" :dataSource="data" :pagination="false">
      <span slot="status" slot-scope="record">
        <span v-if="record.key === '1'">待审核</span>
        <span v-else-if="record.key === '2'">审核拒绝</span>
      </span>
      <span slot="action" slot-scope="record">
        <div v-if="record.key === '1'">
          <a-button type="primary" @click="routeView('/productDetail')">详 情</a-button>
        </div>
        <div v-else-if="record.key === '2'">
          <a-button type="danger" ghost>重新提交</a-button>
        </div>
      </span>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'notpassTab',
  data() {
    return {}
  },
  props: {
    columns: Array,
    data: Array,
  },
  methods: {
    routeView(address) {
      this.$router.push({ path: address })
    }
  },
  created() {}
}
</script>
<style lang="less">
.search {
  margin-top: 10px;

  .date {
    white-space: nowrap;

    .tip {
      margin-right: 20px;
    }
  }
}

.table {
  margin-top: 20px;
  min-height: 200px;
}
</style>