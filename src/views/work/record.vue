<template>
  <div id="workRecord">
    <section class="content">
      <a-row class="search">
        <a-col :span="12">
          <span>选择日期: </span>
          <a-range-picker :disabled-date="disabledDate" @change="dateChange" />
        </a-col>
        <a-col :span="8">
          <span>订单标题: </span>
          <a-input v-model="search.title" placeholder="请输入订单标题" style="width: 75%;" />
        </a-col>
        <a-col :span="2" style="text-align: right;">
          <a-button type="primary" @click="searchOrder">查 询</a-button>
        </a-col>
      </a-row>
      <div class="table">
        <template>
          <a-table :columns="columns" :data-source="data" :pagination="false" :row-key="bindKey" :loading="loading">
            <span slot="stream_nums" slot-scope="record">
              <p v-for="(item, index) in record.stream_nums" :key="index">
                {{ `${item.stream_num} (${transText[item.state] || '状态未知'})` }}
              </p>
            </span>
            <span slot="action" slot-scope="record">
              <span v-if="hasRetouchStream(record.stream_nums)" class="cancel">
                <a href="javascript:;" @click="cancelOrder(record)">撤回</a>
                <a-divider type="vertical" />
              </span>
              <a href="javascript:;" @click="viewsDetail(record)">详情</a>
            </span>
          </a-table>
        </template>
      </div>
      <a-pagination class="pagination" :default-current="search.page.index" :total="data.length" @change="pageChange" />
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
import moment from 'moment'
export default {
  name: 'WorkRecord',
  data () {
    return {
      data: [],
      transText: {
        wait_retouch: '等待修片',
        finish: '云端修图完成',
        retouching: '修片中',
        wait_review: ' 审核中',
        reviewing: '等待审核',
        hanging: '挂起中',
        review_return_retouch: '审核退回修片中'
      },
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
    searchParams () {
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
  created () {
    this.searchOrder()
  },
  methods: {
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    bindKey (record, index) {
      return index
    },
    hasRetouchStream (streamNums) {
      for (const stream of streamNums) {
        if (stream.state === 'wait_retouch') { return true }
      }
      return false
    },
    cancelOrder (record) {
      this.loading = true
      Api.work.cancel({
        orderNum: record.order_num
      }).then(() => {
        this.searchOrder()
        this.$message.success('订单撤回成功', 2)
      }).finally(() => {
        this.loading = false
      })
    },
    dateChange (date, dateString) {
      this.search.date = dateString
    },
    pageChange (page) {
      this.search.page.index = page
      this.searchOrder()
    },
    searchOrder () {
      this.loading = true
      Api.work.list(this.searchParams).then((res) => {
        this.data = res.msg.items
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    viewsDetail (record) {
      this.$router.push({
        name: 'recordDetail',
        params: { id: record.order_num }
      })
    }
  }
}
</script>
<style lang="less">
@import './style/record.less';
</style>
