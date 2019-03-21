<template>
    <div>
        <Header/>
        <Classify howtoshow='canwrite' ref="classify"/>
        <question-card ref="quesCard"/>
        <div>
            <button @click="clear">清空</button>
            <button @click="save">保存</button>
        </div>       
    </div>
</template>
<script>
import Header from '@/components/commons/Header'
import Classify from '@/components/commons/Classify'
import QuestionCard from '@/components/commons/QuestionCard'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
    name:'Create',
    components:{
        Header,
        Classify,
        QuestionCard,
    },
    mounted(){
        this.$refs.quesCard.$refs.quesarea.readOnly=false
        this.$refs.quesCard.$refs.answerarea.readOnly=false
    },
    methods:{
       ...mapActions(['addmax']), 
        save(){
            // console.log(this.$refs.classify.classifyAs);
            // console.log(this.$refs.quesCard.ques);
            // console.log(this.$store.state.qas);
            if(this.$refs.quesCard.ques.question.length===0 && this.$refs.quesCard.ques.answer.length===0){
                return false
            }
            var quesItem={}
            quesItem.id=this.$store.state.maxId+1
            this.$store.dispatch('addmax')
            quesItem.question=this.$refs.quesCard.ques.question
            quesItem.answer=this.$refs.quesCard.ques.answer
            quesItem.levelone=this.$refs.classify.classifyAs[0].content
            quesItem.leveltwo=this.$refs.classify.classifyAs[1].content
            quesItem.levelthree=this.$refs.classify.classifyAs[2].content
            quesItem.mark=this.$refs.classify.classifyAs[3].content
            quesItem.grasp='差'
            quesItem.toStudy=true
            quesItem.studyNum=0

            this.$store.state.newCreate.push(quesItem)
            var list=JSON.parse(localStorage.getItem('qas') || '[]')
            list.push(quesItem)
            localStorage.setItem('qas',JSON.stringify(list))
            this.clear()
            // console.log(list);
            // console.log(this.$store.state.qas);
            // console.log(this.$store.state.newCreate);
            this.$router.push("/study/"+quesItem.id)
        },
        clear(){
            this.$refs.quesCard.ques.question=''
            this.$refs.quesCard.ques.answer=''
            this.$refs.classify.classifyAs[0].content=''
            this.$refs.classify.classifyAs[1].content=''
            this.$refs.classify.classifyAs[2].content=''
            this.$refs.classify.classifyAs[3].content=''
        }
    }                      
}
</script>

