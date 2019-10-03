<template>
  <div id="manage">
    <a-row class="title">
      <a-col :span="12">
        <span class="tip">产品管理</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" @click="routeView('/manageAccount')">添加子账号</a-button>
      </a-col>
    </a-row>
    <a-row class="table">
      <a-table :columns="columns" :dataSource="data" :pagination="false">
        <span slot="action" slot-scope="record">
          <div v-if="record.key === '1'">
            <a-button type="primary" class="edit" @click="routeView('/manageAccount')">编 辑</a-button>
            <a-button type="primary" ghost>启 用</a-button>
          </div>
          <div v-else>
            <a-button type="primary" class="edit" @click="routeView('/manageAccount')">编 辑</a-button>
            <a-button type="danger" ghost>禁 用</a-button>
          </div>
        </span>
      </a-table>
    </a-row>
  </div>
</template>
<script>
export default {
  name: 'manage',
  data() {
    return {
      columns: [{
        title: '账号',
        dataIndex: 'account',
        width: 300,
        align: 'center'
      }, {
        title: '修图师姓名',
        dataIndex: 'nickname',
        width: 300,
        align: 'center'
      }, {
        title: '创建时间',
        scopedSlots: { customRender: 'status' },
        dataIndex: 'created_time',
        width: 200,
        align: 'center'
      }, {
        title: '状态',
        dataIndex: 'status',
        width: 200,
        align: 'center'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'center'
      }],
    }
  },
  methods: {},
  created() {
    this.data = [{
      key: '1',
      account: 'DC:dacong',
      nickname: '修图师姓名',
      created_time: '2019/08/07 13:30',
      status: '启用'
    }, {
      key: '2',
      account: 'DC:congcong',
      nickname: '修图师姓名',
      created_time: '2019/08/07 13:30',
      status: '禁用'
    }]
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>