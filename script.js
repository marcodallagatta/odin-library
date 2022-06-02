({plugins:['jsdom-quokka-plugin']})

// DOM Elements
const bookshelf = document.querySelector('.bookshelf');
const newBookButton = document.getElementById('newBook');

// Library Management
let myLibrary = [];
idInteger = 0;


function Book (title, author, read = false, rating = 0, pages = 0, pubYear = 0) {
	this.id = idInteger++;
	this.title = title;
	this.author = author;
	this.read = read;
	this.rating = rating;
	this.pages = pages;
	this.pubYear = pubYear;
	this.toggleRead = function() {
		if (this.read === false) {
			this.read = true;
		} else {
			this.read = false;
		}
		renderBookshelf();
	}
	this.removeBook = function () {
		myLibrary.splice(this.id, 1);
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

function clearBookshelf() {
	myLibrary = [];
	bookshelf.innerHTML = '';
	renderBookshelf();
}


// DOM Bookshelf
function renderBookshelf() {
	myLibrary.forEach(book => {
		let bookDiv = document.createElement('div');
		bookDiv.classList.add('book');
		const randomColor1 = Please.make_color({format: 'hsv'});
		const randomColor2 = Please.make_scheme(
																					{
																						h: randomColor1[0].h,
																						s: randomColor1[0].s,
																						v: randomColor1[0].v
																					});
		bookDiv.style.backgroundColor = `hsl(${Math.floor(randomColor1[0].h)}, ${randomColor1[0].s*100}%, ${randomColor1[0].v*100}%)`;
		console.log(randomColor2[1]);
		bookDiv.style.borderLeft = "15px solid " + randomColor2[1];
		bookDiv.innerHTML = `<h3>${book.title}</h3><h4>${book.author}</h4>`;
		bookshelf.appendChild(bookDiv);
	})
}
addSampleData();
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