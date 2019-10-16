<template>
  <div>
    <a-row class="search">
      <a-col :span="8" class="date">
        <span class="tip">选择日期: </span>
        <a-range-picker @change="dateChange" />
      </a-col>
      <a-col :span="3" style="text-align: right;">
        <a-button type="primary" @click="searchProduct">查 询</a-button>
      </a-col>
    </a-row>
    <a-table class="table" :columns="columns" :dataSource="dataSource" :rowKey="bindKey" :pagination="false" :loading="loading">
      <span slot="status" slot-scope="record">
        <span>
          <a-badge status="processing" />
          {{stateText[record.state] || '状态异常'}}
        </span>
      </span>
      <span slot="action" slot-scope="record">
        <div>
          <span class="cancel" v-if="record.state === 'enable'">
            <a href="javascript:;" style="color: #F5222D;" @click="switchState(record)">禁用</a>
            <a-divider type="vertical" />
          </span>
          <span class="cancel" v-else-if="record.state === 'disable'">
            <a href="javascript:;" style="color: #52C41A;" @click="switchState(record)">启用</a>
            <a-divider type="vertical" />
          </span>
          <a href="javascript:;" @click="viewDetail(record)">详情</a>
        </div>
      </span>
    </a-table>
    <a-pagination class="pagination" :current="page.index" @change="searchProduct" :defaultCurrent="1" :total="dataSource.length" />
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'passedTab',
  data() {
    return {
      dataSource: [],
      columns: [{
        title: '产品名称',
        dataIndex: 'name',
        width: 300,
        align: 'left'
      }, {
        title: '审核通过时间',
        dataIndex: 'review_pass_at',
        width: 300,
        align: 'left'
      }, {
        title: '状态',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      stateText: {
        disable: '禁用',
        enable: '启用',
        refuse: '已删除'
      },
      date: [],
      page: {
        size: 10,
        index: 1
      },
      loading: false
    }
  },
  computed: {
    searchParams() {
      return {
        reviewPassAtStart: this.date[0] || '',
        reviewPassAtEnd: this.date[1] || '',
        state: 'pass',
        page: this.page.index,
        pageSize: this.page.size
      }
    }
  },
  methods: {
    viewDetail(record) {
      this.$router.push({
        name: 'productDetail',
        params: { id: record.id }
      })
    },
    switchState(record) {
      Api.product.switch({
        id: record.id
      }).then(() => {
        this.$message.success('更改状态成功', 3, this.searchProduct)
      })
    },
    bindKey(record, index) {
      return index
    },
    dateChange(date, dateString) {
      this.date = dateString
    },
    searchProduct() {
      this.loading = true
      Api.product.list(this.searchParams).then((res) => {
        this.dataSource = res.msg.items
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created() {
    this.searchProduct()
  }
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

  .btnDetail {
    margin-left: 20px;
  }
}
</style>