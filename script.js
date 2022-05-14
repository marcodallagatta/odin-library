({plugins:['jsdom-quokka-plugin']})

// DOM Elements
const bookshelf = document.getElementById('bookshelf');
const newBookButton = document.getElementById('newBook');

// Library Management
let myLibrary = [];
let idInteger = 0;

function Book (title, author, read = false, rating = 0) {
	this.id = idInteger++;
	this.title = title;
	this.author = author;
	this.read = read;
	this.rating = rating;
}

function addBookToLibrary(book) {
	let currentBook = [
		book.id, // should be the same as myLibrary[id][...]
		book.title,
		book.author,
		book.read,
		book.rating];
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
	let rating = prompt('Rating from 1 to 5:');
	const newBook = new Book(title, author, read, rating);
	addBookToLibrary(newBook);
}

function toggleRead(id) {
	if (myLibrary[id][3] === false) {
		myLibrary[id][3] = true;
	} else {
		myLibrary[id][3] = false;
	}
	renderBookshelf();
}

function removeBook(id) {
	myLibrary.splice(id, 1);
	renderBookshelf();
}

// Sample Data
const Thehobbit = new Book('The Hobbit', 'Tolkien', false);
const Steppenwolf = new Book('Steppenwolf', 'H. Hesse', true, 3);
const Thewayofkings = new Book('The Way of Kings', 'Sandor Branderson', true, 5);
const Thegraveyardbook = new Book('The Graveyard Book', 'Neil Gaiman', true, 5);
addBookToLibrary(Thehobbit);
addBookToLibrary(Steppenwolf);
addBookToLibrary(Thewayofkings);
addBookToLibrary(Thegraveyardbook);


// DOM Bookshelf
function renderBookshelf() {
	// clear bookshelf, unless header
	document.querySelectorAll('tr').forEach((i) => {
		if (i.id  != 'header') {
			i.remove()
		}
	})
	let bookIndex = 0;
	myLibrary.forEach(book => {
		book[0] = bookIndex++;
		let row = bookshelf.insertRow(-1);
		let cellA = row.insertCell(0);
		let cellB = row.insertCell(1);
		let cellC = row.insertCell(2);
		let cellD = row.insertCell(3);
		let cellE = row.insertCell(4);
		cellA.innerHTML = book[0];
		cellB.innerHTML = `<span onclick='removeBook(${book[0]})'>x</span> ${book[1]}`;
		cellC.innerHTML = book[2];
		cellD.innerHTML = `<span onclick='toggleRead(${book[0]})'>${book[3]}</span>`;
		cellE.innerHTML = makeRatingStars(book[4]);
	})
}
renderBookshelf();

function makeRatingStars(howMany) {
	let output = '';
	for (let i = 0; i < howMany; i++) {
		output += '★';
	}
	while (output.length < 5) {
		output += '☆';
	}
	return output;
}

// Event Listeners
newBookButton.addEventListener('click', function() {
	newBook();
	renderBookshelf();
});