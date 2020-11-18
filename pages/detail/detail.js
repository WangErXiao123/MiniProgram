// pages/detail/detail.js
import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from '../../service/detail'

const app = getApp()

Page({
  data: {
    iid: '',
    topImages: [],

  },

  onLoad: function (options) {
    this.setData({
      iid: options.iid
    }),
    this._getDetailData()
    this._getRecommends()
  },

  _getDetailData(){
    getDetail(this.data.iid).then(res => {
      const data = res.result;
      const topImages = data.itemInfo.topImages;
      const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services);
      const shopInfo = new ShopInfo(data.shopInfo);
      const detailInfo = data.detailInfo;
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      let commentInfo = {}
        if(data.rate && data.rate.cRate > 0){
          commentInfo = data.rate.list[0]
        }
        this.setData({
          topImages:topImages,
          baseInfo:baseInfo,
          shopInfo:shopInfo,
          detailInfo:detailInfo,
          paramInfo:paramInfo
        })
      
    })
  },
  _getRecommends(){
    getRecommends().then(res => {
      this.setData({
        recommends:res.data.list
      })
    })
  },
  onAddCart(){
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.baseInfo.realPrice;

    app.addToCart(obj);

    wx.showToast({
      title: '加入购物车成功',
    })
  }
  
})