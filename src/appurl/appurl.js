var houseAgent = [{
    label: '全局信息',
    icon: '',
    children: [
      // {label:'信息总览',path:'/houseAgentOverview'},
      {
        label: '小程序信息',
        path: '/appmsg'
      },
      {
        label: '文件库',
        path: '/uiConsoleGallery'
      },

    ]
  },
  {
    label: '推荐管理',
    icon: '',
    children: [
      // {label:'首页推荐',path:'/houseAgentRecommend'},
      {
        label: '推荐规则',
        path: '/houseAgentDetailRecommend'
      }
    ]
  },
  {
    label: '二手房管理',
    icon: '',
    children: [{
        label: '二手房列表',
        path: '/houseAgentHandRoom'
      },
      {
        label: '新增二手房',
        path: '/houseAgentHandRoomAdd'
      }
    ]
  },
  {
    label: '新房管理',
    icon: '',
    children: [{
        label: '新房列表',
        path: '/houseAgentNewHouse'
      },
      {
        label: '新增新房',
        path: '/houseAgentNewHouseAdd'
      }
    ]
  },
  {
    label: '租房管理',
    icon: '',
    children: [{
        label: '租房列表',
        path: '/houseAgentRentRoom'
      },
      {
        label: '新增租房',
        path: '/houseAgentRentRoomAdd'
      }
    ]
  },
  {
    label: '用户管理',
    icon: '',
    children: [{
        label: '用户发布信息',
        path: '/houseAgentUserPublish'
      },
      {
        label: '用户信息',
        path: '/wxuser'
      },
    ]
  }
]
var articleProgram = [{
    label: '全局信息',
    icon: '',
    children: [{
        label: '小程序信息',
        path: '/appmsg'
      },
      {
        label: '文件库',
        path: '/uiConsoleGallery'
      },
    ]
  },
  {
    label: '文章管理',
    icon: '',
    children: [{
        label: '文章列表',
        path: '/richTextList'
      },
      {
        label: '文章编辑',
        path: '/richText'
      }
    ]
  },
]
var educationPayment = [
  {
    label: "全局信息",
    icon: "",
    children: [
      {
        label: "信息总览",
        path: "/educationPaymentOverview"
      },
      {
        label: "小程序信息",
        path: "/appmsg"
      },
      {
        label: "文件库",
        path: "/uiConsoleGallery"
      }
    ]
  },
  {
    label: "校园管理",
    icon: "",
    children: [
      {
        label: "校园列表",
        path: "/educationPaymentSchoolList"
      },
      {
        label: "新增校园",
        path: "/educationPaymentSchoolAdd"
      }
    ]
  },
  {
    label: "学生缴费",
    icon: "",
    children: [
      {
        label: "学生列表",
        path: "/educationPaymentstudentList"
      },
      {
        label: "学生缴费列表",
        path: "/educationPaymentPaymentList"
      },
      {
        label: "缴费项列表",
        path: "/educationPaymentPayItemList"
      }
    ]
  },
  {
    label: "银行卡管理",
    icon: "",
    children: [
      {
        label: "银行卡列表",
        path: "/educationPaymentBankCardList"
      }
    ]
  }
];

module.exports = {
  houseAgent: houseAgent,
  articleProgram: articleProgram,
  educationPayment: educationPayment
}
