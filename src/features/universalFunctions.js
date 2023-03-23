export const keyGenerator = (lists) => {
    let uniqueId='id_'+parseInt((Math.random()*(2000-10)+10).toString())
    let exists=lists.filter((x)=>x.id===uniqueId)
    if(exists.length===0)
      return uniqueId
    else
    keyGenerator(lists)
  }

 export const getIndex=(dataHub,key,val)=>{
    let index=-1
    dataHub&&dataHub.forEach((x, i) => {
            if ( x[key] == val) {
              index=i
            }
          });
        return index
} 