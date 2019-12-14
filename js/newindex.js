let flag = 0;				//for offsetting
let winner=0;


function clr()   //to clear all the content
{
	$(".table").find("td").empty();
	flag=0;
	winner=0;
	a=0,b=0,c=0
	$(this).removeClass("X");
	$(this).removeClass("Y");
	$("hr").css({"display":"none"});
}

function reset(){
	$("table").find("td").empty();
	flag=0;
	winner=0;
	a=0,b=0,c=0
	$(".X").removeClass("X");
	$(".Y").removeClass("Y");
	$("hr").css({"display":"none"});
}

function tie()   //to show for tie
{
	if(($('.X').length + $('.O').length===9 )&& winner==0) {
		setTimeout(function(){
		alert("Match Tied\n Press OK to Start again");
			},200);
			winner=0;
	}
			
}
function draw(a,b,c,val){//to check who won and to draw a line across it
	if($('#'+a).hasClass(val) && $('#'+b).hasClass(val) && $('#'+c).hasClass(val))
		{
			$("#"+a+"-"+c+"").css({"display":"block"});
			setTimeout(function(){alert("Congrats Player : "+val+"\nYou won the match");
		},200);
			setcontent_details(val);
			winner=1;
		}
	
}


function combinations(val, id){  //combination for checking the winner;
   		let ide=parseInt(id);
    switch (ide){
		case 0 :   draw(0,1,2, val);
				   draw(0,4,8, val);
				   draw(0,3,6, val);
				   break;
		case 1 : 
				  draw(1,4,7, val);
				  draw(0,1,2, val);
		          break;
		case 2 : 
				  draw(0,1,2, val);
				  draw(2,5,8, val);
				  draw(2,4,6, val);
				  break;

		case 3 : 
				  draw(3,4,5, val);
				  draw(0,3,6, val);
				  break;
		case 4 : 
				  draw(1,4,7, val);
				  draw(3,4,5, val);
				  draw(0,4,8, val);
				  draw(2,4,6, val);
		          break;
		case 5 : 
				  draw(2,5,8, val);
				  draw(3,4,5, val);
					break;
		case 6 : 
				  draw(0,3,6, val);
				  draw(6,7,8, val);
				  draw(2,4,6, val);
				  break;
		case 7 : 
				  draw(1,4,7, val);
				  draw(6,7,8, val);
				  break;
		case 8 : 
				  draw(6,7,8, val);
				  draw(2,5,8, val);
				  draw(0,4,8, val);
				  break;
	}
 };

function checkwin(val, id){    //to check for the winner usng the combinations
if(flag>=4)  
	{

		combinations(val, id);
	}
}

function nav(){

	$(".navopen").click(function(){			//for navigation bar
	$(".sidenav").toggleClass("opennav");
	$(".overlay").css({"display":"block"});
});
	
$(".overlay").click(function(){				//for overlay
	 $(".overlay").css({"display":"none"});
	 $(".sidenav").removeClass("opennav");
});

$("#reset").click(function(){		//for reset button
	reset();

});
}

function setcontent_details(val){			//to set the content in the local storage

if ("play" in localStorage) {
    var retrievedData1 = localStorage.getItem("play");
var retrievedData2 = localStorage.getItem("tnd");
var winner = JSON.parse(retrievedData1);
var time = JSON.parse(retrievedData2);
winner.push('player '+val);
var dt = new Date();
var ti = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
time.push(""+ti);
localStorage.setItem("play", JSON.stringify(winner));
localStorage.setItem("tnd", JSON.stringify(time));

} else {
play=[];
tnd=[];
play.push('player '+val);
var dt = new Date();
var ti = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
tnd.push(""+ti);
localStorage.setItem("play", JSON.stringify(play));
localStorage.setItem("tnd", JSON.stringify(tnd));

}

  }

function result_table(){
	 var table = document.getElementById("table_history");
	if ("play" in localStorage) {
var retrievedData1 = localStorage.getItem("play");
var retrievedData2 = localStorage.getItem("tnd");
var winner = JSON.parse(retrievedData1);
var time = JSON.parse(retrievedData2);
             var n = winner.length;
             var i;
             for(i=0;i<n;i++){
               document.write("<tr><td>"+winner[i]+"</td><td>"+time[i]+"</td></tr>");
             }
             $("tr").css({"border": "1px solid white","background": "rgba(129, 123, 123, 0.37)"});
}
else
{
	table.innerHTML="<tr><td>No data to show</td></tr>";
}
}

function clearHistory(){		//to clear the history
	$(".clear_history").click(function(){
		console.log("clear")
		 var table = document.getElementById("table_history");
		if ((localStorage.getItem("play") && localStorage.getItem("tnd"))!=null) {
		localStorage.clear();
   
    var rowCount = table.rows.length;

    for (var i = 0; i < rowCount; i++) {	//to delete the table rows

        table.deleteRow(i);
        rowCount--;
        i--;
    }

	table.innerHTML="<tr><td>History is deleted successfully</td></tr>";
	}
	else
	{
		table.innerHTML="<tr><td>No data to clear</td></tr>";
	}
});
}

$(document).ready(function () {

	$('td').click(function(){ 
	   //to put the element in the slots
		var elem = $(this);
		var id = elem.attr('id');
		
		
		if( elem.text()=="" && winner==0){
			if(flag%2==0){

				elem.text('X');
				elem.addClass('X');

				checkwin("X", id);
				
			}
			else{
				elem.text('O')	;
				elem.addClass('O');
				checkwin("O", id);
			
			}
				flag++;

			
		}else{
			clr();
		} 
		tie();
	});
	nav();
	// init();
	 clearHistory();
});
