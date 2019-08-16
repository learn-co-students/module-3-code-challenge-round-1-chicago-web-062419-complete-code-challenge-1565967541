// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
// *** Used defer instead***


  let imageId = 3258 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  
  let imageCard = document.getElementById('image_card')
  let imageContainer = document.getElementById('image')
  let imageName = document.getElementById('name')
  let likesContainer = document.getElementById('likes')
  let likeButton = document.getElementById('like_button')
  let commentForm = document.getElementById('comment_form')
  let commentInput = document.getElementById('comment_input')
  let commentsContainer = document.getElementById('comments')


  const fetchImage = () => {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image))
}

const renderImage = (image) => {
  imageContainer.src = image.url 
  imageLi = document.createElement('li')
  imageName.innerText = image.name 
  likesContainer.innerHTML = image.like_count
  let commentLi = document.createElement('ul')
  let imageComments = image.comments.forEach(function(comment) {
    commentsContainer.innerHTML = comment.content
  })
  commentLi.append(imageComments)
  commentsContainer.append(commentLi);
}

likeButton.addEventListener('click', (event) => {
  event.preventDefault()
  fetch(`https://randopic.herokuapp.com/likes/${imageId}`, {
    method: “POST”,
    headers: {
    “content-type”: “application/json”,
    “Accept”: “application/json”
   },
    body: JSON.stringify({
    likes: image.like_count++
      })
    })
  .then(res => res.json())
  .then(image => {
  likesContainer.innerText = `${image.like_count} `
  })
  })









  fetchImage();

