import ComcastConst from './ComcastConst.js'


async function setThermo (accessToken, seedId, value){
    let myInit = { method: 'PUT',
      body:JSON.stringify({attribSet:[{temperature:value}]}),
      headers: {...ComcastConst.comcast_headers, 
        'Authorization': 'Bearer '+accessToken}}
    let updateURL = ComcastConst.seedsURL+'/'+seedId+'/controls'

    let good = false
    try {
      let response = await fetch(updateURL,myInit);
      console.log('control done')
      good = (response.status===200)
    } catch(e) {
      console.log(new Error(e))
    }
    return good
}

export default setThermo
