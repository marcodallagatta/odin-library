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
	const imported = CSVToArray(goodreads);
	imported.forEach(i => {
	addBookToLibrary(new Book(
		i[0],
		i[1],
		i[5],
		i[2],
		i[3],
		i[4]));
});
renderBookshelf();
}