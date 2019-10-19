<template>
  <div>
    <a-row class="search">
      <a-col :span="8" class="date">
        <span class="tip">选择状态: </span>
        <a-select defaultValue="" v-model="selectValue" style="width: 50%">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="wait_review">待审核</a-select-option>
          <a-select-option value="refuse">审核拒绝</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="1" style="text-align: right;">
        <a-button type="primary" @click="searchProduct">查 询</a-button>
      </a-col>
    </a-row>
    <a-table class="table" :columns="columns" :dataSource="dataSource" :rowKey="bindKey" :pagination="false" :loading="loading">
      <span slot="status" slot-scope="record">
        <span>{{stateText[record.state]}}</span>
      </span>
      <span slot="action" slot-scope="record">
        <div>
          <span class="cancel" v-if="record.state === 'refuse'">
            <a href="javascript:;" @click="resubmit(record)">重新提交</a>
            <a-divider type="vertical" />
          </span>
          <a href="javascript:;" @click="viewDetail(record)">详情</a>
        </div>
      </span>
    </a-table>
    <a-pagination class="pagination" :current="page.index" :defaultCurrent="1" @change="searchProduct" :total="dataSource.length" />
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'notpassTab',
  data() {
    return {
      dataSource: [],
      columns: [{
        title: '产品名称',
        dataIndex: 'name',
        width: 300,
        align: 'left'
      }, {
        title: '生成时间',
        dataIndex: 'created_at',
        width: 300,
        align: 'left'
      }, {
        title: '审核状态',
        scopedSlots: { customRender: 'status' },
        width: 200,
        align: 'left'
      }, {
        title: '拒绝原因',
        dataIndex: 'refuse_reason',
        width: 200,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      stateText: {
        wait_review: '等待审核',
        refuse: '审核拒绝'
      },
      selectValue: '',
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
        state: 'not_pass',
        name: '',
        reviewPassAtStart: '',
        reviewPassAtEnd: '',
        page: this.page.index,
        pageSize: this.page.size
      }
    }
  },
  methods: {
    bindKey(record, index) {
      return index
    },
    resubmit(record) {
      this.$router.push({
        name: 'addProduct',
        query: {
          id: record.id,
          name: record.name,
          standard: record.retouch_require,
          url: record.simple_photo_paths
        }
      })
    },
    viewDetail(record) {
      this.$router.push({
        name: 'productDetail',
        params: { id: record.id }
      })
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
}
</style>