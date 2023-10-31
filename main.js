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

/* function getPost() {
    fetch('https://dummyjson.com/posts/')
    .then(res => res.json())
    .then(post => {
        let mainContainer = document.getElementsByClassName("main-content")
        let postContainer = document.createElement("article");

        let postTitle = document.createElement("h3")
        let postText = document.createElement("p")
        let postTags = document.createElement("span")
        
        postTitle.innerText = post.posts[0].title;
        postText.innerText = post.posts[0].body;
        postTags.innerText = post.posts[0].tags;

        postContainer.append(postTitle, postTags, postText);
        mainContainer[0].append(postContainer);
      
    });
}
 */
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
// sparar denna här utifall något går fel
/* function getPost() {
    fetch('https://dummyjson.com/posts/1')
    .then(res => res.json())
    .then(post => {
        let postTitle = document.getElementsByClassName("post-title");
        let postText = document.getElementsByClassName("post-text");
        let postTags = document.getElementsByClassName("post-tags")
    
    
        postTitle[0].innerText = post.title;
        postText[0].innerText = post.body;
        postTags[0].innerText = post.tags;
      
    });
} */
