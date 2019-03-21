import {ADDMAX,CHANGESELECT,SELECTALLQAS,CHANGESELECTQAS,CHANGEQAS,MODIFYSAVE} from './const'
import utils from './../utils/'
export default {
      [ADDMAX](state){
        state.maxId++
      },
      [CHANGESELECT](state,{key,value}){
        state.selectQas=state.qas.filter(item=>{
          if(item[key]===value || Boolean(value)==0){
            return true
          }
        })        
      },
      [SELECTALLQAS](state){
        state.selectQas=JSON.parse(JSON.stringify(state.qas))
      },
      [CHANGESELECTQAS](state,{arr}){       
        state.selectQas=arr
      },
      [CHANGEQAS](state,{newItem}){
        if(state.qas.length===0){
          alert('请重新选择文件，之前选择的文件已经失效')
          return
        }
        state.qas.forEach(item=>{
          if(item.id===newItem.id){
            item.question=newItem.question
            item.answer=newItem.answer
            item.grasp=newItem.grasp        
          }          
        })
        state.modifyCount++
        
        if(confirm('您已经修改了 '+state.modifyCount+' 次问题，是否现在保存下来，否则刷新页面以后，保存的内容会丢失！！！')){
          utils.downFile(state.qas,'modify')
          state.modifyCount=0
          state.isModifySave=false          
        }else{
          state.isModifySave=true
        }
      },
      [MODIFYSAVE](state){
        state.isModifySave=false
        state.modifyCount=0
      }

}