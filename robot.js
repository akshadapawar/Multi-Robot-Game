/*// function that builds a grid in the "container"*/
var robotPosition = new Array;
//var robot1Position = new Array;
var Wallarray = new Array;
var Coinarray = new Array;
var z;
var a;

function Gridcreate(x,y) {
  for (var rows = 0; rows < x; rows++) {
    for (var columns = 0; columns < y; columns++) {
      var isRobot = 0;
      var isWall = 0;
      var isCoin = 0;
      for (var robot = 0; robot < robotPosition.length; robot++) {
        if(rows == robotPosition[robot][1] && columns == robotPosition[robot][0]) {
          // if(robotPosition[robot][1] >= 4 && robotPosition[robot][0] >=4){
          $("#container").append("<div class='grid2'></div>");
          $(".grid2").width(480/x);
          $(".grid2").height(480/y);
          isRobot = 1;
          //   }
        }}
      if(isRobot==0){
        for (var wall = 0; wall < Wallarray.length; wall++) {
          if(rows == Wallarray[wall][1] && columns == Wallarray[wall][0]) {
            $("#container").append("<div class='wall'></div>");
            $(".wall").width(480/x);
            $(".wall").height(480/y);
            isWall = 1;
          }
        }
      }
      if(isRobot==0 && isWall==0){
        for (var coin = 0; coin < Coinarray.length; coin++) {
          if(rows == Coinarray[coin][1] && columns == Coinarray[coin][0]) {
            $("#container").append("<div class='coin'></div>");
            $(".coin").width(480/x);
            $(".coin").height(480/y);
            isCoin = 1;
          }
        }
      }

      if(isRobot == 0 && isWall == 0 && isCoin == 0) {
        $("#container").append("<div class='grid1'></div>");
        $(".grid1").width(480/x);
        $(".grid1").height(480/y);
      }
    };
  };
};



// function that clears the grid
function clearGrid(){
  $(".grid1").remove();
  $(".grid2").remove();
  $(".wall").remove();
  $(".coin").remove();
}; 

// function that prompts the user to select the number of boxes in a new grid
// the function then also creates that new grid
function refreshGrid(){
  /*z = prompt("How many rows u want?");*/
  /*a = prompt("How many coloumn u want?");*/

  clearGrid();
  Gridcreate(z,a);
};

function isNextWall(){
  for (var w = 0 ; w < Wallarray.length ;w++){
    for (var robot = 0 ; robot < robotPosition.length ;robot++){
      if(Wallarray[w][0] == robotPosition[robot][0] && Wallarray[w][1] == robotPosition[robot][1]){
        console.log("Cell ("+Wallarray[w][1]+","+Wallarray[w][0]+") is Bolcked");
        return 1;
      }
    }
  }
  return 0;
}


function pickCoinAction(){
  for (var c = 0 ; c < Coinarray.length ;c++){
    for (var robot = 0 ; robot < robotPosition.length ;robot++){
      if(Coinarray[c][0] == robotPosition[robot][0] && Coinarray[c][1] == robotPosition[robot][1]){
        if(Coinarray[c][2] > 0){
          Coinarray[c][2] = Coinarray[c][2] - 1;
          robotPosition[robot][2] = robotPosition[robot][2] + 1;
          console.log("Cell ("+Coinarray[c][1]+","+Coinarray[c][0]+") has"+Coinarray[c][2]+" Coins");
          console.log("Robot" +r+ "has "+robotPosition[robot][2]+" Coins");
        }
        else
          console.log("Cell ("+Coinarray[c][1]+","+Coinarray[c][0]+") has no Coins");
      }
    }
  }
}

function dropCoinAction(){
  for (var rows = 0; rows < z; rows++) {
    for (var columns = 0; columns < z; columns++) {
      for (var robot = 0 ; robot < robotPosition.length ;robot++){
        if(robotPosition[robot][0] == columns && robotPosition[robot][1] == rows){
          if(robotPosition[robot][2] > 0){
            robotPosition[robot][2] = robotPosition[robot][2] -1;
            var temp = new Array;
            temp.push(columns);
            temp.push(rows);
            temp.push(1);
            Coinarray.push(temp);
            return;
          }
          else
            console.log("Robot  has 0  Coins");
        }
      }
    }
  }
}


function robot_action(action,robot){
  console.log(action);
  clearGrid();
  var x = robotPosition[robot][0];
  var y = robotPosition[robot][1];
  var flag1=0;
  if(action.localeCompare("Moveleft")==0) {
    robotPosition[robot][0] = robotPosition[robot][0] - 1;
    flag1=1;
  }
  else if(action.localeCompare("Moveright")==0){
    robotPosition[robot][0] = robotPosition[robot][0] + 1;
    flag1=1;
  }
  else if(action.localeCompare("MoveUp")==0) {
    robotPosition[robot][1] = robotPosition[robot][1] - 1;
    flag1=1;
  }
  else if (action.localeCompare("MoveDown")==0) {
    robotPosition[robot][1] = robotPosition[robot][1] + 1;
    flag1=1;
  }
  else if (action.localeCompare("Pick")==0) {
    pickCoinAction();
  }
  else if (action.localeCompare("Drop")==0) {
    dropCoinAction();
  }
  /* else if (action.localeCompare("isNextBlock")==0) {
     isNextblock();
     }*/


  var flag=isNextWall();
  /*for(var robot=0; robot < robotPosition.length ; robot++)
    {*/
  if((robotPosition[robot][0] < 0 || robotPosition[robot][0] > z) && (robotPosition[robot][1] < 0 || robotPosition[robot][1] > z) || (flag==1)) {
    robotPosition[robot][0] = x;
    robotPosition[robot][1] = y;
    Gridcreate(z,a);
  }
  else{
    Gridcreate(z,a);
  }
  //}
}


function read_file_content(){
  for (robot = 0;robot < robotPosition.length ;robot++)
  {
    read_file_content1(robot);
  }
}

function read_file_content1(robot){
  refreshGrid();

  /*console.log("Robot - ");
    for (var i = 0;i < robotPosition.length ;i++)
    console.log(robotPosition[i]);
    console.log("Wall - ");
    for (var i = 0;i < Wallarray.length ;i++)
    console.log(Wallarray[i]);
    console.log("Coin - ");
    for (var i = 0;i < Coinarray.length ;i++)
    console.log(Coinarray[i]);
    */
  var file = document.getElementById("get_file").files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    var temp = evt.target.result
      var allLines = temp.split(/\r\n|\n/);

    count = 1;
    var loop = setInterval(function() {
      if(count >= allLines.length ) {
        clearInterval(loop);
        return;
      }
      robot_action(allLines[count-1] ,robot);
      count += 1;
    },997);

  }
}


function putIntoArray(line ,List){
  for(var ele = 1 ;ele < line.length ;ele++){
    var temp = [];
    var array = line[ele].split(',');

    for(var k = 0 ; k < array.length ;k++) 
      temp.push(parseInt(array[k]));
    if(temp.length > 1)
      List.push(temp);
  }
}

function read_Grid_file_content(){
  var file = document.getElementById("grid_file").files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");

  reader.onload = function (evt) {
    var temp = evt.target.result
      var grid = temp.split(/\r\n|\n/);

    for(var i=0 ;i < grid.length ;i++) {   
      var line = grid[i].split(' ');
      if("robotPosition".localeCompare(line[0])==0) 
        putIntoArray(line ,robotPosition);
      else if("Wallarray".localeCompare(line[0])==0) 
        putIntoArray(line ,Wallarray);
      else if("Coinarray".localeCompare(line[0])==0) 
        putIntoArray(line ,Coinarray);
      else if("gridsize".localeCompare(line[0])==0){
        z = line[2];
        a = line[1];
      } 
    }
  }
}
