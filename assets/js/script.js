window.onload = () => {
  const tab_switchers = document.querySelectorAll('[data-switcher]');
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
        activity = response.activity
        document.getElementById("displayText").innerText = activity;
        activity.toLowerCase(); //converts activity AFTER its been appended for user. 
        let newStringArray = activity.split(' '); //converts activity string to an array
        const bannedTerms = ['the', 'a', 'and', 'too', 'or', 'some', 'of', 'an'];//terms that are checked for within the array so they can be removed for better search results
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
              contentBox[i].innerHTML = '<br>' + '<a href=' + linkItems + '>' + linkTitles + '</a></br>';
              contentBox[i].setAttribute("href", linkItems);
            }
          })
      })
  });

  let saveMark = document.querySelectorAll(".btnSave").forEach(item => {
    item.addEventListener("click", e => {
      var link = e.target.parentElement.firstElementChild.getAttribute("href");
      var title = e.target.parentElement.firstElementChild.textContent;
      console.log(title);
      console.log(link);
      book.push({
        link
      });
      localStorage.setItem("bookmarked", JSON.stringify(book));
      console.log("works");
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








//local past generated activity
//points system
//task completion streak
//set options for type tasks checkboxes
//add pages