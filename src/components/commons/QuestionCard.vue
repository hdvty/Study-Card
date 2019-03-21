<template>
    <div class="questionCard">
        <div class="question">
            <span>问题</span>
            <textarea name="" id="questionArea" v-model.trim.lazy="ques.question" ref='quesarea' readonly></textarea>
        </div>
        <div class="answer">
            <span>答案</span>
            <textarea name="" id="answerArea" v-model.trim.lazy="ques.answer" ref="answerarea" readonly></textarea>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'QuestionCard',
    props:['questionPass'],
    data(){
        return{
            ques:{
                question:'',
                answer:''
            }
        }
    },
    watch:{
        questionPass:function(newVal,oldVal){   
            this.ques=newVal    
        },
    },
    created(){
        this.load()
    },
    methods:{
        load(){      
            if(!this.questionPass){
                return
            }
            this.ques=this.questionPass
        },
    }
}
</script>
<style scoped>
    .questionCard{
        margin: 10px auto;
        border: 1px solid #ccc;
        width: 600px;
        height: 400px;
        border-radius: 10px;
        overflow: hidden;
    }
    .questionCard .question{
        position: relative;
        border-bottom: 1px solid #ccc;
        height: 50px;
    }
    .questionCard .question span{
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(57, 235, 57);
        text-align: center;
        line-height: 50px;
        z-index: 1;
    }
    .questionCard .question textarea{
        position: absolute;
        left: 0;
        top: 0;
        border:none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding-left: 60px;
        padding-top: 16px;
        font-size: 18px;
        resize: none;
    }
    .questionCard .answer{
        position: relative;
        height: 350px;
    }
    .questionCard .answer span{
        position: absolute;
        top: 0;
        left: 0;
        margin: 8px;
        z-index: 1;
    }
    .questionCard .answer textarea{
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 40px;
        font-size: 16px;
        resize: none;
    }
</style>

