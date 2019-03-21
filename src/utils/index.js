export default{
    selChange(newArr,linkOptions){
        var selectedList=[]
        linkOptions.forEach(item=>{
            selectedList.push(item.selectedItem)
        })

        if(selectedList[0]){
            newArr=newArr.filter(item=>{
                if(item.levelone===selectedList[0] || !item.levelone){                       
                    return true
                }
            })
        }

        if(selectedList[1]){
            newArr=newArr.filter(item=>{
                if(item.leveltwo===selectedList[1] || !item.leveltwo){
                    return true
                }
            })
        }
        if(selectedList[2]){
            newArr=newArr.filter(item=>{
                if(item.levelthree===selectedList[2] || !item.levelthree){
                    return true
                }
            })
        }
        if(selectedList[3]){
            newArr=newArr.filter(item=>{
                if(item.mark===selectedList[3] || !item.mark){
                    return true
                }
            })
        }
        // console.log(newArr,linkOptions);
        
        return newArr
    },
    downFile(jsondata,filename) {   
        var elementA = document.createElement('a');    
        elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(jsondata));
        elementA.download=filename+'.json'
        elementA.style.display = 'none';
        document.body.appendChild(elementA);
        elementA.click();
        document.body.removeChild(elementA);
    },

}