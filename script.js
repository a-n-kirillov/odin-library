let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype = {
    info: function() {
        const readString = this.read ? 'already read' : 'not read yet'
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    }
}

const addButton = document.querySelector("#add-button");
addButton.addEventListener('click', addBookToLibrary);

const exampleBook1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const exampleBook2 = new Book("Chyłka", "Mróz", 311, false);

console.log(exampleBook1.info());
console.log(exampleBook2.info());

function addBookToLibrary(e) {
    const nameInputField = document.querySelector('#name');
    const authorInputField = document.querySelector('#author');
    const pagesInputField = document.querySelector('#pages');
    const readCheckboxButton = document.querySelector('#read');
    
    const titleCell = document.createElement('td');
    const authorCell = document.createElement('td');
    const pagesCell = document.createElement('td');
    const readCell = document.createElement('td');

    title = nameInputField.value;
    author = authorInputField.value;
    pages = pagesInputField.value;
    read = readCheckboxButton.checked ? '✓' : '✗';

    titleCell.innerText = title;
    authorCell.innerText = author;
    pagesCell.innerText = pages;
    readCell.innerText = read;

    const inputAsBookObject = new Book(title, author, pages, read);
    myLibrary.push(inputAsBookObject);

    const libraryDisplayTable = document.querySelector(".library table");
    const newRow = document.createElement('tr');
    newRow.setAttribute("data", `${myLibrary.length - 1}`);

    newRow.appendChild(titleCell);
    newRow.appendChild(authorCell);
    newRow.appendChild(pagesCell);
    newRow.appendChild(readCell);
    libraryDisplayTable.appendChild(newRow);
    addUtilityButtons();
}

function addUtilityButtons() {
    const lastTableRow = document.querySelector('.library table > tr:last-child');

    const cellContainerRead = document.createElement('td');
    const cellContainerRemove = document.createElement('td');

    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.classList.add('read');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');

    cellContainerRead.appendChild(readButton);
    cellContainerRemove.appendChild(removeButton);

    lastTableRow.appendChild(cellContainerRead);
    lastTableRow.appendChild(cellContainerRemove);

    removeButton.addEventListener('click', removeBook);
    readButton.addEventListener('click', changeReadStatus);
}

function removeBook(e) {
    const targetedRow = e.target.parentNode.parentNode;
    const libraryDisplayTable = e.target.parentNode.parentNode.parentNode;
    const targetedBookIndex = targetedRow.getAttribute('data');

    libraryDisplayTable.removeChild(targetedRow);
    myLibrary.splice(targetedBookIndex, 1);

    // adjust other books index
    const bookRows = document.querySelectorAll('.library table > tr');
    bookRows.forEach(bookRow => {
        if (bookRow.getAttribute("data") > targetedBookIndex) {
            bookRow.setAttribute('data', bookRow.getAttribute("data") - 1);
        }
    });
}

function changeReadStatus(e) {
    const targetedRow = e.target.parentNode.parentNode;
    const libraryDisplayTable = e.target.parentNode.parentNode.parentNode;
    const targetedBookIndex = targetedRow.getAttribute('data');

    const newReadStatus = myLibrary[targetedBookIndex].read === '✓' ? '✗' : '✓';
    myLibrary[targetedBookIndex].read = newReadStatus;

    for (cell of targetedRow.children) {
        if (['✓', '✗'].includes(cell.textContent)) {
            cell.textContent = newReadStatus;
        }
    }
}