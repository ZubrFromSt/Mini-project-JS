// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

// Отримуємо postId з параметра URL
const postId = new URL(location.href).searchParams.get('postId');

console.log(postId); // Перевірка отриманого postId у консолі

// Виконуємо запит для отримання інформації про конкретний пост
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.json()) // Перетворюємо відповідь у формат JSON
    .then((post) => {
        console.log(post); // Перевірка отриманих даних про пост у консолі

        // Створюємо блок для відображення інформації про пост
        const block = document.getElementsByClassName('user')[0]; // Отримуємо блок, куди буде додано інформацію
        const ul = document.createElement('ul'); // Створюємо список <ul> для відображення даних поста
        ul.classList.add("comments__list"); // Додаємо клас для стилізації списку

        // Викликаємо функцію recursiveBuild для побудови структури даних поста
        recursiveBuild(post, ul);

        // Додаємо сформований список на сторінку
        block.appendChild(ul);
    });

// Виконуємо запит для отримання коментарів до поста
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.json()) // Перетворюємо відповідь у формат JSON
    .then((comments) => { // Працюємо з отриманим масивом коментарів
        console.log(comments); // Перевірка отриманих коментарів у консолі

        // Створюємо блок для відображення коментарів
        const block = document.getElementsByClassName('wrap')[0]; // Отримуємо блок, куди будуть додані коментарі
        const ul = document.createElement('ul'); // Створюємо список <ul> для відображення коментарів
        ul.classList.add("comments__list"); // Додаємо клас для стилізації списку

        // Викликаємо функцію recursiveBuild для побудови структури коментарів
        recursiveBuild(comments, ul);

        // Додаємо сформований список коментарів на сторінку
        block.appendChild(ul);
    });
