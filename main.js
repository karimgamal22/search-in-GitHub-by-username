let theInput = document.querySelector(".get-repos input");
let getbutton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getbutton.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  if (theInput.value == "") {
    // If Value Is Empty
    reposData.innerHTML = "<span>please write GitHub username.</span>";
    reposData.style.color = "red";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        // Empty The Container
        reposData.innerHTML = "";

        // Loop On Repositories
        datas.forEach((data) => {
          // Create The Main Div Element
          let maindiv = document.createElement("div");

          // Create maindivtext Name Text
          let maindivtext = document.createTextNode(data.name);

          // Append The Text To Main Div
          maindiv.appendChild(maindivtext);

          // create repo url
          let theUrl = document.createElement("a");

          let theurltext = document.createTextNode("Visit");

          theUrl.appendChild(theurltext);
          // Add Thje Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${data.name}`;

          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank");

          maindiv.appendChild(theUrl);

          // Create Stars Count Span
          let starsSpan = document.createElement("span");
          // Create Stars Count Span text
          let starsText = document.createTextNode(
            `starts ${data.stargazers_count}`
          );
          // Add Stars Count Text To Stars Span
          starsSpan.appendChild(starsText);

          // Append Stars Count Span To Main Div
          maindiv.appendChild(starsSpan);
          // Add Class On Main Div
          maindiv.className = "repo-box";
          // Append The Main Div To Container
          reposData.appendChild(maindiv);
        });
      });
  }
}
