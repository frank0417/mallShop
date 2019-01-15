
<template>
  <article class="recommend_cont border">
  <article class="recommend_wrap">
    <img :src="img" alt="" class="recommend_img">
    <aside class="recommend_detail">
      <aside>
        <article class="recommend_title">{{title}}</article>
      </aside>
      <aside class="recommend_buttom">
        <aside class="recommend_right">
          <aside class="recommend_time">
            <i class="recommend_nprice"><span v-if="price"><span>券后</span> <span>¥{{price}}</span></span></i>
          </aside>
          <aside class="recommend_oprice"> <span v-if="marketPrice"><span>原价</span> <span>¥{{ marketPrice }}</span></span></aside>
        </aside>
       <aside class="recommend_right recommend_right_margin">
        <aside class="recommend_time">
          <span v-if="btn_color == 'underway'">{{startTime.substring(11,16)}}-{{endTime.substring(11,16)}}</span>
          <span v-else-if="btn_color == 'start'">{{startTime.substring(11,16)}}开抢</span>
          <span v-else>已售{{sale}}</span>
        </aside>
          <aside class="shop_btn" :class="btn_color" @click="click_details">{{btn_color | btnFilter}}</aside>
       </aside>
      </aside>
    </aside>
  </article>
  </article>
</template>

<script>
  export default {
        props:{
          btn_color:{
            value:String,
            default: 'underway'
          },
          img: {},
          title: {},
          marketPrice:{},
          price: {},
          startTime:{},
          endTime: {},
          sale: {}
           
        },
        name: "recommend",
        filters:{
          btnFilter(val){
            if(val =='underway'){
              return '马上抢';
            }else if(val =='start'){
              return '即将开始';
            }else{
              return '抢光了';
            }
          }
        },
        methods:{
            click_details(){
                this.$emit('click_details');
            },
        }
    }
</script>

<style>
    .border{
      position: relative;
    }
    .border:after{
      position: absolute;
      z-index: 1;
      content: "";
      border-bottom: 1px solid #ddd;
      width: 200%;
      height: 200%;
      transform: scale(.5,0.5);
      -webkit-transform: scale(.5,0.5);
      top: -50%;
      left: -50%;
      box-sizing: border-box;
    }
    .recommend_cont{
      font-family: MicrosoftYaHei;
      box-sizing: border-box;
      width: 100%;
      height: 2.6rem;
      padding: 0.2rem 0;
    }
    .recommend_wrap{
      display: flex;
      justify-content: space-between;
    }
    .recommend_img{
      width: 2.2rem;
      height: 2.2rem;
    }
    .recommend_detail{
      width: 4.64rem;
      height: 2.2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .recommend_title{
      color: #222222;
      font-size: 0.32rem;
      width: 100%;
      height: 0.8rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .recommend_buttom{
      display: flex;
      justify-content: space-between;
      height: 1rem;
    }
    .recommend_nprice{
      font-style: normal;
      color: #ff4d4f;
    }
    .recommend_nprice span:first-of-type{
      font-size: 0.24rem;
    }
    .recommend_nprice span:last-of-type{
      font-size: 0.4rem;
    }
    .recommend_oprice {
      color: #cccccc;
      font-size: 0.24rem;
      margin-top: 0.08rem;
    }
    .recommend_right{
      flex: 1;
    }
    .recommend_right_margin{
      margin-left: 1rem;
    }
    .recommend_time{
      color: #cccccc;
      font-size: 0.22rem;
      margin-top: 0.08rem;
    }
    .shop_btn{
      width: 1.3rem;
      height: 0.5rem;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.26rem;
      line-height: 0.5rem;
      text-align: center;
      margin-top: 0.1rem;
    }
    .underway{
      background-color: #e01212;
    }
    .end{
      background-color: #d8d8d8;
    }
    .start{
      background-color: #2ac064;
    }
  </style>
