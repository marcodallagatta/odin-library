({
	plugins: ['jsdom-quokka-plugin'],
 })

 // TODO
 // linea 76, se elimino index, poi quella riga non e' piu in sync con il resto e li elimina a caso

// DOM Elements
const bookshelf = document.getElementById('bookshelf');
const newBookButton = document.getElementById('newBook');

// Library Management
let myLibrary = [];
let bookIndex = 0;

function Book (objName = null, title, author, read = false, rating = 0) {
	this.objName = formatName(title);
	this.title = title;
	this.author = author;
	this.read = read;
	this.rating = rating;
	this.index = bookIndex++;
}

function addBookToLibrary(book) {
	let currentBook = [
		book.index,
		book.objName,
		book.title,
		book.author,
		book.read,
		book.rating];
	myLibrary.push(currentBook);
}

// makes 'The Hobbit' > 'Thehobbit'
function formatName(name) {
	return name.charAt(0).toUpperCase() + name.replace(/\s/g, '').toLowerCase().slice(1);
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
	console.log(newBook);
	addBookToLibrary(newBook);
}

function toggleRead(title, id) {
	if (title.read === false) {
		title.read = true;
		myLibrary[id][4] = true;
	} else {
		title.read = false;
		myLibrary[id][4] = false;
	}
	renderBookshelf();
}

function removeBook(title, id) {
	// title = null;
	myLibrary.splice(id, 1);
	console.log(myLibrary);
	renderBookshelf();
}

// Sample Data
const Thehobbit = new Book(formatName('The Hobbit'), 'The Hobbit', 'Tolkien', false);
const Steppenwolf = new Book(formatName('Steppenwolf'), 'Steppenwolf', 'H. Hesse', true, 3);
const Thewayofkings = new Book(formatName('The Way of Kings'), 'The Way of Kings', 'Sandor Branderson', true, 5);
const Thegraveyardbook = new Book(formatName('The Graveyard Book'), 'The Graveyard Book', 'Neil Gaiman', true, 5);
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
	myLibrary.forEach((book) => {
		let row = bookshelf.insertRow(-1);
		let cellA = row.insertCell(0);
		let cellB = row.insertCell(1);
		let cellC = row.insertCell(2);
		let cellD = row.insertCell(3);
		cellA.innerHTML = `<span onclick='removeBook(${book[1]}, ${book[0]})'>x</span> ${book[2]}`;
		cellB.innerHTML = book[3];
		cellC.innerHTML = `<span onclick='toggleRead(${book[1]}, ${book[0]})'>${book[4]}</span>`;
		cellD.innerHTML = makeRatingStars(book[5]); // Read
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