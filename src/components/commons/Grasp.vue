<template>
    <div class="grasp">
        <span v-text="theme"></span>
        <div v-if="isMore" class="ismore">
            <div v-for="item in radioData" :key="item.id" class="content">
                <input type="checkbox" :id="item.value" :name="item.name" :value="item.content" v-model="pickedMore">
                <label :for="item.value">{{item.content}}</label> 
            </div>            
            <label><input type="checkbox" class="all" value="F" v-model="isAll">全选</label> 
        </div>
        <div v-else class="ismore">
            <div v-for="item in radioData" :key="item.id" class="content">                
                <input type="radio" :id="item.value" :name="item.name" :value="item.content" v-model="pickedOne" disabled ref="radio"/>
                <label :for="item.value">{{item.content}}</label>            
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Grasp',
    props:['theme','ismore','questionPass'],
    data(){
        return{
            isMore:true,
            radioData:null,            
            graspRadio:[
                    {id:1,name:'grasp',value:'D',content:'差'},
                    {id:2,name:'grasp',value:'C',content:'中'},
                    {id:3,name:'grasp',value:'B',content:'良'},
                    {id:4,name:'grasp',value:'A',content:'优'},
                ],           
            keywordRadio:[
                    {id:1,name:'keyword',value:'question',content:'问题'},
                    {id:2,name:'keyword',value:'answer',content:'答案'},
                    {id:3,name:'keyword',value:'answer',content:'标记'},
            ],
            pickedOne:'',
            pickedMore:[],
            isAll:false,
        }
    },
    created(){
        this.init()
    },
    watch:{
        questionPass:function(newVal,oldVal){   
            this.pickedOne=newVal.grasp   
        },
        isAll:function(value){
            if(value){
                if(this.theme==='掌握情况'){
                    this.pickedMore=['差','中','良','优']
                }else if(this.theme==='关键词筛选'){
                    this.pickedMore=['问题','答案','标记']
                }
            }else{
                this.pickedMore=[]
            }
        },         
    },
    methods:{
        init(){
            if(this.theme==='掌握情况'){
                this.radioData=this.graspRadio
            }else if(this.theme==='关键词筛选'){
                this.radioData=this.keywordRadio
            }

            switch (this.ismore) {
                case 'morechoice':
                    this.isMore=false
                    break;
                case 'onechoice':
                    this.isMore=true
                    break;           
                default:
                    break;
            }
            if(this.questionPass){
                this.pickedOne=this.questionPass.grasp                
            }
        },
    }
}
//Choice
//Study
</script>
<style scoped>
    .grasp{
        width: 600px;
        margin: 10px auto;
        overflow: hidden;
        border-radius: 10px;
        padding: 5px;
        box-sizing: border-box;
        background-color: rgba(200,220,110,0.2);
        text-align: left;
    }
    .grasp span{
        margin-right: 20px;
        font-weight: bold;
        padding: 5px;
    }
    .grasp .ismore{
        display: inline-block;
    }
    .grasp .content{
        display: inline-block;
        margin-right: 10px;
    }
    .grasp .ismore .all{
        margin-left: 200px;
    }
</style>
