({
	plugins: ['jsdom-quokka-plugin'],
 })

const bookshelf = document.getElementById('bookshelf');

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

const Hobbit = new Book('The Hobbit', 'Tolkien', false);
const Steppen = new Book('Steppenwolf', 'H. Hesse', true);

addBookToLibrary(Hobbit);
addBookToLibrary(Steppen);

console.log(myLibrary);

function showBooks() {
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

showBooks();