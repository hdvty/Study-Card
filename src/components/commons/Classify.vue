<template>
    <div class="classify">
        <div class="theme">分类</div>      
        <div v-for="(item,index) in classifyAs" :key="item.id" class="content">
            <span class="title">{{item.title}}</span>
            <span v-show="justShow" class="justShow">{{item.content}}</span>
            <input type="text" v-model.trim.lazy="item.content" v-show="canWrite" class="canWrite" placeholder='选填'>
            <select name="" id="" v-show="canSelect" class="canSelect" v-model="linkOptions[index].selectedItem" @click="getItem(index)">
                <option value="" >--未选择--</option>
                <option :value="optionItem" v-for="(optionItem,index) in item.content" :key="index">{{optionItem}}</option>
            </select>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState,mapActions} from 'vuex'
export default {
    name:'Classify',
    props:['questionPass','howtoshow'],
    data(){
        return{
            classifyAs:[
                {id:'levelone',title:'一级',content:''},
                {id:'leveltwo',title:'二级',content:''},
                {id:'levelthree',title:'三级',content:''},
                {id:'mark',title:'自定义标记',content:''},
            ],
            canWrite:true,
            canSelect:false,
            classifyOpt:{
                levelone:'',
                leveltwo:'',
                levelthree:'',
                mark:''
            },
            linkOptions:[
                {selectedItem:''},
                {selectedItem:''},
                {selectedItem:''},
                {selectedItem:''},
            ]
        }
    },
    watch:{
        questionPass:function(newVal,oldVal){ 
            this.classifyOpt=newVal   
            // console.log(this.classifyOpt) 
            this.init()
        },
        selectQas:{
            deep:true, 
            handler:function(newVal){
                this.classifyAs.forEach(item=>{
                    switch (item.id) {
                        case 'levelone': 
                            item.content=this.selectoneList                 
                            break;         
                        case 'leveltwo':
                            item.content=this.selecttwoList                       
                            break;         
                        case 'levelthree':
                            item.content=this.selectthreeList
                            break;         
                        case 'mark':
                            item.content=this.selectmarkList                       
                            break;              
                        default:
                            break;
                    }
                })               
            }
        }
    },
    created(){
        this.load()
        this.init()
    },
    methods:{
        ...mapActions(['changeSelect','selectAllQas']),
        load(){
             if(!this.questionPass){
                return
            }
            this.classifyOpt=this.questionPass
        },
        init(){
            switch (this.howtoshow) {
                case 'justshow':
                    this.canSelect=false
                    this.canWrite=false
                    break;
                case 'canwrite':
                    this.canWrite=true
                    this.canSelect=false
                    break;
                case 'canselect':
                    this.canSelect=true
                    this.canWrite=false
                    this.classifyOpt.levelone=this.selectoneList
                    this.classifyOpt.leveltwo=this.selecttwoList
                    this.classifyOpt.levelthree=this.selectthreeList
                    this.classifyOpt.mark=this.selectmarkList
                    break;           
                default:
                    break;
            }
            this.classifyAs.forEach(item=>{
                switch (item.id) {
                    case 'levelone': 
                        item.content=this.classifyOpt.levelone                      
                        break;         
                    case 'leveltwo':
                        item.content=this.classifyOpt.leveltwo                        
                        break;         
                    case 'levelthree':
                        item.content=this.classifyOpt.levelthree
                        break;         
                    case 'mark':
                        item.content=this.classifyOpt.mark                        
                        break;              
                    default:
                        break;
                }
            })
            
        },
        changeqas(key,value){     
           this.$store.dispatch('changeSelect',{key,value}) 
        },
        getItem(index){
            if(index===0){
                this.$store.dispatch('selectAllQas')                
            }else{
                for(var i=index;i>0;i--){
                    var k,v 
                     k=this.classifyAs[index-i].id
                     v=this.linkOptions[index-i].selectedItem
                    this.changeqas(k,v)     
                    // console.log(this.selectQas);
                }
            }
        }
        
    },
    computed:{
        ...mapState(['selectQas']),
        ...mapGetters(['selectoneList','selecttwoList','selectthreeList','selectmarkList']),
        justShow:function(){
            if(!this.canWrite && !this.canSelect ) return true
            return false
        }
    }
}
//Choice List 可选择 
//Create 可输入
//Study 不可操作，只显示
</script>
<style scoped>
    .classify{
        width: 600px;
        margin: 10px auto;
        border: 1px solid #ccc;
        overflow: hidden;
        border-radius: 10px;
        padding: 5px;
        box-sizing: border-box;
    }
    .classify .theme{
        border-bottom: 1px dashed #ccc;
        font-size: 16px;
        text-align: left;
        font-weight: bold;
        padding-left: 5px;
    }
    .classify .content{
        float: left;
    }
    .classify .content .title{
        display: inline-block;
        background-color: rgba(173, 233, 61, 0.5);
        margin: 3px;
        padding: 3px;
        border-radius: 5px;
    }
    .classify .content .canWrite, .classify .content .canSelect{
        border: none;
        border-bottom: 1px solid #ccc;
        width: 200px;
        padding: 3px;
        margin-right: 10px;
    }
    .classify .content .justShow{
        display: inline-block;
        padding-right: 20px; 
    }

</style>
