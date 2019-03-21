<template>
    <div class="summary">
        <Header/>
        <div class='wrapper'>
            <div>
                <div class="sub">总计</div>
                <div class="content">
                    <span class="amount" v-text="qas.length"></span>
                </div>
            </div>
            <div class="classify">
                <div class="title">分类</div>
                <div>
                    <div class="level">一级（点击下列选项显示二级）</div>
                    <div class="content canclick" v-for="(item,index) in leveloneList" :key="index" @click="getLtwoArr(item.condition)">
                        <span class="condition" v-text="item.condition"></span>
                        <span class="mount" v-text="item.mount"></span>
                    </div>
                </div>
                <div v-if="isShow2" class="linktwo">
                    <div @click="isShow2=false" class="level">二级（点击下列选项显示三级）</div>
                    <div class="content canclick" v-for="(item,index) in leveltwoList" :key="index"  @click="getLthreeArr(item.condition)">
                        <span class="condition" v-text="item.condition"></span>
                        <span class="mount" v-text="item.mount"></span>
                    </div>
                </div>
                <div v-if="isShow3" class="linkthree">
                    <div @click="isShow3=false" class="level">三级（隐藏）</div>
                    <div class="content" v-for="(item,index) in levelthreeList" :key="index">
                        <span class="condition" v-text="item.condition"></span>
                        <span class="mount" v-text="item.mount"></span>
                    </div>
                </div>               
            </div>
            <div>
                <div class="title">标记</div>
                <div class="content" v-for="(item,index) in markList" :key="index">
                    <span class="condition" v-text="item.condition"></span>
                    <span class="mount" v-text="item.mount"></span>
                </div>
            </div>
            <div>
                <div class="title">掌握</div>
                <div class="content" v-for="(item,index) in graspList" :key="index">
                    <span class="condition" v-text="item.condition"></span>
                    <span class="mount" v-text="item.mount"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/commons/Header'
import {mapState,mapActions} from 'vuex'
export default {
    name:'Summary',
    data(){
        return{          
            leveloneList:[],
            leveltwoList:[],
            levelthreeList:[],
            markList:[],
            graspList:[],
            isShow2:false,
            isShow3:false
        }
    },
    components:{
        Header
    },
    mounted(){
        this.initArr(['差','中','良','优'],'grasp',this.graspList)
        this.initArr(this.getMarkArr(),'mark',this.markList)
        this.initArr(this.getLoneArr(),'levelone',this.leveloneList)
    },
    computed:{
        ...mapState(['qas'])
    },
    methods:{
        getMarkArr(){
            var markArr=[]
            this.qas.forEach(item=>{
                if(!markArr.includes(item.mark)){
                    markArr.push(item.mark)
                }
            })
            return markArr
        },
        getLoneArr(){
            var loneArr=[]
            this.qas.forEach(item=>{
                if(!loneArr.includes(item.levelone)){
                    loneArr.push(item.levelone)
                }
            })
            return loneArr
        },
        count(key,value){
            var mount=0
            switch (key) {
                case 'grasp':
                    this.qas.forEach(item=>{
                        if(item.grasp===value){
                            mount++
                        }
                    })
                    return mount              
                case 'mark':
                    this.qas.forEach(item=>{
                        if(item.mark===value){
                            mount++
                        }
                    })
                    return mount
                case 'levelone':
                    this.qas.forEach(item=>{
                        if(item.levelone===value){
                            mount++
                        }
                    })
                    return mount
                case 'leveltwo':
                    this.qas.forEach(item=>{
                        if(item.leveltwo===value){
                            mount++
                        }
                    })
                    return mount              
                case 'levelthree':
                    this.qas.forEach(item=>{
                        if(item.levelthree===value){
                            mount++
                        }
                    })
                    return mount                    
                default:
                    break;
            }
        },
        initArr(arr,key,list){
            var obj={'condition':'','mount':0} 
            var condition=''
            var mount=0          
            arr.forEach(item=>{               
                condition=item
                mount=this.count(key,item)
                condition=condition===''?'空':condition
                obj={'condition':condition,'mount':mount}              
                list.push(obj)
            })                    
        },
        getLtwoArr(condition){
            this.isShow2=true
            var ltwoArr=[]
            this.qas.forEach(item=>{
                if(item.levelone===condition){
                    if(!ltwoArr.includes(item.leveltwo)){
                        ltwoArr.push(item.leveltwo)
                    }                    
                }
            })
            this.leveltwoList=[]
            this.initArr(ltwoArr,'leveltwo',this.leveltwoList)
        },
        getLthreeArr(condition){
            this.isShow3=!this.isShow3
            var lthreeArr=[]
            this.qas.forEach(item=>{
                if(item.leveltwo===condition){
                    if(!lthreeArr.includes(item.levelthree)){
                        lthreeArr.push(item.levelthree)
                    }                    
                }
            })
            this.levelthreeList=[]
            this.initArr(lthreeArr,'levelthree',this.levelthreeList)
        }
    }
}
</script>
<style scoped>
    .summary .wrapper{
        width: 600px;
        height: 900px;
        margin:20px auto;
        display: flex;
        justify-content: space-between;
    }
    .summary .wrapper .title{
        text-shadow: 0px 0px 30px #000;
        margin-bottom: 30px;
    }
    .summary .wrapper .sub{
        font-weight: bold;
        text-shadow: 0px 0px 30px  red;
        margin-bottom: 30px;
    }
    .summary .content{
        margin: 20px;
        border:1px solid #ccc;
        display: flex;
        justify-content: space-around;
    }
    .summary .content .mount{
        color:red;
        font-weight: bold;
        padding-left: 10px;
    }
    .summary .content .amount{
        color: red;
        font-size: 24px;
        background-color: greenyellow;
    }
    .summary .canclick{
        background-color: seashell;
    }
    .summary .canclick:hover{
        background-color: slateblue;
        color: #fff;
    }
    .summary .wrapper .level{
        font-size: 12px;
    }
</style>