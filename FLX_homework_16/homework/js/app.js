/**
 * Task 1.
 * Polyfill for Object.assign().
 */

function assign(target, ...args) {
  if (!target || target === null) {
    return console.error('Type error of converting target object');
  }

  let output = Object(target);

  for (let i = 0; i < args.length; i++) {
    if (args[i]) {
      for (let key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          output[key] = args[i][key];
        }
      }
    }
  }

  return output;
}

/**
 * Task 2.
 */
function inheritance (child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = parent;
}
/**
 * Implements a Bot constructor.
 * If arguments are incorrect - work with default args.
 * @param {Object} param0 
 * @constructor
 */
function Bot ({name, speed, x, y}) {
  this.name = name !== null && name ? name : 'Default';
  this.speed = this._defaultSpeed = +speed > 0 && +speed < Infinity ? speed : 1;
  this.x = +x ? +x : 0; 
  this.y = +y ? +y : 0;
  this.type = 'Bot';

}

Bot.prototype.getSpeed = function () {
  return this.speed;
};

Bot.prototype.setSpeed = function (speedValue) {
  if (isFinite(+speedValue) && +speedValue > 0) {
    this.speed = +speedValue;
  } else {
    console.error('Enter a correct speed');
  }
  
};

Bot.prototype.getDefaultSpeed = function () {
  return this._defaultSpeed;
};

Bot.prototype.getCoordinates = function () {
  return {x: this.x, y: this.y};
};

Bot.prototype.setCoordinates = function (_x, _y) {
  if (isFinite(_x) && isFinite(_y)) {
    this.x = +_x;
    this.y = +_y;
  } else {
    console.error('Enter a correct coordinates!');
  }
};

Bot.prototype.move = function (direction) {
  switch (direction) {
    case 'up':
      this.y += this.getSpeed();
      break;

    case 'down':
      this.y -= this.getSpeed();
      break;

    case 'right':
      this.x += this.getSpeed();
      break;

    case 'left':
      this.x -= this.getSpeed();
      break;

    default:
      console.error('Enter a correct direction!');
  }
};

Bot.prototype.showPosition = function () {
  console.log(`I am ${this.type} '${this.name}'. I am located at ${this.x}:${this.y}.`);
};

/**
 * Implements a Racebot constructor 
 * @class
 * @param {Object} param0
 * @constructor 
 */
function Racebot ({name, speed, x, y}) {
  Bot.call(this, {name, speed, x, y});
  this._prevMove = null;
  this.type = 'Racebot';
}
inheritance(Racebot, Bot);

Racebot.prototype.move = function (direction) {
  direction === this._prevMove ? this.speed++ : this.speed = this._defaultSpeed;

  Bot.prototype.move.call(this, direction);
  this._prevMove = direction;
};

/**
 * Implements a Speedbot constructor.
 * @class
 * @param {Object} param0
 * @constructor 
 */
function Speedbot ({name, speed, x, y}) {
  Bot.call(this, {name, speed, x, y});
}
inheritance(Speedbot, Bot);

Speedbot.prototype.prepareEngine = function () {
  this.setSpeed(this.getSpeed() + 2);
};

Speedbot.prototype.move = function (direction) {
  Bot.prototype.move.call(this, direction);

  if (this.speed > this._defaultSpeed) {
    this.setSpeed(this.getSpeed() - 1);
  }
};

//-------------------------Task 1-------------------------
// let defaults = { a: 123, b: 777 };
// let options = { a: 456 };
// let configs = assign({}, defaults, options); // {a: 456, b: 777}

//-------------------------Task 2-------------------------
// let Botty = new Bot({name: 'Betty', speed: 2, x: 0, y: 1});
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
// Botty.move('left');
// Botty.move('down');
// Botty.move('up');
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
// Botty.move('up');
// Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

// let Zoom = new Racebot({name: 'Lightning', speed: 2, x: 0, y: 1});
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
// Zoom.move('left');
// Zoom.move('down');
// Zoom.move('up');
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
// Zoom.move('up');
// Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

// let Broom = new Speedbot({name: 'Thunder', speed: 2, x: 0, y: 1});
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
// Broom.prepareEngine();
// Broom.move('left');
// Broom.move('down');
// Broom.move('up');
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
// Broom.move('up');
// Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8.
