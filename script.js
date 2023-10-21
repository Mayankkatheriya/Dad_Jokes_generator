let btn = document.querySelector("#btn");
let jokes = document.querySelector(".sub-heading");
let copyBtn = document.querySelector(".copy");
let message = document.querySelector(".message");
let shareBtn = document.querySelector(".share");
const options = {
  method: "GET",
  headers: { "X-Api-Key": "b3FCX0u0rfmwffqrZCKrob4S2W45qWkqHfySTwwW" },
};
let res = null;
async function getJoke() {
  shareBtn.style.display = "none";
  copyBtn.style.display = "none";
  jokes.innerText = `Updating...`;
  try {
    setTimeout(async () => {
      let data = await fetch(
        "https://api.api-ninjas.com/v1/dadjokes?limit=1",
        options
      );
      res = await data.json();
      jokes.innerText = `${res[0].joke}`;
      copyBtn.disabled = false;
      copyBtn.style.display = "inline";
      shareBtn.style.display = "inline";
    }, 1500);
  } catch {
    jokes.innerText = `Click Again`;
  }
}
function copyText() {
  navigator.clipboard.writeText(jokes.innerText).then(() => {
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);
    copyBtn.disabled = true;
  });
}
function shareText() {
  if (navigator.share) {
    navigator
      .share({
        title: "Dad Joke",
        text: jokes.innerText,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Sharing failed", error));
  } else {
    alert("Sharing is not supported in your browser.");
  }
}
btn.addEventListener("click", getJoke);
copyBtn.addEventListener("click", copyText);
shareBtn.addEventListener("click", shareText);
