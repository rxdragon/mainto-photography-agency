<template>
  <div id='custom'>
    <h3>客片中心</h3>
    <section class='content'>
      <a-row class="search">
        <a-col :span="8">
          <span class="tip">上传时间: </span>
          <a-range-picker class="wrap" />
        </a-col>
        <a-col :span="7">
          <span class="tip">订单标题: </span>
          <a-input class="wrap" placeholder="请输入订单标题" />
        </a-col>
        <a-col :span="7">
          <span class="tip">订单号: </span>
          <a-input class="wrap" placeholder="请输入订单标号" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary">查 询</a-button>
        </a-col>
      </a-row>
      <a-table class="table" :columns="columns" :dataSource="data" :pagination="false">
        <span slot="action" slot-scope="record">
          <a-button type="primary" @click="routeView('/customDetail')">详 情</a-button>
        </span>
      </a-table>
      <a-pagination class="pagination" :defaultCurrent="1" :total="data.length" />
    </section>
  </div>
</template>
<script>
export default {
  name: 'custom',
  data() {
    return {
      data: [{
        key: '1',
        title: '测试标题1',
        date: '2019/08/07 13:30',
        number: '123123123123',
        cameramen: '甘道夫',
        serial: 'dsc123123123123',
        note: '',
      }, {
        key: '2',
        title: '测试标题2',
        date: '2019/08/07 13:30',
        number: '123123123123',
        cameramen: '哈皮',
        serial: 'dsc123123123123',
        note: '修得不好'
      }],
      columns: [{
        title: '订单标题',
        width: 300,
        dataIndex: 'title',
        align: 'center'
      }, {
        title: '订单号',
        width: 300,
        dataIndex: 'number',
        align: 'center'
      }, {
        title: '上传时间',
        width: 200,
        dataIndex: 'date',
        align: 'center'
      }, {
        title: '摄影师',
        width: 200,
        dataIndex: 'cameramen',
        align: 'center'
      }, {
        title: '流水号',
        width: 200,
        dataIndex: 'serial',
        align: 'center'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 100,
        align: 'center'
      }]
    }
  },
  methods: {},
  created() {}
}
</script>
<style lang="less">
@import './style/index.less';
</style>