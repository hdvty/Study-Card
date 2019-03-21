<template>
    <div class="study">
        <Header/>
        <Classify :questionPass='questionItem' howtoshow='justshow'/>
        <div class="next">
            <button @click="choiceBefore">上一题</button>
            <button @click="choiceNext">下一题</button>
        </div>
        <question-card :questionPass='questionItem'  ref='quesCard'/>        
        <Grasp theme='掌握情况' ismore='morechoice' :questionPass='questionItem' ref="graspComp"/>
        <div class="btn">
            <button @click="isBig=true">放大</button>
            <button @click="modify">修改内容</button>
            <button @click="cancel">撤销</button>
            <button @click="save">保存</button>
            <div class="bigarea" v-if="isBig">
                <div class="question" v-text="questionItem.question"></div>
                <div class="answer" v-text="questionItem.answer"></div>
                <div class="small" @click="isBig=false">x</div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/commons/Header'
import Classify from '@/components/commons/Classify'
import QuestionCard from '@/components/commons/QuestionCard'
import Grasp from '@/components/commons/Grasp'
import {mapState,mapActions} from 'vuex'
export default {
    name:'Study',
    components:{
        Header,
        Classify,
        QuestionCard,
        Grasp
    },
    data(){
        return{
            questionItem:null,
            list:[],//从localStorage获取到的存储数据(有用，不可删除)
            idInList:[],//可以显示跳转的所有id集合
            selectedId:this.$route.params.id*1,//从list跳转时显示的id
            nowNum:0,
            isBig:false,
            beforeModifyQues:'',
            beforeModifyAnsw:'',
            beforeModifyGrasp:'',
            canModify:false
        }
    },
    computed:{
        ...mapState(['qas','selectQas'])
    },
    watch:{
        $route:function(value){
            this.nowNum=value.params.id-1           
        },
        nowNum:function(value){
             this.questionItem=this.list[value]
        }
    },
    mounted(){
        this.load()
    },
    methods:{
        ...mapActions['changeQas','selectAllQas'],
        load(){
            this.list=JSON.parse(localStorage.getItem('qas') || '[]')
            // if(this.list.length===0){
            //     alert('请先选择要学习的JSON文件')
            //     return
            // }            
            this.list.forEach(item=>{
                this.idInList.push(item.id)
            })
            var idLength=this.idInList.length

            this.idInList.forEach((item,index)=>{
                if(item===this.selectedId){
                    this.nowNum=index
                   return
                }
            })
            
            this.questionItem=this.list[this.nowNum]
        },
        canNotUse(bool){
            this.$refs.quesCard.$refs.quesarea.readOnly=bool
            this.$refs.quesCard.$refs.answerarea.readOnly=bool
            this.$refs.graspComp.$refs.radio.forEach(item=>{
                item.disabled=bool
            })
        },
        choiceBefore(){
            this.canNotUse(true)
            var routeId=Math.ceil(Math.random()*this.idInList.length)           
            this.$router.push("/study/"+routeId)       
        },
        choiceNext(){ 
            this.canNotUse(true)
            var routeId=Math.ceil(Math.random()*this.idInList.length)           
            this.$router.push("/study/"+routeId)    
        },
        modify(){
            if(this.qas.length===0){
                alert('请重新选择文件，之前选择的文件已经失效')
                return
            }
            this.canModify=true 
            this.canNotUse(false)         
            this.beforeModifyQues=this.questionItem.question 
            this.beforeModifyAnsw=this.questionItem.answer
            this.beforeModifyGrasp=this.questionItem.grasp 
            // console.log(this.questionItem,this.beforeModifyQues,this.beforeModifyAnsw,this.beforeModifyGrasp);
        },
        cancel(){
            // this.$router.go(0) 
            this.questionItem.question=this.beforeModifyQues
            this.questionItem.answer=this.beforeModifyAnsw
            this.$refs.graspComp.pickedOne=this.beforeModifyGrasp            
        },
        save(){
            if(this.canModify){
                this.questionItem.question=this.$refs.quesCard.ques.question
                this.questionItem.answer=this.$refs.quesCard.ques.answer
                this.questionItem.grasp=this.$refs.graspComp.pickedOne  
                this.$store.dispatch('changeQas',this.questionItem)  
                this.$store.dispatch('selectAllQas')  
                this.canModify=false
                this.canNotUse(true)

            }                    
        }

    }
}
</script>
<style scoped>
    .study{
        position: relative;
        width: 600px;
        margin: auto;
    }
    .study .next{
        width: 600px;
        margin: auto;
        display: flex;
        justify-content: space-between;
    }
    .study .btn button{
        margin: 10px;
        background-color: #eee;
        
    }
    .study .btn button:hover{
        background-color: #043cf3;
        color: #fff;
    }
    .study .btn .bigarea{
        position: absolute;
        top: 0;
        left: -300px;
        width: 1100px;
        height: 900px;
        border: 1px solid #ccc;
        background-color: seashell;
        color: #666;       
        font-family:"微软雅黑","宋体",arial,Helvetica,sans-serif;       
        text-align: left;
        font-size: 20px;
        padding: 30px;
        z-index: 99;
        overflow: auto;
        margin-bottom: 50px;
    }
    .study .btn .bigarea .question{
        font-weight: 700;
        font-size: 22px;
        border-bottom: 1px dashed #ccc;
        padding: 15px;
    }
    .study .btn .bigarea .answer{
        padding: 15px;        
    }
    .study .btn .bigarea .small{
        position: absolute;
        right: 20px;
        top: 10px;
        background-color: yellow;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
    }
</style>
