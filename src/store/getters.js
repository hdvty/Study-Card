export default {
    selectoneList(state){
        var leveloneList=[]
        state.selectQas.forEach(item=>{
            if(!leveloneList.includes(item.levelone)){
                leveloneList.push(item.levelone)
            }
        })
        return leveloneList
      },
    selecttwoList(state){
        var leveltwoList=[]       
        state.selectQas.forEach(item=>{
            if(!leveltwoList.includes(item.leveltwo)){
                leveltwoList.push(item.leveltwo)
            }            
        })
        return leveltwoList
      },
    selectthreeList(state){
        var levelthreeList=[]
        state.selectQas.forEach(item=>{
            if(!levelthreeList.includes(item.levelthree)){
                levelthreeList.push(item.levelthree)
            }            
        })
        return levelthreeList
      },
    selectmarkList(state){
        var markList=[]
        state.selectQas.forEach(item=>{
            if(!markList.includes(item.mark)){
                markList.push(item.mark)
            }           
        })
        return markList
      },
     
}

