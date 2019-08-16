document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3262 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(resp => resp.json())
  .then(data => {
    loadImage(data)

    const likeBtn = document.getElementById('like_button')
    likeBtn.addEventListener('click', (event) => addLikes(data))
    

    const sub = document.getElementById('comment_form')
    sub.addEventListener('submit', (event) => addComments(event, data))

  })

})

     const img = document.getElementById('image');
     const name = document.getElementById('name');
     const like = document.getElementById('likes');
     const coms = document.getElementById('comments');

function loadImage(elem){
     
     img.src = elem.url
     name.innerText = elem.name
     like.innerText = elem.like_count
     elem.comments.forEach(item => {
       const com = document.createElement('li')
       com.innerText = item.content
       coms.appendChild(com)
     })
    }


    function addLikes(param){
      
      fetch(`https://randopic.herokuapp.com/likes/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: param.id
        })
      })
      .then(resp => resp.json())
      
    }


    

    function addComments(event, item){
      event.preventDefault()
      let cont = document.getElementById('comment_input')

      fetch(`https://randopic.herokuapp.com/comments/`, {

         method: 'POST',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: item.id,
          content: cont.value
        })
      })
      .then(resp => resp.json())

    }


