// https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
function CSVToArray (strData, strDelimiter){
	strDelimiter = (strDelimiter || ",");
	var objPattern = new RegExp(
		(	"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
			"([^\"\\" + strDelimiter + "\\r\\n]*))"),"gi");
	var arrData = [[]];
	var arrMatches = null;
	while (arrMatches = objPattern.exec( strData )){
		var strMatchedDelimiter = arrMatches[ 1 ];
		if (strMatchedDelimiter.length &&	(strMatchedDelimiter != strDelimiter)){			arrData.push( [] );	}
		if (arrMatches[ 2 ]){
			var strMatchedValue = arrMatches[ 2 ].replace(
				new RegExp( "\"\"", "g" ),"\"");
		} else { var strMatchedValue = arrMatches[ 3 ]; }
		arrData[ arrData.length - 1 ].push( strMatchedValue );
	}
	return( arrData );
}

function addMarcoData() {
	const imported = CSVToArray(goodreads).slice(1);
	imported.forEach(i => {
		if (i[18] === 'read') {
			const maxLength = 70;
			if (i[1].length > maxLength) {
				i[1] = i[1].slice(0,maxLength) + ' [...]';
			}

			addBookToLibrary(new Book(
				i[1],
				i[2],
				i[6],
				i[7],
				i[11],
				i[12],
				i[13],
				i[18],
				i[19]));
		}
	});
	renderBookshelf();
}

// GOODREADS EXPORT STRUCTURE
// 0 Book Id,
// 1 Title,
// 2 Author,
// 3 Author l-f,
// 4 Additional Authors,
// 5 ISBN,
// 6 ISBN13,
// 7 My Rating,
// 8 Average Rating,
// 9 Publisher,
// 10 Binding,
// 11 Number of Pages,
// 12 Year Published,
// 13 Original Publication Year,
// 14 Date Read,
// 15 Date Added,
// 16 Bookshelves,
// 17 Bookshelves with positions,
// 18 Exclusive Shelf,
// 19 My Review,
// 20 Spoiler,
// 21 Private Notes,
// 22 Read Count,
// 23 Recommended For,
// 24 Recommended By,
// 25 Owned Copies,
// 26 Original Purchase Date,
// 27 Original Purchase Location,
// 28 Condition,
// 29 Condition Description,
// 30 BCID