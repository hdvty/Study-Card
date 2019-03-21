<template>
    <div class="header">
       <router-link to='/' tag='span'>Home</router-link>
       <router-link to='/create' tag='span'>Create</router-link>
       <router-link to='/choice' tag='span'>Choice</router-link>
       <router-link to='/summary' tag='span'>Summary</router-link>
       <span @click="$router.go(-1)">返回</span>
       <div class="notice" v-if="isModifySave" @click="saveModify">您有修改的内容尚未保存，如果页面刷新，内容将会丢失，请点击保存成文件</div>   
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import utils from '../../utils/'
export default {
    name:'Header',
    computed:{
        ...mapState(['isModifySave','qas'])
    },
    methods:{
        ...mapActions['modifySave'],
        saveModify(){
            utils.downFile(this.qas,'modify')          
            this.$store.dispatch('modifySave')
        }
    }
}
</script>
<style scoped>
    .header{
        width: 600px;
        box-sizing: border-box;
        margin: auto;
        padding: 5px 10px;
        display: flex;
        justify-content:space-between;
        font-size: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        position: relative;
    }
    .header span{
        background-color: rgba(0, 0,0,0.1 );
        width: 100px;
    }
    .header span:hover{
        background-color: #000;
        color: #fff;
    }
    .header .notice{
        position: absolute;
        top: -50px;
        right: 0;
        width: 600px;
        height: 40px;
        line-height: 40px;
        background-color: rgb(208, 192, 238);
        font-weight: bold;
        font-size: 16px;
        color: red;
    }
</style>
