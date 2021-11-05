let displayText = document.querySelector("#displayText").textContent;
let testGoogle = "";
let taskButton = document.querySelector("#generate");
let taskContainer = document.querySelector("#contentContainer");


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
      newStringArray = activity.match(/\b(\w+)\b/g); //this is known as a regular expression or ReGex. Regular expression are a combination of characters that are short hand for parameters that can be matched. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
      const bannedTerms = ['the', 'a', 'and', 'too', 'or', 'some', 'of'] //terms that are checked for within the array so they can be removed for better search results
      newStringArray = newStringArray.filter(e => bannedTerms.includes(e) === false); //e represents all the elements in a list, => returns the values, e => bannedTerms.includes(e) === false is saying, do not return the elements if they are included in banned terms
      console.log(activity);


      testGoogle = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAMyF69ErI_ssDgFwmw2UFM8ia0cpRyRsM&q=' + activity + '&cx=6a0eab11f4f52b42f') //the activity is included here
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          //debugger;
          for (i = 0; i < response.items.length; i++) {
            var links = document.createElement("div");
            var linkItems = response.items[i].link;
            var linkTitles = response.items[i].title;
            links.innerHTML = '<br>' + '<a href=' + linkItems + '>' + linkTitles;
            taskContainer.append(links);


            console.log(response.items[i].link);

          }


          console.log(response);
        })
    })


})


















//local past generated activity
//points system
//task completion streak
//set options for type tasks checkboxes