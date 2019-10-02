<template>
    <div>
        <a-row class="search">
            <a-col :span="8" class="date">
                <span class="tip">选择日期: </span>
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
    </div>
</template>
<script>
export default {
    name: 'passedTab',
    data() {
        return {
        }
    },
    props: {
        columns: Array,
        data: Array,
    },
    methods: {
        callback(key) {
            console.log(key)
        }
    },
    created() {
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