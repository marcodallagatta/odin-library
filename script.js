({plugins:['jsdom-quokka-plugin']})

// TODO
// add book cover
// add sorting
// add modal to show details and review

// DOM Elements
const bookshelf = document.querySelector('.bookshelf');

// Library Management
let myLibrary = [];
idInteger = 0;


function Book (title, author, ISBN13 = '', rating = 0, pages = '', yearPublished, ogYearPublished, exclusiveShelf = false, review = '') {
	this.id = idInteger++;
	this.title = title;
	this.author = author;
	this.isbn = ISBN13;
	this.rating = rating;
	this.pages = pages;
	this.yearPublished = isNaN(ogYearPublished) ? yearPublished: ogYearPublished;
	this.read = (exclusiveShelf === 'read') ? true : false;
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
	renderBookshelf();
	renderBookshelf();
	renderBookshelf();
	renderBookshelf();
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

// book cover https://www.googleapis.com/books/v1/volumes?q=isbn:9780062407801


// fetch(googleApiUrl)
// 	.then(response => response.json())
// 	.then(data => coverArt = data.items[0].volumeInfo.imageLinks.smallThumbnail)
	// .then(data => console.log(data.items[0].volumeInfo.imageLinks.smallThumbnail));
// const coverArt = data.items[0].volumeInfo.imageLinks.smallThumbnail;
// console.log(coverArt);

// function fetchCoverArt(isbn) {
// 	const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.replace(/[="]/g,'')}`;
// 	console.log(googleApiUrl);
//   fetch(googleApiUrl)
// 			.then((res) => res.json())
//    	  .then(output => {return output.items[0].volumeInfo.imageLinks.smallThumbnail;}
// 	);
// }



function renderBookshelf() {
	bookshelf.innerHTML = '';
	myLibrary.forEach(book => {
		let bookDiv = document.createElement('div');
		bookDiv.classList.add('book');

		// if (book.isbn.includes('9')) {
		// 	bookDiv.style.backgroundImage = `url("${fetchCoverArt(book.isbn)}")`;
		// } else {
			const randomColor1 = Please.make_color({format: 'hsv'});
			const randomColor2 = Please.make_scheme({h: randomColor1[0].h, s: randomColor1[0].s, v: randomColor1[0].v});
			bookDiv.style.borderLeft = "15px solid " + randomColor2[1];
			bookDiv.style.backgroundColor = `hsl(${Math.floor(randomColor1[0].h)}, ${randomColor1[0].s*100}%, ${randomColor1[0].v*100}%)`;
		// }
		bookDiv.innerHTML = `<h3>${book.title}</h3><h4>${book.author}</h4>`;
		bookshelf.appendChild(bookDiv);
	})
}
addMarcoData();
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