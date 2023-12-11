let _count = document.querySelector('.count');
let _address = document.querySelector('.address');
let _body = document.querySelector('.body');
let _query = document.querySelector('.query');
let _loader = document.querySelector('.loader');
function _fetch(e){
    console.log(_body.value);
    let val = e.value;
    let _apiData = {
        method:'POST',
        body:{
            val
        }
    };
    fetch('https://openapi.orbiter.finance/explore/v3/yj6toqvwh1177e1sexfy0u1pxx5j8o47/',_apiData)
    .then(data=>data.json())
    .then(resp=>{console.log(resp);_loader.classList.toggle('close');})
    .catch(err=>{console.log(err);_loader.classList.toggle('close');});
};
// _query.addEventListener('click',_fetch(_body));


