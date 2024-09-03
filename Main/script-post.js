// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const postId = new URL(location.href).searchParams.get('postId');

console.log(postId);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.json())
    .then((post) => {
            console.log(post)
            const block = document.getElementsByClassName('user')[0];
            const ul = document.createElement('ul')
            ul.classList.add("comments__list")
            recursiveBuild(post, ul);
            block.appendChild(ul);
    });


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((post) => {
        console.log(post)
        const block = document.getElementsByClassName('wrap')[0];
        const ul = document.createElement('ul')
        ul.classList.add("comments__list")
        recursiveBuild(post, ul);
        block.appendChild(ul);
    });
