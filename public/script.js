const button = document.getElementById('btn');
const itemName = document.getElementById('item-name');

button.addEventListener('click', (e) => {
    itemName.innerText += '🔥';
})