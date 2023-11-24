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

// ******* END OF DECLARATIONS********

// ******* INITAL POST FETCHING********
// this bit fetches the data from localStorage is there is anything otherwise it fetches the data fom dummyjson and dynamically creates the posts on the page.
if (JSON.parse(localStorage.getItem("posts"))) {
  getLocalData();
} else {
  getRemoteData();
}
// ******* END OF INITAL POST FETCHING********

// ****** EVENTS *******
// opens the modal
btnOpenModal.addEventListener("click", openModal);
// closes the modal
btnCloseModal.addEventListener("click", closeModal);
//creates a new post using the createPost function
btnCreatePost[0].addEventListener("click", createPost);

// ******* END OF EVENTS*******

// ****** FUNCTIONS *******
// open and close modal functions are only for adding or removeing the class from the modal to show/hide it. Might just bake these into the function/eventlistener above
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function likes(e) {
  // Shoutout ot Jonh Smilgas project tutorials for going through this type of selection.
  let element = e.currentTarget.parentElement.querySelector(".post-reactions");
  counter =
    e.currentTarget.parentElement.querySelector(".post-reactions").innerText;
  // selecting the parent element (post container) of the parent element(reaction container) to fetch the id from the data-id attribute.
  let idSelect = e.currentTarget.parentElement.parentElement.dataset.id;
  counter++;
  element.innerText = counter;
  // runs the editLikes function to update the value of reactions in the localstorage with the new value from counter after the user clicks the like button
  editLikes(idSelect, counter);
}
// reads info from the input fields in the modal and then creates a new post and adds it to the end of the other posts.
function createPost() {
  postContainer = document.createElement("article");
  postContainer.classList.add("post-container");
  // adding this to create an id for the new post that the user creates so I can use the ID later to select the correct post and update it's reactions value in the localstorage
  let attr = Date.now();
  postContainer.setAttribute("data-id", attr);

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

  let postLikeIcon = document.createElement("i");
  postLikeIcon.classList.add("fa-regular");
  postLikeIcon.classList.add("fa-heart");
  likeBtn.append(postLikeIcon);
  reactionContainer.append(postReactions, likeBtn);

  // creates a object with the post info for storing in the localstorage
  const userPost = {
    id: attr,
    title: inputTitle.value,
    body: inputText.value,
    tags: inputTags.value,
    reactions: 0,
  };

  // add the newly created userpost to the postStorage array and adds the array to the localstorage again
  postStorage.push(userPost);
  localStorage.setItem("posts", JSON.stringify(postStorage));
  // checks if there is any actual value to store, so the user can't create empty posts
  if (
    inputTitle.value === "" ||
    inputText.value === "" ||
    inputTags.value === ""
  ) {
    alert("Please enter some text!");
    console.log("runs");
  } else {
    postTitle.innerText = inputTitle.value;
    postText.innerText = inputText.value;
    postTags.innerText = inputTags.value;
    postReactions.innerText = 0;
    console.log(inputTitle.value);

    postContainer.append(postTitle, postTags, reactionContainer, postText);
    mainContainer[0].append(postContainer);

    // set the inputfields back empty if the user wants to create more posts, this way the old text won't still be there.
    inputTitle.value = "";
    inputTags.value = "";
    inputText.value = "";
    closeModal();
  }
}

// fetches the data from dummyjson and dynamically creates post with it
function getRemoteData() {
  // fetches all the post from dummyjson and dynamically creates new elements in which to display them
  // only pulls 30 posts but that seems to be by default, as I understand it I can fetch all the posts by putting limit=0 in the fetch url
  // this wont run if there already is some data in the localstorage

  fetch("https://dummyjson.com/posts?select=title,reactions,body,tags")
    .then((res) => res.json())
    .then((post) => {
      for (let i = 0; i < post.posts.length; i++) {
        // creating the elements for the content dynamically
        postContainer = document.createElement("article");
        // assigns the ID of the post to the data-id attribute to select the post later on so I can update the local storage
        let attr = post.posts[i].id;
        postContainer.setAttribute("data-id", attr);

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
}
// fetches the data from localstorage and dynamically creates post with it
function getLocalData() {
  postStorage = JSON.parse(localStorage.getItem("posts"));
  for (let i = 0; i < postStorage.length; i++) {
    // creating the elements for the content dynamically
    postContainer = document.createElement("article");
    postContainer.classList.add("post-container");
    // assigns the ID of the post to the data-id attribute to select the post later on so I can update the local storage
    let attr = postStorage[i].id;
    postContainer.setAttribute("data-id", attr);

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

    // putting the correct data into the correct element
    postTitle.innerText = postStorage[i].title;
    postText.innerText = postStorage[i].body;
    postTags.innerText = postStorage[i].tags;
    postReactions.innerText = postStorage[i].reactions;
    // appends the title, tags, reactions and actual text to its own container which in turn gets appended to the main container for the posts
    postContainer.append(postTitle, postTags, reactionContainer, postText);
    mainContainer[0].append(postContainer);
  }
}

function editLikes(id, value) {
  // fetch the localstorage data again to find the item that I want to edit.
  let items = JSON.parse(localStorage.getItem("posts"));
  // loop through the items (fetched from the localstorage) and find the item with the corresponding ID and update that objects reactions value with the value of counter.
  items = items.map(function (item) {
    // took me awhile to figure this out, had to add the parseint because it was trying to compare a string to a number, just having == might've worked as well?
    if (item.id === parseInt(id)) {
      item.reactions = value;
    }

    console.log(item);
    return item;
  });
  localStorage.setItem("posts", JSON.stringify(items));
}
// ***** TODO *******
// I belive that is pretty much it when it come to the required functionallity. The one thing I might want to change right now is the way I give the user created posts id
// it doesn't really add up with the other ID's at the moment, but functionally it's the same.
// came up with something else to add on the functionallity. Right now a user can create a post that is just empty. So I want to add in some form of error catching if the inputfields for the modal is empty it wont let the user create a post
// then is just styling left
