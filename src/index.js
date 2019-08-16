// document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3259 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

// })


const img = document.getElementById('image')
const imageName = document.getElementById('name')


const ulId = document.getElementById('comments')

const getImage = () => {
  fetch(imageURL)
    .then(res => res.json())
    .then(pic => {
      renderImage(pic)
      // renderComments(pic)
})
}



const renderImage = (pic) => {
  img.src = pic.url
  imageName.innerText = pic.name
  likes.innerText = pic.like_count
  const likeButton = document.getElementById('like_button')

  likeButton.addEventListener("click", (event) => {
/////////// OPTIMISTICALLY RENDERING LIKES ON DOM FIRST THEN FETCH POST ////////////
    const likes = document.getElementById('likes')
    likes.innerText = pic.like_count++

    fetch(likeURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
          image_id: imageId
      })
      })
      .then(res => res.json())
    })

    //////////RENDERING THE LIST OF COMMENTS /////////////

    let allComments = pic.comments

    allComments.forEach(comment => {
      const li = document.createElement('li')
      li.innerText = comment.content
      const deleteButton = document.createElement('button')
      deleteButton.innerText = "Delete"
      deleteButton.addEventListener("click", (event) => {
            fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
                method: "DELETE"
              })
              .then(event.target.parentNode.remove())
          })
          
      li.appendChild(deleteButton)
      
      ulId.appendChild(li)
    })
    

    ///////////ADDING A NEW COMMENT TO THE LIST/////////

    const form = document.getElementById('comment_form')
      form.addEventListener("submit", (event) => {
        event.preventDefault()
        const input = document.getElementById('comment_input')
        const li1 = document.createElement('li')
        li1.innerText = input.value
        ulId.appendChild(li1)
      

      fetch(commentsURL, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: input.value
        })
      })
      .then(res => res.json())
      .then(comment => {
        console.log(comment)
        input.innerText = ""})
    })

}




////////////// FUNCTION CALLS //////////////
getImage()





// const addComment = () => {
//   form.addEventListener("submit", (event) => {
//     event.preventDefault()
//     const input = document.getElementById('comment_input')

//     fetch(commentsURL, {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify({
//         content: input.value, 
//         image_id: imageId
//       })
//     })
//     .then(res => res.json())
//     .then(comment => renderComments(comment))
//   })
// } 



// addComment()





// const renderComments = (pic) => {
//   if (pic.comments.length = 1) {
//     const li = document.createElement('li')
//     li.innerText = pic.comments[0].content
//       ulId.appendChild(li)
//   } else {
//     pic.comments.forEach(comment => {
//       const li = document.createElement('li')
//       li.innerText = comments.content
//         ulId.appendChild(li)
//     })
//     }
// }