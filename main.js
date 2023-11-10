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
// ****** DECLARATIONS *******
// declaring these in the global scope so they are accessable by everthying that want to create new posts or need to use them to manipulate posts, I think there is a better way to do this but not sure how
let mainContainer = document.getElementsByClassName("main-content");
let postContainer = null;
let modal = document.getElementsByClassName("modal")[0];
let btnOpenModal = document.getElementsByClassName("btn-open-modal")[0];
let btnCloseModal = document.getElementsByClassName("close")[0];
let btnCreatePost = document.getElementsByClassName("btn-create-post");
let likeBtn = document.createElement("button");
let postReactions = document.createElement("span");

// ****** INITAL POST-FETCHING *******
// fetches all the post from dummyjson and dynamically creates new elements in which to display them
// might have to make this an asynchrounos function and wait for the response somehow?
fetch("https://dummyjson.com/posts")
  .then((res) => res.json())
  .then((post) => {
    for (let i = 0; i < post.posts.length; i++) {
      // creating the elements for the content dynamically
      postContainer = document.createElement("article");
      postContainer.classList.add("post-container");
      let postTitle = document.createElement("h3");
      postTitle.classList.add("post-title");
      let postText = document.createElement("p");
      postText.classList.add("post-text");
      let postTags = document.createElement("span");
      postTags.classList.add("post-tags");
      postReactions = document.createElement("span");
      postReactions.classList.add("post-reactions");
      likeBtn = document.createElement("button");
      likeBtn.addEventListener("click", likes); // by adding the eventlistener here it seems like I can access it even outside?
      likeBtn.classList.add("btn");
      likeBtn.classList.add("like-btn");
      let postLikeIcon = document.createElement("i");
      postLikeIcon.classList.add("fa-regular");
      postLikeIcon.classList.add("fa-heart");
      likeBtn.append(postLikeIcon);

      // putting the correct data into the correct element
      postTitle.innerText = post.posts[i].title;
      postText.innerText = post.posts[i].body;
      postTags.innerText = post.posts[i].tags;
      postReactions.innerText = post.posts[i].reactions;
      // appends the title, tags, reactions and actual text to its own container that is then appended to the main container for the posts
      postContainer.append(
        postTitle,
        postTags,
        postReactions,
        likeBtn,
        postText
      );
      mainContainer[0].append(postContainer);
    }
    // so this will give me a nodelist with all the buttons, but I've no clue of how to access it outside of this function
    // is the log on line 103 running before the fetch is done? therefore there is no data to put in it
    // it seems like the issue is that this code is asynchronus so it wait for the whole thing to finish, the log on line 103 runs as soon as the thing launches
    // so presumably the same happens with the eventlistener when it tries to run, there are simply nothing to access yet.
    // honestly this feels a bit to advanced for me, which to be fair is probably why it's part of the higher grade requirement, but maybe there is an easier way of doing it?
  });
// ****** EVENTS *******
// opens the modal
btnOpenModal.addEventListener("click", openModal);
// closes the modal
btnCloseModal.addEventListener("click", closeModal);
//creates a new post using the createPost function
btnCreatePost[0].addEventListener("click", createPost);

/* setTimeout(logKek, 2000);

// so this is a very ugly solution but now I should be able to access this nodelist of buttons trying to add an eventlisteten still throws an error
setTimeout(() => {
  console.log(likeBtns);
}, 1000);
 */
// ****** FUNCTIONS *******
// might be a bit overkill to make these functions, but makes them easier to reuse down the line I suppose
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}
function likes(e) {
  element = e.currentTarget.parentElement.querySelector(".post-reactions");
  counter =
    e.currentTarget.parentElement.querySelector(".post-reactions").innerText;
  counter++;
  element.innerText = counter;
} // I think this works? huge shoutout to john smilgas project tutorials. Not sure how exactly but I'll take it. Now there is no cap so the user can just give a post likes to their hearts content and the same user can like however many times they want too, but still.
/* function logKek(){
  likeBtns.addEventListener('click', function(e){
    console.log(e);
  })
  
} */

// reads info from the input fields in the modal and then creates a new post and adds it to the end of the other posts.
function createPost() {
  let inputTitle = document.getElementById("post-title");
  let inputTags = document.getElementById("post-tags");
  let inputText = document.getElementById("post-text");

  let postTitle = document.createElement("h3");
  let postText = document.createElement("p");
  let postTags = document.createElement("span");
  let postReactions = document.createElement("span");

  likeBtn = document.createElement("button");
  likeBtn.addEventListener("click", likes); // by adding the eventlistener here it seems like I can access it even outside?
  likeBtn.classList.add("btn");
  likeBtn.classList.add("like-btn");
  let postLikeIcon = document.createElement("i");
  postLikeIcon.classList.add("fa-regular");
  postLikeIcon.classList.add("fa-heart");
  likeBtn.append(postLikeIcon);

  postTitle.innerText = inputTitle.value;
  postText.innerText = inputText.value;
  postTags.innerText = inputTags.value;
  postReactions = 0;

  postContainer.append(postTitle, postTags, postReactions, likeBtn, postText);
  mainContainer[0].append(postContainer);

  closeModal();
}

// rent funktionellt tror jag sidan är mer eller mindre färdig? åtminstone om jag förstår beskrivningen rätt.
// för VG måste jag lägga in likes/reactions. Har sett att det finns en sådan property inbakad i datan från dummyJSON
// antar då att det handlar om att visa den och om man då trcker på en "like" knapp ska denna gå upp med ett.
// typ likes = post.posts.reactions sedan likes++; tror detta borde vara möjligt redan, men kan hända att det är pilligare än jag tror

// att få dit reactions var ju inte så svårt, inte riktigt samma kanske på att göra egna poster, dock borde jag kunna köra något liknande relativt enkelt
// reactions visar sig svårare än jag trodde. Att få den att visa dem är ju inga problem men att sedan komma åt det så att jag kan manipulera det verkar det stora hindret för mig just nu. Antar att det är något med scoping som jag missar
// kanske måste jag lägga in värden i en annan variable som jag sedan kan komma åt utifrån. Framförallt får jag inte åtkomst till knapparna just nu. Antagligen får jag välja alla knapparna och sedan loopa igenom för att se vilken jag klickat på (forEach?)
// för att sedan knyta det till rätt post och rätt reactions och eventuellt skapa en counter variable som jag sedan ökar med ett per klick.
// extra steg här är ju också att se till att varje unik användare kan bara "like" en post en gång, men det kanske kräver lite mer avancerad kod än vad jag kan för tillfället? Någon from av auth, logga IP eller något?

// Har börjat kolla på localstorage en del också, det verkar inte supersvårt men skenet brukar bedra
// så local storage kan bara lagra strings. Därmed måste jag konvertera det jag vill ha i localstorage till en string genom json.stringify för att sedan konvertera från string tillbaka till object eller liknande så använder jag json.parse
// sedan är det localstorage.setitem för att lagra
// localstorage.getitem för att hämta.

// passande commits har jag försökt göra från början så förhoppningsvis är det steget klart av VG kraven
