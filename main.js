/*
  Here is a rough idea for the steps you could take:
  // 1. First select and store the elements you'll be working with
  // 2. Create your `submit` event for getting the user's search term
  // 3. Create your `fetch` request that is called after a submission
  // 4. Create a way to append the fetch results to your page
  // 5. Create a way to listen for a click that will play the song in the audio play
*/

// Set initial variables for fetch url and search parameters:

let url = "https://itunes.apple.com/search?term="; //base URL for API
let searchSongs = "&entity=song&limit=50"; //additional parameters added to end of search
let searchData = []; //hold search results to pull out key/value info

// startSearchUrl variable holds search criteria for initial fetch to populate page:
let startSearchUrl = "https://itunes.apple.com/search?term=love&entity=song&limit=50&sort=recent";

//initial fetch to populate page at start:

  fetch(startSearchUrl)
    .then(
      function(response) {
        // error checking
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return
        }

        response.json().then(function(data) {
          searchData = data.results;
          results = document.querySelector(".results");
          results.innerHTML= "";

            for (i=0; i<searchData.length; i++){
              results.innerHTML += `
              <div class="test">
                <img id=${i} class="image" src="${searchData[i].artworkUrl100}">
                <h2 id=${i}>${searchData[i].trackName}</h2>
                <p id=${i}>${searchData[i].artistName}</p>
              </div>
              `
            };
        })
      }
      )

// select button and add event listener for search:
let submitbutton = document.getElementById("submitbutton");
submitbutton.addEventListener("click", itunesSearch);

// function to get search terms on click and execute fetch:
function itunesSearch() {
  let input = document.getElementById("searchbox").value; //get search value entered in text input
  let term = input.split(' ').join('+'); //replace string spaces with plus signs to match API format
  console.log("search term: " + term);
  let searchUrl = url + term + searchSongs; //concatenate base URL with search terms
  console.log("search url: " + searchUrl);

  fetch(searchUrl) //run fetch based on concatenated URL
    .then(
      function(response) {
        // error checking
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return
        }

        response.json().then(function(data) {
          // console.log(data.results.length);
          // console.log(data.results);
          searchData = data.results; //push results to array
          results = document.querySelector(".results");
          results.innerHTML= ""; //clear content in results area of page

          if (searchData.length===0){
            searchText.innerHTML=`<p>Sorry, your search for "${input}" did not return any results. Try again!</p>` //alert if search returns nothing
          }
          else {
            // searchText.innerHTML=`Search results for "${input}":`;
            // data.results.map((song)=>
            for (i=0; i<searchData.length; i++){ //loop to create html elements for each song
              results.innerHTML += `
              <div class="test">
                <img id=${i} class="image" src="${searchData[i].artworkUrl100}">
                <h2 id=${i}>${searchData[i].trackName}</h2>
                <p id=${i}>${searchData[i].artistName}</p>
              </div>
              `
            };
          }
        })
      }
      )
    }

// create variables/event listener to play songs:
let results = document.querySelector(".results");
results.addEventListener("click", playSong, false);
let musicPlayer = document.querySelector(".music-player");
let nowPlayText = document.getElementById("nowPlayText");

//build function to play songs:
function playSong(e) {
  // let test=document.getElementsByClassName(test);
  // console.log(e.target.id);
  // console.log(searchData);
  let i = e.target.id;
  nowPlayText.innerHTML=`Now playing "${searchData[i].trackName}" by ${searchData[i].artistName}:`; //assign text to show what song/artist is playing
  musicPlayer.setAttribute('src', searchData[i].previewUrl); //grab previewUrl from array and assign as src for audio
}
