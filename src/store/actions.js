import {ADDMAX,CHANGESELECT,SELECTALLQAS,CHANGESELECTQAS,CHANGEQAS,MODIFYSAVE} from './const'

export default {
    addmax({commit}){
        commit(ADDMAX)
    },
    changeSelect({commit},{key,value}){
        commit(CHANGESELECT,{key,value})
    },
    selectAllQas({commit}){
        commit(SELECTALLQAS)
    },
    changeSelectQas({commit},arr){
        commit(CHANGESELECTQAS,{arr})
    },
    changeQas({commit},newItem){
        commit(CHANGEQAS,{newItem})
    },
    modifySave({commit}){
        commit(MODIFYSAVE)
    }
}
