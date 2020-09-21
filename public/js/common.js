
function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }


 function replacaAll(str, searchStr, replaceStr)
 {
      return str.split(searchStr).join(replaceStr);
 }

 function setColor(num)
 {
      var color = "";
      if(num <= 10) { color = "" }
      else if(num > 10 && num <=20 ) {}
      else if(num > 20 && num <=30 ) {}
      else if(num > 30 && num <=40 ) {}
      else if(num > 40 ) {}

      return color;
 }