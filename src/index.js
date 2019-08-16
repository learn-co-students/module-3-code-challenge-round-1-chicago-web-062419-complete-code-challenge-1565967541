console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

//All variables/constants
let imageId = 3251 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.getElementById("image_card")
const img = document.getElementById("image")
let imageTitle = document.getElementById("name")
const likes = document.getElementById("likes")
const likeButton = document.getElementById("like_button")
const commentContainer = document.getElementById("comments")
const commentForm = document.getElementById("comment_form")

//Event listeners
//----------------------------------------------
//Front end 'like' feature
likeButton.addEventListener("click",()=> {
  event.preventDefault()
  likes.innerHTML = ++likes.innerHTML
  like()
})

//event listener for submit button
commentForm.addEventListener("submit",()=>{
  event.preventDefault()
  let commentInput = document.getElementById("comment_input")
  postComment(commentInput)
  commentInput.value = ""
})
//----------------------------------------------

//Initial Fetch Image and set Title
const renderpic = () =>{
  fetch(imageURL)
    .then(res=> res.json())
    .then(image => {
      img.src = image.url
      imageTitle.innerHTML = image.name
      imageTitle.style.textAlign = "center"
      likes.innerHTML = image.like_count
      
      renderComments(image.comments)
      })
}

//backend like feature using optimistic rendering
const like = ()=>{
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      image_id: imageId
    })
  })
}

//front end get all comments
const renderComments = (comments)=>{
  comments.forEach(comment =>{
    let li = document.createElement("li")
    li.innerHTML = comment.content
    let deleteButton = document.createElement("button")

    deleteButton.innerHTML = "Delete"
    li.appendChild(deleteButton)
    li.id = comment.id
    commentContainer.appendChild(li)
    deleteListener(deleteButton)
  })
}


//make a new comment pessimistically
const createNewComment = (comment)=>{
  let li = document.createElement("li")
  li.innerHTML = comment.content
  let deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Delete"
  li.id = comment.id
  li.appendChild(deleteButton)
  commentContainer.appendChild(li)
  deleteListener(deleteButton)
}


//new comment feature (backend) using pessimistic rendering
const postComment = (commentInput)=>{
  fetch(commentsURL,{
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body:JSON.stringify({
      image_id: imageId,
      content: commentInput.value
    })
  })
  .then(res => res.json())
  .then(comment => {createNewComment(comment)})
}

//listen for delete button click
const deleteListener = (deleteButton)=>{
  let commentID = deleteButton.parentNode.id
  deleteButton.addEventListener("click", ()=>{
    fetch(commentsURL + "/" +  commentID,{
      method: "DELETE"
    })
    deleteButton.parentNode.remove()
  })
}

//render the pic and likes and comments
renderpic()

//background stylin
const background = document.querySelector("body")
background.style.backgroundColor = "#ffcccc";
img.style.border = "5px solid white"
img.style.borderRadius = "5%"
imageCard.style.border = "5px dotted black"
