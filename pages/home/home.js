// pages/home/home
import {
  getMultiData,
  getProduct
} from '../../service/home'

import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const'

Page({
  data: {
    banners : [],
    recommends : [],
    titles : ["流行", "新款", "精选"],
    goods: {
      [POP]:{page:1,list:[]},
      [NEW]:{page:1,list:[]},
      [SELL]:{page:1,list:[]}
    },
    currentType: "pop",
    topPosition: 0,
    tabControlTop: 0,
    showBackTop: false,
    showTabControl: false
  },

  onLoad: function (options) {
    // 1.发送网络请求
    this._getData()
  },
  loadMore(){
    this._getProductData(this.data.currentType)
  },
  scrollPosition(e){
    const position = e.detail.scrollTop;
    this.setData({
      showBackTop: position > BACK_TOP_POSITION
    })
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      const show = rect.top > 0
      this.setData({
        showTabControl: !show
      })
    }).exec()
  },
  onImageLoad(){
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(rect => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  onPageScroll(res) {
  },
  tabClick(e){
    let currentType = '';
    switch (e.detail.index) {
      case 0:
      currentType = POP
      break
      case 1:
      currentType = NEW
      break
      case 2:
      currentType = SELL
      break
    }
    this.setData({
      currentType
    })
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index);
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
  },
  onBackTop(){
    this.setData({
      showBackTop: false,
      topPosition: 0,
      tabControlTop: 0
    })
  },
     _getData() {
       this._getMultiData();
       this._getProductData(POP);
       this._getProductData(NEW);
       this._getProductData(SELL);
     },
     _getMultiData(){
      getMultiData().then(res => {
        // 取出轮播图和推荐的数据
        const banners =  res.data.banner.list.map(item => {
          return item.image
        })
        this.setData({
         banners: banners,
         recommends: res.data.recommend.list
        })
    })
},
  _getProductData(type){
    // 获取数据对应的页码
    const page = this.data.goods[type].page;

    // 请求数据
    getProduct(type, page).then(res => {
      // 取出数据
      const list = res.data.list;
      const goods= this.data.goods;
      goods[type].list.push(...list)
      goods[type].page += 1;
      this.setData({
        goods:goods,
      })
    })

  }
})
