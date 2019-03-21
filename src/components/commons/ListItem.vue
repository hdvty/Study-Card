<template>   
    <div class="listItem" @mouseenter="closeShow=true" @mouseleave="closeShow=false" v-if='itemShow'>
        <div> 
            <span v-text="selectQas[index].id" class="sortId" @mouseenter="graspShow=true" @mouseleave="graspShow=false"></span>
            <span class="grasp" v-if="graspShow">{{selectQas[index].grasp}}</span>
            <span class="question">问题:{{selectQas[index].question}}</span>
            <span class="close" v-if='closeShow' @click.prevent="moveout">x</span>
        </div>   
    </div>        
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    name:'ListItem',
    props:['list','index','id'],
    data(){
        return{
            graspShow:false,
            closeShow:false,
            itemShow:true,
        }
    },
    computed:{
        ...mapState(['selectQas'])
    },
    methods:{
        ...mapActions['changeSelectQas'],
        moveout(){
            // this.itemShow=false
            var outArr=this.selectQas
            // console.log(this.list,this.index,this.id);
            outArr=outArr.filter(item=>{
                if(item.id!==this.id){
                    return true
                }
            })            
            this.$store.dispatch('changeSelectQas',outArr)           
        }
    }
}
</script>
<style scoped>
    .listItem{
        position: relative;
        width: 600px;
        margin: 10px auto;
        overflow: hidden;
        border-radius: 10px;
        padding: 5px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        text-align: left;
        font-size: 14px;
    }
    .listItem .sortId{
        display: inline-block;
        width: 30px;
        background-color: rgba(22, 33, 44, .2);
        text-align: center;
        border-radius: 50%;
        margin-right: 10px;       
    }
    .listItem .grasp{
        background-color: rgba(255,0,0,.5);
        margin-right: 10px;
    }
    .listItem .close{
        position: absolute;
        right: 10px;
        width: 20px;
        height: 20px;
        background-color: rgba(195, 0, 255, 0.3);
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
    }
    
</style>
