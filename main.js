// ok så detta verkar också funka, så vad jag behöver göra nu är att
// hämta alla posts och loopa igenom dem samt skriva ut dem med denna funktion
// antar jag?
/* function getPost() {
    fetch('https://dummyjson.com/posts/1')
    .then(res => res.json())
    .then(post => {
        let mainContainer = document.getElementsByClassName("main-content")
        let postContainer = document.createElement("article");

        let postTitle = document.createElement("h3")
        let postText = document.createElement("p")
        let postTags = document.createElement("span")
    
        
        postTitle.innerText = post.title;
        postText.innerText = post.body;
        postTags.innerText = post.tags;

        postContainer.append(postTitle, postTags, postText);
        mainContainer[0].append(postContainer);
      
    });
}

btn = document.getElementsByClassName("getPostBtn");

btn[0].addEventListener("click", getPost); */

function getPost() {
  fetch("https://dummyjson.com/posts/")
    .then((res) => res.json())
    .then((post) => {
      let mainContainer = document.getElementsByClassName("main-content");
      for (let i = 0; i < post.posts.length; i++) {
        let postContainer = document.createElement("article");

        let postTitle = document.createElement("h3");
        let postText = document.createElement("p");
        let postTags = document.createElement("span");

        postTitle.innerText = post.posts[i].title;
        postText.innerText = post.posts[i].body;
        postTags.innerText = post.posts[i].tags;

        postContainer.append(postTitle, postTags, postText);
        mainContainer[0].append(postContainer);
      }
    });
}

getPost();

let postContainer = document.createElement("article");
let mainContainer = document.getElementsByClassName("main-content");
// Modal för create post delen
let modal = document.getElementsByClassName("modal")[0];
let btnOpenModal = document.getElementsByClassName("btn-open-modal")[0];
let btnCloseModal = document.getElementsByClassName("close")[0];

function openModal() {
    modal.classList.remove("hidden")
}

function closeModal() {
    modal.classList.add("hidden")
}

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

// ta info från input fält i modal och skapa en post med denna info sedan append till main

function createPost() {

    let inputTitle = document.getElementById("post-title");
    let inputTags = document.getElementById("post-tags");
    let inputText = document.getElementById("post-text");

    let postTitle = document.createElement("h3")
    let postText = document.createElement("p")
    let postTags = document.createElement("span")

    
    postTitle.innerText = inputTitle.value;
    postText.innerText = inputText.value;
    postTags.innerText = inputTags.value;
    console.log(postTitle);
    postContainer.append(postTitle, postTags, postText);
    mainContainer[0].append(postContainer);

    closeModal();

}

// hämta create post knappen och kör createPost() funktionen på denna
let btnCreatePost = document.getElementsByClassName("btn-create-post");
console.log(btnCreatePost[0]);
btnCreatePost[0].addEventListener("click", createPost);