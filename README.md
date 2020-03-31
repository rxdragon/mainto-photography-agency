# mainto-photography-agency
缦图摄影机构管理系统

### 特殊项目结构
```
.
├── Icon\r // 图片文件
├── README.md // 项目工程文件
├── babel.config.js // 项目结构
├── package.json // 项目信息
├── public // 公共文件
│   ├── favicon.ico 标签栏图标
│   └── index.html // 主页面
├── src
│   ├── App.vue // 主vue
│   ├── api // 接口管理
│   │   ├── config.js // 接口域名的管理
│   │   ├── custom // 定制列表
│   │   ├── index.js // api接口的统一出口
│   │   ├── manage // 管理相关接口
│   │   ├── product // 产品相关接口
│   │   ├── upyun // 又拍云获取接口
│   │   ├── user // 用户获取接口
│   │   └── work // 工作相关接口
│   ├── assets // 静态文件
│   │   ├── img // 图片静态文件
│   │   └── style // css静态文件
│   ├── axios // axios 请求文件
│   ├── components // 公用组件
│   │   └── Layout // 布局组件
│   │       ├── Header.vue // 抬头
│   │       └── Sider.vue // 面包屑组件
│   ├── errorCode.js // 错误码
│   ├── main.js // 主文件
│   ├── router.js //路由文件
│   ├── store // vuex状态管理
│   │   ├── index.js // `store`主文件
│   │   ├── upyun // 又拍云状态管理
│   │   ├── user // 用户状态管理
│   │   └── work // 工作状态管理
│   ├── util // 工具
│   │   ├── index.js // 工具主文件
│   │   └── photoTool.js // 照片相关工具
│   └── view // 页面
│       ├── custom // 顾客信息
│       │   ├── detail.vue // 详细信息页面
│       │   ├── index.vue // 主页面
│       │   └── style
│       ├── default.vue // 默认页面
│       ├── manage // 管理页面
│       │   ├── account.vue // 账号页面
│       │   ├── index.vue // 主页面
│       │   └── style
│       ├── product // 产品页面
│       │   ├── addProduct.vue // 添加产品
│       │   ├── components
│       │   │   ├── notpassTab.vue // 没有通过tab
│       │   │   └── passedTab.vue // 通过tab
│       │   ├── index.vue // 产品页面
│       │   ├── productDetail.vue // 产品详情页
│       │   └── style
│       ├── welcome // 登录页面
│       │   ├── index.vue
│       │   └── style
│       └── work // 接单页面
│           ├── components
│           │   └── Upload.vue // 上传组件
│           ├── index.vue接单页面
│           ├── record.vue // 查看页面
│           ├── recordDetail.vue // 查询详情页面
│           └── style
├── vue.config.js
├── yarn-error.log
└── yarn.lock
```

日期|版本号|描述|开发人员|链接
:--:|:--:|:--:|:--:|:--:|
2020-03-26 |1.0.1|项目规范|无|无
2019-11-23 |1.0.0|摄影上传|崔弗|[产品文档](https://lanhuhu.com/web/#/item/project/product?pid=21f54a2b-edd5-420d-909d-c7f004709191&docId=e6bdbea7-7df3-4068-9b73-53ecf4543c79&docType=axure&pageId=16efe5913f23458b82fca12bbca0d8c2&image_id=e6bdbea7-7df3-4068-9b73-53ecf4543c79&parentId=9a8010eb-cd70-435b-8632-d2e56cde143b)<br/>[设计稿](https://lanhuhu.com/web/#/item/project/board?pid=21f54a2b-edd5-420d-909d-c7f004709191)
