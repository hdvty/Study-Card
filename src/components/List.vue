<template>
    <div class="list">
        <Header/>
        <Classify howtoshow='canselect'  ref="classify" />
        <button @click="reChoice" class="reChoice">重新选择</button>
        <li v-for="(item,index) in selectQas" :key="item.id" >
            <router-link :to="'/study/'+item.id" tag='div'>
                <list-item :index='index' :id='item.id'/>
            </router-link>        
        </li>
    </div>
</template>
<script>
import Header from '@/components/commons/Header'
import Classify from '@/components/commons/Classify'
import ListItem from '@/components/commons/ListItem'
import {mapState,mapActions} from 'vuex'
import utils from './../utils/'
export default {
    name:'List',
    components:{
        Header,Classify,ListItem
    },
    data(){
        return{
            // list:[]
        }
    },
    // mounted(){
    //    this.load()
    // },
    computed:{
        ...mapState(['qas','selectQas'])
    },
    methods:{
        ...mapActions['changeSelectQas','selectAllQas'],
        // load(){
        //     // this.list=JSON.parse(localStorage.getItem('qas') || '[]')
        //     // this.list=this.selectQas
        // },
        reChoice(){
            this.$store.dispatch('selectAllQas')
            var newArr=this.qas 
            var linkOptions=this.$refs.classify.linkOptions
            newArr=utils.selChange(newArr,linkOptions)           
            this.$store.dispatch('changeSelectQas',newArr)            
        },

    }
}
</script>
<style scoped>
    .list .reChoice{
        background-color: rgba(125,125,125,0.3);
        width: 100px;
    }
    .list li{
        list-style: none;
    }
</style>