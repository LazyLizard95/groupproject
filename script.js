const testFetch  = fetch('http://www.boredapi.com/api/activity/')
.then(function (response) {
    return response.json();
  })
  .then(function (response) {
    
console.log(response);
  })


 