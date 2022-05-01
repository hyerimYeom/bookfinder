// let keyword = document.querySelector("#search_input").value;
let search_button = document.querySelector("#search_button");
// let list = document.querySelector(".list");

// function fetchPromise() {
//   return new Promise((resolve, reject) => {
//     //Async function
//     search_button.addEventListener("click", function () {
//       let url = `https://www.googleapis.com/books/v1/volumes?q=${keyword.value}`;
//       return fetch(url)
//         .then(response => {
//           resolve(response.json());
//         })
//         .catch(err => reject(err));
//     });
//   });
// }

// function searchKeyword(){
    
// }

const yourPromise = keyword => {
  return new Promise((resolve, reject) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
      .then(resp => {
        console.log('resp:', resp);
        resolve(resp);
      })
      .catch(err => reject(err));
  });
};

const myPromise = () => {
  const input = document.getElementById("search_input");
  myPromise1(input.value);
};

const myPromise1 = e => {
  yourPromise(e)
    .then(resp => resp.json())
    .catch(err => err);
};


search_button.addEventListener('click', () => myPromise());