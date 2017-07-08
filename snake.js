function Snake(level) {
  this.level = level;

  this.resetSnake = function() {
    this.x = cols()/2 * scl;
    this.y = rows()/2 * scl;
    this.xspeed = -1;
    this.yspeed = 0;
    this.tail = [];
    this.points = 0;
    this.level = 1;
  };

  this.dir = function(x, y) {
    // do not allow snake to go backwards
    if (x != 0 && this.xspeed != x * (-1)
        || y != 0 && this.yspeed != y * (-1)) {
      this.xspeed = x;
      this.yspeed = y;
    }
  }

  this.levelUp = function() {
    this.level = floor(this.points / 10) + 1;
    console.log("level " + this.level);
  }

  this.eat = function(food) {
    // head is on top of food?
    if (this.x === food.x() && this.y === food.y()) {
      food.eaten();
      this.points++;
      this.tail.push(createVector(this.x, this.y));
      this.levelUp();
      lifeP.html(this.points);
      console.log(this.points + " points");
    }
  }

  this.die = function() {
    // snake bit his own body?
    var isDead = this.tail.some((square) => {
      return square.x === this.x && square.y === this.y;
    });

    if (isDead) {
      lifeP.html(0);
      this.resetSnake();
    }
  }

  this.move = function() {
    // put last square of tail in front of the line
    if (this.tail.length > 0) {
      var tipOfTail = this.tail.pop();
      tipOfTail.x = this.x;
      tipOfTail.y = this.y;
      this.tail.unshift(tipOfTail);
    }

    // move head
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    // wrap around right and bottom edges
    this.x %= width;
    this.y %= height;

    // wrap around left and top edges
    if (this.x < 0) {
      this.x = width - scl;
    }
    if (this.y < 0) {
      this.y = height - scl;
    }
  }

  this.draw = function() {
    // sets the 'brush' color
    fill(200);

    // draws the head
    rect(this.x, this.y, scl, scl);

    // draws the tail
    for(var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }

  this.resetSnake();
}
