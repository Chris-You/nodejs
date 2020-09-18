
function numberWithCommas(x) {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }


 function replacaAll(str, searchStr, replaceStr)
 {
      return str.split(searchStr).join(replaceStr);
 }