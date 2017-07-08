var scl = 20;
var snake;
var food;


function startGame(){
  console.log("comehere");
  snake = new Snake(1);
  food  = new Food();
}

function setup() {
  createCanvas(scl * 26, scl * 26);
  lifePo = createP();
  lifePo.html("POINTS");
  lifeP = createP();
  lifeP.html(0);
}


function draw() {
  background(51);
  if(snake){
    frameRate(constrain(snake.level * 6, 10, 40));
    snake.eat(food);
    snake.move();
    snake.die();
    snake.draw();
    food.draw();
  }else{
    frameRate(10);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }
}

function cols() {
  return floor(width / scl);
}

function rows() {
  return floor(height / scl);
}

function randomVector() {
  return createVector(floor(random(cols())), floor(random(rows())));
}

$(document).ready(function(){
  var play_button = document.getElementById("play_button");
  if(play_button){
  play_button.addEventListener('click',function(event){
      startGame();
      $('.container').slideUp();
  });
}
});