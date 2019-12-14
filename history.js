//var currentdate = new Date($.now());
//  var d=(currentdate.getDate()+"-"+(currentdate.getMonth() + 1)+"-"+currentdate.getFullYear()+" "+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds());

// //console.log(oldobj)

//  var winnerObj={winner:val,datetime:d};	
// var oldobj=localStorage.winnerRecords+winnerObj;
// console.dir(oldobj)			

// winArray.push(winnerObj);				
// console.dir(winArray)	//to put the key value pair in the array
//localStorage.winnerRecords=JSON.stringify(winArray);	//to convert that array into string

// var table=document.getElementById("table_history");		
// var row=table.insertRow();
// var winnerCell=row.insertCell(0);
// var datetimeCell=row.insertCell(1);

// $(row).css({"border": "1px solid white",
// "background": "rgba(129, 123, 123, 0.37)"});

// winnerCell.innerHTML=" Player "+val;
// datetimeCell.innerHTML=d;


// function draw_Table_cell(val,d){		//to insert a data in table format

// var table=document.getElementById("table_history");		
// var row=table.insertRow();
// var winnerCell=row.insertCell(0);
// var datetimeCell=row.insertCell(1);

// $(row).css({"border": "1px solid white",
// "background": "rgba(129, 123, 123, 0.37)"});

// winnerCell.innerHTML=" Player "+val;
// datetimeCell.innerHTML=d;
// clearHistory();
// }

function draw_Table_cell(val,d){		//to insert a data in table format

var table=document.getElementById("table_history");		
var row=table.insertRow();
var winnerCell=row.insertCell(0);
var datetimeCell=row.insertCell(1);

$(row).css({"border": "1px solid white",
"background": "rgba(129, 123, 123, 0.37)"});

winnerCell.innerHTML=" Player "+val;
datetimeCell.innerHTML=d;
clearHistory();
}

function init(){     //for displaying all the prevous data in the local storage during loading of the page

	var table=document.getElementById("table_history");
var jqTable = $('#table_history');

	console.log("table -- js", table);

console.log("table -- jquery", jqTable);

	var row=table.insertRow();
	var winnerCell=row.insertCell(0);
	var datetimeCell=row.insertCell(1);

	if(localStorage.winnerRecords==null){
		table.innerHTML="<tr><td>No data</td></tr>"
	}
	else if(localStorage.winnerRecords){					//to store the data retrieved from localstorage to an 	array
		winArray2=JSON.parse(localStorage.winnerRecords);

		for(var i=0; i<winArray2.length; i++){				//to fetch the winner and date and time
			var winner=winArray2[i].winner;
			var DateTime=winArray2[i].datetime;
			
			$(row).css({"border": "1px solid white",
			"background": "rgba(129, 123, 123, 0.37)"});

			winnerCell.innerHTML=" Player "+winner;				//to display the value
			datetimeCell.innerHTML=DateTime;
		}
	}
}
function clearHistory(){		//to clear the history
	$(".clear_history").click(function(){
		if (localStorage.winnerRecords) {
		localStorage.clear();
    var table = document.getElementById("table_history");
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {	//to delete the table rows

        table.deleteRow(i);
        rowCount--;
        i--;
    }

	table.innerHTML="<tr><td>History is deleted successfully</td></tr>"
	}
					
  });	
}	

$(document).ready(function () {
init();
clearHistory();
});