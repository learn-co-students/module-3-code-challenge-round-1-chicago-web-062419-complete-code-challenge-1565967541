document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3256

  const imageURL =  `https://randopic.herokuapp.com/images/3256`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCard = document.getElementById("image_card")

  const myImage = {"id": 1,
  "url": "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
  "name": "The Internet!",
  "like_count": 0,
  "comments": [
    {
      "id": 5941,
      "content": "first comment!",
      "image_id": 1158,
      "created_at": "2018-10-18T17:06:14.859Z",
      "updated_at": "2018-10-18T17:06:14.859Z"}
  ]}

//FETCH IMAGE
  fetch(`https://randopic.herokuapp.com/images/3256`)
  .then(response => response.json())
  .then(data => printPhoto())


function printPhoto(image){

  image.className = "card col-md-4"
  image id = ${`image.id`}
  image_card.innerHTML += `
  <div id= ${image.id}>
    <h4> name: ${image.name}</h4>
    <img src="${image.url}" width="333" height="500">
    <span>${}</p>
    <likes = "${image.like_count}"
    <comment = "${image.comments}"
  </div>`

  imageCard.appendChild(image)

  let likeButton = li.getElementById('like_button')

  likeButton.addEventListener('submit', (event) => addLike(event, quote))
  submitButton.addEventListener('submit', (event) => submitComment)

  card.appendChild(image)

})


//Likes Function 
function addALike(photo){
fetch(imageURL), {
  method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
        body: JSON.stringify({
            likes: ++photo.likes
        })
      })
      .then(res => res.json())
      .then(photo => {
        span.innerText = `${photo.likes}`
      })
    }

//Submit Comment Function 
function createAComment(comment){
  fetch(commentURL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
      body: JSON.stringify({
        
      })
  }
}

