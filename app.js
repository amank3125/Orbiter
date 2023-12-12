let _count = document.querySelector('.count');
let _address = document.querySelector('.address');
let _body = document.querySelector('.body');
let _query = document.querySelector('.query');
let _loader = document.querySelector('.loader');
let _result = document.querySelector('.result');

var myHeaders = new Headers();
myHeaders.append("Content-Type","application/json");
var requestOptions;
function _fetch(){
    _loader.classList.toggle('close');
    _count.innerHTML = 0;
    _result.innerHTML = '';
    var raw = `{
        "id": 1,
        "jsonrpc": "2.0",
        "method": "orbiter_getTransactionByAddress",
        "params": ["${_address.value}"]
    }`;
    requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    _call()
}


function _call(){
    
fetch("https://openapi.orbiter.finance/explore/v3/yj6toqvwh1177e1sexfy0u1pxx5j8o47", requestOptions)
  .then(response => response.text())
  .then(result => {
    _loader.classList.toggle('close');
    if(Object.keys(JSON.parse(result))[2]=='result'){
        _count.innerHTML=JSON.parse(result).result.count;
    } else if(Object.keys(JSON.parse(result))[2]=='error'){
        _result.innerHTML = Object.values(JSON.parse(result))[2].message+" ❌";
    }
})
  .catch(error => console.log(error))
}
