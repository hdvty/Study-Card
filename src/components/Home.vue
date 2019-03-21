<template>
  <div class="home">
      <h4>我要学习啦~</h4>
      <router-link to='/create' tag='button'>创建问题</router-link>
      <router-link to='/choice' tag='button'>回答问题</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>


<style scoped>
    .home button{
      width: 100px;
      height: 60px;
      border-radius: 10px;  
      margin: 20px;   
    }
    .home button:hover{
      background-color: black;
      color: #fff;
      font-size: 18px;
    }
</style>
