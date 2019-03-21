<template>
    <div class="choice">
        <div class="file">
            <input type="file" name="file" id="myfile" value="" accept=".json">
            <input type="button" value="确认"  id="readAsText" @click="choiceFile"/>
        </div>
        <div class="toChoice">           
            <div @click="choiceAll"><input type="radio" name="choice" id="choiceAll" checked>所有</div>
            <div @click="choicePart"><input type="radio" name="choice" id="choicePart" v-model="isChecked"/>筛选</div>
        </div>
        <div class="funnel" v-if="isSelected" >  
            <div class="split"><hr/><span>1</span><hr/></div>                     
            <Grasp theme='掌握情况' ismore='onechoice' ref='grasp'/>
            <div class="split"><hr/><span>2</span><hr/></div> 
            <Classify howtoshow='canselect' ref="classify"/>
            <div class="split"><hr/><span>3</span><hr/></div> 
            <Grasp theme='关键词筛选' ref="keyword"/>
            <input type="text" class="wordChoice" placeholder="请输入筛选关键词" v-model="keyword">
            <button @click="reChoice" class="reChoice">清空</button>
            <button @click="makeSure" class="makesure">确认</button>
        </div>
        <div class="goto">
            <router-link to='/list' tag='button'>列表</router-link>
            <button @click="goStudy">随机卡</button>
        </div>
    </div>
</template>
<script>
import Classify from '@/components/commons/Classify'
import Grasp from '@/components/commons/Grasp'
import {mapState,mapActions} from 'vuex'
import utils from './../utils/'
export default {
    name:'Choice',
    components:{
        Classify,Grasp
    },
    data(){
        return{
            isSelected:false,
            isChecked:false,
            routeId:0,
            keyword:''
        }
    },
    beforeRouteLeave (to, from , next) {
        if(this.selectQas.length===0){
                alert('请先选择文件，并且点击确定键进行确定')
                return
        } 
        this.setLocal()
        next()    
    },
    computed:{
        ...mapState(['qas','newCreate','maxId','selectQas'])
    },
    watch:{
        isChecked:function(){
            if(!this.isChecked){
                this.isSelected=false
            }
        },
    },
    methods:{
        ...mapActions['addmax','selectAllQas','changeSelectQas'],
        choiceFile(){
            if(typeof FileReader == "undified") {
                alert("您的浏览器不行了！");
            }
            (()=> {
                var _this=this
                var resultFile = document.getElementById("myfile").files[0]
                if (resultFile) {
                    var reader = new FileReader();
                    reader.readAsText(resultFile,'UTF-8');
                    reader.onload = function(e){
                        var res=JSON.parse(this.result) 
                        // console.log(_this.$store.state.qas,_this.$store.state.newCreate,_this.$store.state.maxId);
                        _this.$store.state.qas=res
                        
                        if(_this.$store.state.newCreate.length!==0){
                            var isSave=confirm('有新建的问题，是否保存到该文件中')
                            if(isSave){
                                var _list = new Array();
                                for(var i in res){
                                    _list.push(res[i].id);
                                }                                
                                _list.sort(function(num1,num2){
                                    return num1-num2;
                                })
                                _this.$store.state.maxId=_list[_list.length-1]                               
                                _this.$store.state.newCreate.forEach(item=>{
                                    item.id=_this.$store.state.maxId+1
                                    _this.$store.dispatch('addmax')
                                })
                                _this.$store.state.qas=res.concat(_this.$store.state.newCreate)
                                _this.$store.state.newCreate=[]
                                //必须保存文件
                                utils.downFile(_this.$store.state.qas,'addto')
                            }else{
                                //保存到其他文件中
                                utils.downFile(_this.$store.state.newCreate,'new')
                                _this.$store.state.newCreate=[]                               
                            }
                        }  
                        _this.$store.dispatch('selectAllQas')                     
                        // console.log(_this.$store.state.qas,_this.$store.state.newCreate,_this.$store.state.maxId)                 
                    };                    
                }
            })()
        },
        choiceAll(){
            var allBtn=document.getElementById('choiceAll')
            allBtn.checked=true
            this.isChecked=false          
        },
        choicePart(){ 
            var partBtn=document.getElementById('choicePart')                       
            this.isChecked=true 
            partBtn.checked=true    
            this.isSelected=!this.isSelected             
        },
        setLocal(){               
            localStorage.setItem('qas',JSON.stringify(this.selectQas))                        
        },  
        goStudy(){
            if(this.selectQas.length===0){
                alert('请先选择文件，并且点击确定键进行确定')
                return
            } 
            var index=Math.ceil(Math.random()*this.selectQas.length)-1
            this.routeId=this.selectQas[index].id 
            this.$router.push("/study/"+this.routeId)
        },  
        reChoice(){
            this.$refs.grasp.pickedMore=[]
            this.$refs.keyword.pickedMore=[]
            this.$refs.grasp.isAll=false
            this.$refs.keyword.isAll=false
            this.$refs.classify.linkOptions=[
                {selectedItem:''},
                {selectedItem:''},
                {selectedItem:''},
                {selectedItem:''},
            ]
            this.keyword=''
        },
        makeSure(){
            var newArr=this.selectQas
            var graspArr=this.$refs.grasp.pickedMore
            var keywordArr=this.$refs.keyword.pickedMore

            if(graspArr.length!==0){
                newArr=newArr.filter(item=>{
                    if(graspArr.includes(item.grasp)){
                        return true
                    }
                })                                               
            }
                    
            if(keywordArr.length!==0){
                if(!keywordArr.includes('问题') && !keywordArr.includes('答案')){
                    newArr=newArr.filter(item=>{
                        if(item.mark.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'标记')
                }else if(!keywordArr.includes('问题') && !keywordArr.includes('标记')){
                    newArr=newArr.filter(item=>{
                        if(item.answer.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'答案')
                }else if(!keywordArr.includes('答案') && !keywordArr.includes('标记')){
                    newArr=newArr.filter(item=>{
                        if(item.question.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'问题')
                }else if(!keywordArr.includes('问题')){
                    newArr=newArr.filter(item=>{
                        if(item.answer.includes(this.keyword) || item.mark.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'no 问题');                    
                }else if(!keywordArr.includes('答案')){
                    newArr=newArr.filter(item=>{
                        if(item.question.includes(this.keyword) || item.mark.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'no 答案');
                }else if(!keywordArr.includes('标记')){
                    newArr=newArr.filter(item=>{
                        if(item.answer.includes(this.keyword) || item.question.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'no 标记');
                }else{
                    newArr=newArr.filter(item=>{
                        if(item.answer.includes(this.keyword) || item.question.includes(this.keyword) || item.mark.includes(this.keyword)){
                            return true
                        }
                    })
                    // console.log(keywordArr,'都有');
                }              
            }
            var linkOptions=this.$refs.classify.linkOptions
            newArr=utils.selChange(newArr,linkOptions)            

            this.$store.dispatch('changeSelectQas',newArr)
        }     
    }
}
</script>
<style scoped>
    .choice{
        width: 600px;
        margin: auto;
    }
    .choice .file{
        width: 100%;
        height: 50px;        
        background-color: rgba(2, 2, 2,0.1);
        line-height: 50px;
        border-radius: 10px;
        box-shadow: 3px 3px 3px -3px;
    }
    .choice .file #readAsText{
        background-color: rgba(245, 24, 24, 0.6);
        width: 80px;
    }
    .choice .toChoice div{
        width: 100%;
        height: 30px;
        line-height: 30px;
        border:1px solid #ccc;
        border-radius: 10px;
        box-shadow: 3px 3px 3px -3px;
    }
    .choice .funnel{
        position: relative;
        padding-top: 30px;
    }
    .choice .funnel .split{
        width: 50px;
        display: flex;  
        justify-content: left;  
        margin:10px 5px -10px ;    
    }
    .choice .funnel hr{
        width: 10px;
        height: 1px;
        border: none;
        border-bottom: 1px solid #ccc;
    }
    .choice .funnel span{
        font-size: 12px;
    }
    .choice .reChoice{
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(242, 240, 247, 0.3);
        width: 80px;
    }
    .choice .makesure{
        position: absolute;
        bottom: -30px;
        right: 10px;
        background-color: rgba(245, 24, 24, 0.7);
        width: 80px;
    }
    .choice .goto{
        margin-top: 30px;
    }
    .choice .goto button{
        width: 60px;
        height: 40px;
        border: none;
        border-radius: 10px;
        margin: 20px;
        background-color: rgba(2, 2, 2,0.2);
        box-shadow: 2px 3px 6px 0px rgba(0, 0, 0, 1);
    }
    .choice .goto button:hover{
        background-color: #000;
        color: #fff;
        font-size: 16px;
    }
    .choice .funnel .wordChoice{
        width: 300px;
        height: 30px;
        padding-left: 10px;
    }
</style>


