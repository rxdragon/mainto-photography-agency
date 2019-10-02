<template>
    <div id='workRecord'>
        <h3>历史上传记录</h3>
        <section class='content'>
            <a-row class="search">
                <a-col :span="10" style="white-space: nowrap;">
                    <span>选择日期: </span>
                    <a-range-picker />
                </a-col>
                <a-col :span="6" style="white-space: nowrap;">
                    <span>订单标题: </span>
                    <a-input placeholder="请输入订单标题" />
                </a-col>
                <a-col :span="4" style="text-align: right;">
                    <a-button type="primary">查 询</a-button>
                </a-col>
            </a-row>
            <div class="table">
                <template>
                    <a-table :columns="columns" :dataSource="data" :pagination="false">
                        <span slot="action" slot-scope="record">
                            <a-button type="danger" v-if="record.key === '1'" ghost style="margin-right: 10px">撤回</a-button>
                            <a-button type="primary" @click="reviewDetail(record)">详 情</a-button>
                        </span>
                    </a-table>
                </template>
            </div>
            <a-pagination class="pagination" showQuickJumper :defaultCurrent="2" :total="500" />
        </section>
        <section class="footer">
        </section>
    </div>
</template>
<script>
export default {
    name: 'workRecord',
    data() {
        return {
            data: [],
            columns: [{
                title: '订单标题',
                dataIndex: 'title',
                width: 300
            }, {
                title: '订单号',
                dataIndex: 'orderNumber',
                width: 300
            }, {
                title: '上传时间',
                dataIndex: 'date',
                width: 200
            }, {
                title: '流水号',
                dataIndex: 'serialNumber',
                width: 400
            }, {
                title: '操作',
                scopedSlots: { customRender: 'action' },
                width: 200,
                align: 'center'
            }]
        }
    },
    methods: {
        reviewDetail() {
            this.$router.push({ path: '/recordDetail' })
        }
    },
    created() {
        this.data = [{
            key: '1',
            title: '是离开的风景里卡升级地方了是',
            orderNumber: 15990536866,
            date: '2019/08/07 13:30',
            serialNumber: '15990536866',
        }, {
            key: '2',
            title: '是离开的风景里卡升级地方了是1231232',
            orderNumber: 15990536866,
            date: '2019/08/07 13:30',
            serialNumber: '15990536866',
        }, {
            key: '3',
            title: '是离开的风景里卡升级地方了是1231232',
            orderNumber: 15990536866,
            date: '2019/08/07 13:30',
            serialNumber: '15990536866',
        }, {
            key: '4',
            title: '是离开的风景里卡升级地方了是1231232',
            orderNumber: 15990536866,
            date: '2019/08/07 13:30',
            serialNumber: '15990536866',
        }]
    }
}
</script>
<style lang="less">
#workRecord {
    h3 {
        text-align: left;
        padding-bottom: 14px;
        border-bottom: 1px solid #ddd;
    }

    .search {
        text-align: left;
        padding: 40px 0;
    }

    .table {
        min-height: 200px;
    }

    .pagination {
        text-align: right;
        margin: 20px auto;
    }
}
</style>