// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.


const userId = new URL(location.href).searchParams.get('userId');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
        console.log(user) // Перевірка

        //Формуємо структуру юзера
        const block = document.getElementsByClassName('wrap')[0];
        const ul = document.createElement('div');

        ul.classList.add("info_user");
        ul.innerHTML = `<h1>Info about ${user.name} :</h1>`

        recursiveBuild(user, ul);

        block.appendChild(ul);

        //Формуємо кнопку
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add("buttonContainer");
        block.appendChild(buttonContainer);
        const button = document.createElement('button');
        buttonContainer.append(button);
        button.innerText = 'Post of current user';

        //Формуємо структуру постів при натисканні на кнопку
        button.onclick = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then((res) => res.json())
                .then((posts => {
                    console.log(posts)// Перевірка

                    //Формуємо структуру постів
                    const pos = document.getElementsByClassName('wrap')[0];
                    const ul = document.createElement('ul');
                    ul.classList.add("posts__list");
                    pos.appendChild(ul);
                    const container = document.createElement('div');
                    container.classList.add('container');
                    recursiveBuild(posts, ul);

                    //Ітеруємо і додаємо пости
                    const children = [...ul.children]
                    for (let i = 0; i < children.length; i++) {
                        const item = children[i];
                        const button = document.createElement('button');
                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add("buttonContainer");
                        button.innerText = 'Post';
                        item.appendChild(buttonContainer);
                        buttonContainer.append(button);
                        button.addEventListener("click", function() {
                            location.href = `post-details.html?postId=${posts[i].id}`;
                        })

                    }

                }))
            // Деактивуємо кнопку
            button.setAttribute('disabled', true)
        }

    });
