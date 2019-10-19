<template>
  <div id='workRecord'>
    <section class='content'>
      <a-row class="search">
        <a-col :span="10">
          <span>选择日期: </span>
          <a-range-picker @change="dateChange" />
        </a-col>
        <a-col :span="8">
          <span>订单标题: </span>
          <a-input placeholder="请输入订单标题" style="width: 75%;" v-model="search.title" />
        </a-col>
        <a-col :span="2" style="text-align: right;">
          <a-button type="primary" @click="searchOrder">查 询</a-button>
        </a-col>
      </a-row>
      <div class="table">
        <template>
          <a-table :columns="columns" :dataSource="data" :pagination="false" :rowKey="bindKey" :loading="loading">
            <span slot="stream_nums" slot-scope="record">
              <p v-for="(item, index) in record.stream_nums" :key="index">
                {{item.stream_num}}
              </p>
            </span>
            <span slot="action" slot-scope="record">
              <span class="cancel" v-if="hasRetouchStream(record.stream_nums)">
                <a href="javascript:;" @click="cancelOrder(record)">撤回</a>
                <a-divider type="vertical" />
              </span>
              <a href="javascript:;"  @click="viewsDetail(record)">详情</a>
            </span>
          </a-table>
        </template>
      </div>
      <a-pagination 
        class="pagination"
        :defaultCurrent="search.page.index"
        :total="data.length"
        @change="pageChange"
      />
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'workRecord',
  data() {
    return {
      data: [],
      loading: true,
      columns: [{
        title: '订单标题',
        dataIndex: 'title',
        width: 300,
        align: 'left'
      }, {
        title: '订单号',
        dataIndex: 'order_num',
        width: 300,
        align: 'left'
      }, {
        title: '上传时间',
        dataIndex: 'created_at',
        align: 'left',
        width: 200
      }, {
        title: '流水号',
        scopedSlots: { customRender: 'stream_nums' },
        width: 300,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      search: {
        date: [],
        title: '',
        page: {
          size: 10,
          index: 1
        }
      }
    }
  },
  computed: {
    searchParams() {
      return {
        type: 'person',
        createdAtStart: this.search.date[0] || '',
        createdAtEnd: this.search.date[1] || '',
        title: this.search.title,
        page: this.search.page.index,
        pageSize: this.search.page.size
      }
    }
  },
  methods: {
    bindKey(record, index) {
      return index
    },
    hasRetouchStream(streamNums) {
      for (let stream of streamNums) {
        if (stream.state === 'wait_retouch') { return true }
      }
      return false
    },
    cancelOrder (record) {
      this.loading = true
      Api.work.cancel({
        orderNum: record.order_num
      }).then(() => {
        this.$message.success('订单撤回成功', 3, this.searchOrder)
      }).finally(() => {
        this.loading = false
      })
    },
    dateChange(date, dateString) {
      this.search.date = dateString
    },
    pageChange(page) {
      this.search.page.index = page
      this.searchOrder()
    },
    searchOrder() {
      this.loading = true
      Api.work.list(this.searchParams).then((res) => {
        this.data = res.msg.items
      }).finally(() => {
        this.loading = false
      })
    },
    viewsDetail(record) {
      this.$router.push({
        name: 'recordDetail',
        params: {id: record.order_num}
      })
    }
  },
  created() {
    this.searchOrder()
  }
}
</script>
<style lang="less">
@import './style/record.less';
</style>