const testFetch  = fetch('http://www.boredapi.com/api/activity/')
.then(function (response) {
    return response.json();
  })
  .then(function (response) {
    
console.log(response);
  }) 

  const testGoogle  = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAKzE32n6Ad0lWIE3hOhOeYWyMbOoQ0PyE&q=' +activity '&cx=6a0eab11f4f52b42f')
  .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      
  console.log(response);
    })

 function changeLink(){
   document.getElementById("displayText").href = "testest";
   document.getElementById("displayText").innerText = googleTest;
 }


 changeLink();

  


 