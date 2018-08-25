export const loginAction=(user)=>({type:'LOGIN', 'user':user})

export const getSeedsAction=(seeds)=>({type:'GET_SEEDS', 'seeds':seeds})

export const setTempeAction=(seed)=>({type:'SET_TEMPE', seed})

export const setTempeDoneAction=(seedId)=>({type:'SET_TEMPE_DONE', seedId})
