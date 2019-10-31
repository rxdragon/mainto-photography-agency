<template>
  <div id="manage">
    <a-row class="title">
      <a-col :span="12">
        <span class="tip">账号管理</span>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-button type="primary" @click="routeView('/manageAccount')">添加子账号</a-button>
      </a-col>
    </a-row>
    <a-row class="table">
      <a-table :rowKey="bindKey" :loading="loading" :columns="columns" :dataSource="dataSource" :pagination="false">
        <span slot="state" slot-scope="record">
          {{stateText[record.state]}}
        </span>
        <span slot="action" slot-scope="record">
          <div>
            <div class="button-group" v-if="record.state === 'disabled'">
              <a href="javascript:;" style="color: #52C41A" @click="enableSubuser(record)">启 用</a>
              <a-divider type="vertical" />
            </div>
            <div class="button-group" v-else-if="record.state === 'enabled'">
              <a href="javascript:;" style="color: #f5222d" @click="disableSubuser(record)" ghost>禁 用</a>
              <a-divider type="vertical" />
            </div>
            <a href="javascript:;" class="edit" @click="reviewDetail(record)">编 辑</a>
          </div>
        </span>
      </a-table>
      <a-pagination class="pagination" :defaultCurrent="page.index" :total="dataSource.length" @change="pageChange" />
    </a-row>
  </div>
</template>
<script>
import Api from '@/api/index.js'
export default {
  name: 'manage',
  data() {
    return {
      dataSource: [],
      stateText: {
        'enabled': '启用',
        'disabled': '禁用'
      },
      loading: false,
      columns: [{
        title: '账号',
        dataIndex: 'username',
        width: 300,
        align: 'left'
      }, {
        title: '摄影师姓名',
        dataIndex: 'nick',
        width: 300,
        align: 'left'
      }, {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200,
        align: 'left'
      }, {
        title: '状态',
        scopedSlots: { customRender: 'state' },
        width: 200,
        align: 'left'
      }, {
        title: '操作',
        scopedSlots: { customRender: 'action' },
        width: 200,
        align: 'right'
      }],
      page: {
        size: 10,
        index: 1,
        state: ''
      }
    }
  },
  methods: {
    bindKey(record, index) {
      return index
    },
    reviewDetail(record) {
      this.$router.push({
        name: 'manageAccount',
        query: {
          id: record.id,
          username: record.username,
          nick: record.nick
        }
      })
    },
    searchSubuser() {
      this.loading = true
      Api.manage.list(this.page).then((res) => {
        this.dataSource = res.msg.items
      }).finally(() => {
        this.loading = false
      })
    },
    disableSubuser(record) {
      this.loading = true
      Api.manage.disable({
        id: record.id
      }).then(() => {
        this.$message.success('账号禁用成功', 1, this.searchSubuser)
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    enableSubuser(record) {
      this.loading = true
      Api.manage.enable({
        id: record.id
      }).then(() => {
        this.$message.success('账号启用成功', 1, this.searchSubuser)
      }).catch((e) => {
        this.$message.error(e.data.error_msg)
      }).finally(() => {
        this.loading = false
      })
    },
    pageChange(page) {
      this.page.index = page
      this.searchSubuser()
    }
  },
  created() {
    this.searchSubuser()
  }
}
</script>
<style lang="less">
@import './style/index.less';
</style>