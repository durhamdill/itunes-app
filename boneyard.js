fetch("https://itunes.apple.com/search?term=nirvana")
  .then(
    function(response) {

      // error checking
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return
      }

      response.json().then(function(data) {
        console.log(data.results[0]);
        // let title = data.results[0].title;
        // console.log(title);
        // console.log(`The first Star Wars movie is ${title}`);


      })
    }
  )
