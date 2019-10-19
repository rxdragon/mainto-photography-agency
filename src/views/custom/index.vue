<template>
  <div id="custom">
    <section class='content'>
      <a-row class="search">
        <a-col :span="8">
          <span class="tip">上传时间: </span>
          <a-range-picker class="wrap" @change="dateChange" />
        </a-col>
        <a-col :span="7">
          <span class="tip">订单标题: </span>
          <a-input class="wrap" placeholder="请输入订单标题" v-model="search.title" />
        </a-col>
        <a-col :span="7">
          <span class="tip">订单号: </span>
          <a-input class="wrap" placeholder="请输入订单标号" v-model="search.number" />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" @click="searchOrder">查 询</a-button>
        </a-col>
      </a-row>
      <a-table
        class="table"
        :loading="loading"
        :rowKey="bindKey" 
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        >
        <span slot="stream_nums" slot-scope="record">
          <p v-for="(item, index) in record.stream_nums" :key="index">
            {{`${item.stream_num}(${item.state})`}}
          </p>
        </span>
        <span slot="action" slot-scope="record">
          <a href="javascript:;"  @click="routeView(record)">详 情</a>
        </span>
      </a-table>
      <a-pagination class="pagination" :defaultCurrent="1" :total="data.length" />
    </section>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'custom',
  data() {
    return {
      data: [],
      search: {
        date: [],
        title: '',
        number: '',
        page: {
          index: 1,
          size: 10
        }
      },
      loading: false,
      columns: [{
        title: '订单标题',
        width: 300,
        dataIndex: 'title',
        align: 'left'
      }, {
        title: '订单号',
        width: 300,
        dataIndex: 'order_num',
        align: 'left'
      }, {
        title: '上传时间',
        width: 200,
        dataIndex: 'updated_at',
        align: 'left'
      }, {
        title: '摄影师',
        width: 200,
        dataIndex: 'photographer',
        align: 'left'
      }, {
        title: '流水号',
        width: 300,
        scopedSlots: { customRender: 'stream_nums' },
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 100,
        align: 'right'
      }]
    }
  },
  computed: {
    searchParams() {
      return {
        type: 'global',
        createdAtStart: this.search.date[0] || '',
        createdAtEnd: this.search.date[1] || '',
        title: this.search.title,
        orderNum: this.search.number,
        page: this.search.page.index,
        pageSize: this.search.page.size
      }
    }
  },
  methods: {
    bindKey(record, index) {
      return index
    },
    dateChange(date, dateString) {
      this.search.date = dateString
    },
    routeView (record) {
      this.$router.push({
        name: 'customDetail',
        params: {id: record.order_num}
      })
    },
    searchOrder() {
      this.loading = true
      Api.work.list(this.searchParams).then((res) => {
        this.data = res.msg.items
      }).finally(() => {
        this.loading = false
      })
    },
  },
  created() {
    this.searchOrder()
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>