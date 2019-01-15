
<template>
<div class="index">
    <!-- :loadState="loadState" -->
  <Loadmore
            @reachBottom="reach"
            :limit = "20"
            :text=[]
        >
      <header class="header">
          <a class="red_packet" :class="redPacketData && redPacketData.active?'ballon':''"></a>
          <a class="header_header"></a>
          <a class="clock"></a>
        </header>
        <article class="swiper">
          <slider ref="slider" :options="options">
              <slideritem v-for="(item,index) in swiperList" :key="index" :style="item.style">
                  <img :src="item.thumbnail" alt=""  @click="swiperJump(item.url)" style="width: 100%">    
              </slideritem>
          </slider>
       </article>
       <!-- 爆款排行 -->
       <article class="hot_sall">
        <aside class="nav nav_hot_sell"></aside>
        <aside class="hot_sall_main">
          <aside class="left">
           <div class="hot_sall_top1">
              <article class="top1">{{topList[0].name?topList[0].name:''}}</article>
              <article class="capacity">{{topList[0].caption}}</article>
              <div class="rush_buy">立即抢购</div>
              <article class="coupon" v-if="topList.length>0 && topList[0].price !=0"><span>券后</span> <span>¥ {{topList[0].price }}</span></article>
              <article class="oprice" v-if="topList.length>0 && topList[0].marketPrice !=0"><span>原价</span> <span>¥ {{topList[0].marketPrice}}</span></article>
           </div>
            <figure>
              <img :src="topList[0].thumbnail_temp" alt="" class="top1_img">
            </figure>
          </aside>
          <aside class="right">
            <aside class="top2 common">
                <aside class="top2_left">
                  <article class="top1">{{topList[1].name?topList[1].name:''}}</article>
                  <article class="capacity">{{topList[1].caption}}</article>
                  <article class="coupon" v-if="topList.length>1 && topList[1].price !=0"><span>券后</span> <span>¥ {{topList[1].price }}</span>
                    <span class="oprice" v-if="topList.length>1 && topList[1].marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{topList[1].marketPrice}}</span></span>
                  </article>
                  <div class="rush_buy" style="margin: 0.1rem 0">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="topList[1].thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
            <aside class="top3 common">
                <aside class="top2_left">
                  <article class="top1" style="margin-top:0.12rem">{{topList[2].name?topList[2].name:''}}</article>
                  <article class="capacity" style="margin-top:0rem">{{topList[2].caption}}</article>
                  <article class="coupon" style="margin-top:0.04rem" v-if="topList.length>2 && topList[2].price !=0"><span>券后</span> <span>¥ {{topList[2].price }}</span>
                    <span class="oprice" v-if="topList.length>2 && topList[2].marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{topList[2].marketPrice}}</span></span>
                  </article>
                  <div class="rush_buy" style="margin:0.06rem 0 0.1rem">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="topList[2].thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
          </aside>
        </aside>
       </article>
       <!-- 主播推荐 -->
        
       <article class="recommed">
        <aside class="nav nav_recommend"></aside>
        <Recommend
        v-for="item in topList"
        :key="index"
        :img="item.thumbnail_temp"
        :title="item.name"
        :marketPrice="item.marketPrice"
        :price="item.price"
        :btn_color="item.status"
        :startTime="item.startTime"
        :endTime="item.endTime"
        :sale="item.sales"
        @click_details="navigate"
        ></Recommend>
       </article>
  <!-- </div> -->
  </Loadmore>
</div>
</template>

<script>
  import {swiper,redPacket,message,getTop} from '../api/index'
 import { slider, slideritem } from 'vue-concise-slider';
 import Recommend from './recommend'
 import Loadmore from './loadeMore'

export default {
name: 'Index',
components: {
  slider,
  slideritem,
  Recommend,
  Loadmore
},
data () {
  return {
    swiperList:[],
    redPacketData: {},
    messageData:{},
    messageList: [],
    topData:{},
    topList: [],
    type:'',
    options: {
      currentPage: 0,
      autoplay:3500,
      loop:true,
    },
    loadState:0,
  }
},
created(){
  this.getSwiper();
  this.getRedPacket();
  this.getMessage();
  this.getTopProduct();
},
methods: {
  reach(){
  },
  navigate(){
    console.log('111')
    window.location.href='https://www.baidu.com/'
  },
  /**
  start:开始时间
  end:结束时间
  isMarketable:是否上下架
  */
  getTimeRec(start,end,isMarketable){
    let nowTime= Date.parse(new Date());
    let thisTime = start;
    thisTime = thisTime.replace(/-/g, '/');
    let stime = new Date(thisTime);
    stime = stime.getTime();

    let endTime = end;
    endTime = endTime.replace(/-/g, '/');
    let etime = new Date(endTime);
    etime = etime.getTime();

    if(nowTime<stime){
      // 当前时间小于开始时间 
      if(isMarketable){
        return 'start';
      }else{
        return 'end'
      }
    }else if(nowTime>stime || nowTime==stime && nowTime<etime){
      // 当前时间>=开始时间
      if(isMarketable){
        return 'underway';
      }else{
        return 'end'
      }
    }else{
      return 'end'
    }
  },
  getTopProduct(){
    let that = this;
    getTop().then(res=>{
      if(res.code == 200){
        this.topData = res.data;
        this.topList = res.data.list;
        res.data.list.forEach(el => {
        let status = this.getTimeRec(el.startTime,el.endTime,el.isMarketable);
          that.$set(el,'status', status)
        });
      }
    })
  },
  getMessage(){
    message({pageNum:1,pageSize:10}).then(res=>{
      if(res.code == 200){
        this.messageData = res.data;
        this.messageList = res.data.list;
      }
    })
  },
  getRedPacket(){
    redPacket().then(res=>{
      if(res.code == 200){
        this.redPacketData = res.data;
      }
    })
  },
  getSwiper(){
    swiper().then(res=>{
      if(res.code == 200){
        this.swiperList = res.data.list;
      }
    })
  },
  swiperJump(url){
    url? window.location.href=url:'';
  }
}
}
</script>


<style>

  .swiper-container-horizontal>*>.slider-pagination-bullet{
    background:  #fff none repeat scroll 0 0 !important; 
    opacity: .6 !important;
  }
  .swiper-container-horizontal .slider-pagination-bullet-active{
     background: #e01212 none repeat scroll 0 0 !important; 
     opacity: 1 !important;
  }
</style>
<style scoped>
.top2_right{
  position: relative;
}
.header {
  width: 100%;
  box-sizing: border-box;
  padding: 0.24rem 0.2rem;
  display: flex;
  justify-content:space-between;
}
.header .red_packet{
  width: 0.38rem;
  height: 0.52rem;
  background: url("../assets/image/hongbao.png") no-repeat center/contain;
}
.header_header{
  width: 2.58rem;
  height: 0.62rem;
  background: url("../assets/image/logo.png") no-repeat center/contain;
}
.clock{
  width: 0.4rem;
  height: 0.42rem;
  background: url("../assets/image/xitongxiaoxi.png") no-repeat center/contain;
}
.swiper{
  width: 100%;
  height: 3rem;
}
/* 爆款排行 */
.hot_sall{
  box-sizing: border-box;
  width: 100%;
  padding: 0.1rem 0.2rem 0 0.2rem;
}
.nav{
  width: 6.95rem;
  height: 1.06rem;
}
.nav_hot_sell{
background: url("../assets/image/baokuan.png") no-repeat center/contain;
}
.hot_sall_main{
 width: 7.1rem;
display: flex;
justify-content: space-between;
}
.hot_sall_main .left{
width: 2.8rem;
height: 3.92rem;
background-color: #fff3f5;
overflow: hidden;
}
.hot_sall_top1{
 font-family: MicrosoftYaHei;
 margin-left: 0.25rem;
}
.top1{
color: #e01212;
font:0.38rem MicrosoftYaHei;
margin-top: 0.14rem;
}
.capacity{
  color: #8e9198;
  font:0.26rem MicrosoftYaHei;
  margin-top: 0.12rem;
  max-width: 2.4rem;
  overflow: hidden;
}
.rush_buy{
margin-top: 0.1rem;
width: 1.27rem;
height: 0.32rem;
background-color:transparent;
background:url('../assets/image/lijigoumaim.png') no-repeat center/contain; 
font:0.18rem MicrosoftYaHei;
line-height: 0.32rem;
color: #ffffff;
box-sizing: border-box;
padding-left: 0.09rem;
text-align: left; 
}
.coupon{
margin-top: 0.04rem;
color: #ff4d4f;
font-size:0.24rem;
}
.oprice{
margin-top: 0.04rem;
color: #cccccc;
font-size: 0.24rem;
}
.top1_img{
  width: 2.62rem;
  height: 1.52rem;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
}
.hot_sall_main .right{
width: 4.1rem;
height: 3.92rem;
display: flex;
flex-direction: column;
justify-content: space-between;
}
.right .common{
  width: 100%;
  box-sizing: border-box;
  padding-left: 0.23rem;
  padding-right: 0.1rem;
  background-color: #f6f6ff;
  display: flex;
  justify-content: space-around;
}
.right .top2{
  height: 1.94rem;
}
.top2_img{
  position: absolute;
  top:50%;
  left:50%;
  width:100%;
  transform:translate(-50%,-50%);
  text-align: center;
  width: 0.77rem;
  max-height: 1.48rem
}
.right .top3{
  height: 1.78rem;
}
/* 主播推荐 */
.recommed{
  box-sizing: border-box;
  width: 100%;
  padding: 0.33rem 0.2rem 0 0.2rem;
}
.nav_recommend{
background:url('../assets/image/zhubo.png') no-repeat center/contain; 
}

@keyframes scaleDraw {
  0%{
      transform: scale(1);
  }
  25%{
      transform: scale(1.5);
  }
  50%{
      transform: scale(1);
  }
  75%{
      transform: scale(1.5);
  }
}
.ballon{
  width: 150px;
  height: 200px;
  animation-name: scaleDraw;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}
</style>
