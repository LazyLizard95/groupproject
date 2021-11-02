const testFetch  = fetch('http://www.boredapi.com/api/activity/')
.then(function (response) {
    return response.json();
  })
  .then(function (response) {
    
console.log(response);
  }) 

 const googleTest = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAKzE32n6Ad0lWIE3hOhOeYWyMbOoQ0PyE&cx=017576662512468239146:omuauf_lfve&q=lectures')
 .then(function (gresponse) {
   return gresponse.json();
 }).then(function (gresponse) {
   console.log(gresponse);
 })

 function changeLink(){
   document.getElementById("displayText").href = testest;
   document.getElementById("displayText").innerText = googleTest;
 }

 changeLink();