let _count = document.querySelector('.count');
let _address = document.querySelector('.address');
let _addressContainer = document.querySelector('.address-container');
let _body = document.querySelector('.body');
let _query = document.querySelector('.query');
let _loader = document.querySelector('.loader');
let _result = document.querySelector('.result');
let _main = document.querySelector('.main');
let _tool = document.querySelector('.tool');
let _nftImg = document.querySelector('.nft-img');
let _nftTitle = document.querySelector('.nft-title');
let _eligible = document.querySelector('.eligible-container');
let _box = document.querySelector('.box');
let _errorMsg = document.querySelector('.error_msg');
let _txnSpan = document.querySelector('.txn-span');

// Toast boxes
let _successToast = document.querySelector('.success');
let _errorToast = document.querySelector('.error');
let _warningToast = document.querySelector('.warning');
let _successClose = document.querySelector('.success_close');
let _warningClose = document.querySelector('.warning_close');
let _errorClose = document.querySelector('.error_close');

var myHeaders = new Headers();
myHeaders.append("Content-Type","application/json");
var requestOptions;
function _fetch(){
    addClick()
    // _addressContainer.classList.add('box');
    _loader.classList.remove('close');
    _count.innerHTML = 0;
    _result.innerHTML = "";
    // _nftTitle.innerHTML = "";
    _address.style.borderBottom = "1px solid white";
    _main.style.gridTemplateColumns = "1fr 2fr 1fr";
    _tool.style.placeSelf = "center";
    _eligible.classList.add('close');
    _txnSpan.classList.add('close')
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
    if(Object.keys(JSON.parse(result))[2]=='result'){
      let rCount = JSON.parse(result).result.count;
      if(rCount==0){
        toast('warning');
        _eligible.classList.add('close');
        _loader.classList.add('close');
      } else {
        _count.innerHTML=rCount;
        toast('success');
        // _result.innerHTML="Successfully fetched transactions ✅";
        _main.style.gridTemplateColumns = "1fr 2fr 1fr";
        // _tool.style.placeSelf = "end";
        _eligible.style.gridArea = "1/3";
        _tool.style.gridArea = "1/2;"
        _eligible.classList.remove('close');
        _loader.classList.add('close');
        _txnSpan.classList.remove('close')
        if(rCount<=9){                 // NFT Eligibility check
          // _nftTitle.innerHTML = "TRAINEE PILOT";
          _nftImg.src = "/img/trainee.png";
        } else if (rCount>=10&&rCount<=49){
          // _nftTitle.innerHTML = "PILOT";
          _nftImg.src = "/img/pilot.png";
        } else if (rCount>=50&&rCount<=99){
          // _nftTitle.innerHTML = "ELITE PILOT";
          _nftImg.src = "/img/elite.png";
        } else if (rCount>=100&&rCount<=499){
          // _nftTitle.innerHTML = "EXPERT PILOT";
          _nftImg.src = "/img/expert.png";
        } else if (rCount>=500){
          // _nftTitle.innerHTML = "ACE PILOT";
          _nftImg.src = "/img/ace.png";
        }
      }
        
    } else if(Object.keys(JSON.parse(result))[2]=='error'){
      toast('error');
      _errorMsg.innerHTML = Object.values(JSON.parse(result))[2].message;
      _eligible.classList.add('close');
      _loader.classList.add('close');
    }
})
  .catch(error => {_errorMsg.innerHTML=error;
  _eligible.classList.add('close');
  _loader.classList.add('close');
});
}

function toast(e){
  if(e=="success"){
    _successToast.classList.add('show');
    // _successToast.classList.add('fade');
  } else if (e=="warning"){
    _warningToast.classList.add('show');
  } else if(e=="error"){
    _errorToast.classList.add('show');
    // _errorToast.classList.add('fade');
  }
  setTimeout(()=>{
    _errorToast.classList.remove('show');
    _warningToast.classList.remove('show');
    _successToast.classList.remove('show');
  },6000)
}

function addClick(){
  _successClose.addEventListener('click',()=>{
    _successToast.classList.remove('show');
  })
  _warningClose.addEventListener('click',()=>{
    _warningToast.classList.remove('show');
  })
  _errorClose.addEventListener('click',()=>{
    _errorToast.classList.remove('show');
  })
};