let displayText = document.querySelector("#displayText").textContent;
let testGoogle = "";
let taskButton = document.querySelector("#generate");

taskButton.addEventListener("click", function(){

   testFetch  = fetch('http://www.boredapi.com/api/activity/')
  .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      activity = response.activity
      console.log(activity);
      document.getElementById("displayText").href = "testest";
      document.getElementById("displayText").innerText = activity;
  
   testGoogle  = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAKzE32n6Ad0lWIE3hOhOeYWyMbOoQ0PyE&q=' +activity+ '&cx=6a0eab11f4f52b42f')
    .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        
    console.log(response);
      })
    })


})

 

  

//assign a variable for generated activity.
//append said variable to google search.
//display activity. 
 










//local past generated activity
//points system
//task completion streak
//set options for type tasks checkboxes