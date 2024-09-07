// Функція для створення елемента списку <li> і додавання його до батьківського елемента

// Функція для створення елемента списку <li> і додавання його до батьківського елемента
function liCreator(key, value, parent) {
    // Створюємо новий елемент списку <li>
    const li = document.createElement('li');

    // Заповнюємо його вміст, де ключ відображається жирним шрифтом (<b>), а значення йде після нього
    li.innerHTML = `<b>${key}:</b> ${value}`;

    // Додаємо новий <li> елемент до батьківського елемента
    parent.appendChild(li);
}

// Функція для рекурсивного обходу об'єкта і побудови елементів списку
function recursiveBuild(object, parent) {
    // Перебираємо всі ключі в об'єкті
    for (const key in object) {
        // Якщо значення за цим ключем є об'єктом (включно з масивом), будуємо підсписок
        typeof object[key] === 'object'
            ? ulBuilder(key, object[key], parent)  // Викликаємо ulBuilder для побудови вкладеного списку
            : liCreator(key, object[key], parent)  // Якщо значення не є об'єктом, створюємо простий <li> з ключем і значенням
    }
}

// Функція для створення елемента <li> з підсписком <ul> для вкладених об'єктів
function ulBuilder(key, object, parent) {
    // Створюємо новий елемент списку <li>
    const li = document.createElement('li');

    // Створюємо новий підсписок <ul>
    const ul = document.createElement('ul');

    // Вставляємо ключ у <li>. Якщо це масив, додаємо 1 до індексу (щоб відображалось як 1, 2, 3 і т.д.)
    li.innerHTML = `<b>${+key || +key === 0 ? (+key + 1) : key}:</b>`;

    // Додаємо <li> до батьківського елемента
    parent.appendChild(li);

    // Додаємо новий підсписок <ul> до <li>
    li.appendChild(ul);

    // Рекурсивно будуємо внутрішню структуру об'єкта
    recursiveBuild(object, ul);
}