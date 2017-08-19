/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with

let url = "https://itunes.apple.com/search?term=";

let submitbutton = document.getElementById("submitbutton");

let searchSongs = "&entity=song&limit=10";

let searchText = document.getElementById("searchText");

let songArray = [];


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
          console.log(data.results.length);
          console.log(data.results);
          results = document.querySelector(".results");
          results.innerHTML= "";

          if (data.results.length===0){
            searchText.innerHTML=`<p>Sorry, your search for "${input}" did not return any results. Try again!</p>`
          }
          else {
            searchText.innerHTML=`Search results for "${input}":`;
            // data.results.map((song)=>
            for (let i=0; i<data.results.length; i++){
              songArray.push(data.results[i].previewUrl);
              results.innerHTML += `
              <div class="test" id=${i} onclick=playSong()>
                <img class="image" src="${data.results[i].artworkUrl100}" value="${data.results[i].previewUrl}">
                <h2>${data.results[i].trackName}</h2>
                <p>${data.results[i].artistName}</p>
              </div>
              `

            };
          }
          // let songBox=document.getElementsByClassName("test");
          // songBox.addEventListener("click", playSong, false);
          console.log("array of songUrls: " + songArray);
        })
      }
      )
    }

// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

// let results = document.querySelector(".results");
let musicPlayer = document.querySelector(".music-player");
// results.addEventListener("click", playSong, false);

//   function playSong(e) {
//     if (e.target !== e.currentTarget) {
//         // var clickedItem = e.target.id;
//         // alert("Hello " + clickedItem);
//         console.log(target);
//     }
//     e.stopPropagation();
// }

function playSong() {
  console.log(this.id);
}
