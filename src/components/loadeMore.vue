<template>
	<div class="load_more" @scroll="reachBottom($event.target)">
		<slot></slot>
		<div class="load" v-html="text[loadState]"></div>
	</div>
</template>

<script>
export default{
	name:'loadmore',
	props:{
		limit:{
			type:Number,
			default:10
		},
		text:{
			type:Array,
			default:()=> {
				return ['正在加载...','亲，到底了 ^-^','没有数据']
			}
		},
		loadState:{
			type:Number,
			default:0
		}
	},
	methods:{
		reachBottom(e){

			if(this.loadState==1 || this.loadState==2){
				//this.$destroy();
				return;
			};
			let scrollT=e.scrollTop,
				h=e.offsetHeight,
				scrollH=e.scrollHeight;

			if(scrollT+h+this.limit>=scrollH){
				this.$emit('reachBottom',true);
			};

		}
	}
}
</script>

<style scoped>
.load_more{
	overflow:auto;
	position:absolute;
	left:0;
	right:0;
	bottom:0;
	top:0;
	-webkit-overflow-scrolling:touch;
	z-index:1;
}
.load{
	width:100%;
	height:1rem;
	line-height:1rem;
	text-align:center;
	font-size: 0.24rem;
	color:#ccc;
}
</style>