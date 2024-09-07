// В index.html
// 1 отримати масив об'єктів з endpoint а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
//котра має детальну інфорацію про об'єкт на який клікнули

// Виконуємо запит до API за списком користувачів
fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json()) // Перетворюємо відповідь у формат JSON
    .then((users) => { // Працюємо з отриманим масивом користувачів

        // Отримуємо контейнер, куди будемо додавати елементи
        const container = document.getElementsByClassName('container')[0];

        // Створюємо два нові блоки <div> для користувачів з різними умовами
        const block_1 = document.createElement('div');
        const block_2 = document.createElement('div');

        // Додаємо відповідні CSS класи для цих блоків
        block_1.classList.add("block_1");
        block_2.classList.add("block_2");

        // Додаємо ці блоки до контейнера на сторінці
        container.appendChild(block_1);
        container.appendChild(block_2);

        // Перебираємо кожного користувача у масиві
        for (const user of users) {

            // Створюємо новий блок для кожного користувача
            const user_block = document.createElement('div');

            // Додаємо CSS клас для блоку користувача
            user_block.classList.add("user-block");

            // Встановлюємо текст для блоку, де відображається ID і ім'я користувача
            user_block.innerText = `${user.id}: ${user.name}`;

            // Якщо ID користувача непарне
            if (user.id % 2 !== 0) {

                // Додаємо блок користувача до першого блоку
                block_1.appendChild(user_block);

                // Створюємо кнопку для отримання інформації про користувача
                const button = document.createElement('button');
                button.innerText = 'Info'; // Встановлюємо текст кнопки
                user_block.appendChild(button); // Додаємо кнопку до блоку користувача

                // Додаємо подію при кліку на кнопку — перенаправлення на сторінку з деталями користувача
                button.onclick = () => {
                    location.href = `user-details.html?userId=${user.id}`;
                }

                // Якщо ID користувача парне
            } else if (user.id % 2 !== 1) {

                // Додаємо блок користувача до другого блоку
                block_2.appendChild(user_block);

                // Створюємо кнопку для отримання інформації про користувача
                const button = document.createElement('button');
                button.innerText = 'Info'; // Встановлюємо текст кнопки
                user_block.appendChild(button); // Додаємо кнопку до блоку користувача

                // Додаємо подію при кліку на кнопку — перенаправлення на сторінку з деталями користувача
                button.onclick = () => {
                    location.href = `user-details.html?userId=${user.id}`;
                }
            }
        }
    })

// Отримуємо елемент з класом 'media'
let media = document.getElementsByClassName('media')[0];

// Отримуємо елемент з класом 'animation'
let animation = document.getElementsByClassName('animation')[0];

// Додаємо подію при кліку на елемент 'media'
media.onclick = () => {
    // Якщо анімація прихована, показуємо її
    if (animation.style.display === 'none') {
        animation.style.display = 'block';
        // Якщо анімація показана, приховуємо її
    } else {
        animation.style.display = 'none';
    }
}