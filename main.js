/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

let url = "https://itunes.apple.com/search?term=";

let submitbutton = document.getElementById("submitbutton");

let searchSongs = "&entity=song&limit=10";

let searchText = document.getElementById("searchText");

// 2. Create your `submit` event for getting the user's search term

submitbutton.addEventListener("click", itunesSearch);

function itunesSearch() {
  let input = document.getElementById("searchbox").value;
  console.log(input);
  let term = input.split(' ').join('+');
  console.log(term);
  let searchUrl = url + term + searchSongs;
  console.log(searchUrl);
  // console.log(searchUrl);
  searchText.innerHTML=`Search results for "${input}":`;

  fetch(searchUrl)
    .then(
      function(response) {

        // error checking
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return
        }

        response.json().then(function(data) {
          console.log(data.results.length);
          console.log(data.results);

        })
      }
      )
    }
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
