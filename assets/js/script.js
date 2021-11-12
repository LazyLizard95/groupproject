window.onload = () => {
  const tab_switchers = document.querySelectorAll('[data-switcher]');
  let testGoogle = "";
  let taskButton = document.querySelector("#generate");
  var book = JSON.parse(localStorage.getItem("bookmarked")) || [];
  var markedTitle = JSON.parse(localStorage.getItem("bookmarkedTitle")) || [];
  var activities = JSON.parse(localStorage.getItem("bookmarkedActivity")) || [];
  var acting = "";

  taskButton.addEventListener("click", function () {
    testFetch = fetch('https://www.boredapi.com/api/activity/')
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        activity = response.activity;
        acting = response.activity;
        document.getElementById("displayText").innerText = activity;
        activity.toLowerCase(); //converts activity AFTER its been appended for user. 
        let newStringArray = activity.split(' '); //converts activity string to an array
        const bannedTerms = ['the', 'a', 'and', 'too', 'or', 'some', 'of', 'an', 'trip', 'on'];//terms that are checked for within the array so they can be removed for better search results
        newStringArray = newStringArray.filter(e => bannedTerms.includes(e) === false); //e represents all the elements in a list, => returns the values, e => bannedTerms.includes(e) === false is saying, do not return the elements if they are included in banned terms
        let cleanedSearch = newStringArray.toString(); //convert the array back to a string

        testGoogle = fetch('https://www.googleapis.com/customsearch/v1?key=AIzaSyAKzE32n6Ad0lWIE3hOhOeYWyMbOoQ0PyE&q=' + cleanedSearch + '&cx=6a0eab11f4f52b42f') //the cleaned search is included here
          .then(function (response) {
            return response.json();
          })
          .then(function (response) {
            let contentBox = document.getElementsByClassName('contentContainer');
            let contentBoxId = [];
            for (i = 0, len = contentBox.length; i < len; i++) {
              if (contentBox[i].id != '') {
                contentBoxId.push(contentBox[i].id);
              }
            }

            for (i = 0; i < response.items.length; i++) {
              var linkItems = response.items[i].link;
              var linkTitles = response.items[i].title;
              contentBox[i].innerHTML = '<br>' + '<a href=' + linkItems + ' target="_blank">' + linkTitles + '</a></br>';
              contentBox[i].setAttribute("href", linkItems);
            }

            document.getElementById("contentContainer").style = "display: contents";
          })
      })
  });

  let saveMark = document.querySelectorAll(".btnSave").forEach(item => {
    item.addEventListener("click", e => {
      var link = e.target.parentElement.firstElementChild.getAttribute("href");
      var title = e.target.parentElement.firstElementChild.textContent;
      book.push(link);
      markedTitle.push(title);
      activities.push(acting);
      localStorage.setItem("bookmarkedActivity", JSON.stringify(activities));
      localStorage.setItem("bookmarked", JSON.stringify(book));
      localStorage.setItem("bookmarkedTitle", JSON.stringify(markedTitle));
    })
  })

  for (let i = 0; i < tab_switchers.length; i++) {
    const tab_switcher = tab_switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener('click', () => {
      document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
      tab_switcher.parentNode.classList.add('is-active');

      SwitchPage(page_id)
    });
  }
}

function SwitchPage(page_id) {
  const current_page = document.querySelector('.pages .page.is-active');
  current_page.classList.remove('is-active');

  const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
  next_page.classList.add('is-active');

}


var loadTask = function() { 
  
  loadlinks = JSON.parse(localStorage.getItem("bookmarked"));
  loadtitles = JSON.parse(localStorage.getItem("bookmarkedTitle"));
  loadActivity = JSON.parse(localStorage.getItem("bookmarkedActivity"));
  childrenCounter = JSON.parse(localStorage.getItem("childrenCounter"));

  var bookcontain = document.querySelector(".bookCon");
  childrenCounter = bookcontain.childElementCount;
  for (i = 0; i < loadlinks.length; i++) {
    var bookLink = document.createElement("tr");
    bookLink.classList.add('bookmarkTable');//this adds a class so I can keep track of dynamic elements
    childrenCounter = bookcontain.childElementCount; // this will count how many dynamic elements are inside the container
    localStorage.setItem("childrenCounter", childrenCounter);
    bookId = 1 + childrenCounter; // this takes the number of how many dynamic elements there are, then add one to it so the next id will always be unique
    bookLink.setAttribute("id", bookId); // sets id attribute of elemenet using the number assigned in bookId
    let bookmarkBox = document.getElementsByClassName('bookmarkTable'); //109 - 113 creates an array of the ids and checks them to see if theyre not duplicated. if they are itll come out as undefined
    let bookmarkBoxId = [];
    for (i = 0, len = bookmarkBox.length; i < len; i++) {
      if (bookmarkBox[i].id != '') {
        bookmarkBoxId.push(bookmarkBox[i].id);
      }
    }
    var bookItem = loadlinks[i];
    var bookTitle = loadtitles[i];
    var bookAct = loadActivity[i];
    bookLink.innerHTML = '<td>' + bookAct + '</td>' +'<td>' + '<a href=' + bookItem + ' target="_blank">' + bookTitle + "</a>" + '</td>';
    const errorCheck = 'undefined' //create variable for undefined strings
    if (bookLink.innerText.indexOf(errorCheck) === -1){ //124-126 checks if undefined is in the text, anywhere at all, and if it is it wont append it.
    bookcontain.append(bookLink);
    } else {console.log("link is undefined!")}
  }
  
}


var pointsPage = function() {
  loadActivity = JSON.parse(localStorage.getItem("bookmarked"));
  var points = document.getElementById("points");
  points.append(loadActivity.length);
  if( loadActivity.length <= 2 ){
    var points2 = "You are not excited";
    document.getElementById("points").innerHTML = points2;
  } if(loadActivity.length >= 2 && loadActivity.length <=7){
    var points2 = "You are excited";
    document.getElementById("points").innerHTML = points2;
  }else{}
}