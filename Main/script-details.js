// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


// Отримуємо userId з параметра URL
const userId = new URL(location.href).searchParams.get('userId');

// Виконуємо запит для отримання інформації про конкретного користувача
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json()) // Перетворюємо відповідь у формат JSON
    .then((user) => {
        console.log(user); // Перевірка отриманих даних про користувача в консолі

        // Формуємо структуру для відображення інформації про користувача
        const block = document.getElementsByClassName('wrap')[0]; // Отримуємо головний блок на сторінці
        const ul = document.createElement('div'); // Створюємо новий контейнер <div> для інформації про користувача

        ul.classList.add("info_user"); // Додаємо клас для стилізації
        ul.innerHTML = `<h1>Info about ${user.name} :</h1>`; // Додаємо заголовок з іменем користувача

        // Викликаємо функцію recursiveBuild для побудови списку властивостей користувача
        recursiveBuild(user, ul);

        // Додаємо сформовану структуру на сторінку
        block.appendChild(ul);

        // Створюємо кнопку для отримання постів користувача
        const buttonContainer = document.createElement('div'); // Створюємо контейнер для кнопки
        buttonContainer.classList.add("buttonContainer"); // Додаємо клас для стилізації
        block.appendChild(buttonContainer); // Додаємо контейнер до основного блоку
        const button = document.createElement('button'); // Створюємо кнопку
        buttonContainer.append(button); // Додаємо кнопку до контейнера
        button.innerText = 'Post of current user'; // Встановлюємо текст кнопки

        // Додаємо обробник події при натисканні на кнопку
        button.onclick = () => {
            // Виконуємо запит для отримання постів користувача
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then((res) => res.json()) // Перетворюємо відповідь у формат JSON
                .then((posts) => {
                    console.log(posts); // Перевірка отриманих даних про пости в консолі

                    // Формуємо структуру для відображення постів
                    const pos = document.getElementsByClassName('wrap')[0]; // Отримуємо головний блок
                    const ul = document.createElement('ul'); // Створюємо список <ul> для постів
                    ul.classList.add("posts__list"); // Додаємо клас для стилізації
                    pos.appendChild(ul); // Додаємо список до основного блоку

                    // Викликаємо функцію recursiveBuild для побудови структури постів
                    recursiveBuild(posts, ul);

                    // Ітеруємо по кожному елементу списку постів
                    const children = [...ul.children]; // Отримуємо всі дочірні елементи <li>
                    for (let i = 0; i < children.length; i++) {
                        const item = children[i]; // Поточний елемент списку
                        const button = document.createElement('button'); // Створюємо кнопку для поста
                        const buttonContainer = document.createElement('div'); // Створюємо контейнер для кнопки
                        buttonContainer.classList.add("buttonContainer"); // Додаємо клас для стилізації
                        button.innerText = 'Post'; // Встановлюємо текст кнопки
                        item.appendChild(buttonContainer); // Додаємо контейнер до поточного елемента списку
                        buttonContainer.append(button); // Додаємо кнопку до контейнера

                        // Додаємо подію для кнопки, що перенаправляє на сторінку з деталями поста
                        button.addEventListener("click", function() {
                            location.href = `post-details.html?postId=${posts[i].id}`;
                        });
                    }
                });

            // Деактивуємо кнопку після першого натискання
            button.setAttribute('disabled', true);
        };
    });
