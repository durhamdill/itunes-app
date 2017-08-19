/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

let url = "https://itunes.apple.com/search?term=";

let submitbutton = document.getElementById("submitbutton");

let searchSongs = "&entity=song&limit=50";

let searchText = document.getElementById("searchText");

let searchData = [];

let startSearchUrl = "https://itunes.apple.com/search?term=love&entity=song&limit=50&sort=recent";

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


// 2. Create your `submit` event for getting the user's search term

submitbutton.addEventListener("click", itunesSearch);

function itunesSearch() {
  let input = document.getElementById("searchbox").value;
  let term = input.split(' ').join('+');
  console.log("search term: " + term);
  let searchUrl = url + term + searchSongs;
  console.log("search url: " + searchUrl);

  fetch(searchUrl)
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
          searchData = data.results;
          results = document.querySelector(".results");
          results.innerHTML= "";

          if (searchData.length===0){
            searchText.innerHTML=`<p>Sorry, your search for "${input}" did not return any results. Try again!</p>`
          }
          else {
            // searchText.innerHTML=`Search results for "${input}":`;
            // data.results.map((song)=>
            for (i=0; i<searchData.length; i++){
              results.innerHTML += `
              <div class="test">
                <img id=${i} class="image" src="${searchData[i].artworkUrl100}">
                <h2 id=${i}>${searchData[i].trackName}</h2>
                <p id=${i}>${searchData[i].artistName}</p>
              </div>
              `
            };
          }
          // console.log(searchData);
          // let songBox=document.getElementsByClassName("test");
          // songBox.addEventListener("click", playSong, false);
        })
      }
      )
    }


// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let results = document.querySelector(".results");
results.addEventListener("click", playSong, false);
let musicPlayer = document.querySelector(".music-player");
// let nowPlayText = document.querySelector("#nowPlayText");
let nowPlayText = document.getElementById("nowPlayText");

function playSong(e) {
  // let test=document.getElementsByClassName(test);
  // console.log(e.target.id);
  // console.log(searchData);
  let i = e.target.id;
  nowPlayText.innerHTML=`Now playing "${searchData[i].trackName}" by ${searchData[i].artistName}:`;
  musicPlayer.setAttribute('src', searchData[i].previewUrl);
}
