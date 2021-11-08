let displayText = document.querySelector("#displayText").textContent;
let testGoogle = "";
let taskButton = document.querySelector("#generate");
let taskContainer = document.querySelector("#contentContainer");
let book = [];

taskButton.addEventListener("click", function () {

  testFetch = fetch('http://www.boredapi.com/api/activity/')
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      activity = response.activity
      console.log(activity);
      document.getElementById("displayText").innerText = activity;
      activity.toLowerCase(); //converts activity AFTER its been appended for user. 
      let newStringArray = activity.split(' '); //converts activity string to an array
      const bannedTerms = ['the', 'a', 'and', 'too', 'or', 'some', 'of', 'an'];//terms that are checked for within the array so they can be removed for better search results
      newStringArray = newStringArray.filter(e => bannedTerms.includes(e) === false); //e represents all the elements in a list, => returns the values, e => bannedTerms.includes(e) === false is saying, do not return the elements if they are included in banned terms
      let cleanedSearch = newStringArray.toString(); //convert the array back to a string
      console.log(cleanedSearch);


      testGoogle = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAMyF69ErI_ssDgFwmw2UFM8ia0cpRyRsM&q=' + cleanedSearch + '&cx=6a0eab11f4f52b42f') //the cleaned search is included here
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          let contentBox = document.getElementsByClassName('contentContainer');
          let contentBoxId = [];
          for (i = 0, len = contentBox.length; i < len; i++){
            if (contentBox[i].id != ''){
              contentBoxId.push(contentBox[i].id);
            }
          }
          console.log(contentBoxId);
          for (i = 0; i < response.items.length; i++) {
            
            var links = document.createElement("div");
            var linkItems = response.items[i].link;
            var linkTitles = response.items[i].title;
            links.innerHTML = '<br>' + '<a href=' + linkItems + '>' + linkTitles;
            contentBox[i].append(links);

            
           
            
          }

          
          
        })
    })


})

let saveMark = document.getElementById("save");
console.log(saveMark);
saveMark.addEventListener("click", function (e) { 
  var link = e.target.nextElementSibling.getAttribute("href");
      var title = e.target.nextElementSibling.text;
      book.push({
      link,
      title,
      });
      localStorage.setItem("bookmarked", JSON.stringify(book));
      console.log("works");

    })






//local past generated activity
//points system
//task completion streak
//set options for type tasks checkboxes