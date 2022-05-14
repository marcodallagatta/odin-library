({plugins:['jsdom-quokka-plugin']})

// TODO
// the script, once the initialization is done, only affect the array
// and not the objects themselves, 'cheating' the assignment?

// DOM Elements
const bookshelf = document.getElementById('bookshelf');
const newBookButton = document.getElementById('newBook');

// Library Management
let myLibrary = [];
let idInteger = 0;


class Book {
	constructor (title, author, read = false, rating = 0) {
		this.id = idInteger++;
		this.title = title;
		this.author = author;
		this.read = read;
		this.rating = rating;
	}
	print() {
		console.log(`ID ${this.id}: ${this.title} by ${this.author}, rated ${this.rating}, read: ${this.read}`);
	};
	toggleRead() {
		if (this.read === false) {
			this.read = true;
		} else {
			this.read = false;
		}
		renderBookshelf();
	}
	removeBook(id) {
		myLibrary.splice(id, 1);
		renderBookshelf();
	}
}

function addBookToLibrary(book) {
	myLibrary.push(book);
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
	addBookToLibrary(new Book(title, author, read, rating));
}

// Sample Data
function addSampleData() {
	addBookToLibrary(new Book('The Hobbit', 'Tolkien', false));
	addBookToLibrary(new Book('Steppenwolf', 'H. Hesse', true, 3));
	addBookToLibrary(new Book('The Way of Kings', 'Sandor Branderson', true, 5));
	addBookToLibrary(new Book('The Graveyard Book', 'Neil Gaiman', true, 5));
	renderBookshelf();
}


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
		book.id = book[0];
		let row = bookshelf.insertRow(-1);
		let cellA = row.insertCell(0);
		let cellB = row.insertCell(1);
		let cellC = row.insertCell(2);
		let cellD = row.insertCell(3);
		let cellE = row.insertCell(4);
		cellA.innerHTML = book.id;
		cellB.innerHTML = `<span onclick='myLibrary[${book.id}].removeBook()'>x</span> ${book.title}`;
		cellC.innerHTML = book.author;
		cellD.innerHTML = `<span onclick='myLibrary[${book.id}].toggleRead()'>${book.read}</span>`;
		cellE.innerHTML = makeRatingStars(book.rating);
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