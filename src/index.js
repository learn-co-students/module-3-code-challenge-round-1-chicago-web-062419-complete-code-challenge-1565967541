let imageId = 3253 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.getElementById("image_card")
const imageSrc = imageCard.querySelector("#image")
const likeButton = document.getElementById("like_button")
const commentForm = document.getElementById("comment_form")
const ulComments = document.getElementById("comments")
const commentInput = document.getElementById("comment_input")
const likeSpan = document.getElementById("likes")
const titleOfImage = document.getElementById("name")

const fetchData = () => {
  fetch(imageURL).then(r => r.json())
  .then(data => {
    renderImageCard(data)
    // renderComments(data.comments)
    data.comments.forEach(comment => {
      renderComment(comment)
    })
  })
}

const renderImageCard = (image) => {
  imageSrc.src = image.url
  titleOfImage.innerText = image.name
  likeSpan.innerText = image.like_count
}

// const renderComments = (comments) => {
//   comments.forEach(comment => {
//     renderComment(comment)
//   })
// }

const renderComment = (comment) => {
  let liComment = document.createElement("li")
  liComment.innerHTML = `<li id="cmt${comment.id}">${comment.content}<button id="dlt${comment.id}" style="background-color: red; color: white" onclick="deleteComment()">Delete</button></li>`
  ulComments.append(liComment)
}

const likeImage = () => {
  likeSpan.innerText++
  fetch(likeURL, {
    method: "POST",
    headers: { "content-type": "application/json", "accept": "application/json" },
    body: JSON.stringify({ image_id: imageId })
  })
}

const submitComment = () => {
  event.preventDefault()
  if (commentInput.value) {
    fetch(commentsURL, {
    method: "POST",
    headers: { "content-type": "application/json", "accept": "application/json" },
    body: JSON.stringify({ image_id: imageId, content: commentInput.value })
    })
    .then(r => r.json())
    .then(comment => {
      renderComment(comment)
      commentInput.value = ''
    })
  }
}
const deleteComment = () => {
  let deleteID = event.target.id.slice(3)
  let deletedcomment = document.getElementById("cmt"+deleteID)
  fetch(commentsURL+deleteID, {method: "DELETE"})
  deletedcomment.parentNode.remove()

}
// likeButton.addEventListener('click', likeImage) //onclick in HTML
commentForm.addEventListener('submit', submitComment)

const init = () => {
  fetchData()
}
init()