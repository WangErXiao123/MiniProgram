// pages/home/home
import {
  getMultiData
} from '../../service/home'

Page({

  data: {
    banners : [],
    recommends : []
  },

  onLoad: function (options) {
    getMultiData().then(res => {
     // 取出轮播图和推荐的数据
     const banners =  res.data.data.banner.list;
     const recommends = res.data.data.recommend.list;

     this.setData({
      banners,
      recommends
     })

      


    })
  }

  
})