

function formToJson(formArray) {//serialize data function

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['id']] = formArray[i]['value'];
    }
    return returnArray;
  }
  
  function sendAjaxHttp(xmlhttp,method,bearer,url,objectJson){
      
          xmlhttp.open(method,url,true);
          xmlhttp.setRequestHeader("Content-type",'application/json');
          xmlhttp.setRequestHeader('authorization',bearer);
  
          if(objectJson==null){
              xmlhttp.send();
          }else{
              xmlhttp.send(JSON.stringify(objectJson));
          }       
  }
  function logOut(){
      localStorage.setItem('message',"");
      location.href='/logout';
  }
  