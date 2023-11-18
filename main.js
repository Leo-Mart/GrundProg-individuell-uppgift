// ****** DECLARATIONS *******
// declaring these in the global scope so they are accessable by everthying that want to create new posts or need to use them to manipulate posts,
// I think there is a better way to do this but not sure how
// might want to replace some of these with queryselectors, possibly a little more streamlined than having to specify the index everywhere
let mainContainer = document.getElementsByClassName("main-content");
let postContainer;
let reactionContainer;
let modal = document.getElementsByClassName("modal")[0];
let btnOpenModal = document.getElementsByClassName("btn-open-modal")[0];
let btnCloseModal = document.getElementsByClassName("close")[0];
let btnCreatePost = document.getElementsByClassName("btn-create-post");
let likeBtn = document.createElement("button");
let postReactions = document.createElement("span");
let postStorage = [];

// ****** INITAL POST-FETCHING *******
// fetches all the post from dummyjson and dynamically creates new elements in which to display them
// only pulls 30 posts but that seems to be by default, as I understand it I can fetch all the posts by putting limit=0 in the fetch url
fetch("https://dummyjson.com/posts?select=title,reactions,body,tags")
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

      reactionContainer = document.createElement("div");
      reactionContainer.classList.add("reaction-container");

      postReactions = document.createElement("span");
      postReactions.classList.add("post-reactions");

      likeBtn = document.createElement("button");
      likeBtn.addEventListener("click", likes);
      likeBtn.classList.add("btn");
      likeBtn.classList.add("like-btn");      

      let postLikeIcon = document.createElement("i");
      postLikeIcon.classList.add("fa-regular");
      postLikeIcon.classList.add("fa-heart");
      likeBtn.append(postLikeIcon);
      reactionContainer.append(postReactions, likeBtn);

      // store the post in the postStorage array and then stores that in the local storage
      postStorage.push(post.posts[i]);
      localStorage.setItem("posts", JSON.stringify(postStorage));
      // putting the correct data into the correct element
      postTitle.innerText = post.posts[i].title;
      postText.innerText = post.posts[i].body;
      postTags.innerText = post.posts[i].tags;
      postReactions.innerText = post.posts[i].reactions;
      // appends the title, tags, reactions and actual text to its own container that is then appended to the main container for the posts
      postContainer.append(postTitle, postTags, reactionContainer, postText);
      mainContainer[0].append(postContainer);
    }
  });
// ****** EVENTS *******
// opens the modal
btnOpenModal.addEventListener("click", openModal);
// closes the modal
btnCloseModal.addEventListener("click", closeModal);
//creates a new post using the createPost function
btnCreatePost[0].addEventListener("click", createPost);

console.log(JSON.parse(localStorage.getItem("posts")));

// ****** FUNCTIONS *******
// might be a bit overkill to make these functions, but makes them easier to reuse down the line I suppose
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}
function likes(e) {
  let element = e.currentTarget.parentElement.querySelector(".post-reactions");
  counter =
    e.currentTarget.parentElement.querySelector(".post-reactions").innerText;
  counter++;
  element.innerText = counter;
} // I think this works? huge shoutout to john smilgas project tutorials.
//  Now there is no cap so the user can just give a post likes to their hearts content and the same user can like however many times they want too, but still.

// reads info from the input fields in the modal and then creates a new post and adds it to the end of the other posts.
function createPost() {
  postContainer = document.createElement("article");
  postContainer.classList.add("post-container");

  let inputTitle = document.getElementById("post-title");
  let inputTags = document.getElementById("post-tags");
  let inputText = document.getElementById("post-text");

  let postTitle = document.createElement("h3");
  postTitle.classList.add("post-title");

  let postText = document.createElement("p");
  postText.classList.add("post-text");

  let postTags = document.createElement("span");
  postTags.classList.add("post-tags");

  reactionContainer = document.createElement("div");
  reactionContainer.classList.add("reaction-container");

  let postReactions = document.createElement("span");
  postReactions.classList.add("post-reactions");

  likeBtn = document.createElement("button");
  likeBtn.addEventListener("click", likes);
  likeBtn.classList.add("btn");
  likeBtn.classList.add("like-btn");

  

  let postLikeIcon = document.createElement("i"); // this doesnt work on the post that the user can create by themselves,
  // for some reason it selects only the main ones in the fetch
  // my assumption is that it still points to the last created post during the fetch and doesnt change that when a user creates a new post
  // maybe because the fetched posts are created on load, but the create post button doesnt create a new post untill the user clicks it, for some reason it doesn't point to the user generated post after this?
  // think I found the issue, the newly created post was not created properly, it was getting created into the same container as the last fetched post so it naturally pointed towards the containers button
  // however now when I click the button it gives me an error main.js:83 Uncaught TypeError: Cannot read properties of null (reading 'innerText') but this was solved by a fixing a misstake on line 129 where I had put the value of postReactions to 0 instead of just the innertext
  postLikeIcon.classList.add("fa-regular");
  postLikeIcon.classList.add("fa-heart");
  likeBtn.append(postLikeIcon);
  reactionContainer.append(postReactions, likeBtn);

  // creates a object with the post info for storing in the localstorage
  const userPost = {
    title: inputTitle.value,
    body: inputText.value,
    tags: inputTags.value,
    reactions: 0,
  };

  // add the newly created userpost to the postStorage array and adds the array to the localstorage again
  postStorage.push(userPost);
  localStorage.setItem("posts", JSON.stringify(postStorage));

  postTitle.innerText = inputTitle.value;
  postText.innerText = inputText.value;
  postTags.innerText = inputTags.value;
  postReactions.innerText = 0;

  postContainer.append(postTitle, postTags, reactionContainer, postText);
  mainContainer[0].append(postContainer);

  closeModal();
}

// what I have so far: I'm fetching the posts from dummyjson and storing them locally. User created posts are also stored locally and added to the same key as the fetched posts.
// on a reload however it fetches all the posts again and overwrites what exists in the localstorage.
// presumably I have to do an if statemnet when the page loads that checks wheter or not there is any data in the localstorage and if there is load that instead of the fetch
// and the lasty I suppose I have to make sure the posts get saved again if I press the reaction button possibly in the likes function?

// passande commits har jag försökt göra från början så förhoppningsvis är det steget klart av VG kraven
