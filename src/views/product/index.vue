<template>
    <div id="product">
        <a-row class="title">
            <a-col :span="12">
                <span class="tip">产品管理</span>
            </a-col>
            <a-col :span="12" style="text-align: right">
                <a-button type="primary">新增产品</a-button>
            </a-col>
        </a-row>
        <a-row class="tab">
            <a-tabs defaultActiveKey="1" @change="callback">
                <a-tab-pane tab="审核通过" key="1">
                    <a-row class="search">
                        <a-col :span="8" class="date">
                            <span class="tip">审核通过时间: </span>
                            <a-range-picker />
                        </a-col>
                        <a-col :span="3" style="text-align: right;">
                            <a-button type="primary">查 询</a-button>
                        </a-col>
                    </a-row>
                    <a-table class="table" :columns="columns" :dataSource="data" :pagination="false">
                        <span slot="status" slot-scope="record">
                            <span v-if="record.key === '1'">启用</span>
                            <span v-else-if="record.key === '2'">禁用</span>
                        </span>
                        <span slot="action" slot-scope="record">
                            <div v-if="record.key === '1'">
                                <a-button type="danger" ghost>禁用</a-button>
                                <a-button type="primary" @click="reviewDetail(record)" class="btnDetail">详 情</a-button>
                            </div>
                            <div v-else-if="record.key === '2'">
                                <a-button type="primary" ghost>启用</a-button>
                                <a-button type="primary" @click="reviewDetail(record)" class="btnDetail">详 情</a-button>
                            </div>
                        </span>
                    </a-table>
                    <a-pagination class="pagination" showQuickJumper :defaultCurrent="2" :total="500" />
                </a-tab-pane>
                <a-tab-pane tab="待审核" key="2" forceRender>
                </a-tab-pane>
            </a-tabs>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            checkTab: 2,
            columns: [{
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
            }]
        }
    },
    methods: {
        callback(key) {
            console.log(key)
        }
    },
    created() {
        this.data = [{
            key: '1',
            name: '花颜照',
            date: '2019/08/07 13:30',
        }, {
            key: '2',
            name: '证件照',
            date: '2019/08/07 13:30',
        }]
    }
}
</script>
<style lang="less">
#product {
    .title {
        text-align: left;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;

        .tip {
            height: 32px;
            line-height: 32px;
            display: inline-block;
        }
    }

    .tab {
        margin-top: 20px;
        text-align: left;

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

        .pagination {
            text-align: right;
            margin: 20px auto;
        }
    }
}
</style>