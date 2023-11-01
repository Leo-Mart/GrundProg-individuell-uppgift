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
  fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((post) => {
      let mainContainer = document.getElementsByClassName("main-content");
      for (let i = 0; i < post.posts.length; i++) {
        let postContainer = document.createElement("article");

        let postTitle = document.createElement("h3");
        let postText = document.createElement("p");
        let postTags = document.createElement("span");
        let postReactions = document.createElement("span");

        postTitle.innerText = post.posts[i].title;
        postText.innerText = post.posts[i].body;
        postTags.innerText = post.posts[i].tags;
        postReactions.innerText = post.posts[i].reactions;

        postContainer.append(postTitle, postTags, postReactions, postText );
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
    let postReactions = document.createElement("span");

    
    postTitle.innerText = inputTitle.value;
    postText.innerText = inputText.value;
    postTags.innerText = inputTags.value;
    postReactions = 0;
    
    postContainer.append(postTitle, postTags, postReactions, postText);
    mainContainer[0].append(postContainer);

    closeModal();

}

// hämta create post knappen och kör createPost() funktionen på denna
let btnCreatePost = document.getElementsByClassName("btn-create-post");

btnCreatePost[0].addEventListener("click", createPost);

// rent funktionellt tror jag sidan är mer eller mindre färdig? åtminstone om jag förstår beskrivningen rätt. 
// för VG måste jag lägga in likes/reactions. Har sett att det finns en sådan property inbakad i datan från dummyJSON
// antar då att det handlar om att visa den och om man då trcker på en "like" knapp ska denna gå upp med ett.
// typ likes = post.posts.reactions sedan likes++; tror detta borde vara möjligt redan, men kan hända att det är pilligare än jag tror

// att få dit reactions var ju inte så svårt, inte riktigt samma kanske på att göra egna poster, dock borde jag kunna köra något liknande relativt enkelt

// local storage delen av VG kravet är svårare, vi har ju inte alls gått igenom detta ännu. Så tänker jag fokuserar på likes/reactions
// och så kan jag förstås börja kolla på local storage redan nu/snart

// passande commits har jag försökt göra från början så förhoppningsvis är det steget klart av VG kraven