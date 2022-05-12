({
	plugins: ['jsdom-quokka-plugin'],
 })

// DOM Elements
const bookshelf = document.getElementById('bookshelf');
const newBookButton = document.getElementById('newBook');

// Library Management
let myLibrary = [];

function Book (name, author, read) {
	this.name = name;
	this.author = author;
	this.read = read;
}

function addBookToLibrary(book) {
	let currentBook = [book.name, book.author, book.read];
	myLibrary.push(currentBook);
}

function newBook() {
	let title = prompt('Title:');
	let author = prompt('Author:');
	let read = prompt('Have you finished it? (Y/N)');
	if (read.toLowerCase() === 'y') {
		read = true;
	 } else {
		read = false;
	}
	const newBook = new Book(title, author, read);
	addBookToLibrary(newBook);
}

// Sample Data
const Hobbit = new Book('The Hobbit', 'Tolkien', false);
const Steppen = new Book('Steppenwolf', 'H. Hesse', true);
addBookToLibrary(Hobbit);
addBookToLibrary(Steppen);

// DOM Bookshelf
function renderBookshelf() {
	// clear bookshelf, unless header
	document.querySelectorAll('tr').forEach((i) => {
		if (i.id  != 'header') {
			i.remove()
		}
	})
	myLibrary.forEach((book) => {
		let row = bookshelf.insertRow(-1);
		let cellA = row.insertCell(0);
		let cellB = row.insertCell(1);
		let cellC = row.insertCell(2);
		cellA.innerText = book[0];
		cellB.innerText = book[1];
		cellC.innerText = book[2];
	})
}
renderBookshelf();

// Event Listeners
newBookButton.addEventListener('click', function() {
	newBook();
	renderBookshelf();
});