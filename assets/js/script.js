let displayText = document.querySelector("#displayText").textContent;
let testGoogle = "";
let taskButton = document.querySelector("#generate");
let taskContainer = document.querySelector("#contentContainer");


taskButton.addEventListener("click", function(){

   testFetch  = fetch('http://www.boredapi.com/api/activity/')
  .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      activity = response.activity
      console.log(activity);
      
      document.getElementById("displayText").innerText = activity;
  
   testGoogle  = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAMyF69ErI_ssDgFwmw2UFM8ia0cpRyRsM&q=' +activity+ '&cx=6a0eab11f4f52b42f')
    .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        //debugger;
        for(i =0; i < response.items.length; i++) {
          var links = document.createElement("div");
          //var aTag = document.createElement("a");
          var linkItems = response.items[i].link;
          var linkTitles = response.items[i].title;
          links.innerHTML ='<br>' + '<a href=' +linkItems+ '>' + linkTitles;
          taskContainer.append(links);
          
          // taskContainer.append(response.items[i].link);
          console.log(response.items[i].link);

        }
        
        // document.getElementById("displayText").href = response.items[0].link;
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