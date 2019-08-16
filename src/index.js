//GLOBAL VARIABLES
let imageId = 3257 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/3257`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.getElementById("image-card")
const image = document.getElementById("image")
const imageName = document.getElementById("name")
const imageLikes = document.getElementById("likes")
const likeButton = document.getElementById("like_button")
const form = document.getElementById("comment_form")
const formInput = document.getElementById("comment_input")
const commentBox = document.getElementById("comments")

//READ

//GET IMAGE FROM URL SOURCE
const fetchImage = () => {
  fetch("https://randopic.herokuapp.com/images/3257")
  .then(res => res.json())
  // .then(console.log)
  .then(image => setCard(image))
}

//CREATE AND SET IMAGE CONTAINTER USING RETURN DATA FROM API
const setCard = (imageFrom) => {
  image.src = imageFrom.url
  imageName.innerText = imageFrom.name 
  imageLikes.innerText = `${imageFrom.like_count} likes`
  likeButton.addEventListener("click", () => addLike(event, imageFrom.id))
  form.addEventListener("submit", () => addComment(event, imageFrom.id, formInput.value))
  imageFrom.comments.forEach(comment => {
    createComment(comment.content, comment.id)
  })
}

//CREATE AND SET COMMENT CONTAINER USING RETURN DATA FROM API
const createComment = (comment, id) => {
  li = document.createElement("li")
  li.innerText = comment
  li.id = `comment ${id}`
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete"
  deleteButton.addEventListener("click", () => deleteComment(event.target.parentNode.id.split(" ")[1]))
  li.appendChild(deleteButton)
  commentBox.appendChild(li)
}

//UPDATE/CREATE

//OPTIMISTIC RENDER ON LIKE COUNT AND CALL FETCH REQUEST TO CREATE LIKE OBJECT
const addLike = (event, id) => {
  let count = imageLikes.innerText.split(" ")[0]
  imageLikes.innerText = `${++count} likes`
  likeFetch()
}

//LIKE FETCH REQUEST
const likeFetch = () => {
  fetch("https://randopic.herokuapp.com/likes/", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

//CREATE

//PREVENT SUBMIT ACTION AND CALL FETCH REQUEST TO CREATE COMMENT OBJECT
const addComment = (event, id, comment) => {
  event.preventDefault()
  commentFetch(comment)
}

//SEND COMMENT FETCH AND RENDER COMMENTS USING PREVIOUS BUILD COMMENT METHOD
const commentFetch = (comment) => {
  fetch(commentsURL, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_id: imageId,
    content: comment
    })
  })
.then(res => res.json())
.then(comment => createComment(comment.content, comment.id))
}

//DELETE

//CALLS DELETE FETCH AND DELETE LINE METHODS USING LINE ID PASSED IN
const deleteComment = (id) => {
  fetchDelete(id)
  deleteLine(id)
}

//SENDS FETCH DELETE REQUEST TO THE SPECIFIC COMMENT URL
const fetchDelete = (id) => {
  fetch(commentsURL + id, {
  method: "DELETE"
  })
}

//FINDS THE COMMENTS THAT HAS THIS ID AND REMOVES ITS HTML ELEMENT
const deleteLine = (id) => {
  let li = document.getElementById(`comment ${id}`)
  li.remove()
}

//METHOD CALLS
fetchImage()