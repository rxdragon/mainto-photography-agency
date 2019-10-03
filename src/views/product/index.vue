<template>
  <div id="product">
    <a-row class="title">
      <a-col :span="12">
        <span class="tip">产品管理</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" @click="routeView('/addProduct')">新增产品</a-button>
      </a-col>
    </a-row>
    <a-row class="tab">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="审核通过" key="1">
          <passedTab :columns="passedColumns" :data="passseddata" />
          <a-pagination class="pagination" :defaultCurrent="1" :total="passseddata.length" />
        </a-tab-pane>
        <a-tab-pane tab="待审核" key="2" forceRender>
          <notpassTab :columns="notpassedColumns" :data="notpassdata" />
          <a-pagination class="pagination" :defaultCurrent="1" :total="passseddata.length" />
        </a-tab-pane>
      </a-tabs>
    </a-row>
  </div>
</template>
<script>
import PassedTab from './components/PassedTab.vue'
import NotpassTab from './components/NotpassTab.vue'
export default {
  data() {
    return {
      passseddata: [],
      notpassdata: [],
      passedColumns: [{
        title: '产品名称',
        dataIndex: 'name',
        width: 300,
        align: 'center'
      }, {
        title: '审核通过时间',
        dataIndex: 'date',
        width: 300,
        align: 'center'
      }, {
        title: '状态',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'center'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'center'
      }],
      notpassedColumns: [{
        title: '产品名称',
        dataIndex: 'name',
        width: 300,
        align: 'center'
      }, {
        title: '生成时间',
        dataIndex: 'date',
        width: 300,
        align: 'center'
      }, {
        title: '审核状态',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'center'
      }, {
        title: '拒绝原因',
        dataIndex: 'note',
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
  components: {
    PassedTab,
    NotpassTab
  },
  methods: {},
  created() {
    this.passseddata = [{
      key: '1',
      name: '花颜照',
      date: '2019/08/07 13:30',
    }, {
      key: '2',
      name: '证件照',
      date: '2019/08/07 13:30',
    }]

    this.notpassdata = [{
      key: '1',
      name: '花颜照',
      date: '2019/08/07 13:30',
      note: '',
    }, {
      key: '2',
      name: '证件照',
      date: '2019/08/07 13:30',
      note: '修得不好'
    }]
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>