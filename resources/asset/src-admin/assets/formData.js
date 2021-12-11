export default {
  obj(obj){
    let frmData = new FormData();
    if(obj) for(let x in obj) frmData.append(x,obj[x]);
    return frmData;
  }
}
