<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,div,p,h1,h2,h3,h4,h5,h6,ul,li,ol,dl,dt,dd,button,input,select,textarea,form,aside,a,abbr,cite,option,pre,code,fieldset,legend,blockquote,
a, address, article,audio,b,caption,del,dfn,dialog,figure, footer,header,hgroup,i,iframe,ins,kbd,label,legend,li,mark,menu,nav,object,samp,section,small,strong,tfoot,th,thead,time,tr,var,video{
    padding:0;
	   margin:0;
    box-sizing:border-box;
    cursor:pointer;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-font-smoothing:antialiased;
    outline:none;
    vertical-align:middle;
    -webkit-overflow-scrolling:touch;
    list-style:none;
}
img{
  vertical-align: text-top;
}
</style>
