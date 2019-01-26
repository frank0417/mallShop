
<template>
<div class="index">
  <Loadmore
    @reachBottom="reach"
    :limit = "20"
    :loadState="productPageQuery.loadState"
  >
      <header class="header">
        <div class="header_wrap">
          <a class="red_packet" :class="redPacketData && redPacketData.active?'ballon':''"
          v-clipboard:copy="redPacketData.code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          @click="url=redPacketData.url"
          ></a>
          <a class="header_header"></a>
          <div class="clock" @click="message"></div>
        </div>
      </header>
        <article class="swiper">
          <slider ref="slider" :options="options">
              <slideritem v-for="(item,index) in swiperList" :key="index" :style="item.style">
                  <img :src="item.thumbnail" alt=""  @click="swiperJump(item.url)" style="width: 100%;height: 100%;">
              </slideritem>
          </slider>
       </article>
       <!-- 爆款排行 -->
       <article class="hot_sall">
        <aside class="nav_hot_sall flex">
          <aside class="nav_left nav_margin_left"></aside>
          <aside class="nav_middle"></aside>
          <aside class="nav_left nav_margin_right"></aside>
        </aside>
        <aside class="hot_sall_main">
          <aside class="left"
          v-clipboard:copy="top1.code"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          @click="url=top1.url"
          >
           <div class="hot_sall_top1">
              <article class="top1">{{top1.name?top1.name:''}}</article>
              <article class="capacity">{{top1.caption}}</article>
              <div class="rush_buy">立即抢购</div>
              <article class="coupon" v-if="top1.price !=0"><span>券后</span> <span>¥ {{top1.price }}</span></article>
              <article class="oprice" v-if="top1.marketPrice !=0"><span>原价</span> <span>¥ {{top1.marketPrice}}</span></article>
           </div>
            <figure>
              <img :src="top1.thumbnail_temp" alt="" class="top1_img">
            </figure>
          </aside>
          <aside class="right">
            <aside class="top2 common"
            v-clipboard:copy="top2.code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            @click="url=top2.url"
            >
                <aside class="top2_left">
                  <article class="top1">{{top2.name?top2.name:''}}</article>
                  <article class="capacity">{{top2.caption}}</article>
                  <article class="coupon" v-if="top2.price !=0"><span>券后</span> <span>¥ {{top2.price }}</span>
                    <span class="oprice" v-if="top2.marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{top2.marketPrice}}</span></span>
                  </article>
                  <div class="rush_buy" style="margin: 0.1rem 0">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="top2.thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
            <aside class="top3 common"
            v-clipboard:copy="top3.code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            @click="url=top3.url"
            >
                <aside class="top2_left">
                  <article class="top1" style="margin-top:0.12rem">{{top3.name?top3.name:''}}</article>
                  <article class="capacity" style="margin-top:0rem">{{top3.caption}}</article>
                  <article class="coupon" style="margin-top:0.04rem" v-if="top3.price !=0"><span>券后</span> <span>¥ {{top3.price }}</span>
                    <span class="oprice" v-if="top3.marketPrice !=0"> &nbsp;&nbsp;<span>原价</span> <span>¥ {{top3.marketPrice}}</span></span>
                  </article>
                  <div class="rush_buy" style="margin:0.06rem 0 0.1rem">立即抢购</div>
                </aside>
                <figure class="top2_right">
                    <img :src="top3.thumbnail_temp" alt="" class="top2_img">
                </figure>
            </aside>
          </aside>
        </aside>
       </article>

       <aside class="nav_hot_grab">
          <aside class="hot_grab_left">
            <img src="../../static/image/rounded_rectangle.png" alt="">
            <span>大家都在抢</span>
          </aside>
          <aside class="hot_grab_right">
              <span>1,0979,38</span><span>次实时领券</span>
          </aside>
      </aside>
       <!-- 大家都在抢 -->
       <article class="recommed">
        <aside class="nav nav_recommend"></aside>
        <Recommend
        v-for="(item,index) in productPageData"
        :key="index"
        v-clipboard:copy="item.code"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        :data-clipboard-text="item.code"
        @click="url=item.url"
        :img="item.thumbnail_temp"
        :title="item.name"
        :marketPrice="item.marketPrice"
        :price="item.price"
        :btn_color="item.status"
        :startTime="item.startTime"
        :endTime="item.endTime"
        :sale="item.sales"
        ></Recommend>

       </article>
  </Loadmore>
  <article class="mask" v-show="hideMask" @click="hideMask = false">
      <article  class="message"  @click.stop="">
          <Loadmore
            @reachBottom="reachMessage"
            :limit = "20"
            :text=[]
          >
          <article>
            <div v-for="item in messageData.list" :key="item.id" class="message_info">
              <aside class="message_icon">
                <img src="../assets/image/money.png" alt="">
              </aside>
              <aside class="message_wrap">
                <article class="message_title">系统消息</article>
                <article class="message_contain">{{item.content}}</article>
                <article class="message_time">{{item.createDate | filterDate}}</article>
              </aside>
            </div>
          </article>
        </Loadmore>
      </article>
    </article>
    <!-- 首次下载领福利 -->
    <article class="mask" v-show="hideMaskRed" @click="hideMaskRed = false">
      <article class="first_red_wrap">
        <img src="../../static/image/first_red_rokect.png" alt="" class="first_red" @click.stop="">
        <img src="../../static/image/close.png" alt="" class="first_close">
      </article>
    </article>
</div>
</template>

<script>
 import {swiper,redPacket,message,getTop,productPage,newRedEnvelope} from '../api/index'
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
    url: '',// 跳转的路径
    swiperList:[],
    redPacketData: {},
    messageData:{},
    productPageData:[],
    topList: [],
    top1:{},
    top2:{},
    top3:{},
    type:'',
    options: {
      currentPage: 0,
      autoplay:3500,
      loop:true,
    }, // swiper参数
    hideMask: false,
    copy:'',
    productPageQuery: {
      pageNum:1,
      pageSize:10,
      loading: false, //上拉加载
      totalPage:1,
      loadState:0, // 上拉加载
      lastPage:false
    },// 主播推荐
    hideMaskRed:false,// 首次领红包
    new_red_code:'',
  }
},
filters:{
    filterDate(val){
      let m = val.split("-")[1],
          d = val.split("-")[2].substring(0,2);
      let month = parseInt(m),
      day = parseInt(d);
        return (month+'月'+day+'日');
    }
},
created(){
  let myToken = this.$route.query&&this.$route.query.token?this.$route.query.token:'';
  localStorage.setItem('myToken', myToken);
  this.getSwiper();
  this.getRedPacket();
  this.getMessage();
  this.getTopProduct();
  this.getProductPage(1,10);
  this.getNewRedEnvelope();

  setInterval(()=>{
    this.getRedPacket();
    this.getMessage();
    this.getTopProduct();
  },60000)
  setInterval(()=>{
    this.getSwiper();
  },300000)
},
methods: {
    onCopy: function (e) {
      window.location.href= this.url
      console.log('复制成功！')
      console.log(e)
    },
    onError: function (e) {
      console.log('复制失败！')
    },

  reach(){
    if (this.productPageQuery.loading) {
      return
    }else {
        this.productPageQuery.loading = true;
        if (this.productPageQuery.pageNum>this.productPageQuery.totalPage) {
            this.productPageQuery.loadState = 1;
            return;
        }
      this.getProductPage(this.productPageQuery.pageNum,this.productPageQuery.pageSize);
    }
  },
  reachMessage(){
    console.log('messageReach')
  },
  // 新人红包
  getNewRedEnvelope(){
    newRedEnvelope().then(res=>{
          if(res.code == 200){
            if(res.data&&res.data.code){
              this.hideMaskRed = true
              this.new_red_code = res.data.code
            }
            // 如果返回的code有值的化弹出红包弹出层
            //     "data": {
            // "code": "￥VdQLbJTU5y7￥",
            // "name": "优惠券",
            // "active": false,
            // "id": 5,
            // "promotionId": null
            // }
          }
        })
  },
  // 抢购商品
  message(){
    // this.getMessage();
    this.hideMask = true;
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
  // 抢购商品
  getProductPage(pageNum,pageSize){
      let that = this,
      parames = { pageNum, pageSize };
    productPage(parames).then(res=>{
          if(res.code == 200){
            res.data.list.forEach(el => {
              let status = that.getTimeRec(el.startTime,el.endTime,el.isMarketable);
              that.$set(el,'status', status)
            });
              if(that.productPageQuery.pageNum == 1){
                that.productPageData = res.data.list
                that.productPageQuery.totalPage =res.data.totalPage;
                if (res.data.totalPage == 1) {
                  this.productPageQuery.loadState = 1
                }
              }else{
                that.productPageData = [].concat(that.productPageData,res.data.list)
              }
              that.productPageQuery.pageNum +=1;
              that.productPageQuery.loading = false;
          }
        })
  },
  getTopProduct(){
    getTop().then(res=>{
      if(res.code == 200){
        this.top1 = res.data.list[0];
        this.top2 = res.data.list[1];
        this.top3 = res.data.list[2];
      }
    })
  },
  getMessage(){
    message({pageNum:1,pageSize:10}).then(res=>{
      if(res.code == 200){
        this.messageData = res.data;
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
  .first_red{
    width: 70%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .first_close{
    position: absolute;
    left: 50%;
    top:78%;
    transform: translateX(-50%);
    width: 0.6rem;
   height: 0.6rem;
  }
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message{
    box-sizing: border-box;
    height: 80vh;
    width: 73%;
    border-radius: 0.2rem;
    background-color: #f7f7f7;
    z-index: 100;
    padding: 0.15rem 0.1rem;
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .message_info{
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.2rem;
    margin: 0.15rem;
    position: relative;
    height: 1.5rem;
  }
  .message_icon{
    height: 1rem;
    width: 1rem;
    position: absolute;
    top:50%;
    left: 0.2rem;
    transform: translateY(-50%);
  }
  .message_icon img{
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
  .message_wrap .message_title{
    color: #333333;
    font-size: 0.32rem;
    position: absolute;
    top:0.4rem;
    left: 1.47rem;
  }
  .message_wrap .message_contain{
    color: #999999;
    font-size: 0.24rem;
    position: absolute;
    left: 1.47rem;
    top:0.9rem;
    width: 3.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .message_wrap .message_time{
    color: #cccccc;
    font-size: 0.22rem;
    position: absolute;
    top:0.3rem;
    right: 0.2rem;
  }
  .mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  transition:all 0.5s;
  z-index: 99;
}
.top2_right{
  position: relative;
  margin-right: 0.15rem;
}
.header {
  width: 100%;
  box-sizing: border-box;
  height: 0.88rem;
  background:url('../assets/image/header_bac.png') no-repeat;
  background-size:100% 0.9rem;
  position: relative;
}
.header_wrap{
  display: flex;
  justify-content:space-between;
  align-items: center;
  height: 100%;
  padding: 0 0.2rem;
}
.header .red_packet{
  width: 0.45rem;
  height: 0.46rem;
  background:url("../assets/image/hongbao.png") no-repeat center/contain;
}
.header_header{
  width: 2.58rem;
  height: 0.62rem;
  background: url("../assets/image/logo.png") no-repeat center/contain;
}
.clock{
  width: 0.61rem;
  height: 0.54rem;
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
  padding: 0.05rem 0.2rem 0 0.2rem;
}
.nav_hot_sall{
  height: 0.9rem;
}
.nav_left{
  width: 0.88rem;
  height: 0.03rem;
}
.nav_margin_left{
  background: url('../assets/image/baokuan_left.png') no-repeat center/contain;
}
.nav_margin_right{
  background: url('../assets/image/baokuan_right.png') no-repeat center/contain;
}
.nav_middle{
  width: 3.19rem;
  height: 0.44rem;
  background: url("../assets/image/baokuan.png") no-repeat center/contain;
  margin: 0 0.45rem;
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
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
width: 2.59rem;
}
.capacity{
  color: #8e9198;
  font:0.26rem MicrosoftYaHei;
  margin-top: 0.12rem;
  max-width: 2.4rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.rush_buy{
margin-top: 0.1rem;
width: 1.27rem;
min-width: 68px;
height: 0.32rem;
min-height: 15px;
background-color:transparent;
background:url('../assets/image/lijigoumaim.png') no-repeat;
background-size: 100% 100%;
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
.nav_hot_grab{
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.hot_grab_left{
  display: flex;
  align-items: center;
  margin: 0 0.2rem;
}

.hot_grab_left img{
  width: 0.08rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}
.hot_grab_left span{
  color: #333333;
  font-size: 0.36rem;
}
.hot_grab_right{
  color: #e01212;
  font-size: 0.3rem;
  margin-right: 0.2rem;
}
.hot_grab_right span:last-of-type{
  color: #666666;
}
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
