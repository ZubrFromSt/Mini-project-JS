// Рекурсивна структура для побудови об'єктів масивів

function liCreator(key, value, parent) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${key}:</b> ${value}`;
    parent.appendChild(li);
}

function recursiveBuild(object, parent) {
    for (const key in object) {
        typeof object[key] === 'object'
            ? ulBuilder(key, object[key], parent)
            : liCreator(key, object[key], parent)
    }
}

function ulBuilder(key, object, parent) {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    li.innerHTML = `<b>${+key || +key === 0 ? (+key + 1) : key}:</b>`;
    parent.appendChild(li);
    li.appendChild(ul);
    recursiveBuild(object, ul);
}
