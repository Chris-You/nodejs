

var Ajax = {

     Post: function(url, data, callback){
          var jsonString = JSON.stringify(data);
          //console.log(data)
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url)
     
          xhr.setRequestHeader('Content-Type','application/json');
          xhr.send(jsonString);
          
          xhr.addEventListener('load', function(){
               // 문자열 형식으로 변환
               var result = JSON.parse(xhr.responseText);
     
               callback(result);
          });
     }
}
