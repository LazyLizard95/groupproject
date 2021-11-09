var showLinks = document.querySelector(".showing");

var load = function(){
    var loadAll = JSON.parse(localStorage.getItem("bookmarked"));
    showLinks.innerText = loadAll[0].link;
    console.log(loadAll[0].link);
    console.log(showLinks.innerText);
    
    
}

load();