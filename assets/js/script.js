let displayText = document.querySelector("#displayText").textContent;
let testGoogle = "";
let taskButton = document.querySelector("#generate");
let taskContainer = document.querySelector("#contentContainer");
var book= [];


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
          links.setAttribute('class', 'mark');
          var linkItems = response.items[i].link;
          var linkTitles = response.items[i].title;
          links.innerHTML ='<a href=' +linkItems+ '>' + linkTitles;
          taskContainer.append(links);
        }
        
        // document.getElementById("displayText").href = response.items[0].link;
    console.log(response);
      })
    })


})


$(".mark").on("click", function(event) {
  var element = event.target;
  var link = element.getAttribute('href');
  var title = element.text;
  book.push({
      link,
      title
  })
  console.log(book);
  localStorage.setItem("bookmarked", JSON.stringify(book));
  debugger;
  console.log("done");
});


 

  

//assign a variable for generated activity.
//append said variable to google search.
//display activity. 
 










//local past generated activity
//points system
//task completion streak
//set options for type tasks checkboxes