

var load = function(){
    loadAll = (localStorage.getItem("bookmarked"));
    $(".showing").text(loadAll);
    console.log(loadAll);
}

load();