document.addEventListener("DOMContentLoaded", function(event) {

  function GameOfLife(boardWidth, boardHeight){
        this.width = boardWidth;
        this.height = boardHeight;
        board = document.querySelector('#board');
        this.cells = [];
        futureLook = [];
        console.log(board);
  }

GameOfLife.prototype.createBoard = function(){


    board.style.width = this.width * 10 + "px";         // 10 to szerokość diva zmienić później by łapało wymiary diva z automatu
    board.style.height = this.height * 10 + "px" ;         // 10 to wysokość diva, nie zlapie diva bo go jeszcze nie ma :(

    numbersOfElements = this.width * this.height;

    for( var i=0; i < numbersOfElements; i++){

        var newDiv = document.createElement('div');

        board.appendChild(newDiv);
    }

    this.cells = document.querySelectorAll('#board div');       // spróbować wypchnąc do tablicy by przy dwóch grach nie sumowało divów
    console.log(this.cells);

    for (var i=0; i< this.cells.length; i++){

        this.cells[i].addEventListener('mouseover', function () {

            this.classList.toggle('live');
        })
    }
}

   GameOfLife.prototype.findIndex = function(x,y){              // nie używam tej funkcji póki co do niczego, była wymieniona w zadaniu

        indeks = x + y * this.width;

        return indeks;

    };

    GameOfLife.prototype.setCellState = function(x,y, state){

        indeks = x + y * this.width;

        if(indeks > numbersOfElements){
            alert("nie ma takiego elementu");
        }

        if(this.cells[indeks] !== 'live'){
            this.cells[indeks].classList.add('live');
        }
        else{
            this.cells[indeks].classList.remove('live');
        }

    }

    GameOfLife.prototype.firstGlider = function(){

        this.setCellState(1,0,'live');
        this.setCellState(1,1,'live');
        this.setCellState(1,3,'live');
        this.setCellState(2,3,'live');
        this.setCellState(1,2,'live');
        this.setCellState(2,1,'live');
        this.setCellState(2,8,'live');
        this.setCellState(3,9,'live');


    }


    GameOfLife.prototype.computeCellNextState = function (x, y) {

        var liveElements = 0;
        //console.log(x,y);
        indeks = x + y * this.width;
        //console.log(indeks);


            if(y-1 >= 0){

                neightbourIndex1 = x + (y-1) * this.width;
            }
            else {
                neightbourIndex1 = false;
            }


            if(x+1 < this.width && y-1>=0){
            neightbourIndex3 = (x+1) + (y-1) * this.width;
            }
            else {
                neightbourIndex3 = false;
            }



            if(y+1 < this.height){
                neightbourIndex2 = x + (y+1) * this.width;
            }
            else {
                neightbourIndex2 = false;                           // nie moze byc 0, musi zwracać indeks martwego pola
            }

            if(y+1 < this.height && x+1< this.width){
                neightbourIndex4 = (x+1) + (y+1) * this.width;
            }
            else {
                neightbourIndex4 = false;
            }

            if(x+1 < this.width){                                   // nie działa dla ostatniego elementu

                neightbourIndex5 = (x+1) + y * this.width;
            }
            else if(x+1 == numbersOfElements-1) {
                neightbourIndex5 = false;
            }
            else {
                neightbourIndex5 = false;
            }

            if(x-1>=0){
                neightbourIndex6 = (x-1) + y * this.width;
            }
            else {
                neightbourIndex6 = false;
            }

            if(y+1 < this.height){
                neightbourIndex7= (x-1) + (y+1) * this.width;
            }
            else {
                neightbourIndex7 = false;
            }

            if(y-1 >= 0 && x-1 >= 0){
            neightbourIndex8= (x-1) + (y-1) * this.width;
            }
            else{
                neightbourIndex8 = false;
            }

      /*  console.log(this.cells[neightbourIndex1]);
        console.log(this.cells[neightbourIndex2]);
        console.log(this.cells[neightbourIndex3]);
        console.log(this.cells[neightbourIndex4]);
        console.log(this.cells[neightbourIndex5]);
        console.log(this.cells[neightbourIndex6]);
        console.log(this.cells[neightbourIndex7]);
        console.log(this.cells[neightbourIndex8]); */


        if( typeof neightbourIndex1 == 'number'){

            if(this.cells[neightbourIndex1].className == 'live'){

                liveElements = liveElements+1;
            }
        }

        if( typeof neightbourIndex2 == 'number') {
            if (this.cells[neightbourIndex2].className == 'live') {

                liveElements = liveElements + 1;
            }
        }


        if( typeof neightbourIndex3 == 'number') {
            if (this.cells[neightbourIndex3].className == 'live') {

                liveElements = liveElements + 1;
            }
        }

        if( typeof neightbourIndex4 == 'number') {
            if (this.cells[neightbourIndex4].className == 'live') {

                liveElements = liveElements + 1;
            }
        }


        if( typeof neightbourIndex5 == 'number') {
            if (this.cells[neightbourIndex5].className == 'live') {

                liveElements = liveElements + 1;
            }
        }


        if( typeof neightbourIndex6 == 'number') {
            if (this.cells[neightbourIndex6].className == 'live') {

                liveElements = liveElements + 1;
            }
        }

        if( typeof neightbourIndex7 == 'number') {
            if (this.cells[neightbourIndex7].className == 'live') {

                liveElements = liveElements + 1;
            }
        }

        if( typeof neightbourIndex8 == 'number') {
            if (this.cells[neightbourIndex8].className == 'live') {

                liveElements = liveElements + 1;
            }
        }
        //console.log(liveElements);

        if(this.cells[indeks].className == 'live'){

            if(liveElements === 2 || liveElements === 3){
                return 1;
            }

            if(liveElements < 2 || liveElements > 3){
                return 0;
            }
        }
        if(this.cells[indeks].className !== 'live') {

            if(liveElements === 3){
                return 1;
            }
            else {
                return 0;
            }
        }

    }

    GameOfLife.prototype.computeNextGeneration = function () {

            futureLook = [];

        for(var y=0; y < this.height; y++){

            for(var x=0; x < this.width; x++){

               futureLook += this.computeCellNextState(x,y);
            }
        }

         return futureLook;
    }


    GameOfLife.prototype.printNextGeneration = function () {            // coś się rusza jest chyba ok

        for( var i=0; i < futureLook.length; i++){

            //console.log(futureLook[i]);
            //console.log(this.cells[i]);

            if(futureLook[i] == 1){

                this.cells[i].classList.add('live');
            }
            else{

                this.cells[i].classList.remove('live');
            }
        }
    }

    var game;


    button = document.querySelector('button');

    button.addEventListener('click', function () {          // nie działa jeszcze jak należy, wymaga odświeżenia strony przy doborze danych tabeli
        var tableWidth = document.querySelector('.width');
        tableWidth = tableWidth.value;
        var tableHeight = document.querySelector('.height');
        tableHeight = tableHeight.value;
        game = new GameOfLife(tableWidth,tableHeight);
        game.createBoard();
        game.firstGlider();

    })


    //var game = new GameOfLife(a,30);
    //console.log(game);
    //game.createBoard();
    //game.setCellState(9,9,'live');
    //game.firstGlider();
    //console.log(game);
    //console.log(game.computeCellNextState(8,8));            // działa ok
    //game.computeNextGeneration();
    //game.printNextGeneration();
   // console.log(futureLook)




    var play = document.querySelector('#play');
    console.log(play);
    var pause = document.querySelector('#pause');
    console.log(pause);

    play.addEventListener('click', function(){

        var interval = setInterval(function () {


            game.computeNextGeneration();
            game.printNextGeneration();

        }, 100);

        pause.addEventListener('click', function () {

            clearInterval(interval);
        })

    });

});