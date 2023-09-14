function getPostById(postId) {
    return new Promise((resolve, reject) => {
        if (postId < 1 || postId > 100) {
            alert("Невірний ідентифікатор. Введіть число від 1 до 100.");
        } else {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(post => resolve(post))
            .catch(error => reject(error));
        }
    });
}

function displayPost(post) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <button  class="button-class" onclick="getComments(${post.id})">ОТРИМАТИ КОМЕНТАРІ</button>
    `;

    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
}

function getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => displayComments(comments))
        .catch(error => console.error('Помилка під час отримання коментарів:', error));
}

function displayComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
        <h3>${comment.name}</h3>
        <p>${comment.body}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

    function areCommentsVisible(postId) {
    const commentsContainer = document.getElementById('comments-container');
    return commentsContainer.dataset.postId === postId;
}

function toggleComments(postId) {
    if (areCommentsVisible(postId)) {
        commentsContainer.innerHTML = '';
        commentsContainer.dataset.postId = ''; 
    } else {
        getComments(postId);
        commentsContainer.dataset.postId = postId; 
    }
}

function searchPost() {
    const postId = document.getElementById('post-id').value;
    getPostById(postId)
        .then(post => displayPost(post))
        .catch(error => console.error('Помилка під час отримання посту:', error));
}