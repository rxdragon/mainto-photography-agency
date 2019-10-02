<template>
    <div id='recordDetail'>
        <h3>拍摄详情</h3>
        <section class='content'>
            <div class="orderInfo">
                <h4><span class="line"></span><span>订单信息</span></h4>
                <ul>
                    <li>
                        <p class="head">订单标题</p>
                        <p>标题内容</p>
                    </li>
                    <li>
                        <p class="head">拍摄产品</p>
                        <p>精致证件照正身-蓝底、仙女照-单人-西芙-四宫格</p>
                    </li>
                    <li>
                        <p class="head">修图备注</p>
                        <p>修图备注修图备注</p>
                    </li>
                </ul>
            </div>
            <div class="pictureInfo">
                <h4><span class="line"></span><span>照片信息</span></h4>
                <ul>
                    <li v-for="(item, index) in pictures" :key="index">
                        <p class="head">{{item.product}}</p>
                        <a-row type="flex" justify="start" class="pirtureWrap">
                            <a-col :span="4" class="item" v-for="(childItem, childIndex) in item.list" :key="childIndex">
                                <img :src="childItem">
                            </a-col>
                        
                        </a-row>
                    </li>
                </ul>
            </div>
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
            pictures: [{
                product: '证件照',
                list: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
            },{
                product: '签证照',
                list: ['https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png']
            }]
        }
    },
    methods: {},
    created() {}
}
</script>
<style lang="less">
#recordDetail {
    h3 {
        font-size: 18px;
        text-align: left;
        padding-bottom: 14px;
        border-bottom: 1px solid #ddd;
    }

    .content {
        h4 {
            font-size: 17px;
            text-align: left;
            margin-bottom: 14px;

            span {
                display: inline-block;
                vertical-align: middle;
            }

            .line {
                width: 3px;
                height: 18px;
                background-color: #4d7993;
                margin-right: 10px;

            }
        }

        .orderInfo {
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            margin-top: 20px;
            padding: 20px;

            ul {

                border: 1px solid #e9e9e9;
                border-radius: 4px;

                li {

                    p {
                        font-size: 14px;
                        padding: 14px 0;
                        text-align: center;
                    }

                    p.head {
                        font-size: 15px;
                        background-color: #f0f0f0;
                        font-weight: bold;
                    }
                }
            }
        }

        .pictureInfo {
            border: 1px solid #e9e9e9;
            border-radius: 4px;
            margin-top: 20px;
            padding: 20px;


            ul {

                border-radius: 4px;

                img {
                    width: 100%;
                }

                .pirtureWrap {
                    padding: 20px;
                }

                li {
                    
                    .item {
                        margin: 0 20px 20px 0;
                    }
                    p {
                        font-size: 14px;
                        padding: 14px 0;
                        text-align: center;
                    }

                    p.head {
                        font-size: 15px;
                        background-color: #f0f0f0;
                        font-weight: bold;
                    }
                }
            }
        }
    }

}
</style>