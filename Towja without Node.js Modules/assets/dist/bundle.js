webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 25);
var hide = __webpack_require__(/*! ./_hide */ 13);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */,
/* 6 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 60)('wks');
var uid = __webpack_require__(/*! ./_uid */ 37);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 104);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 11 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 12 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 36);
module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 13);
var has = __webpack_require__(/*! ./_has */ 12);
var SRC = __webpack_require__(/*! ./_uid */ 37)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 25).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 15 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 27);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 16 */
/*!*****************************!*\
  !*** ./src/states/Level.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _Player = __webpack_require__(/*! ../sprites/Player */ 57);

var _Player2 = _interopRequireDefault(_Player);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

//    _____ _   _ _____     ____ _   _   _    ____  ____ ___    _    _   _     ___  _____    _____ _   _ _____     ____ ___  ____  _____
//  |_   _| | | | ____|  /  ___| | | | / \  |  _ \|  _ \_ _|  / \  | \ | |   / _ \|  ___|  |_   _| | | | ____|   / ___/ _ \|  _ \| ____|
//   | | | |_| |  _|    | |  _| | | |/ _ \ | |_) | | | | |  / _ \ |  \| |  | | | | |_       | | | |_| |  _|    | |  | | | | | | |  _|
//  | | |  _  | |___   | |_| | |_| / ___ \|  _ <| |_| | | / ___ \| |\  |  | |_| |  _|      | | |  _  | |___   | |__| |_| | |_| | |___
// |_| |_| |_|_____|   \____|\___/_/   \_\_| \_\____/___/_/   \_\_| \_|   \___/|_|        |_| |_| |_|_____|   \____\___/|____/|_____|
//
//   _   /\  _
//    \/  \/
//   / O O\
// /-------\
//  |   |

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }]);

  function _class(JSONDataKey) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    _this.mapKey = JSONDataKey; // ex) testMap-Data
    // this.startX = startX
    // this.startY = startY
    // this.loading = false
    // this._timer = new Phaser.Time(this.game)
    return _this;
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      // Set/Reset world bounds
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.world.scale.setTo(1.0, 1.0);
      // Start the P2 Physics Engine
      this.game.physics.startSystem(_phaser2.default.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
      this.game.physics.p2.gravity.y = 0;

      // Setup the map
      this.map = this.cache.getJSON(this.mapKey);
      this.background = this.game.add.image(0, 0, this.map.backgroundKey);
      this.game.world.setBounds(0, 0, this.background.width, this.background.height);
      this.map.processColliders();

      // Keep the chests closed
      this.testChestClosed = true;
      this.swordChestClosed = true;
      this.bloodSwordChestClosed = true;

      // Load the sprite for loading
      this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare');
      this.blackSquare.scale.setTo(4, 4);
      this.blackSquare.alpha = 0;

      // Pause Menu Text
      if (true) {
        this.paused = this.game.add.image(-90, 0, 'paused');
        this.game.add.existing(this.paused);
        this.paused.visible = false;
        this.paused.fixedToCamera = true;
        this.paused.scale.setTo(1.63, 1.63);
      }

      //  UI hearts
      // Create the hearts
      this.UIhealth_bar1 = this.game.add.image(0, -130, 'uiHealthBar1');
      this.UIhealth_bar2 = this.game.add.image(0, -130, 'uiHealthBar2');
      this.UIhealth_bar3 = this.game.add.image(0, -130, 'uiHealthBar3');
      this.UIhealth_bar4 = this.game.add.image(0, -130, 'uiHealthBar4');

      //  Add the hearts to the game
      this.game.add.existing(this.UIhealth_bar1);
      this.game.add.existing(this.UIhealth_bar2);
      this.game.add.existing(this.UIhealth_bar3);
      this.game.add.existing(this.UIhealth_bar4);

      //  Fix the hearts to the camera
      this.UIhealth_bar1.fixedToCamera = true;
      this.UIhealth_bar2.fixedToCamera = true;
      this.UIhealth_bar3.fixedToCamera = true;
      this.UIhealth_bar4.fixedToCamera = true;

      // UI weapons
      this.hasSword = this.game.add.image(440, 40, 'sword');
      this.hasSword.visible = false;
      this.game.add.existing(this.hasSword);
      this.hasSword.fixedToCamera = true;

      this.hasChain = this.game.add.image(440, 40, 'chain');
      this.hasChain.visible = false;
      this.game.add.existing(this.hasChain);
      this.hasChain.fixedToCamera = true;

      this.hasHammer = this.game.add.image(440, 40, 'hammer');
      this.hasHammer.visible = false;
      this.game.add.existing(this.hasHammer);
      this.hasHammer.fixedToCamera = true;

      //  Item cooldowns
      this.weaponCooldown = 0.0;
      this.abilityCooldown = 0.0;

      // If player died, then load from saveState
      // if (this.isDead === false) {
      //   this.playerData = this.cache.getJSON('playerState')
      //   console.info('Loading from playerState')
      // } else if (this.isDead === true) {
      //   this.playerData = this.cache.getJSON('saveState')
      //   console.info('Loading from saveState')
      // }
      // TODO: Check whether player was previously dead
      this.check = this.cache.getJSON('checkDeath');
      if (this.check.justDied === false) {
        this.playerData = this.cache.getJSON('playerState');
      } else if (this.check.justDied === true) {
        this.playerData = this.cache.getJSON('saveState');
        this.cache.addJSON('checkDeath', '', { justDied: false });
      }
      // console.info('is dead', this.isDead)
      // Create and add the main player object
      console.info('setting player location');
      if (this.playerData !== null && this.playerData !== undefined) {
        this.player = new _Player2.default({
          game: this.game,
          x: this.playerData.pX,
          y: this.playerData.pY
        });

        this.player.Inventory = this.playerData.Inventory;
        this.player.health = this.playerData.health;
        if (this.playerData.facing === 'left') {
          this.player.makeFaceLeft();
        } else if (this.playerData.facing === 'right') {
          this.player.makeFaceRight();
        }
      } else {
        this.player = new _Player2.default({
          game: this.game,
          x: this.startX = 594.0,
          y: this.startY = 702.3
        });
        this.player.makeFaceRight();
      }

      this.game.add.existing(this.player);

      this.player.drag = 1000;

      //  Sets camera to follow player
      this.game.camera.follow(this.player, _phaser2.default.Camera.FOLLOW_PLATFORMER);
      var w = this.game.camera.width / 8;
      var h = this.game.camera.height / 3;
      this.game.camera.deadzone = new _phaser2.default.Rectangle((this.game.camera.width - w) / 2, (this.game.camera.height - h) / 2 + 1.5 * h * 0.25, w, h);

      // Setup all the audio
      this.setupAudio();

      // Setup the key objects
      this.setupKeyboard();

      this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.itemCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.levelCollisionGroup = this.map.collisionGroup;

      this.spriteMaterial = this.physics.p2.createMaterial('spriteMaterial', this.player.body);
      this.worldMaterial = this.physics.p2.createMaterial('worldMaterial');
      this.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
      this.contactMaterial = this.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial);

      // Friction to use in the contact of these two materials.
      this.contactMaterial.friction = 0.3;

      // Restitution (i.e. how bouncy it is!) to use in the contact of
      this.contactMaterial.restitution = 0.0;

      // Event listener for unpausing
      if (true) {
        this.game.input.onDown.add(this.unpause, this);
      }
    }

    // Method handling unpausing

  }, {
    key: 'unpause',
    value: function unpause(event) {
      if (true) {
        if (this.game.paused) {
          this.game.paused = false;
          this.paused.visible = false;
          this.blackSquare.alpha = 0;
        }
      }
    }
  }, {
    key: 'setupAudio',
    value: function setupAudio() {
      // Load the audio sprite into the level
      this.sounds = this.game.add.audioSprite('sounds');
    }
  }, {
    key: 'setupKeyboard',
    value: function setupKeyboard() {
      //  Register the keys
      this.leftKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.LEFT);
      this.rightKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.RIGHT);
      this.jumpKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.UP);
      this.useWeaponKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
      // this.useAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
      this.nextWeaponKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.E);
      this.previousWeaponKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.Q);
      this.dabDKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.D);
      this.dabAKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.A);
      this.dabBKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.B);
      // this.nextAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q)

      //  These keys are for debugging only
      if (true) {
        this.testDamageKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.P);
        this.testHealKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.O);
        this.previousLevelKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.ONE);
        this.nextLevelKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.TWO);
        this.pauseKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.THREE);
      }

      //  Stop the following keys from propagating up to the browser
      this.game.input.keyboard.addKeyCapture([_phaser2.default.Keyboard.LEFT, _phaser2.default.Keyboard.RIGHT, _phaser2.default.Keyboard.SPACEBAR, _phaser2.default.Keyboard.SHIFT, _phaser2.default.Keyboard.Q]);
    }
  }, {
    key: 'saveLevel',
    value: function saveLevel(levelName, facing, pX, pY) {
      this.player.health = 3;
      this.cache.addJSON('saveState', '', { levelName: levelName, Inventory: this.player.Inventory, pX: pX, pY: pY, health: this.player.health, facing: facing });
    }
  }, {
    key: 'loadLevel',
    value: function loadLevel(levelName, facing, pX, pY) {
      this.cache.addJSON('playerState', '', { Inventory: this.player.Inventory, pX: pX, pY: pY, health: this.player.health, facing: facing });
      this.sounds.stop('Run');
      this.state.start(levelName);
    }

    // changeFace (facing) {
    //   if (facing === 'left') {
    //     this.player.makeFaceLeft()
    //   } else if (facing === 'right') {
    //     this.player.makeFaceRight()
    //   } else {
    //     this.player.makeFaceLeft()
    //   }
    // }

  }, {
    key: 'update',
    value: function update() {
      if (this.player.animations.getAnimation('dead').isPlaying) {
        this.sounds.stop('Run');
        this.sounds.stop('MainTheme');
        this.state.start('GameOver');
      }

      // // Fades to black if still loading
      // if (this.loading) {
      //   console.log('update: this.loading is ' + this.loading)
      //   this.blackSquare.alpha = 1 // += this._timer.physicsElapsed
      // }

      // Pause the game
      if (true) {
        if (this.pauseKey.justPressed()) {
          this.game.paused = true;
          this.paused.visible = true;
          this.blackSquare.alpha = 0;
          this.blackSquare.bringToTop();
          this.paused.bringToTop();
          console.log('Game paused.');
        }
      }

      if (true) {
        //  Debugging in update
        if (this.testDamageKey.justPressed()) {
          // this.player.takeDamage()
        }
        if (this.testHealKey.justPressed()) {
          // this.player.heal()
        }
      }

      //  Check the Weapon cooldown
      if (this.weaponCooldown <= 0.0) {
        //  Check if player is using a Weapon
        if (this.useWeaponKey.justPressed() && this.player.getCurWeapon() !== undefined) {
          this.player.useCurWeapon();
          this.weaponCooldown = this.player.getCurWeapon().cooldown;
        }
      } else {
        this.weaponCooldown -= this.game.time.physicsElapsed;
      }

      //  Check the Ability cooldown
      // if (this.abilityCooldown <= 0.0) {
      //   //  Check if player is using an ability
      //   if (this.useAbilityKey.justPressed() && this.player.getCurAbility() !== undefined) {
      //     this.player.useCurAbility()
      //     this.abilityCooldown = this.player.getCurAbility().cooldown
      //   }
      // } else {
      //   this.abilityCooldown -= this.game.time.physicsElapsed
      // }

      //  Check to cycle through weapons
      if (this.nextWeaponKey.justPressed()) {
        this.player.nextWeapon();
      } else if (this.previousWeaponKey.justPressed()) {
        this.player.previousWeapon();
      }

      if (this.dabDKey.justPressed()) {
        this.player.dabD = true;
      }
      if (this.dabDKey.justReleased()) {
        this.player.dabD = false;
      }
      if (this.dabAKey.justPressed()) {
        this.player.dabA = true;
      }
      if (this.dabAKey.justReleased()) {
        this.player.dabA = false;
      }
      if (this.dabBKey.justPressed()) {
        this.player.dabB = true;
      }
      if (this.dabBKey.justReleased()) {
        this.player.dabB = false;
      }

      if (this.rightKey.justReleased()) {
        this.rightKey.ignore = false;
      }
      if (this.leftKey.justReleased()) {
        this.leftKey.ignore = false;
      }

      // Check for attacking
      if (this.useWeaponKey.justPressed() && this.player.actionState === _Player2.default.actionStates.SWORD) {
        this.sounds.play('Sword miss', _config2.default.SFX_VOLUME); // sword hit
      } else if (this.useWeaponKey.justPressed() && this.player.actionState === _Player2.default.actionStates.METEOR_CHAIN_SWING) {
        this.sounds.play('Metor chain', _config2.default.SFX_VOLUME);
      }

      // Check for jumping.
      if (this.jumpKey.justPressed() && (!this.player.action || this.player.actionState === _Player2.default.actionStates.WALLLATCHED)) {
        this.player.willJump = true;
        this.player.body.velocity.y = _config2.default.JUMP_INITIAL;
        this.player.isFalling = true;
        this.player._jump_timer = this.player._jump_boost_time;

        // Walljumping
        if (this.player.actionState === _Player2.default.actionStates.WALLLATCHED) {
          console.log('WallJump');
          this.player.wallJumpingTimer = 0.1;
          this.player.body.velocity.y = _config2.default.WALLJUMP_Y_INITIAL;

          // Change x-velocity based on the direction the player is facing
          if (this.player.wallTouchingSide === 'LEFT') {
            this.player.body.velocity.x = _config2.default.WALLJUMP_X_INITIAL;
            this.player.wallJumpCountLeft++;
            this.player.wallJumpCountRight = 0;
            // this.leftKey.ignore = true
            this.player.makeFaceRight();
            console.info(this.player.body.velocity.x);
          } else if (this.player.wallTouchingSide === 'RIGHT') {
            this.player.body.velocity.x = -_config2.default.WALLJUMP_X_INITIAL;
            this.player.wallJumpCountRight++;
            this.player.wallJumpCountLeft = 0;
            // this.rightKey.ignore = true
            this.player.makeFaceLeft();
            console.info(this.player.body.velocity.x);
          }
          // Regular Jump
        } else {
          console.log('Normal Jump');
        }

        //  This actionState is now being set in Player.js
        //  this.player.actionState = MainPlayer.actionStates.JUMPING

        // // if latched, stay on the wall for a few sec. before falling back down
        // if (this.player.actionState === MainPlayer.actionStates.WALLLATCHED) {
        //   this.player.body.velocity.y = 0
        //   if (this.jumpKey.justPressed() && (!this.player.action || (this.player.actionState === MainPlayer.actionStates.WALLLATCHED))) {
        //     this.player.willJump = true
        //     if (this.player.isFacingLeft()) {
        //       this.player.body.velocity.x = 550
        //     } else if (this.player.isFacingRight()) {
        //       this.player.body.velocity.x = -550
        //     }
        //
        //     this.player.body.velocity.y = config.JUMP_INITIAL
        //     this.player.isFalling = true
        //     this.player._jump_timer = this.player._jump_boost_time
        //   }
        // }
      } else {
        // Check state of keys to control main character
        if (this.player.isDead) {
          return;
        }
        var speed = 0;
        // if (this.rightKey.isDown && !this.rightKey.ignore) {
        //   speed++
        // } else
        if (this.rightKey.isDown) {
          speed++;
        }
        // if (this.leftKey.isDown && !this.leftKey.ignore) {
        //   speed--
        // } else
        if (this.leftKey.isDown) {
          speed--;
        }

        // Update sprite facing direction
        if (speed > 0 && !this.player.isFacingRight()) {
          this.player.makeFaceRight();
        } else if (speed < 0 && !this.player.isFacingLeft()) {
          this.player.makeFaceLeft();
        }

        // Update state of movement
        if (Math.abs(speed) > 1) {
          this.player.moveState = _Player2.default.moveStates.RUNNING;
          if (!this.player.action && !this.sounds.get('Run').isPlaying) {
            this.sounds.play('Run', _config2.default.SFX_VOLUME - 0.75);
          }
        } else if (Math.abs(speed) > 0) {
          this.player.moveState = _Player2.default.moveStates.RUNNING;
          if (!this.player.action && !this.sounds.get('Run').isPlaying) {
            this.sounds.play('Run', _config2.default.SFX_VOLUME - 0.75);
          }
        } else {
          this.player.moveState = _Player2.default.moveStates.STOPPED;
          this.sounds.stop('Run');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      //  UI Renderer
      this.UIhealth_bar1.visible = true;
      this.UIhealth_bar2.visible = false;
      this.UIhealth_bar3.visible = false;
      this.UIhealth_bar4.visible = false;

      if (this.player.health < 3) {
        this.UIhealth_bar1.visible = false;
        this.UIhealth_bar2.visible = true;
      }
      if (this.player.health < 2) {
        this.UIhealth_bar2.visible = false;
        this.UIhealth_bar3.visible = true;
      }
      if (this.player.health < 1) {
        this.UIhealth_bar3.visible = false;
        this.UIhealth_bar4.visible = true;
      }

      this.hasSword.visible = false;
      this.hasChain.visible = false;
      this.hasHammer.visible = false;

      console.log(this.hasHammer.visible);

      if (this.player.getCurWeapon() !== undefined) {
        if (this.player.getCurWeapon().name === 'Sword') {
          console.log('Ninja has sword text showing');
          this.hasSword.visible = true;
          this.hasChain.visible = false;
          this.hasHammer.visible = false;
        } else if (this.player.getCurWeapon().name === 'Meteor Chain') {
          console.log('Ninja has chain text showing');
          this.hasChain.visible = true;
          this.hasSword.visible = false;
          this.hasHammer.visible = false;
        } else if (this.player.getCurWeapon().name === 'Hammer') {
          console.log('Ninja has hammer text showing');
          this.hasSword.visible = false;
          this.hasChain.visible = false;
          this.hasHammer.visible = true;
        }
      }

      if (true) {
        this.game.debug.spriteInfo(this.player, 32, 32);
        this.game.debug.text('Movement: ' + this.player.moveState + ', Action: ' + this.player.actionState, this.game.width - 350, 32);
        if (this.player.getCurWeapon() === undefined || this.player.getCurWeapon() === null) {
          this.game.debug.text('Weapon: NONE', this.game.width - 350, 64);
        } else {
          this.game.debug.text('Weapon: ' + this.player.getCurWeapon().name, this.game.width - 350, 64);
        }

        if (this.player.getCurAbility() === undefined || this.player.getCurAbility() === null) {
          this.game.debug.text('Ability: NONE', this.game.width - 350, 96);
        } else {
          this.game.debug.text('Ability: ' + this.player.getCurAbility().name, this.game.width - 350, 64);
        }

        this.game.debug.text('isFalling: ' + this.player.isFalling, this.game.width - 350, 128);
        this.game.debug.text('can Wall Jump: ' + (this.player.canWallJump() ? 'YES' : 'no'), this.game.width - 350, 160);

        this.game.debug.text('DEV BUILD', this.game.width - 100, this.game.height - 10, '#AA0000');
      }

      // this.game.debug.body(this.player)
      // this.game.debug.body(this.player.weaponHitbox)
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 54);
var defined = __webpack_require__(/*! ./_defined */ 27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 55);
var createDesc = __webpack_require__(/*! ./_property-desc */ 36);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var has = __webpack_require__(/*! ./_has */ 12);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 104);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 12);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 20 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 23 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  gameWidth: 1600,
  gameHeight: 768,
  localStorageName: 'stoutGDD325',

  MUSIC_VOLUME: 0.1,
  SFX_VOLUME: 1.0,
  MIN_SPLASH_SECONDS: 8,

  IDLE_COUNTDOWN: 200,
  PLAYER_SCALE: 0.75,
  PLAYER_MASS: 5,

  RUN_SPEED: 550,
  DASH_SPEED: 1400,

  JUMP_INITIAL: -715,
  JUMP_TIME: 0.4,

  WALLJUMP_X_INITIAL: 550,
  WALLJUMP_Y_INITIAL: -715,

  GRAVITY_CONSTANT: 1000,

  // Note: the FLOOR values are computed and re-written in game.js
  PLAYER_FLOOR: 365,
  GLOBAL_FLOOR: 333,

  FALL_LEEWAY: 0.25
};

/***/ }),
/* 24 */
/*!****************************************!*\
  !*** ./src/levelData/LevelCollider.js ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelCollider = function (_Phaser$Sprite) {
  _inherits(LevelCollider, _Phaser$Sprite);

  function LevelCollider(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        nextLevel = _ref.nextLevel;

    _classCallCheck(this, LevelCollider);

    var _this = _possibleConstructorReturn(this, (LevelCollider.__proto__ || Object.getPrototypeOf(LevelCollider)).call(this, game, pX, pY, ''));
    // Initialize object basics


    _this.game = game;
    _this.next = nextLevel;
    _this.scale.setTo(0.4, 0.4);
    _this.active = true;
    return _this;
  }

  // Return the next level associated with the level collider


  _createClass(LevelCollider, [{
    key: 'getLevel',
    value: function getLevel() {
      console.info('Hit level collider');
      return this.next;
    }

    //  Checks whether the chest is overlapping with pSprite

  }, {
    key: 'overlapWithObject',
    value: function overlapWithObject(pSprite) {
      // Stops the function from executing if the player is attacking
      if (pSprite.meleeAttacking()) {
        return;
      }

      if (pSprite === null || pSprite === undefined) {
        console.log('Null or Undefined');
        return false;
      }
      if (!this.active) {
        console.log('Level collider isnt active');
        return false;
      }

      //  Check left side of the collision box
      var bodies = this.game.physics.p2.hitTest(new _phaser2.default.Point(this.x, this.y - 50));
      //  console.info(bodies.length)
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].parent.sprite === pSprite) {
          this.animations.play('inactive');
          this.active = false;
          return true;
        }
      }

      bodies = this.game.physics.p2.hitTest(new _phaser2.default.Point(this.x, this.y + 100));
      //  console.info(bodies.length)
      for (var _i = 0; _i < bodies.length; _i++) {
        if (bodies[_i].parent.sprite === pSprite) {
          this.animations.play('inactive');
          this.active = false;
          return true;
        }
      }
    }
  }]);

  return LevelCollider;
}(_phaser2.default.Sprite);

exports.default = LevelCollider;

/***/ }),
/* 25 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 27 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 29 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 25);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 30 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var IObject = __webpack_require__(/*! ./_iobject */ 54);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var asc = __webpack_require__(/*! ./_array-species-create */ 94);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 31 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 7)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 38);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 70);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 100);
  var ctx = __webpack_require__(/*! ./_ctx */ 20);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 36);
  var hide = __webpack_require__(/*! ./_hide */ 13);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
  var toLength = __webpack_require__(/*! ./_to-length */ 9);
  var toIndex = __webpack_require__(/*! ./_to-index */ 130);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
  var has = __webpack_require__(/*! ./_has */ 12);
  var classof = __webpack_require__(/*! ./_classof */ 56);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 10);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
  var create = __webpack_require__(/*! ./_object-create */ 41);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);
  var uid = __webpack_require__(/*! ./_uid */ 37);
  var wks = __webpack_require__(/*! ./_wks */ 6);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 30);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 61);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 68);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 96);
  var Iterators = __webpack_require__(/*! ./_iterators */ 49);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 65);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 43);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 95);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 120);
  var $DP = __webpack_require__(/*! ./_object-dp */ 8);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 32 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 125);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 60)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 128))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 33 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 37)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 12);
var setDesc = __webpack_require__(/*! ./_object-dp */ 8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 34 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 6)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 35 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var centerGameObjects = exports.centerGameObjects = function centerGameObjects(objects) {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

var sequentialNumArray = exports.sequentialNumArray = function sequentialNumArray(first, last) {
  var newArray = [];
  for (var i = first; i <= last; i++) {
    newArray.push(i);
  }
  return newArray;
};

/***/ }),
/* 36 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 37 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 38 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 106);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 40 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 41 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 107);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 75)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 79).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 106);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 78).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 43 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 45 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var call = __webpack_require__(/*! ./_iter-call */ 118);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 46 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 14);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 47 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 8).f;
var has = __webpack_require__(/*! ./_has */ 12);
var TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 48 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 27);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 81);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 49 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 50 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 51 */
/*!***********************************!*\
  !*** ./src/Enemies/smallDemon.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WalkerAI2 = __webpack_require__(/*! ./WalkerAI.js */ 102);

var _WalkerAI3 = _interopRequireDefault(_WalkerAI2);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmallDemon = function (_WalkerAI) {
  _inherits(SmallDemon, _WalkerAI);

  function SmallDemon(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, SmallDemon);

    var _this = _possibleConstructorReturn(this, (SmallDemon.__proto__ || Object.getPrototypeOf(SmallDemon)).call(this, { game: game, pX: pX, pY: pY, speed: 300, spriteName: 'smallDemon', pPlayer: pPlayer, pointXSet: 45, pointYSet: 40 }));

    _this.scale.setTo(0.7, 0.7);
    _this.body.clearShapes();
    _this.body.addRectangle(50, 60, 0, 0);
    _this.body.addToWorld();
    _this.body.data.shapes[0].sensor = true;

    _this.setAnchor(0.5, 0.5);
    _this.setPoints(0, 0, 0, 0);

    _this.animations.add('run', (0, _utils.sequentialNumArray)(0, 4), 20, true);
    _this.animations.add('dead', [8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 10, true);
    _this.animations.play('run');
    return _this;
  }

  return SmallDemon;
}(_WalkerAI3.default);

exports.default = SmallDemon;

/***/ }),
/* 52 */
/*!*********************************!*\
  !*** ./src/Enemies/BigDemon.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _WalkerAI2 = __webpack_require__(/*! ./WalkerAI.js */ 102);

var _WalkerAI3 = _interopRequireDefault(_WalkerAI2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BigDemon = function (_WalkerAI) {
  _inherits(BigDemon, _WalkerAI);

  function BigDemon(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, BigDemon);

    var _this = _possibleConstructorReturn(this, (BigDemon.__proto__ || Object.getPrototypeOf(BigDemon)).call(this, { game: game, pX: pX, pY: pY, speed: 700, spriteName: 'bigDemon', pPlayer: pPlayer, pointXSet: 220, pointYSet: 150 }));

    _this.scale.setTo(1, 1);
    _this.body.clearShapes();
    _this.body.addRectangle(400, 200, 0, 0);
    _this.body.addToWorld();
    _this.body.data.shapes[0].sensor = true;
    _this.oldSpeed = _this.speed;
    _this.isMoving = true;

    _this.setAnchor(0.5, 0.5);
    _this.setPoints(0, 0, 0, 0);

    _this.animations.add('Standing', [0, 1, 2, 3], 10, false);
    _this.animations.add('Jumping', [5, 6, 6], 5, false);
    _this.animations.add('dead', [0], 10, false);

    _this.animations.getAnimation('Jumping').onComplete.add(function () {
      _this.changeState();
    }, _this);

    _this.animations.getAnimation('Standing').onComplete.add(function () {
      _this.changeState();
    }, _this);

    _this.animations.play('Jumping');
    return _this;
  }

  _createClass(BigDemon, [{
    key: 'death',
    value: function death() {
      _get(BigDemon.prototype.__proto__ || Object.getPrototypeOf(BigDemon.prototype), 'death', this).call(this);
      this.game.camera.shake(0.01, 200);
    }
  }, {
    key: 'changeState',
    value: function changeState() {
      if (!this.isMoving) {
        this.isMoving = true;
        this.animations.play('Jumping');
        this.body.velocity.x = this.oldSpeed;
      } else {
        this.isMoving = false;
        this.animations.play('Standing');
        this.oldSpeed = this.body.velocity.x;
        this.body.velocity.x = 0;
      }
    }
  }]);

  return BigDemon;
}(_WalkerAI3.default);

exports.default = BigDemon;

/***/ }),
/* 53 */,
/* 54 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 55 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 56 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 21);
var TAG = __webpack_require__(/*! ./_wks */ 6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 57 */
/*!*******************************!*\
  !*** ./src/sprites/Player.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _utils = __webpack_require__(/*! ../utils.js */ 35);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _p = __webpack_require__(/*! p2 */ 101);

var _p2 = _interopRequireDefault(_p);

var _PlayerInventory = __webpack_require__(/*! ../itemData/PlayerInventory.js */ 374);

var _PlayerInventory2 = _interopRequireDefault(_PlayerInventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var MainPlayer = function (_Phaser$Sprite) {
  _inherits(MainPlayer, _Phaser$Sprite);

  function MainPlayer(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, MainPlayer);

    var _this = _possibleConstructorReturn(this, (MainPlayer.__proto__ || Object.getPrototypeOf(MainPlayer)).call(this, game, x, y, 'player-main', 0));
    // Initialize object basics


    _this.name = 'Main Player';
    _this.anchor.setTo(0.5, 1.0);
    _this.smoothed = false;
    _this.hasWallJump = true;
    _this.game = game;
    _this.willJump = false;

    _this.dabbing = false;
    _this.dontDieOnDab = false;

    _this.dabD = false;
    _this.dabA = false;
    _this.dabB = false;

    _this.collCount = 0;

    _this.Inventory = new _PlayerInventory2.default();
    _this.isFalling = true;
    _this.health = 3;
    _this.isDead = false;

    _this.offGroundTimer = 0.0;

    _this.flickerBeginTime = 0.0;

    _this.damagingHitbox = null;

    // Setup all the animations
    _this.setupAnimations();

    // All variabes that start with '_' are meant to be private
    // Initial state is stopped
    _this._move_state = MainPlayer.moveStates.UNKNOWN;
    _this._action_state = MainPlayer.actionStates.NONE;
    _this._SCALE = _config2.default.PLAYER_SCALE;
    _this._idle_countdown = _config2.default.IDLE_COUNTDOWN;

    // Initialize jump properties
    _this._timer = new _phaser2.default.Time(_this.game);
    _this._jump_timer = 0;
    _this._jump_boost_time = 0.2;
    _this._falling_constant = 2300;

    _this.iFrames = 0.0;

    // Initialize the sprite scale
    _this.scale.setTo(_this._SCALE);

    // Enable physics (gravity and collisions)
    _this.body = new _phaser2.default.Physics.P2.Body(_this.game, _this, x, y);
    // this.body.debug = __DEV__
    //  this.body.debug = false
    _this.body.mass = _config2.default.PLAYER_MASS;
    _this.body.fixedRotation = true;
    // this.body.data.gravityScale = 0

    // Turning on sensors for wall jumping
    // this.body.data.shapes[0].sensor = true

    // this.body.onBeginContact.add(this.checkGround, this)
    // this.body.onEndContact.add(this.leaveGround, this)

    // Set a reasonable shape to the collision box
    // Note: Keep in mind the anchor point is at the feet
    _this.body.clearShapes();
    _this.body.addRectangle(50, 120, 0, -170);
    _this.body.addToWorld();

    _this.wallJumpingTimer = 0.0;
    _this.wallTouchingSide = 'LEFT';
    _this.wallJumpCountLeft = 0;
    _this.wallJumpCountRight = 0;
    _this.wallJumpLimit = 2;

    _this.leftWallSet = new Set();
    _this.leftSensor = _this.body.addRectangle(1, 80, -25, -170); // TODO: Make smaller for now (width, height, x, y)
    _this.leftSensor.sensor = true;
    _this.leftSensor.wallJumpSensor = true;

    _this.rightWallSet = new Set();
    _this.rightSensor = _this.body.addRectangle(1, 80, 25, -170);
    _this.rightSensor.sensor = true;
    _this.rightSensor.wallJumpSensor = true;

    _this.body.onBeginContact.add(_this.checkWallJump, _this);
    _this.body.onEndContact.add(_this.removeWallJump, _this);
    return _this;
  }

  // Setter and getter for the 'state' property


  _createClass(MainPlayer, [{
    key: 'isFacingRight',


    // Functions to help manage the way the character is facing
    value: function isFacingRight() {
      return this.scale.x < 0;
    }
  }, {
    key: 'isFacingLeft',
    value: function isFacingLeft() {
      return this.scale.x > 0;
    }
  }, {
    key: 'makeFaceRight',
    value: function makeFaceRight() {
      this.scale.set(-this._SCALE, this._SCALE);
    }
  }, {
    key: 'makeFaceLeft',
    value: function makeFaceLeft() {
      this.scale.set(this._SCALE, this._SCALE);
    }
  }, {
    key: 'makeAboutFace',
    value: function makeAboutFace() {
      if (this.facingRight()) {
        this.makeFaceLeft();
      } else {
        this.makeFaceRight();
      }
    }

    // checkGround (bodyA, bodyB, shapeA, shapeB, contactData) {
    //   this.collCount++
    //   console.log(`Colliding with ${this.collCount} bodies`)
    //   if (this.isFalling) {
    //     this.isFalling = false
    //     this.endOfAction()
    //   }
    // }
    //
    // leaveGround (bodyA, bodyB, shapeA, shapeB, contactData) {
    //   this.collCount--
    //   console.log(`Colliding with ${this.collCount} bodies`)
    //   if (this.collCount === 0) {
    //     this.isFalling = true
    //     this.actionState = MainPlayer.actionStates.JUMPING
    //   }
    // }

  }, {
    key: 'addToSwordSet',
    value: function addToSwordSet(bodyA, bodyB, shapeA, shapeB, contactData) {
      // this.swordSet
    }
  }, {
    key: 'checkWallJump',
    value: function checkWallJump(bodyA, bodyB, shapeA, shapeB) {
      if (bodyB.parent !== null && bodyB.parent !== undefined) {
        if (shapeA && shapeA.wallJumpSensor && bodyB && bodyB.parent.isWallJumpable) {
          if (shapeA === this.leftSensor) {
            this.leftWallSet.add(bodyB);
            this.wallTouchingSide = 'LEFT';
          } else {
            this.rightWallSet.add(bodyB);
            this.wallTouchingSide = 'RIGHT';
          }
        }
      }
    }
  }, {
    key: 'removeWallJump',
    value: function removeWallJump(bodyA, bodyB, shapeA, shapeB) {
      if (bodyB.parent !== null && bodyB.parent !== undefined) {
        if (shapeA && shapeA.wallJumpSensor && bodyB && bodyB.parent.isWallJumpable) {
          if (shapeA === this.leftSensor) {
            this.leftWallSet.delete(bodyB);
          } else {
            this.rightWallSet.delete(bodyB);
          }
        }
      }
    }
  }, {
    key: 'canWallJump',
    value: function canWallJump() {
      if (!this.Inventory.hasWallJump) {
        return false;
      }
      if ((this.leftWallSet.size > 0 || this.rightWallSet.size > 0) && !this.touchingDown()) {
        if (this.wallTouchingSide === 'LEFT' && this.wallJumpCountLeft >= this.wallJumpLimit) {
          return false;
        }

        if (this.wallTouchingSide === 'RIGHT' && this.wallJumpCountRight >= this.wallJumpLimit) {
          return false;
        }

        return true;
      }
    }
  }, {
    key: 'touchingDown',
    value: function touchingDown() {
      var yAxis = _p2.default.vec2.fromValues(0, 1);
      var result = false;
      for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        // Cycles through all the contactEquations until it finds our "someone"
        var c = this.game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
          var d = _p2.default.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
          if (c.bodyA === this.body.data) {
            d *= -1;
          }
          if (d > 0.5) result = true;
        }
      }
      return result;
    }
  }, {
    key: 'touchingWall',
    value: function touchingWall() {}
    // take advantage of collision groups
    // create sensors on the player to sense walls and the direction
    // use enemy ai to help


    // Update animation to match state (called only when state changes)

  }, {
    key: 'updateAnimation',
    value: function updateAnimation() {
      if (this.isDead) {
        this.actionState = MainPlayer.actionStates.DEATH;
      }

      switch (this._action_state) {
        case MainPlayer.actionStates.HURT:
          // if (__DEV__) console.info('Playing "Hurt"')
          this.animations.play('hurt');
          break;

        case MainPlayer.actionStates.DEATH:
          // if (__DEV__) console.info('Playing "Death"')
          this.animations.play('dying');
          break;

        case MainPlayer.actionStates.SWORD:
          // if (__DEV__) console.info('Playing "Sword"')
          this.animations.play('sword_attack');
          break;

        case MainPlayer.actionStates.KUNAI:
          // if (__DEV__) console.info('Playing "Kunai"')
          this.animations.play('kunai_attack');
          break;

        case MainPlayer.actionStates.METEOR_CHAIN_SWING:
          this.animations.play('meteor_chain_swing');
          break;

        case MainPlayer.actionStates.METEOR_CHAIN_ATTACK:
          this.animations.play('meteor_chain_attack');
          break;

        case MainPlayer.actionStates.HAMMER_SWING:
          this.animations.play('hammer_swing');
          break;

        case MainPlayer.actionStates.HAMMER_ATTACK:
          this.animations.play('hammer_attack');
          break;
        case MainPlayer.actionStates.DAB:
          this.animations.play('dab');
          break;
        case MainPlayer.actionStates.JUMPING:
          if (!this.animations.getAnimation('jump').isPlaying) {
            // if (__DEV__) console.info('Playing "jump"')
            // console.log('Line 179')
            this.animations.play('jump');
          }
          break;

        case MainPlayer.actionStates.WALLLATCHED:
          // if (__DEV__) console.info('Playing 'wall jump"')
          this.animations.play('wall_latched');
          break;

        case MainPlayer.actionStates.FALLING:
          // if (__DEV__) console.info('Playing "fall"')
          this.animations.play('fall');
          break;
      }

      // No move update when there's an overriding action
      if (this.action) return;

      switch (this._move_state) {
        case MainPlayer.moveStates.STOPPED:
          if (true) console.info('Playing "stop"');
          this.animations.play('stop');
          this._idle_countdown = _config2.default.IDLE_COUNTDOWN;
          break;

        case MainPlayer.moveStates.RUNNING:
          if (true) console.info('Playing "run"');
          this.animations.play('run');
          break;

        case MainPlayer.moveStates.IDLE:
          if (true) console.info('Playing "idle"');
          this.animations.play('idle');
          break;
      }
    }
  }, {
    key: 'meleeAttacking',
    value: function meleeAttacking() {
      if (this.actionState === MainPlayer.actionStates.SWORD || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_ATTACK || this.actionState === MainPlayer.actionStates.HAMMER_ATTACK) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'checkInvulnerable',
    value: function checkInvulnerable() {
      if (this.actionState === MainPlayer.actionStates.SWORD) {
        return true;
      }

      if (this.iFrames > 0) {
        return true;
      }

      return false;
    }
  }, {
    key: 'takeDamage',
    value: function takeDamage() {
      if (this.checkInvulnerable()) {
        return false;
      }

      this.health--;
      if (this.health > 0) {
        this.actionState = MainPlayer.actionStates.HURT;
      } else {
        this.kill();
      }
      return true;
    }
  }, {
    key: 'heal',
    value: function heal() {
      this.health = 3;
    }

    // Funcion called when health === 0

  }, {
    key: 'kill',
    value: function kill() {
      this.isDead = true;
      // this.body.velocity.y = 0
      // this.body.kinematic = true
      this.actionState = MainPlayer.actionStates.DEATH;
    }

    //  START ITEM FUNCTIONS
    //  All item functions for the player are found here
    //  Function to add an item to the inventory

  }, {
    key: 'addToInventory',
    value: function addToInventory(pItem) {
      console.info('Pickup called in player');
      this.Inventory.addToInventory(pItem);
    }
  }, {
    key: 'clearWeaponHitboxes',
    value: function clearWeaponHitboxes() {
      this.body.removeShape(this.leftWeaponSensor);
      this.body.removeShape(this.rightWeaponSensor);
    }
  }, {
    key: 'setWeaponHitboxes',
    value: function setWeaponHitboxes() {
      this.clearWeaponHitboxes();
      // Get the current weapon name
      var weaponName = this.getCurWeapon().name;

      switch (weaponName) {
        case 'Sword':
          if (this.isFacingLeft()) {
            this.leftWeaponSensor = this.body.addRectangle(80, 30, -60, -170);
            this.leftWeaponSensor.sensor = true;
          } else {
            this.rightWeaponSensor = this.body.addRectangle(80, 30, 60, -170);
            this.rightWeaponSensor.sensor = true;
          }

          break;
        case 'Meteor Chain':
          if (this.isFacingLeft()) {
            this.leftWeaponSensor = this.body.addRectangle(80, 50, -60, -160);
            this.leftWeaponSensor.sensor = true;
          } else {
            this.rightWeaponSensor = this.body.addRectangle(80, 50, 60, -160);
            this.rightWeaponSensor.sensor = true;
          }
          break;

        case 'Hammer':
          this.leftWeaponSensor = this.body.addRectangle(1000, 600, 0, -200);
          this.leftWeaponSensor.sensor = true;
          break;
        default:
          console.error(weaponName + ' is not a recognized weapon name');
      }
    }

    //  Returns the current Weapon

  }, {
    key: 'getCurWeapon',
    value: function getCurWeapon() {
      return this.Inventory.getWeapon();
    }

    //  Uses the current Weapon

  }, {
    key: 'useCurWeapon',
    value: function useCurWeapon() {
      this.Inventory.getWeapon().activate(this);
      if (this.Inventory.getWeapon().name !== 'Meteor Chain' && this.Inventory.getWeapon().name !== 'Hammer') {
        this.setWeaponHitboxes();
      }
    }

    //  Cycles forward to the next weapon

  }, {
    key: 'nextWeapon',
    value: function nextWeapon() {
      return this.Inventory.nextWeapon();
    }

    //  Cycles back to the previous weapon

  }, {
    key: 'previousWeapon',
    value: function previousWeapon() {
      return this.Inventory.previousWeapon();
    }

    //  Returns the current Ability

  }, {
    key: 'getCurAbility',
    value: function getCurAbility() {
      return this.Inventory.getAbility();
    }

    //  Uses the current Ability

  }, {
    key: 'useCurAbility',
    value: function useCurAbility() {
      this.Inventory.getAbility().activate(this);
    }

    //  Cycles forward to the next ability

  }, {
    key: 'nextAbility',
    value: function nextAbility() {
      return this.Inventory.nextAbility();
    }

    //  Cycles back to the previous ability

  }, {
    key: 'previousAbility',
    value: function previousAbility() {
      return this.Inventory.previousAbility();
    }
  }, {
    key: 'setiFrames',
    value: function setiFrames(frames) {
      this.iFrames = Math.max(frames, this.iFrames);
    }

    // Causes the sprite to flicker

  }, {
    key: 'flickerSprite',
    value: function flickerSprite() {
      if (this.alpha === 1) {
        this.alpha = 0.0;
      } else {
        this.alpha = 1;
      }
    }

    // Function that runs every tick to update this sprite

  }, {
    key: 'update',
    value: function update() {
      // Always give parent a chance to update
      _get(MainPlayer.prototype.__proto__ || Object.getPrototypeOf(MainPlayer.prototype), 'update', this).call(this);

      if (this.dabD && this.dabA && this.dabB) {
        this.dab();
      }

      this.iFrames -= this._timer.physicsElapsed;

      if (this.iFrames > 0) {
        if (this.flickerBeginTime === 0) {
          this.flickerBeginTime = this.iFrames;
          this.flickerSprite();
        } else if (this.iFrames <= this.flickerBeginTime - 0.1 - this.alpha * 0.1) {
          this.flickerSprite();
          this.flickerBeginTime = this.iFrames;
          console.log('FlickerCalled');
        }
      } else {
        this.alpha = 1;
        this.flickerBeginTime = 0.0;
      }

      // Causes the player to fall down when they die
      if (this.isDead) {
        this.body.velocity.y += this._timer.physicsElapsed * this._falling_constant;
        return;
      }

      // Runs left or right based on face of direction
      if (this.wallJumpingTimer <= 0.0) {
        if (this.running && this.scale.x < 0) {
          this.body.velocity.x = _config2.default.RUN_SPEED;
        } else if (this.running && this.scale.x > 0) {
          this.body.velocity.x = -_config2.default.RUN_SPEED;
        }
      } else {
        this.wallJumpingTimer -= this._timer.physicsElapsed;
      }

      // Dashes left or right based on face of direction when the sword is used
      if (this.usingSword && this.scale.x < 0) {
        this.body.velocity.x = _config2.default.DASH_SPEED;
      } else if (this.usingSword && this.scale.x > 0) {
        this.body.velocity.x = -_config2.default.DASH_SPEED;
      }

      //  Stops movement when the player is using a kunai
      if (this.usingKunai || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_ATTACK || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_SWING) {
        this.body.velocity.x = 0;
      }

      if (this.jumping && this.body.velocity.y >= 0) {
        if (this.canWallJump()) {
          this.actionState = MainPlayer.actionStates.WALLLATCHED;
        } else {
          this.actionState = MainPlayer.actionStates.FALLING;
        }
      }

      if (!this.touchingDown() && !this.jumping && !this.walllatched && !this.falling) {
        if (this.canWallJump()) {
          this.actionState = MainPlayer.actionStates.WALLLATCHED;
          this.updateAnimation();
        } else {
          this.isFalling = true;
          this.offGroundTimer += this._timer.physicsElapsed;
        }
      }
      if (!this.touchingDown()) {
        this.isFalling = true;
      }
      if (this.touchingDown()) {
        this.offGroundTimer = 0.0;
        this.isFalling = false;
        // console.log('Landing')
        if (this.falling || this.jumping || this.walllatched) {
          this.endOfAction();
        }
      }
      if (this.offGroundTimer >= _config2.default.FALL_LEEWAY && this.actionState === MainPlayer.actionStates.NONE) {
        this.actionState = MainPlayer.actionStates.JUMPING;
      }
      //  console.log(`jumping Timer: ${this._jump_timer}`)
      //  console.log(`offGroundTimer: ${this.offGroundTimer}`)

      //  If falling
      if (this.isFalling) {
        if (this.willJump) {
          this.actionState = MainPlayer.actionStates.JUMPING;
          this.willJump = false;
        }

        if (this.canWallJump()) {
          this.actionState = MainPlayer.actionStates.WALLLATCHED;
        } else if (this.actionState === MainPlayer.actionStates.WALLLATCHED) {
          this.endOfAction();
        }

        //  Set jump timer to 0 if the player releases the jump button
        if (!this.game.input.keyboard.isDown(_phaser2.default.Keyboard.UP)) {
          //  console.log('Not pressing jump')
          this._jump_timer = 0;
        }
        if (this._jump_timer <= 0.0) {
          //  console.log('Normal Falling')
          this.body.velocity.y += this._timer.physicsElapsed * this._falling_constant;
        } else {
          //  console.log('high jump')
          //  console.log(`Time Elapsed: ${this._timer.physicsElapsed}`)
          this._jump_timer -= this._timer.physicsElapsed;
          //  console.log(`jumping Timer: ${this._jump_timer}`)
        }

        // this.leftPoint = new Phaser.Point(this.x - 35, this.y - 200)
        // this.rightPoint = new Phaser.Point(this.x + 30, this.y - 200)
        //
        // let bodies
        // //  moving left
        // if (this.body.velocity.x > 0) {
        //   bodies = this.game.physics.p2.hitTest(this.rightPoint)
        // } else {
        //   bodies = this.game.physics.p2.hitTest(this.leftPoint)
        // }
        //
        // //  console.info(bodies.length)
        // for (let i = 0; i < bodies.length; i++) {
        //   if (bodies[i].parent.sprite !== this.player) {
        //     this.body.velocity.x = -this.body.velocity.x
        //   }
        // }
        // //  Check for collision with player
        // bodies = this.body.collidesWith
        // // console.log(`Colliding with: ${bodies.length}`)
        // for (let i = 0; i < bodies.length; i++) {
        //   if (bodies[i] === this.player.body) {
        //     if (!this.player.checkInvulnerable()) {
        //       this.player.takeDamage()
        //     }
        //   }
        // }

        // TODO: Delete if no longer needed
        // NOTE: I do not necessarily endorse this approach, it is here
        // because it is similar to how a previous team achieved jumping
        // this._jump_timer += this._timer.physicsElapsed
        // this._jump_step = Math.exp(this._jump_timer) - 1
        // this.body.velocity.y =
        //   config.JUMP_INITIAL + this._jump_step / config.JUMP_TIME * (-config.JUMP_INITIAL)
        //
        // if (this._jump_timer / config.JUMP_TIME >= 1) {
        //   this.actionState = MainPlayer.actionStates.FALLING
        // }
      }

      //  console.log(`isFalling: ${this.isFalling}`)

      // Automatically switch to idle after designated countdown
      if (this.moveState === MainPlayer.moveStates.STOPPED && !this.usingSword) {
        this.body.velocity.x = 0;
        if (this._idle_countdown <= 0) {
          this.moveState = MainPlayer.moveStates.IDLE;
        } else {
          this._idle_countdown -= 1;
        }
      }
    }

    // Function to setup all the animation data

  }, {
    key: 'setupAnimations',
    value: function setupAnimations() {
      var _this2 = this;

      this.animations.add('stop', [24], 1, false);
      this.animations.add('run', (0, _utils.sequentialNumArray)(8, 21), 10, true);

      this.animations.add('dab', [108, 107, 109, 110, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111], 10, false);
      this.animations.add('ContinueDab', [111, 111], 10, true);

      this.animations.add('dying', (0, _utils.sequentialNumArray)(40, 48), 10, false);
      this.animations.add('dead', [48], 10, true);
      this.animations.add('hurt', [32], 7, false);

      this.animations.add('idle', (0, _utils.sequentialNumArray)(24, 31), 4, true);

      this.animations.add('sword_attack', (0, _utils.sequentialNumArray)(0, 4), 15, false);
      this.animations.add('kunai_attack', (0, _utils.sequentialNumArray)(0, 4), 12, false);
      this.animations.add('hammer_swing', (0, _utils.sequentialNumArray)(80, 85), 30, false);
      this.animations.add('hammer_attack', [86, 86, 86], 12, false);
      this.animations.add('chain_attack', (0, _utils.sequentialNumArray)(80, 86), 12, false);
      this.animations.add('meteor_chain_attack', (0, _utils.sequentialNumArray)(89, 91), 10, false);
      this.animations.add('meteor_chain_swing', [96, 97, 98, 99, 100, 88], 30, false);

      //  this.animations.add('dash', [34, 35, 36, 37], 20, false)
      this.animations.add('jump', [33], 10, true);
      this.animations.add('fall', [34], 10, true);
      this.animations.add('wall_latched', [35], 10, true);

      // Setup dash to resume movement state once finished
      this.animations.getAnimation('kunai_attack').onComplete.add(function () {
        _this2.endOfAction();
      }, this);
      this.animations.getAnimation('meteor_chain_attack').onComplete.add(function () {
        _this2.endOfAction();
        _this2.clearWeaponHitboxes();
      }, this);

      this.animations.getAnimation('dab').onComplete.add(function () {
        _this2.endOfAction();
        _this2.health = 0;
        if (_this2.dontDieOnDab) {
          _this2.animations.play('ContinueDab');
        } else {
          _this2.kill();
        }
      }, this);

      this.animations.getAnimation('hurt').onComplete.add(function () {
        _this2.endOfAction();
      }, this);

      this.animations.getAnimation('dying').onComplete.add(function () {
        _this2.play('dead');
      }, this);

      // Transition to meteor chain attack after meteor chain swing is finished
      this.animations.getAnimation('meteor_chain_swing').onComplete.add(function () {
        _this2.animations.play('meteor_chain_attack');
        _this2.actionState = MainPlayer.actionStates.METEOR_CHAIN_ATTACK;
        _this2.body.velocity.y = -1500;
        _this2.setWeaponHitboxes();
      }, this);
      // Transition to hammer attack after hammer swing is finished
      this.animations.getAnimation('hammer_swing').onComplete.add(function () {
        _this2.animations.play('hammer_attack');
        _this2.actionState = MainPlayer.actionStates.HAMMER_ATTACK;
        _this2.game.camera.shake(0.01, 250);
        _this2.setWeaponHitboxes();
      }, this);
      this.animations.getAnimation('hammer_attack').onComplete.add(function () {
        _this2.endOfAction();
        _this2.clearWeaponHitboxes();
      }, this);
      // Setup dash to resume movement state once finished
      this.animations.getAnimation('sword_attack').onComplete.add(function () {
        _this2.endOfAction();
        _this2.clearWeaponHitboxes();
      }, this);
      this.animations.getAnimation('sword_attack').onComplete.add(function () {
        if (_this2.isFalling) {
          _this2.actionState = MainPlayer.actionStates.FALLING;
        }
      }, this);
    }
  }, {
    key: 'dab',
    value: function dab() {
      this.makeFaceLeft();
      this.actionState = MainPlayer.actionStates.DAB;
      this.dabbing = true;
    }
  }, {
    key: 'endOfAction',
    value: function endOfAction() {
      this.clearWeaponHitboxes();
      // this.body.setZeroVelocity()
      // this.body.setZeroForce()

      this._action_state = MainPlayer.actionStates.NONE;
      if (this.isFalling) {
        this.actionState = MainPlayer.actionStates.FALLING;
      }
      if (this._move_state === MainPlayer.moveStates.IDLE) {
        this._move_state = MainPlayer.moveStates.STOPPED;
      }

      this.wallJumpCountLeft = this.wallJumpCountRight = 0;

      this.updateAnimation();
    }
  }, {
    key: 'moveState',
    get: function get() {
      return this._move_state;
    },
    set: function set(newState) {
      if (this._move_state !== newState && (this._move_state !== MainPlayer.moveStates.IDLE || newState !== MainPlayer.moveStates.STOPPED)) {
        // Update the state
        this._move_state = newState;
        this.updateAnimation();
      }
    }
  }, {
    key: 'actionState',
    get: function get() {
      return this._action_state;
    },
    set: function set(newState) {
      if (this._action_state !== newState) {
        // Update the state
        this._action_state = newState;
        this.updateAnimation();
      }
    }

    // Getters for read-only movement properties

  }, {
    key: 'running',
    get: function get() {
      return this.moveState === MainPlayer.moveStates.RUNNING;
    }

    // Getters for read-only action properties

  }, {
    key: 'action',
    get: function get() {
      return this.actionState !== MainPlayer.actionStates.NONE;
    }
  }, {
    key: 'jumping',
    get: function get() {
      return this.actionState === MainPlayer.actionStates.JUMPING;
    }
  }, {
    key: 'walllatched',
    get: function get() {
      return this.actionState === MainPlayer.actionStates.WALLLATCHED;
    }
  }, {
    key: 'falling',
    get: function get() {
      return this.actionState === MainPlayer.actionStates.FALLING;
    }
  }, {
    key: 'usingSword',
    get: function get() {
      return this.actionState === MainPlayer.actionStates.SWORD;
    }
  }, {
    key: 'usingKunai',
    get: function get() {
      return this.actionState === MainPlayer.actionStates.KUNAI;
    }
  }]);

  return MainPlayer;
}(_phaser2.default.Sprite);

// All possible player 'states'


MainPlayer.moveStates = Object.freeze({
  UNKNOWN: 'unknown',
  STOPPED: 'stopped',
  RUNNING: 'running',
  IDLE: 'idle'
});

// All possible player 'actions'
MainPlayer.actionStates = Object.freeze({
  NONE: 'none',
  JUMPING: 'jumping',
  WALLLATCHED: 'walllatched',
  FALLING: 'falling',
  SWORD: 'sword',
  KUNAI: 'kunai',
  HAMMER_SWING: 'hammer_swing',
  HAMMER_ATTACK: 'hammer_attack',
  METEOR_CHAIN_SWING: 'swing_meteor_chain',
  METEOR_CHAIN_ATTACK: 'meteor_chain_attack',
  HURT: 'hurt',
  DEATH: 'death',
  DAB: 'dab'
});

exports.default = MainPlayer;

/***/ }),
/* 58 */
/*!******************************!*\
  !*** ./src/itemData/Item.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {
  //  Constructor
  function Item(name) {
    _classCallCheck(this, Item);

    this.name = name;
    this.isWeapon = true;
    //  Cooldown is given in seconds
    this.cooldown = 2;
  }

  //  Activate is called when the player uses the item


  _createClass(Item, [{
    key: "activate",
    value: function activate(pPlayer) {}
  }]);

  return Item;
}();

exports.default = Item;

/***/ }),
/* 59 */
/*!************************************!*\
  !*** ./src/Enemies/FlyingDemon.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _FlierAI2 = __webpack_require__(/*! ./FlierAI.js */ 381);

var _FlierAI3 = _interopRequireDefault(_FlierAI2);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlyingDemon = function (_FlierAI) {
  _inherits(FlyingDemon, _FlierAI);

  function FlyingDemon(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pPlayer = _ref.pPlayer,
        pHeightMin = _ref.pHeightMin,
        pHeightMax = _ref.pHeightMax;

    _classCallCheck(this, FlyingDemon);

    var _this = _possibleConstructorReturn(this, (FlyingDemon.__proto__ || Object.getPrototypeOf(FlyingDemon)).call(this, { game: game, pX: pX, pY: pY, speed: 200, spriteName: 'flyingDemon', pPlayer: pPlayer, pHeightMin: pHeightMin, pHeightMax: pHeightMax }));

    _this.scale.setTo(0.7, 0.7);
    _this.body.clearShapes();
    _this.body.addRectangle(80, 60, 0, 0);
    _this.body.addToWorld();
    _this.body.data.shapes[0].sensor = true;

    _this.setAnchor(0.5, 0.5);

    _this.animations.add('run', [0, 1, 2, 3, 4, 3, 2, 1], 20, true);
    _this.animations.add('dead', [0], 10, true);
    _this.animations.play('run');

    _this.scale.setTo(0.3, 0.3);
    return _this;
  }

  _createClass(FlyingDemon, [{
    key: 'update',
    value: function update() {
      _get(FlyingDemon.prototype.__proto__ || Object.getPrototypeOf(FlyingDemon.prototype), 'update', this).call(this);
    }
  }]);

  return FlyingDemon;
}(_FlierAI3.default);

exports.default = FlyingDemon;

/***/ }),
/* 60 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 61 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 62 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 63 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 64 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 21);
var MATCH = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 65 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 66 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 67 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 13);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 27);
var wks = __webpack_require__(/*! ./_wks */ 6);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 68 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 69 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
var meta = __webpack_require__(/*! ./_meta */ 33);
var forOf = __webpack_require__(/*! ./_for-of */ 45);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 65);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 70 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 13);
var uid = __webpack_require__(/*! ./_uid */ 37);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 71 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 38) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 72 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 73 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var forOf = __webpack_require__(/*! ./_for-of */ 45);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 74 */
/*!*******************************!*\
  !*** ./src/itemData/Chest.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chest = function (_Phaser$Sprite) {
  _inherits(Chest, _Phaser$Sprite);

  function Chest(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pItem = _ref.pItem,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, Chest);

    var _this = _possibleConstructorReturn(this, (Chest.__proto__ || Object.getPrototypeOf(Chest)).call(this, game, pX, pY, 'tChest', 0));
    // Initialize object basics


    _this.game = game;
    _this.mItem = pItem;
    _this.scale.setTo(0.4, 0.4);
    _this.active = true;
    _this.player = pPlayer;
    _this._timer = new _phaser2.default.Time(_this.game);

    _this.anchor.setTo(0.5, 0.5);

    _this.leftPoint = new _phaser2.default.Point(_this.x - 60, _this.y + 30);
    _this.centerPoint = new _phaser2.default.Point(_this.x, _this.y + 30);
    _this.rightPoint = new _phaser2.default.Point(_this.x + 60, _this.y + 30);

    //  Set up animations
    _this.animations.add('active', [0, 0, 0, 1, 2, 3, 4], 4, false);
    _this.animations.add('inactive', [0], 1, false);
    _this.animations.play('active', 20, true);

    // //  Enable Physics
    // this.game.physics.p2.enableBody(this, true)
    // //  Set Collider Dimensions
    // this.body.setRectangle(160, 60, -5, 20)
    // //  Sets the hitbox to a sensor
    // this.body.data.shapes[0].sensor = true

    _this.show = false;

    // Load the text for the sword
    _this.swordText = _this.game.add.sprite(_this.game.width / 2, _this.game.height * 0.75, 'swordText');
    _this.swordText.anchor.setTo(0.5, 0.5);
    _this.swordText.alpha = 0;
    _this.swordText.fixedToCamera = true;

    // Load the text for the meteor chain
    _this.chainText = _this.game.add.sprite(_this.game.width / 2, _this.game.height * 0.75, 'chainText');
    _this.chainText.anchor.setTo(0.5, 0.5);
    _this.chainText.alpha = 0;
    _this.chainText.fixedToCamera = true;

    // Load the text for the hammer
    _this.hammerText = _this.game.add.sprite(_this.game.width / 2, _this.game.height * 0.75, 'hammerText');
    _this.hammerText.anchor.setTo(0.5, 0.5);
    _this.hammerText.alpha = 0;
    _this.hammerText.fixedToCamera = true;
    return _this;
  }

  // Return the item in the chest


  _createClass(Chest, [{
    key: 'getItem',
    value: function getItem() {
      console.info('Pickup called in chest');
      return this.mItem;
    }
  }, {
    key: 'showText',
    value: function showText() {
      this.show = true;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.overlapWithObject(this.player) && this.active && !this.player.meleeAttacking()) {
        console.log('Adding weapon to inventory');
        console.log(this.player);
        console.log(this.mItem);
        this.player.addToInventory(this.mItem);
        this.deactivate();
      }

      // Show text for the Sword OR Meteor Chain OR Hammer
      if (this.show === true) {
        if (this.mItem.name === 'Sword') {
          this.swordText.alpha = 5;
        } else if (this.mItem.name === 'Meteor Chain') {
          this.chainText.alpha = 8;
        } else if (this.mItem.name === 'Hammer') {
          this.hammerText.alpha = 5;
          this.hammerText.bringToTop();
        }
        this.show = false;
      } else if (this.show === false && (this.swordText.alpha > 0 || this.chainText.alpha > 0 || this.hammerText.alpha > 0)) {
        if (this.mItem.name === 'Sword') {
          this.swordText.alpha -= this._timer.physicsElapsed;
        } else if (this.mItem.name === 'Meteor Chain') {
          this.chainText.alpha -= this._timer.physicsElapsed;
        } else if (this.mItem.name === 'Hammer') {
          this.hammerText.alpha -= this._timer.physicsElapsed;
        }
        if (this.swordText.alpha < 0 || this.chainText.alpha < 0 || this.hammerText.alpha < 0) {
          if (this.mItem.name === 'Sword') {
            this.swordText.alpha = 0;
          } else if (this.mItem.name === 'Meteor Chain') {
            this.chainText.alpha = 0;
          } else if (this.mItem.name === 'Hammer') {
            this.hammerText.alpha = 0;
          }
        }
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.active = false;
      this.animations.play('inactive');
    }

    //  Checks whether the chest is overlapping with pSprite

  }, {
    key: 'overlapWithObject',
    value: function overlapWithObject(pSprite) {
      // Stops the function from executing if the player is attacking
      if (pSprite.meleeAttacking()) {
        return;
      }

      if (pSprite === null || pSprite === undefined) {
        return false;
      }
      if (!this.active) {
        return false;
      }

      //  Check left side of the collision box
      var bodies = this.game.physics.p2.hitTest(this.leftPoint);
      //  console.info(bodies.length)
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }

      //  Check center of the collision box
      bodies = this.game.physics.p2.hitTest(this.centerPoint);
      for (var _i = 0; _i < bodies.length; _i++) {
        if (bodies[_i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
      //  Check right side of the collision box
      bodies = this.game.physics.p2.hitTest(this.rightPoint);
      for (var _i2 = 0; _i2 < bodies.length; _i2++) {
        if (bodies[_i2].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
    }
  }]);

  return Chest;
}(_phaser2.default.Sprite);

exports.default = Chest;

/***/ }),
/* 75 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 76 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 25);
var LIBRARY = __webpack_require__(/*! ./_library */ 38);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 105);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 77 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 60)('keys');
var uid = __webpack_require__(/*! ./_uid */ 37);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 78 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 79 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 80 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 20)(Function.call, __webpack_require__(/*! ./_object-gopd */ 18).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 81 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 82 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 80).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 84 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 85 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 86 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var defined = __webpack_require__(/*! ./_defined */ 27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 87 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 38);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var hide = __webpack_require__(/*! ./_hide */ 13);
var has = __webpack_require__(/*! ./_has */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 49);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 88);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 88 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 41);
var descriptor = __webpack_require__(/*! ./_property-desc */ 36);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 13)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 89 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 64);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 90 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 6)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 91 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 49);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 92 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);
var createDesc = __webpack_require__(/*! ./_property-desc */ 36);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 93 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 56);
var ITERATOR = __webpack_require__(/*! ./_wks */ 6)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 49);
module.exports = __webpack_require__(/*! ./_core */ 25).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 94 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 239);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 95 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 96 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 34);
var step = __webpack_require__(/*! ./_iter-step */ 121);
var Iterators = __webpack_require__(/*! ./_iterators */ 49);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 87)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 97 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var invoke = __webpack_require__(/*! ./_invoke */ 111);
var html = __webpack_require__(/*! ./_html */ 79);
var cel = __webpack_require__(/*! ./_dom-create */ 75);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 98 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 97).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 99 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 11);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 100 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var LIBRARY = __webpack_require__(/*! ./_library */ 38);
var $typed = __webpack_require__(/*! ./_typed */ 70);
var hide = __webpack_require__(/*! ./_hide */ 13);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toIndex = __webpack_require__(/*! ./_to-index */ 130);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 95);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 101 */,
/* 102 */
/*!*********************************!*\
  !*** ./src/Enemies/WalkerAI.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _EnemyBase2 = __webpack_require__(/*! ./EnemyBase.js */ 142);

var _EnemyBase3 = _interopRequireDefault(_EnemyBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WalkerAI = function (_EnemyBase) {
  _inherits(WalkerAI, _EnemyBase);

  function WalkerAI(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        speed = _ref.speed,
        spriteName = _ref.spriteName,
        pPlayer = _ref.pPlayer,
        pointXSet = _ref.pointXSet,
        pointYSet = _ref.pointYSet;

    _classCallCheck(this, WalkerAI);

    console.log(game);

    var _this = _possibleConstructorReturn(this, (WalkerAI.__proto__ || Object.getPrototypeOf(WalkerAI)).call(this, {
      game: game,
      pX: pX,
      pY: pY,
      pSpeed: speed,
      spriteName: spriteName,
      pPlayer: pPlayer }));

    _this.body.velocity.x = speed;
    _this.pointXSet = pointXSet;
    _this.pointYSet = pointYSet;
    return _this;
  }

  _createClass(WalkerAI, [{
    key: 'setAnchor',
    value: function setAnchor(pX, pY) {
      this.anchor.setTo(pX, pY);
    }
  }, {
    key: 'damagePlayer',
    value: function damagePlayer() {
      _get(WalkerAI.prototype.__proto__ || Object.getPrototypeOf(WalkerAI.prototype), 'damagePlayer', this).call(this);
      // Reverse Direction If Needed
      if (this.player.centerX > this.centerX) {
        this.body.velocity.x = -this.speed;
      } else {
        this.body.velocity.x = this.speed;
      }
    }
  }, {
    key: 'setPoints',
    value: function setPoints(_ref2) {
      var leftX = _ref2.leftX,
          leftY = _ref2.leftY,
          rightX = _ref2.rightX,
          rightY = _ref2.rightY;

      this.leftPoint = new _phaser2.default.Point(leftX, leftY);
      this.rightPoint = new _phaser2.default.Point(rightX, rightY);
    }
  }, {
    key: 'hitsWall',
    value: function hitsWall() {}
  }, {
    key: 'update',
    value: function update() {
      if (this.body.velocity.x !== 0) {
        this.scale.setTo(Math.sign(-Math.abs(this.scale.x) * this.body.velocity.x), this.scale.y);
      }

      if (this.dying) {
        this.body.velocity.y += this._timer.physicsElapsed * 4000;
        this.animations.play('dead');
        if (this.centerY >= 4000) {
          this.destroy();
        }
        return true;
      }

      this.body.velocity.x = Math.sign(this.body.velocity.x) * this.speed;

      this.leftPoint = new _phaser2.default.Point(this.centerX - this.pointXSet, this.y + 0);
      this.rightPoint = new _phaser2.default.Point(this.centerX + this.pointXSet, this.y + 0);
      this.leftFloorPoint = new _phaser2.default.Point(this.centerX - this.pointXSet, this.y + this.pointYSet);
      this.rightFloorPoint = new _phaser2.default.Point(this.centerX + this.pointXSet, this.y + this.pointYSet);

      var bodies = void 0;
      var floorBodies = void 0;
      //  moving left
      if (this.body.velocity.x > 0) {
        bodies = this.game.physics.p2.hitTest(this.rightPoint);
        floorBodies = this.game.physics.p2.hitTest(this.rightFloorPoint);
      } else {
        bodies = this.game.physics.p2.hitTest(this.leftPoint);
        floorBodies = this.game.physics.p2.hitTest(this.leftFloorPoint);
      }
      var flipped = false;
      //  console.info(bodies.length)
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].parent.sprite !== this.player) {
          this.body.velocity.x = -this.body.velocity.x;
          flipped = true;
          this.hitsWall();
        }
      }
      if (!flipped) {
        if (floorBodies.length === 0) {
          this.body.velocity.x = -this.body.velocity.x;
          flipped = true;
          this.hitsWall();
        }
      }
      //  Check for collision with player
      bodies = this.body.collidesWith;
      // console.log(`Colliding with: ${bodies.length}`)
      for (var _i = 0; _i < bodies.length; _i++) {
        if (bodies[_i] === this.player.body) {
          if (!this.player.checkInvulnerable()) {
            this.player.takeDamage();
          }
        }
      }
    }
  }]);

  return WalkerAI;
}(_EnemyBase3.default);

exports.default = WalkerAI;

/***/ }),
/* 103 */
/*!***********************************!*\
  !*** ./src/objects/SaveScroll.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var SaveScroll = function (_Phaser$Sprite) {
  _inherits(SaveScroll, _Phaser$Sprite);

  function SaveScroll(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY;

    _classCallCheck(this, SaveScroll);

    // Initialize object basics
    console.log('Save pX: ' + pX + ', Save pY' + pY);

    var _this = _possibleConstructorReturn(this, (SaveScroll.__proto__ || Object.getPrototypeOf(SaveScroll)).call(this, game, pX, pY, 'savingScroll'));

    _this.game = game;
    _this._timer = new _phaser2.default.Time(_this.game);

    _this.scale.setTo(0.4, 0.4);
    _this.anchor.setTo(0.5, 0.5);
    _this.active = true;

    _this.leftPoint = new _phaser2.default.Point(_this.x - 60, _this.y + 30);
    _this.centerPoint = new _phaser2.default.Point(_this.x, _this.y + 30);
    _this.rightPoint = new _phaser2.default.Point(_this.x + 60, _this.y + 30);

    // Load the sprite for the saving object and the etxt that should show up for it
    _this.saveText = _this.game.add.sprite(_this.game.width, _this.game.height, 'savedTextbox');
    _this.saveText.anchor.setTo(1, 1);
    _this.saveText.alpha = 0;
    _this.show = false;
    _this.saveText.fixedToCamera = true;
    return _this;
  }

  _createClass(SaveScroll, [{
    key: 'showText',
    value: function showText() {
      this.show = true;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.show === true) {
        this.saveText.alpha = 2;
        this.show = false;
      } else if (this.show === false && this.saveText.alpha > 0) {
        this.saveText.alpha -= this._timer.physicsElapsed;
        if (this.saveText.alpha < 0) {
          this.saveText.alpha = 0;
        }
      }
      // console.log(this.saveText.alpha)
    }

    //  Checks whether the chest is overlapping with pSprite

  }, {
    key: 'overlapWithObject',
    value: function overlapWithObject(pSprite) {
      // Stops the function from executing if the player is attacking
      if (pSprite.meleeAttacking()) {
        return;
      }

      if (pSprite === null || pSprite === undefined) {
        return false;
      }
      if (!this.active) {
        return false;
      }

      //  Check left side of the collision box
      var bodies = this.game.physics.p2.hitTest(this.leftPoint);
      //  console.info(bodies.length)
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }

      //  Check center of the collision box
      bodies = this.game.physics.p2.hitTest(this.centerPoint);
      for (var _i = 0; _i < bodies.length; _i++) {
        if (bodies[_i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
      //  Check right side of the collision box
      bodies = this.game.physics.p2.hitTest(this.rightPoint);
      for (var _i2 = 0; _i2 < bodies.length; _i2++) {
        if (bodies[_i2].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
    }
  }]);

  return SaveScroll;
}(_phaser2.default.Sprite);

exports.default = SaveScroll;

/***/ }),
/* 104 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 7) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 75)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 105 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 6);


/***/ }),
/* 106 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 12);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 61)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 77)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 107 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 39);

module.exports = __webpack_require__(/*! ./_descriptors */ 7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 108 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 109 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 39);
var gOPS = __webpack_require__(/*! ./_object-gops */ 62);
var pIE = __webpack_require__(/*! ./_object-pie */ 55);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IObject = __webpack_require__(/*! ./_iobject */ 54);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 110 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 111);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 111 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 112 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 48).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 81);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 113 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 48).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 81) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 114 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 21);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 115 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 116 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 117 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 84);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 118 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 119 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var IObject = __webpack_require__(/*! ./_iobject */ 54);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 120 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 121 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 122 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 7) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 66)
});


/***/ }),
/* 123 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 124 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 99);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 125 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 126);
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 69)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 126 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var create = __webpack_require__(/*! ./_object-create */ 41);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var forOf = __webpack_require__(/*! ./_for-of */ 45);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 87);
var step = __webpack_require__(/*! ./_iter-step */ 121);
var setSpecies = __webpack_require__(/*! ./_set-species */ 43);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var fastKey = __webpack_require__(/*! ./_meta */ 33).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 127 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 126);
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 69)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 128 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 30)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var meta = __webpack_require__(/*! ./_meta */ 33);
var assign = __webpack_require__(/*! ./_object-assign */ 109);
var weak = __webpack_require__(/*! ./_collection-weak */ 129);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 69)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 129 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
var getWeak = __webpack_require__(/*! ./_meta */ 33).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var forOf = __webpack_require__(/*! ./_for-of */ 45);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 30);
var $has = __webpack_require__(/*! ./_has */ 12);
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 130 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 131 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42);
var gOPS = __webpack_require__(/*! ./_object-gops */ 62);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 132 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 63);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 6)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 133 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var repeat = __webpack_require__(/*! ./_string-repeat */ 83);
var defined = __webpack_require__(/*! ./_defined */ 27);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 134 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 39);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var isEnum = __webpack_require__(/*! ./_object-pie */ 55).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 135 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 56);
var from = __webpack_require__(/*! ./_array-from-iterable */ 136);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 136 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 45);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 137 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 138 */,
/* 139 */,
/* 140 */
/*!*******************************!*\
  !*** ./src/itemData/Sword.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item2 = __webpack_require__(/*! ./Item.js */ 58);

var _Item3 = _interopRequireDefault(_Item2);

var _Player = __webpack_require__(/*! ../sprites/Player */ 57);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sword = function (_Item) {
  _inherits(Sword, _Item);

  function Sword() {
    _classCallCheck(this, Sword);

    var _this = _possibleConstructorReturn(this, (Sword.__proto__ || Object.getPrototypeOf(Sword)).call(this, 'Sword'));
    // Initialize object basics


    _this.isWeapon = true;
    _this.cooldown = 0.6;
    return _this;
  }

  _createClass(Sword, [{
    key: 'activate',
    value: function activate(pPlayer) {
      //  pPlayer.body.y -= 100
      pPlayer.actionState = _Player2.default.actionStates.SWORD;
    }
  }]);

  return Sword;
}(_Item3.default);

exports.default = Sword;

/***/ }),
/* 141 */
/*!*************************************!*\
  !*** ./src/itemData/MeteorChain.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item2 = __webpack_require__(/*! ./Item.js */ 58);

var _Item3 = _interopRequireDefault(_Item2);

var _Player = __webpack_require__(/*! ../sprites/Player */ 57);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeteorChain = function (_Item) {
  _inherits(MeteorChain, _Item);

  function MeteorChain() {
    _classCallCheck(this, MeteorChain);

    var _this = _possibleConstructorReturn(this, (MeteorChain.__proto__ || Object.getPrototypeOf(MeteorChain)).call(this, 'Meteor Chain'));
    // Initialize object basics


    _this.isWeapon = true;
    _this.cooldown = 0.6;
    return _this;
  }

  _createClass(MeteorChain, [{
    key: 'activate',
    value: function activate(pPlayer) {
      if (pPlayer.actionState === _Player2.default.actionStates.NONE) {
        pPlayer.actionState = _Player2.default.actionStates.METEOR_CHAIN_SWING;
      }
    }
  }]);

  return MeteorChain;
}(_Item3.default);

exports.default = MeteorChain;

/***/ }),
/* 142 */
/*!**********************************!*\
  !*** ./src/Enemies/EnemyBase.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EnemyBase = function (_Phaser$Sprite) {
  _inherits(EnemyBase, _Phaser$Sprite);

  function EnemyBase(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pSpeed = _ref.pSpeed,
        spriteName = _ref.spriteName,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, EnemyBase);

    // Animation setup will be handled in child objects
    var _this = _possibleConstructorReturn(this, (EnemyBase.__proto__ || Object.getPrototypeOf(EnemyBase)).call(this, game, pX, pY, spriteName, 0));

    _this.speed = pSpeed;
    _this.player = pPlayer;
    _this.dying = false;

    _this.body = new _phaser2.default.Physics.P2.Body(_this.game, _this, pX, pY);
    _this._timer = new _phaser2.default.Time(_this.game);

    _this.body.onBeginContact.add(_this.checkPlayer, _this);
    return _this;
  }

  // Check for collision with the player


  _createClass(EnemyBase, [{
    key: 'checkPlayer',
    value: function checkPlayer(bodyA, bodyB, shapeA, shapeB, contactData) {
      // Don't check for damage if this enemy is dying
      if (this.dying) {
        return;
      }

      // If the player is attacking, we check the player's hitbox AND the weapon hitbox
      if (this.player.meleeAttacking()) {
        if (bodyA === this.player.body) {
          // Kill the enemy
          this.death();
        }
        // If the player isn't attacking, only check the player's hitbox
      } else if (bodyA === this.player.body) {
        // Damage the player and give the player 1 second of iFrames
        this.damagePlayer();
      }
    }

    // Called when this enemy is killed

  }, {
    key: 'death',
    value: function death() {
      this.body.velocity.x = 0;
      this.dying = true;
      this.events.onOutOfBounds.add(this.kill, this);
      this.game.camera.shake(0.005, 100);
    }

    // Called whenever this enemy damages the player

  }, {
    key: 'damagePlayer',
    value: function damagePlayer() {
      this.player.takeDamage();
      this.player.setiFrames(1.0);
    }
  }, {
    key: 'update',
    value: function update() {
      // If this enemy is dying
      if (this.dying) {
        this.body.velocity.y += this._timer.physicsElapsed * 4000;
        this.animations.play('dead');
        if (this.centerY >= 4000) {
          this.destroy();
        }
        return true;
      }
    }
  }]);

  return EnemyBase;
}(_phaser2.default.Sprite);

exports.default = EnemyBase;

/***/ }),
/* 143 */
/*!**********************************!*\
  !*** ./src/PopsBoss/PopsHead.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _PopsConfig = __webpack_require__(/*! ../PopsConfig */ 379);

var _PopsConfig2 = _interopRequireDefault(_PopsConfig);

var _PopsHands = __webpack_require__(/*! ./PopsHands.js */ 380);

var _PopsHands2 = _interopRequireDefault(_PopsHands);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _FlyingDemon = __webpack_require__(/*! ../Enemies/FlyingDemon.js */ 59);

var _FlyingDemon2 = _interopRequireDefault(_FlyingDemon);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

var _DyingPops = __webpack_require__(/*! ./DyingPops.js */ 382);

var _DyingPops2 = _interopRequireDefault(_DyingPops);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var PopsHead = function (_Phaser$Sprite) {
  _inherits(PopsHead, _Phaser$Sprite);

  function PopsHead(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        pPlayer = _ref.pPlayer,
        background = _ref.background;

    _classCallCheck(this, PopsHead);

    console.log('X: ' + x + ' Y: ' + y);

    var _this = _possibleConstructorReturn(this, (PopsHead.__proto__ || Object.getPrototypeOf(PopsHead)).call(this, game, x, y, 'pops-head', 0));

    _this.damageTimer = 0.0;
    _this._timer = new _phaser2.default.Time(_this.game);
    _this.health = 5;
    _this.player = pPlayer;
    _this.background = background;

    _this.nextAttack = 0;
    _this.curWave = 1;

    _this.nextAttackTimer = 4.0;

    _this.anchor.setTo(0.5, 0.5);
    _this.body = new _phaser2.default.Physics.P2.Body(_this.game, _this, _this.x, _this.y);

    _this.body.debug = true;
    _this.body.fixedRotation = true;

    _this.summoning = false;
    // Remove the default shape
    _this.body.clearShapes();
    // this.body.shape.sensor = true

    // The Physics sensors that represent Pops' hands
    // this.leftHandSensor = this.body.addRectangle(200, 240, -550, 230)
    // this.leftHandSensor.sensor = true
    //
    // this.rightHandSensor = this.body.addRectangle(200, 240, 550, 230)
    // this.rightHandSensor.sensor = true

    _this.enemy1Dead = true;
    _this.enemy2Dead = true;
    _this.enemy3Dead = true;
    _this.enemy4Dead = true;
    _this.enemy5Dead = true;
    _this.enemy6Dead = true;
    _this.enemy7Dead = true;
    _this.enemy8Dead = true;
    _this.enemy9Dead = true;
    _this.enemy10Dead = true;
    _this.enemy11Dead = true;
    _this.enemy12Dead = true;
    _this.enemy13Dead = true;

    // console.log(this.body)

    _this.canBeHurt = false;
    _this.AttackState = 'NONE';

    _this.BossHands = new _PopsHands2.default({
      game: game,
      x: x,
      y: y + 600,
      pPopsHead: _this
    });

    // Need to shrink BossHands
    _this.game.add.existing(_this.BossHands);
    _this.BossHands.scale.setTo(8.4, 8.4);

    // Add animations for head
    _this.animations.add('Healthy_Idle', [16, 17, 18, 19, 20, 21, 20, 19, 18, 17], 10, true);
    _this.animations.add('Healthy_Summon', (0, _utils.sequentialNumArray)(8, 14), 10, false);
    _this.animations.add('Healthy_Slam_Warning', [0, 1, 2, 3, 3, 3], 7, false);
    _this.animations.add('Healthy_Slam_Attack', [3, 3, 3], 7, false);
    // this.animations.play('Healthy_Idle')
    // this.setHandColliders()

    _this.animations.getAnimation('Healthy_Summon').onComplete.add(function () {
      _this.animations.play('Healthy_Idle');
    }, _this);

    _this.animations.getAnimation('Healthy_Slam_Warning').onComplete.add(function () {
      _this.animations.play('Healthy_Slam_Attack');
      _this.BossHands.animations.play('SlamAttack');
    }, _this);

    _this.animations.getAnimation('Healthy_Slam_Attack').onComplete.add(function () {
      if (_this.summoning) {
        _this.animations.play('Healthy_Slam_Attack');
      } else {
        _this.animations.play('Healthy_Idle');
      }
    }, _this);

    _this.animations.play('Healthy_Idle');
    // Healthy, Hurt, and Dying
    // Taking Damage Head animation
    return _this;
  }

  _createClass(PopsHead, [{
    key: 'endTakingDamage',
    value: function endTakingDamage() {
      // Set Pops head to the appropriate head animation for this state
      this.nextAttackTimer = 4.0;
    }
  }, {
    key: 'startTakingDamage',
    value: function startTakingDamage() {
      this.damageTimer = _PopsConfig2.default.DAMAGE_TIMER;
      this.health--;
      // Set head animation to the taking damage head animation
    }
  }, {
    key: 'endAttack',
    value: function endAttack() {
      this.AttackState = 'NONE';
      this.body.removeShape(this.leftHandSensor);
      this.body.removeShape(this.rightHandSensor);
    }
  }, {
    key: 'beginAttack',
    value: function beginAttack() {
      if (this.curWave === 6) {
        this.death();
        return;
      }

      switch (this.AttackState) {
        case 'SUMMON_MONSTERS':
          this.summonMonsters();
          this.BossHands.animations.play('SummonMonsters');
          break;
        case 'SLAM':
          this.slam();
          break;
        default:
          console.error('Pops used an unrecognized attack: ' + this.AttackState);
          break;
      }
    }
  }, {
    key: 'death',
    value: function death() {
      this.game.camera.shake(0.015, 3000);

      console.log('Game:');
      console.log(this.game);
      this.DyingPops = new _DyingPops2.default({
        game: this.game,
        x: this.x,
        y: this.y + 100
      });
      this.DyingPops.scale.setTo(2, 2);

      this.game.add.existing(this.DyingPops);

      this.DyingPops.sendToBack();
      this.background.sendToBack();
      this.player.dontDieOnDab = true;
      this.player.ContinueDab = true;
      this.BossHands.destroy();
      this.destroy();
    }

    // ATTACK FUNCTIONS

  }, {
    key: 'summonMonsters',
    value: function summonMonsters() {
      this.AttackState = 'SUMMON_MONSTERS';
      this.animations.play('Healthy_Summon');
    }
  }, {
    key: 'slam',
    value: function slam() {
      this.player.setiFrames(2.0);
      this.summoning = true;
      this.AttackState = 'SLAM';
      this.animations.play('Healthy_Slam_Attack');
      this.BossHands.animations.play('SlamAttack');
    }
  }, {
    key: 'setHandColliders',
    value: function setHandColliders() {
      this.body.clearShapes();
      switch (this.AttackState) {
        case 'SUMMON_MONSTERS':

          this.body.kinematic = true;
          this.leftHandSensor = this.body.addRectangle(200, 700, -1400, 300);
          this.rightHandSensor = this.body.addRectangle(200, 700, 1400, 300);

          break;
        case 'SLAM':
          this.slam();
          break;
        default:
          console.error('Pops used an unrecognized attack: ' + this.AttackState);
          break;
      }
    }
  }, {
    key: 'spawnWave',
    value: function spawnWave() {
      console.log('Spawning wave ' + this.curWave);

      if (this.curWave === 1) {
        this.spawnWave1();
      } else if (this.curWave === 2) {
        this.spawnWave2();
      } else if (this.curWave === 3) {
        this.spawnWave3();
      } else if (this.curWave === 4) {
        this.spawnWave4();
      } else if (this.curWave === 5) {
        this.spawnWave5();
      }

      this.curWave++;
    }
  }, {
    key: 'allEnemiesKilled',
    value: function allEnemiesKilled() {
      if (this.enemy1Dead && this.enemy2Dead && this.enemy3Dead && this.enemy4Dead && this.enemy5Dead && this.enemy6Dead && this.enemy7Dead && this.enemy8Dead && this.enemy9Dead && this.enemy10Dead && this.enemy11Dead && this.enemy12Dead && this.enemy13Dead) {
        return true;
      }
    }
  }, {
    key: 'spawnWave1',
    value: function spawnWave1() {
      this.enemy1 = new _smallDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy1);

      this.enemy1Dead = false;

      this.enemy2 = new _smallDemon2.default({
        game: this.game,
        pX: 1680,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy2);

      this.enemy2Dead = false;

      this.enemy3 = new _smallDemon2.default({
        game: this.game,
        pX: 1760,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy3);

      this.enemy3Dead = false;

      this.enemy4 = new _smallDemon2.default({
        game: this.game,
        pX: 2220,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy4);

      this.enemy4Dead = false;

      this.enemy5 = new _smallDemon2.default({
        game: this.game,
        pX: 2440,
        pY: 2765,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy5);

      this.enemy5Dead = false;

      this.enemy6 = new _smallDemon2.default({
        game: this.game,
        pX: 2060,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy6);

      this.enemy6Dead = false;
    }
  }, {
    key: 'spawnWave2',
    value: function spawnWave2() {
      this.enemy1 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy1);

      this.enemy1Dead = false;

      this.enemy2 = new _smallDemon2.default({
        game: this.game,
        pX: 1680,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy2);

      this.enemy2Dead = false;

      this.enemy3 = new _smallDemon2.default({
        game: this.game,
        pX: 1760,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy3);

      this.enemy3Dead = false;

      this.enemy4 = new _smallDemon2.default({
        game: this.game,
        pX: 2220,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy4);

      this.enemy4Dead = false;

      this.enemy5 = new _smallDemon2.default({
        game: this.game,
        pX: 2440,
        pY: 2765,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy5);

      this.enemy5Dead = false;

      this.enemy6 = new _smallDemon2.default({
        game: this.game,
        pX: 2060,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy6);

      this.enemy6Dead = false;

      this.enemy7 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1920,
        pY: 2400,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy7);

      this.enemy7Dead = false;

      this.enemy8 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2190,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy8);

      this.enemy8Dead = false;
    }
  }, {
    key: 'spawnWave4',
    value: function spawnWave4() {
      this.enemy1 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy1);

      this.enemy1Dead = false;

      this.enemy2 = new _smallDemon2.default({
        game: this.game,
        pX: 1400,
        pY: 2670,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy2);

      this.enemy2Dead = false;

      this.enemy4 = new _smallDemon2.default({
        game: this.game,
        pX: 2220,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy4);

      this.enemy4Dead = false;

      this.enemy5 = new _smallDemon2.default({
        game: this.game,
        pX: 2440,
        pY: 2765,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy5);

      this.enemy5Dead = false;

      this.enemy6 = new _smallDemon2.default({
        game: this.game,
        pX: 2060,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy6);

      this.enemy6Dead = false;

      this.enemy7 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1920,
        pY: 2400,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy7);

      this.enemy7Dead = false;

      this.enemy8 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2190,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy8);

      this.enemy8Dead = false;

      this.enemy9 = new _smallDemon2.default({
        game: this.game,
        pX: 1680,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy9);

      this.enemy9Dead = false;

      this.enemy10 = new _smallDemon2.default({
        game: this.game,
        pX: 1760,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy10);

      this.enemy10Dead = false;
    }
  }, {
    key: 'spawnWave3',
    value: function spawnWave3() {
      this.enemy1 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy1);

      this.enemy1Dead = false;

      this.enemy2 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1620,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2700,
        pHeightMin: 2550
      });
      this.game.add.existing(this.enemy2);

      this.enemy2Dead = false;

      this.enemy3 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1820,
        pY: 2650,
        pPlayer: this.player,
        pHeightMax: 2800,
        pHeightMin: 2650
      });
      this.game.add.existing(this.enemy3);

      this.enemy3Dead = false;

      this.enemy4 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2020,
        pY: 2800,
        pPlayer: this.player,
        pHeightMax: 2800,
        pHeightMin: 2650
      });
      this.game.add.existing(this.enemy4);

      this.enemy4Dead = false;

      this.enemy5 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2220,
        pY: 2650,
        pPlayer: this.player,
        pHeightMax: 2800,
        pHeightMin: 2650
      });
      this.game.add.existing(this.enemy5);

      this.enemy5Dead = false;

      this.enemy6 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2420,
        pY: 2700,
        pPlayer: this.player,
        pHeightMax: 2700,
        pHeightMin: 2550
      });
      this.game.add.existing(this.enemy6);

      this.enemy6Dead = false;

      this.enemy7 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1920,
        pY: 2400,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy7);

      this.enemy7Dead = false;

      this.enemy8 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2120,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy8);

      this.enemy8Dead = false;

      this.enemy9 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1420,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy9);

      this.enemy9Dead = false;

      this.enemy10 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2620,
        pY: 2500,
        pPlayer: this.player,
        pHeightMax: 2650,
        pHeightMin: 2550
      });
      this.game.add.existing(this.enemy10);

      this.enemy10Dead = false;
    }
  }, {
    key: 'spawnWave5',
    value: function spawnWave5() {
      this.enemy1 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy1);

      this.enemy1Dead = false;

      this.enemy2 = new _smallDemon2.default({
        game: this.game,
        pX: 1680,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy2);

      this.enemy2Dead = false;

      this.enemy3 = new _smallDemon2.default({
        game: this.game,
        pX: 1760,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy3);

      this.enemy3Dead = false;

      this.enemy4 = new _smallDemon2.default({
        game: this.game,
        pX: 2220,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy4);

      this.enemy4Dead = false;

      this.enemy5 = new _smallDemon2.default({
        game: this.game,
        pX: 2440,
        pY: 2765,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy5);

      this.enemy5Dead = false;

      this.enemy6 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2420,
        pY: 2700,
        pPlayer: this.player,
        pHeightMax: 2700,
        pHeightMin: 2550
      });
      this.game.add.existing(this.enemy6);

      this.enemy6Dead = false;

      this.enemy7 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1920,
        pY: 2400,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy7);

      this.enemy7Dead = false;

      this.enemy8 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2120,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy8);

      this.enemy8Dead = false;

      this.enemy9 = new _FlyingDemon2.default({
        game: this.game,
        pX: 1420,
        pY: 2550,
        pPlayer: this.player,
        pHeightMax: 2550,
        pHeightMin: 2400
      });
      this.game.add.existing(this.enemy9);

      this.enemy9Dead = false;

      this.enemy10 = new _FlyingDemon2.default({
        game: this.game,
        pX: 2620,
        pY: 2500,
        pPlayer: this.player,
        pHeightMax: 2650,
        pHeightMin: 2550
      });
      this.game.add.existing(this.enemy10);

      this.enemy10Dead = false;

      this.enemy11 = new _smallDemon2.default({
        game: this.game,
        pX: 1720,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy11);

      this.enemy11Dead = false;

      this.enemy12 = new _smallDemon2.default({
        game: this.game,
        pX: 2060,
        pY: 2845,
        pPlayer: this.player
      });
      this.game.add.existing(this.enemy6);
      this.enemy12Dead = false;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.enemy1 && this.enemy1.dying) {
        this.enemy1Dead = true;
      }
      if (this.enemy2 && this.enemy2.dying) {
        this.enemy2Dead = true;
      }
      if (this.enemy3 && this.enemy3.dying) {
        this.enemy3Dead = true;
      }
      if (this.enemy4 && this.enemy4.dying) {
        this.enemy4Dead = true;
      }
      if (this.enemy5 && this.enemy5.dying) {
        this.enemy5Dead = true;
      }
      if (this.enemy6 && this.enemy6.dying) {
        this.enemy6Dead = true;
      }
      if (this.enemy7 && this.enemy7.dying) {
        this.enemy7Dead = true;
      }
      if (this.enemy8 && this.enemy8.dying) {
        this.enemy8Dead = true;
      }
      if (this.enemy9 && this.enemy9.dying) {
        this.enemy9Dead = true;
      }
      if (this.enemy10 && this.enemy10.dying) {
        this.enemy10Dead = true;
      }
      // console.log(this.enemy1Dead)

      if (this.allEnemiesKilled() && !this.summoning) {
        this.AttackState = 'SLAM';
        this.beginAttack();
      }

      if (this.player.dabbing) {
        this.health = 0;
        this.death();
      }
    }
  }]);

  return PopsHead;
}(_phaser2.default.Sprite);

exports.default = PopsHead;

/***/ }),
/* 144 */
/*!*****************************!*\
  !*** ./src/sprites/Pops.js ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopsDesk = function (_Phaser$Sprite) {
  _inherits(PopsDesk, _Phaser$Sprite);

  function PopsDesk(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, PopsDesk);

    var _this = _possibleConstructorReturn(this, (PopsDesk.__proto__ || Object.getPrototypeOf(PopsDesk)).call(this, game, x, y, 'popsDesk', 0));

    _this.animations.add('default', [0, 1, 2, 3], 10, false);
    _this.animations.play('default', 5, true);
    _this.anchor.setTo(0.5, 0.5);
    return _this;
  }

  return PopsDesk;
}(_phaser2.default.Sprite);

exports.default = PopsDesk;

/***/ }),
/* 145 */
/*!**********************************!*\
  !*** ./src/sprites/NinjaIdle.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NinjaIdle = function (_Phaser$Sprite) {
  _inherits(NinjaIdle, _Phaser$Sprite);

  function NinjaIdle(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, NinjaIdle);

    var _this = _possibleConstructorReturn(this, (NinjaIdle.__proto__ || Object.getPrototypeOf(NinjaIdle)).call(this, game, x, y, 'player-main', 0));

    _this.animations.add('idle', [24], 4, true);
    _this.animations.play('idle', 0, true);
    _this.anchor.setTo(0.5, 1.0);
    return _this;
  }

  return NinjaIdle;
}(_phaser2.default.Sprite);

exports.default = NinjaIdle;

/***/ }),
/* 146 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */147);
module.exports = __webpack_require__(/*! D:\Student Data\Desktop\GDD-325 2D Game Design and Development\Towja\TowerNinja\src\main.js */349);


/***/ }),
/* 147 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 148);

__webpack_require__(/*! regenerator-runtime/runtime */ 345);

__webpack_require__(/*! core-js/fn/regexp/escape */ 346);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 53)))

/***/ }),
/* 148 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 149);
__webpack_require__(/*! ./modules/es6.object.create */ 151);
__webpack_require__(/*! ./modules/es6.object.define-property */ 152);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 153);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 154);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 155);
__webpack_require__(/*! ./modules/es6.object.keys */ 156);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 157);
__webpack_require__(/*! ./modules/es6.object.freeze */ 158);
__webpack_require__(/*! ./modules/es6.object.seal */ 159);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 160);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 161);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 162);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 163);
__webpack_require__(/*! ./modules/es6.object.assign */ 164);
__webpack_require__(/*! ./modules/es6.object.is */ 165);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 167);
__webpack_require__(/*! ./modules/es6.object.to-string */ 168);
__webpack_require__(/*! ./modules/es6.function.bind */ 169);
__webpack_require__(/*! ./modules/es6.function.name */ 170);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 171);
__webpack_require__(/*! ./modules/es6.parse-int */ 172);
__webpack_require__(/*! ./modules/es6.parse-float */ 173);
__webpack_require__(/*! ./modules/es6.number.constructor */ 174);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 175);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 176);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 177);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 178);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 179);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 180);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 181);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 182);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 183);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 184);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 185);
__webpack_require__(/*! ./modules/es6.math.acosh */ 186);
__webpack_require__(/*! ./modules/es6.math.asinh */ 187);
__webpack_require__(/*! ./modules/es6.math.atanh */ 188);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 189);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 190);
__webpack_require__(/*! ./modules/es6.math.cosh */ 191);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 192);
__webpack_require__(/*! ./modules/es6.math.fround */ 193);
__webpack_require__(/*! ./modules/es6.math.hypot */ 194);
__webpack_require__(/*! ./modules/es6.math.imul */ 195);
__webpack_require__(/*! ./modules/es6.math.log10 */ 196);
__webpack_require__(/*! ./modules/es6.math.log1p */ 197);
__webpack_require__(/*! ./modules/es6.math.log2 */ 198);
__webpack_require__(/*! ./modules/es6.math.sign */ 199);
__webpack_require__(/*! ./modules/es6.math.sinh */ 200);
__webpack_require__(/*! ./modules/es6.math.tanh */ 201);
__webpack_require__(/*! ./modules/es6.math.trunc */ 202);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 203);
__webpack_require__(/*! ./modules/es6.string.raw */ 204);
__webpack_require__(/*! ./modules/es6.string.trim */ 205);
__webpack_require__(/*! ./modules/es6.string.iterator */ 206);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 207);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 208);
__webpack_require__(/*! ./modules/es6.string.includes */ 209);
__webpack_require__(/*! ./modules/es6.string.repeat */ 210);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 211);
__webpack_require__(/*! ./modules/es6.string.anchor */ 212);
__webpack_require__(/*! ./modules/es6.string.big */ 213);
__webpack_require__(/*! ./modules/es6.string.blink */ 214);
__webpack_require__(/*! ./modules/es6.string.bold */ 215);
__webpack_require__(/*! ./modules/es6.string.fixed */ 216);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 217);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 218);
__webpack_require__(/*! ./modules/es6.string.italics */ 219);
__webpack_require__(/*! ./modules/es6.string.link */ 220);
__webpack_require__(/*! ./modules/es6.string.small */ 221);
__webpack_require__(/*! ./modules/es6.string.strike */ 222);
__webpack_require__(/*! ./modules/es6.string.sub */ 223);
__webpack_require__(/*! ./modules/es6.string.sup */ 224);
__webpack_require__(/*! ./modules/es6.date.now */ 225);
__webpack_require__(/*! ./modules/es6.date.to-json */ 226);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 227);
__webpack_require__(/*! ./modules/es6.date.to-string */ 229);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 230);
__webpack_require__(/*! ./modules/es6.array.is-array */ 232);
__webpack_require__(/*! ./modules/es6.array.from */ 233);
__webpack_require__(/*! ./modules/es6.array.of */ 234);
__webpack_require__(/*! ./modules/es6.array.join */ 235);
__webpack_require__(/*! ./modules/es6.array.slice */ 236);
__webpack_require__(/*! ./modules/es6.array.sort */ 237);
__webpack_require__(/*! ./modules/es6.array.for-each */ 238);
__webpack_require__(/*! ./modules/es6.array.map */ 240);
__webpack_require__(/*! ./modules/es6.array.filter */ 241);
__webpack_require__(/*! ./modules/es6.array.some */ 242);
__webpack_require__(/*! ./modules/es6.array.every */ 243);
__webpack_require__(/*! ./modules/es6.array.reduce */ 244);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 245);
__webpack_require__(/*! ./modules/es6.array.index-of */ 246);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 247);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 248);
__webpack_require__(/*! ./modules/es6.array.fill */ 249);
__webpack_require__(/*! ./modules/es6.array.find */ 250);
__webpack_require__(/*! ./modules/es6.array.find-index */ 251);
__webpack_require__(/*! ./modules/es6.array.species */ 252);
__webpack_require__(/*! ./modules/es6.array.iterator */ 96);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 253);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 254);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 122);
__webpack_require__(/*! ./modules/es6.regexp.match */ 255);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 256);
__webpack_require__(/*! ./modules/es6.regexp.search */ 257);
__webpack_require__(/*! ./modules/es6.regexp.split */ 258);
__webpack_require__(/*! ./modules/es6.promise */ 259);
__webpack_require__(/*! ./modules/es6.map */ 125);
__webpack_require__(/*! ./modules/es6.set */ 127);
__webpack_require__(/*! ./modules/es6.weak-map */ 128);
__webpack_require__(/*! ./modules/es6.weak-set */ 260);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 261);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 262);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 263);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 264);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 265);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 266);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 267);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 268);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 269);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 270);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 271);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 272);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 273);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 274);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 275);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 276);
__webpack_require__(/*! ./modules/es6.reflect.get */ 277);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 278);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 279);
__webpack_require__(/*! ./modules/es6.reflect.has */ 280);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 281);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 282);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 283);
__webpack_require__(/*! ./modules/es6.reflect.set */ 284);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 285);
__webpack_require__(/*! ./modules/es7.array.includes */ 286);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 287);
__webpack_require__(/*! ./modules/es7.array.flatten */ 288);
__webpack_require__(/*! ./modules/es7.string.at */ 289);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 290);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 291);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 292);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 293);
__webpack_require__(/*! ./modules/es7.string.match-all */ 294);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 295);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 296);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 297);
__webpack_require__(/*! ./modules/es7.object.values */ 298);
__webpack_require__(/*! ./modules/es7.object.entries */ 299);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 300);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 301);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 302);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 303);
__webpack_require__(/*! ./modules/es7.map.to-json */ 304);
__webpack_require__(/*! ./modules/es7.set.to-json */ 305);
__webpack_require__(/*! ./modules/es7.map.of */ 306);
__webpack_require__(/*! ./modules/es7.set.of */ 307);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 308);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 309);
__webpack_require__(/*! ./modules/es7.map.from */ 310);
__webpack_require__(/*! ./modules/es7.set.from */ 311);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 312);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 313);
__webpack_require__(/*! ./modules/es7.global */ 314);
__webpack_require__(/*! ./modules/es7.system.global */ 315);
__webpack_require__(/*! ./modules/es7.error.is-error */ 316);
__webpack_require__(/*! ./modules/es7.math.clamp */ 317);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 318);
__webpack_require__(/*! ./modules/es7.math.degrees */ 319);
__webpack_require__(/*! ./modules/es7.math.fscale */ 320);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 321);
__webpack_require__(/*! ./modules/es7.math.isubh */ 322);
__webpack_require__(/*! ./modules/es7.math.imulh */ 323);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 324);
__webpack_require__(/*! ./modules/es7.math.radians */ 325);
__webpack_require__(/*! ./modules/es7.math.scale */ 326);
__webpack_require__(/*! ./modules/es7.math.umulh */ 327);
__webpack_require__(/*! ./modules/es7.math.signbit */ 328);
__webpack_require__(/*! ./modules/es7.promise.finally */ 329);
__webpack_require__(/*! ./modules/es7.promise.try */ 330);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 331);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 332);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 333);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 334);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 335);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 336);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 337);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 338);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 339);
__webpack_require__(/*! ./modules/es7.asap */ 340);
__webpack_require__(/*! ./modules/es7.observable */ 341);
__webpack_require__(/*! ./modules/web.timers */ 342);
__webpack_require__(/*! ./modules/web.immediate */ 343);
__webpack_require__(/*! ./modules/web.dom.iterable */ 344);
module.exports = __webpack_require__(/*! ./modules/_core */ 25);


/***/ }),
/* 149 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 12);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var META = __webpack_require__(/*! ./_meta */ 33).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 60);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 47);
var uid = __webpack_require__(/*! ./_uid */ 37);
var wks = __webpack_require__(/*! ./_wks */ 6);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 105);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 76);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 150);
var isArray = __webpack_require__(/*! ./_is-array */ 63);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var createDesc = __webpack_require__(/*! ./_property-desc */ 36);
var _create = __webpack_require__(/*! ./_object-create */ 41);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 108);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $DP = __webpack_require__(/*! ./_object-dp */ 8);
var $keys = __webpack_require__(/*! ./_object-keys */ 39);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 42).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 55).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 62).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 38)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 150 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 39);
var gOPS = __webpack_require__(/*! ./_object-gops */ 62);
var pIE = __webpack_require__(/*! ./_object-pie */ 55);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 151 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 41) });


/***/ }),
/* 152 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 8).f });


/***/ }),
/* 153 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 7), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 107) });


/***/ }),
/* 154 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

__webpack_require__(/*! ./_object-sap */ 29)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 155 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);

__webpack_require__(/*! ./_object-sap */ 29)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 156 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var $keys = __webpack_require__(/*! ./_object-keys */ 39);

__webpack_require__(/*! ./_object-sap */ 29)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 157 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 29)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 108).f;
});


/***/ }),
/* 158 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 159 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 160 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 33).onFreeze;

__webpack_require__(/*! ./_object-sap */ 29)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 161 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 29)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 162 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 29)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 163 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 29)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 164 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 109) });


/***/ }),
/* 165 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 166) });


/***/ }),
/* 166 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 167 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 80).set });


/***/ }),
/* 168 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 56);
var test = {};
test[__webpack_require__(/*! ./_wks */ 6)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 14)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 169 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 110) });


/***/ }),
/* 170 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 171 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 6)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 172 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 112);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 173 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 113);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 174 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 12);
var cof = __webpack_require__(/*! ./_cof */ 21);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 48).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 41)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 14)(global, NUMBER, $Number);
}


/***/ }),
/* 175 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 114);
var repeat = __webpack_require__(/*! ./_string-repeat */ 83);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 176 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 114);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 177 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 178 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 179 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 115) });


/***/ }),
/* 180 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 181 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 115);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 182 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 183 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 184 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 113);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 185 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 112);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 186 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 116);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 187 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 188 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 189 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 84);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 190 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 191 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 192 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 193 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 117) });


/***/ }),
/* 194 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 195 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 196 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 197 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 116) });


/***/ }),
/* 198 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 199 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 84) });


/***/ }),
/* 200 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 201 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 85);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 202 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 203 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 204 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toLength = __webpack_require__(/*! ./_to-length */ 9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 205 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 48)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 206 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 86)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 87)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 207 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 86)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 208 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var context = __webpack_require__(/*! ./_string-context */ 89);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 209 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 89);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 210 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 83)
});


/***/ }),
/* 211 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var context = __webpack_require__(/*! ./_string-context */ 89);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 90)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 212 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 15)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 213 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 15)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 214 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 15)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 215 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 15)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 216 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 15)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 217 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 15)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 218 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 15)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 219 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 15)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 220 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 15)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 221 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 15)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 222 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 15)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 223 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 15)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 224 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 15)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 225 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 226 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 227 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 228);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 228 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 229 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 14)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 230 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 6)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 13)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 231));


/***/ }),
/* 231 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 232 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 63) });


/***/ }),
/* 233 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 20);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var call = __webpack_require__(/*! ./_iter-call */ 118);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 91);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 93);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 65)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 234 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 235 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 54) != Object || !__webpack_require__(/*! ./_strict-method */ 22)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 236 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 79);
var cof = __webpack_require__(/*! ./_cof */ 21);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 237 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 238 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 30)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 239 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 63);
var SPECIES = __webpack_require__(/*! ./_wks */ 6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 240 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 30)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 241 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 30)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 242 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 30)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 243 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 30)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 244 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 119);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 245 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 119);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 246 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 61)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 247 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 248 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 120) });

__webpack_require__(/*! ./_add-to-unscopables */ 34)('copyWithin');


/***/ }),
/* 249 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 95) });

__webpack_require__(/*! ./_add-to-unscopables */ 34)('fill');


/***/ }),
/* 250 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 30)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 34)(KEY);


/***/ }),
/* 251 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 30)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 34)(KEY);


/***/ }),
/* 252 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 43)('Array');


/***/ }),
/* 253 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 82);
var dP = __webpack_require__(/*! ./_object-dp */ 8).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 64);
var $flags = __webpack_require__(/*! ./_flags */ 66);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 7) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 6)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 14)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 43)('RegExp');


/***/ }),
/* 254 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 122);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 66);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 14)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 255 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 67)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 256 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 67)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 257 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 67)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 258 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 67)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 64);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 259 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 38);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 20);
var classof = __webpack_require__(/*! ./_classof */ 56);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var forOf = __webpack_require__(/*! ./_for-of */ 45);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 68);
var task = __webpack_require__(/*! ./_task */ 97).set;
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 99);
var perform = __webpack_require__(/*! ./_perform */ 123);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 124);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 46)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 47)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 43)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 25)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 65)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 260 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 129);
var validate = __webpack_require__(/*! ./_validate-collection */ 50);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 69)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 261 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 70);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 100);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 40);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 68);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 43)(ARRAY_BUFFER);


/***/ }),
/* 262 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 70).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 100).DataView
});


/***/ }),
/* 263 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 264 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 265 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 266 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 267 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 268 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 269 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 270 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 271 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 31)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 272 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 273 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 41);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 110);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 274 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 275 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 276 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 88)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 277 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 12);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 278 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 279 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 19);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 280 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 281 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 282 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 131) });


/***/ }),
/* 283 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 284 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 8);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var has = __webpack_require__(/*! ./_has */ 12);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 36);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 285 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 80);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 286 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 61)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 34)('includes');


/***/ }),
/* 287 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 132);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 94);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 34)('flatMap');


/***/ }),
/* 288 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 132);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var toInteger = __webpack_require__(/*! ./_to-integer */ 28);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 94);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 34)('flatten');


/***/ }),
/* 289 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 86)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 290 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 133);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 291 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 133);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 292 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 48)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 293 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 48)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 294 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 27);
var toLength = __webpack_require__(/*! ./_to-length */ 9);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 64);
var getFlags = __webpack_require__(/*! ./_flags */ 66);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 88)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 295 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 76)('asyncIterator');


/***/ }),
/* 296 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 76)('observable');


/***/ }),
/* 297 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 131);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 17);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 18);
var createProperty = __webpack_require__(/*! ./_create-property */ 92);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 298 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 134)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 299 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 134)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 300 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 71), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 301 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 71), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 302 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 71), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 303 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 10);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 26);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 18).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 7) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 71), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 304 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 135)('Map') });


/***/ }),
/* 305 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 135)('Set') });


/***/ }),
/* 306 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 72)('Map');


/***/ }),
/* 307 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 72)('Set');


/***/ }),
/* 308 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 72)('WeakMap');


/***/ }),
/* 309 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 72)('WeakSet');


/***/ }),
/* 310 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 73)('Map');


/***/ }),
/* 311 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 73)('Set');


/***/ }),
/* 312 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 73)('WeakMap');


/***/ }),
/* 313 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 73)('WeakSet');


/***/ }),
/* 314 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 315 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 316 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 21);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 317 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 318 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 319 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 320 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 137);
var fround = __webpack_require__(/*! ./_math-fround */ 117);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 321 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 322 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 323 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 324 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 325 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 326 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 137) });


/***/ }),
/* 327 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 328 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 329 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 25);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 68);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 124);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 330 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 99);
var perform = __webpack_require__(/*! ./_perform */ 123);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 331 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 332 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 333 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 334 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 127);
var from = __webpack_require__(/*! ./_array-from-iterable */ 136);
var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 335 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 336 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 337 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 19);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 338 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 339 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 340 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 21)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 341 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 25);
var microtask = __webpack_require__(/*! ./_microtask */ 98)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 6)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 11);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 44);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 46);
var hide = __webpack_require__(/*! ./_hide */ 13);
var forOf = __webpack_require__(/*! ./_for-of */ 45);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 43)('Observable');


/***/ }),
/* 342 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 343 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 97);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 344 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 96);
var getKeys = __webpack_require__(/*! ./_object-keys */ 39);
var redefine = __webpack_require__(/*! ./_redefine */ 14);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 13);
var Iterators = __webpack_require__(/*! ./_iterators */ 49);
var wks = __webpack_require__(/*! ./_wks */ 6);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 345 */
/*!*********************************************************************************!*\
  !*** ./node_modules/babel-polyfill/node_modules/regenerator-runtime/runtime.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 53)))

/***/ }),
/* 346 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 347);
module.exports = __webpack_require__(/*! ../../modules/_core */ 25).RegExp.escape;


/***/ }),
/* 347 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 348)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 348 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 349 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! pixi */ 138);

__webpack_require__(/*! p2 */ 101);

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _Boot = __webpack_require__(/*! ./states/Boot */ 354);

var _Boot2 = _interopRequireDefault(_Boot);

var _Splash = __webpack_require__(/*! ./states/Splash */ 355);

var _Splash2 = _interopRequireDefault(_Splash);

var _TitleMenu = __webpack_require__(/*! ./states/TitleMenu */ 369);

var _TitleMenu2 = _interopRequireDefault(_TitleMenu);

var _ControlsMenu = __webpack_require__(/*! ./states/ControlsMenu */ 371);

var _ControlsMenu2 = _interopRequireDefault(_ControlsMenu);

var _CreditsMenu = __webpack_require__(/*! ./states/CreditsMenu */ 372);

var _CreditsMenu2 = _interopRequireDefault(_CreditsMenu);

var _GameOver = __webpack_require__(/*! ./states/GameOver */ 373);

var _GameOver2 = _interopRequireDefault(_GameOver);

var _Level = __webpack_require__(/*! ./states/Level */ 16);

var _Level2 = _interopRequireDefault(_Level);

var _tutorial_ = __webpack_require__(/*! ./levelData/tutorial_0 */ 376);

var _tutorial_2 = _interopRequireDefault(_tutorial_);

var _Level_Start = __webpack_require__(/*! ./levelData/Level_Start */ 383);

var _Level_Start2 = _interopRequireDefault(_Level_Start);

var _StartScene = __webpack_require__(/*! ./states/StartScene */ 384);

var _StartScene2 = _interopRequireDefault(_StartScene);

var _Level_ = __webpack_require__(/*! ./levelData/Level_1 */ 385);

var _Level_2 = _interopRequireDefault(_Level_);

var _Level_3 = __webpack_require__(/*! ./levelData/Level_2 */ 386);

var _Level_4 = _interopRequireDefault(_Level_3);

var _Level_5 = __webpack_require__(/*! ./levelData/Level_3 */ 387);

var _Level_6 = _interopRequireDefault(_Level_5);

var _Level_7 = __webpack_require__(/*! ./levelData/Level_4 */ 388);

var _Level_8 = _interopRequireDefault(_Level_7);

var _Level_9 = __webpack_require__(/*! ./levelData/Level_5 */ 390);

var _Level_10 = _interopRequireDefault(_Level_9);

var _Level_11 = __webpack_require__(/*! ./levelData/Level_6 */ 391);

var _Level_12 = _interopRequireDefault(_Level_11);

var _Level_13 = __webpack_require__(/*! ./levelData/Level_7 */ 394);

var _Level_14 = _interopRequireDefault(_Level_13);

var _Level_15 = __webpack_require__(/*! ./levelData/Level_8 */ 395);

var _Level_16 = _interopRequireDefault(_Level_15);

var _Level_17 = __webpack_require__(/*! ./levelData/Level_9 */ 396);

var _Level_18 = _interopRequireDefault(_Level_17);

var _FinalScene = __webpack_require__(/*! ./states/FinalScene */ 397);

var _FinalScene2 = _interopRequireDefault(_FinalScene);

var _Level_Final = __webpack_require__(/*! ./levelData/Level_Final */ 399);

var _Level_Final2 = _interopRequireDefault(_Level_Final);

var _Win = __webpack_require__(/*! ./states/Win */ 400);

var _Win2 = _interopRequireDefault(_Win);

var _config = __webpack_require__(/*! ./config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, _config2.default.gameWidth, _config2.default.gameHeight, _phaser2.default.CANVAS, 'content', null));

    _this.state.add('Boot', _Boot2.default, false);
    _this.state.add('Splash', _Splash2.default, false);
    _this.state.add('TitleMenu', _TitleMenu2.default, false);
    _this.state.add('ControlsMenu', _ControlsMenu2.default, false);
    _this.state.add('CreditsMenu', _CreditsMenu2.default, false);
    _this.state.add('GameOver', _GameOver2.default, false);
    _this.state.add('Start_Scene', _StartScene2.default, false);
    _this.state.add('Level', _Level2.default, false);
    _this.state.add('Tutorial_0', _tutorial_2.default, false);
    _this.state.add('Level_Start', _Level_Start2.default, false);
    _this.state.add('Level_1', _Level_2.default, false);
    _this.state.add('Level_2', _Level_4.default, false);
    _this.state.add('Level_3', _Level_6.default, false);
    _this.state.add('Level_4', _Level_8.default, false);
    _this.state.add('Level_5', _Level_10.default, false);
    _this.state.add('Level_6', _Level_12.default, false);
    _this.state.add('Level_7', _Level_14.default, false);
    _this.state.add('Level_8', _Level_16.default, false);
    _this.state.add('Level_9', _Level_18.default, false);
    _this.state.add('Level_Final', _Level_Final2.default, false);
    _this.state.add('Final_Scene', _FinalScene2.default, false);
    _this.state.add('Win', _Win2.default, false);

    _this.state.start('Boot');
    return _this;
  }

  return Game;
}(_phaser2.default.Game);

window.game = new Game();

/***/ }),
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _webfontloader = __webpack_require__(/*! webfontloader */ 139);

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'init',

    // Initialize the stage and any simple settings
    value: function init() {
      this.stage.backgroundColor = '#7f7f7f';
      this.fontsReady = false;
      this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    // Load all data needed for this game state

  }, {
    key: 'preload',
    value: function preload() {
      // Load needed font (will load asynchronously)
      // Calls fontsLoaded() when complete
      _webfontloader2.default.load({
        google: {
          families: ['Libre Franklin']
        },
        active: this.fontsLoaded
      });

      this.game.load.video('6SDSplash', '../../splash/6SDSplash.mp4');

      // Show message that fonts are loading
      var text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' });
      text.anchor.setTo(0.5, 0.5);

      // Read the assets for the splash screen (used in next stage)
      this.load.image('loaderBg', './assets/images/loader-bg.png');
      this.load.image('loaderBar', './assets/images/loader-bar.png');
      this.load.image('logo', './assets/images/title_logo.png');

      // Scale the window to be fullscreen
      this.scale.scaleMode = _phaser2.default.ScaleManager.SHOW_ALL;
      this.scale.windowConstraints.bottom = 'visual';
      this.scale.fullscreenScaleMode = _phaser2.default.ScaleManager.EXACT_FIT;
    }

    // Called repeatedly after pre-load to draw the stage

  }, {
    key: 'render',
    value: function render() {
      // Wait for font before proceeding
      if (this.fontsReady) {
        this.state.start('Splash');
      }
    }

    // Signal that the font has finished loading

  }, {
    key: 'fontsLoaded',
    value: function fontsLoaded() {
      this.fontsReady = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 355 */
/*!******************************!*\
  !*** ./src/states/Splash.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils */ 35);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

var _jsonMap = __webpack_require__(/*! ../objects/jsonMap */ 356);

var _jsonMap2 = _interopRequireDefault(_jsonMap);

var _testMap = __webpack_require__(/*! ../../assets/maps/testMap.json */ 357);

var _testMap2 = _interopRequireDefault(_testMap);

var _IntroRoomStart = __webpack_require__(/*! ../../assets/maps/IntroRoomStart.json */ 358);

var _IntroRoomStart2 = _interopRequireDefault(_IntroRoomStart);

var _Level = __webpack_require__(/*! ../../assets/maps/Level1.json */ 359);

var _Level2 = _interopRequireDefault(_Level);

var _Level3 = __webpack_require__(/*! ../../assets/maps/Level2.json */ 360);

var _Level4 = _interopRequireDefault(_Level3);

var _Level5 = __webpack_require__(/*! ../../assets/maps/Level3.json */ 361);

var _Level6 = _interopRequireDefault(_Level5);

var _Level7 = __webpack_require__(/*! ../../assets/maps/Level4.json */ 362);

var _Level8 = _interopRequireDefault(_Level7);

var _Level9 = __webpack_require__(/*! ../../assets/maps/Level5.json */ 363);

var _Level10 = _interopRequireDefault(_Level9);

var _Level11 = __webpack_require__(/*! ../../assets/maps/Level6.json */ 364);

var _Level12 = _interopRequireDefault(_Level11);

var _Level13 = __webpack_require__(/*! ../../assets/maps/Level7.json */ 365);

var _Level14 = _interopRequireDefault(_Level13);

var _Level15 = __webpack_require__(/*! ../../assets/maps/Level8.json */ 366);

var _Level16 = _interopRequireDefault(_Level15);

var _Level17 = __webpack_require__(/*! ../../assets/maps/Level9.json */ 367);

var _Level18 = _interopRequireDefault(_Level17);

var _FinalLevel = __webpack_require__(/*! ../../assets/maps/FinalLevel.json */ 368);

var _FinalLevel2 = _interopRequireDefault(_FinalLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import MainPlayer from '../sprites/Player.js'

// Importing all JSON map files

// Non-tutorial levels


var _class = function (_Phaser$State) {
    _inherits(_class, _Phaser$State);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.started = this.game.time.time;
            this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            (0, _utils.centerGameObjects)([this.logo]);

            this.video6SD = this.game.add.video('6SDSplash');
            var scale = this.game.width / this.video6SD.width;
            this.video6SDSprite = this.video6SD.addToWorld(0, this.game.height / 2, 0, 0.5, scale, scale);

            this.video6SD.onComplete.add(function () {
                _this2.video6SDSprite.visible = false;
            }, this);

            if (this.video6SD.video) {
                this.video6SDSprite.bringToTop();
                this.video6SD.play();
            }
        }
    }, {
        key: 'preload',
        value: function preload() {
            // Set / Reset world bounds
            this.game.world.setBounds(0, 0, this.game.width, this.game.height);

            // Create sprites from the progress bar assets
            // this.loaderBg = this.add.sprite(
            //   this.game.world.centerX, this.game.height - 30, 'loaderBg')
            // this.loaderBar = this.add.sprite(
            //   this.game.world.centerX, this.game.height - 30, 'loaderBar')
            // centerGameObjects([this.loaderBg, this.loaderBar])
            //
            // // Display the progress bar
            // this.load.setPreloadSprite(this.loaderBar)

            // Load all the assets needed for next level
            this.load.spritesheet('player-main', 'assets/images/newNinjaSpritesheet.png', 450, 450);
            this.load.spritesheet('smallDemon', 'assets/images/smallDemon.png', 150, 150);
            this.load.spritesheet('bigDemon', './assets/images/BigDemon.png', 600, 300);
            this.load.spritesheet('flyingDemon', './assets/images/FlyingDemon.png', 450, 450);
            this.load.spritesheet('David', 'assets/images/David.png', 450, 450);
            this.load.spritesheet('tChest', './assets/images/tChest.png', 467, 450);
            this.load.spritesheet('pops-hands', './assets/images/Pops/Hands.png', 500, 250);
            this.load.spritesheet('pops-dying', './assets/images/Pops/PopsDie.png', 1333.33333333, 1000);
            this.load.spritesheet('pops-head', './assets/images/Pops/Head.png', 187.5, 140.625);

            this.load.spritesheet('popsDesk', './assets/images/popsDesk.png', 500, 450);
            this.load.audioSprite('sounds', ['assets/audio/sounds.ogg', 'assets/audio/sounds.mp3', 'assets/audio/sounds.m4a', 'assets/audio/sounds.ac3'], 'assets/audio/sounds.json');

            // Load health bar related images
            this.load.image('uiHeart', 'assets/images/heartIcon.png');
            this.load.image('uiHealthBar1', 'assets/images/UI/health_bar1.png');
            this.load.image('uiHealthBar2', 'assets/images/UI/health_bar2.png');
            this.load.image('uiHealthBar3', 'assets/images/UI/health_bar3.png');
            this.load.image('uiHealthBar4', 'assets/images/UI/health_bar4.png');

            // Load weapons related images
            this.load.image('sword', 'assets/images/text/sword.png');
            this.load.image('chain', 'assets/images/text/chain.png');
            this.load.image('hammer', 'assets/images/text/hammer.png');

            // Load all the assets needed for the Title Screen
            this.load.image('TowerTitleScreen', 'assets/images/TowerTitleScene_.png');
            this.load.image('Towj', 'assets/images/mainMenu/towj.png');
            this.load.spritesheet('A', 'assets/images/mainMenu/A.png', 1000, 680);
            this.load.spritesheet('startBtn', './assets/images/start_btn.png', 288, 71);
            this.load.spritesheet('controlsBtn', './assets/images/controls_btn.png', 288, 71);
            this.load.spritesheet('creditsBtn', './assets/images/credits_btn.png', 288, 71);
            this.load.spritesheet('backBtn', './assets/images/back_btn.png', 288, 71);
            this.load.image('controlsText', 'assets/images/mainMenu/controlsText.png');
            this.load.image('creditsText', 'assets/images/mainMenu/creditsText.png');

            // Assets for game over and controls screen
            this.load.spritesheet('continueBtn', './assets/images/continue_btn.png', 288, 71);

            // Black out image
            this.load.image('BlackSquare', 'assets/images/BlackSquare.jpg');

            // Load the background for the Text Scenes
            this.load.image('StartBG', 'assets/images/levels/LevelStart.png');
            this.load.image('FinalBG', 'assets/images/levels/LevelFinal-bg2.png');

            // Win Asset
            this.load.image('Win', 'assets/images/win.png');

            // Pause Menu text
            this.load.image('paused', 'assets/images/paused.png');

            // Test stage text
            this.load.image('arrow_keys', 'assets/images/movement_tutorial.png');
            this.load.image('press_P', 'assets/images/damage_tutorial.png');
            this.load.image('press_Spacebar', 'assets/images/ability_tutorial.png');
            this.load.image('press_E', 'assets/images/inventory_tutorial.png');

            // Start Scene Text
            this.load.image('Pops1-7', 'assets/images/text/startScene/1-7.png');
            this.load.image('Pops2-3', 'assets/images/text/startScene/2-3.png');
            this.load.image('Pops3-4', 'assets/images/text/startScene/3-4.png');
            this.load.image('Pops4-7', 'assets/images/text/startScene/4-7.png');
            this.load.image('Pops4-12', 'assets/images/text/startScene/4-12.png');
            this.load.image('Pops5-3', 'assets/images/text/startScene/5-3.png');
            this.load.image('Pops6-7', 'assets/images/text/startScene/6-7.png');
            this.load.image('Pops7-10', 'assets/images/text/startScene/7-10.png');
            this.load.image('Pops8-12', 'assets/images/text/startScene/8-12.png');
            this.load.image('Pops9-6', 'assets/images/text/startScene/9-6.png');

            // Final Scene Text
            this.load.image('End1-1', 'assets/images/text/finalScene/1-1.png');
            this.load.image('End1-2', 'assets/images/text/finalScene/1-2.png');
            this.load.image('End1-3', 'assets/images/text/finalScene/1-3.png');
            this.load.image('End1-4', 'assets/images/text/finalScene/1-4.png');
            this.load.image('End1-5', 'assets/images/text/finalScene/1-5.png');
            this.load.image('End1-6', 'assets/images/text/finalScene/1-6.png');

            // Ninja Dialogue
            this.load.image('NinjaTalk', 'assets/images/text/startScene/ninja/1-5.png');

            // Process the map data
            this.processMapData(_testMap2.default, 'testMap-data', 'assets/maps/testMap.json');
            // Non-tutorial stages
            this.processMapData(_IntroRoomStart2.default, 'LevelStart-data', 'assets/maps/IntroRoomStart.json');
            this.processMapData(_Level2.default, 'Level1-data', 'assets/maps/Level1.json');
            this.processMapData(_Level4.default, 'Level2-data', 'assets/maps/Level2.json');
            this.processMapData(_Level6.default, 'Level3-data', 'assets/maps/Level3.json');
            this.processMapData(_Level8.default, 'Level4-data', 'assets/maps/Level4.json');
            this.processMapData(_Level10.default, 'Level5-data', 'assets/maps/Level5.json');
            this.processMapData(_Level12.default, 'Level6-data', 'assets/maps/Level6.json');
            this.processMapData(_Level14.default, 'Level7-data', 'assets/maps/Level7.json');
            this.processMapData(_Level16.default, 'Level8-data', 'assets/maps/Level8.json');
            this.processMapData(_Level18.default, 'Level9-data', 'assets/maps/Level9.json');
            this.processMapData(_FinalLevel2.default, 'LevelFinal-data', 'assets/maps/FinalLevel.json');
            this.load.image('LevelFinalPlatform', 'assets/images/levels/LevelFinal-platform.png');

            // Saving Scroll
            this.load.image('savedTextbox', 'assets/images/savedTextbox.png');
            this.load.image('savingScroll', 'assets/images/savingScroll.png');

            // Scroll for abilities
            this.load.image('scroll', 'assets/images/scroll.png');
            this.load.image('wallJumpText', 'assets/images/text/wallJumpText.png');

            // Loading text for the weapons
            this.load.image('swordText', 'assets/images/text/swordText.png');
            this.load.image('chainText', 'assets/images/text/chainText.png');
            this.load.image('hammerText', 'assets/images/text/hammerText.png');
        }

        // Load map JSON data into the cache

    }, {
        key: 'processMapData',
        value: function processMapData(mapData, key, URL) {
            var map = new _jsonMap2.default({ name: key, game: this.game, mapData: mapData });
            this.cache.addJSON(key, URL, map);
        }

        // Pre-load is done

    }, {
        key: 'create',
        value: function create() {
            // Destroy progress bar assets
            this.loaderBar.destroy();
            this.loaderBg.destroy();
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.video6SD.playing && this.game.time.elapsedSecondsSince(this.started) >= _config2.default.MIN_SPLASH_SECONDS) {
                // Switch to 'TitlMenu' state
                this.state.start('TitleMenu');
            }
        }
    }]);

    return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 356 */
/*!********************************!*\
  !*** ./src/objects/jsonMap.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* globals __DEV__ */

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSONMap = function () {
  function JSONMap(_ref) {
    var _this = this;

    var name = _ref.name,
        game = _ref.game,
        mapData = _ref.mapData;

    _classCallCheck(this, JSONMap);

    console.log('constructing JSONMap');
    this.mapName = name;
    this.game = game;
    this.mapData = mapData;
    this.backgroundKey = this.mapName + '-background';
    mapData.layers.forEach(function (layer) {
      if (layer.name === 'Colliders') {
        _this.colliders = layer;
      } else if (layer.name === 'Background') {
        // Loads the background image according to the directory in the .json file
        _this.background = layer;
      }
    });

    if (this.background) {
      this.loadBackground();
    }
  }

  _createClass(JSONMap, [{
    key: 'processColliders',
    value: function processColliders(material, type) {
      var _this2 = this;

      console.log('colliders');
      this.bodies = [];
      this.colliders.objects.forEach(function (object) {
        if (typeof type === 'undefined' || object.type === type) {
          var body = new _phaser2.default.Physics.P2.Body(_this2.game, null, object.x, object.y);

          var points = [];
          if (object.polyline || object.polygon) {
            if (object.polyline) {
              object.polyline.forEach(function (point) {
                points.push([point.x, point.y]);
              });
              console.log(object.name + ': polyline');
            } else {
              object.polygon.forEach(function (point) {
                points.push([point.x, point.y]);
              });
              console.log(object.name + ': polygon');
            }
          } else if (object.ellipse) {
            if (Math.abs(object.width - object.height) < 0.01) {
              var rad = object.width / 2;
              body.addCircle(rad, rad, rad);
            } else {
              var angle = 0;
              var angleInc = 2 * Math.PI / JSONMap.ELLIPSE_SUBDIVS;
              var xRad = object.width / 2;
              var yRad = object.height / 2;

              for (var i = 0; i < JSONMap.ELLIPSE_SUBDIVS; i++) {
                points.push([Math.cos(angle) * xRad + xRad, Math.sin(angle) * yRad + yRad]);
                angle += angleInc;
              }
            }
            console.log(object.name + ': ellipse');
          } else {
            var x = 0;
            var y = 0;
            points.push([x, y]);
            points.push([x + object.width, y]);
            points.push([x + object.width, y + object.height]);
            points.push([x, y + object.height]);
            console.log(object.name + ': rectangle');
          }

          if (object.rotation && points.length > 0) {
            var M = new _phaser2.default.Matrix();
            M.translate(points[0][0], points[0][1]);
            M.rotate(object.rotation / 180 * Math.PI);
            M.translate(-points[0][0], -points[0][1]);

            var newPoints = [];
            points.forEach(function (point) {
              var newPoint = M.apply(new _phaser2.default.Point(point[0], point[1]));
              newPoints.push([newPoint.x, newPoint.y]);
            });
            points = newPoints;
          }

          if (points.length > 0) {
            body.addPolygon({ skipSimpleCheck: true, removeCollinearPoints: 0.01 }, points);
          }
          // body.debug = __DEV__
          body.static = true;
          body.setMaterial(material);
          body.addToWorld();
          body.isWallJumpable = true;
          _this2.bodies.push(body);
        }
      });
      return this.bodies;
    }
  }, {
    key: 'loadBackground',
    value: function loadBackground() {
      this.game.load.image('background', this.background.image.replace('..', 'assets'));
      var path = this.background.image;
      path = path.replace(/\.\.\//g, '');
      path = 'assets/' + path;
      this.game.load.image(this.backgroundKey, path);
    }
  }]);

  return JSONMap;
}();

JSONMap.ELLIPSE_SUBDIVS = 16;

exports.default = JSONMap;

/***/ }),
/* 357 */
/*!**********************************!*\
  !*** ./assets/maps/testMap.json ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":32,"layers":[{"image":"../images/levels/test-bg1.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polyline":[{"x":60.015,"y":7.50188},{"x":533.333,"y":7.3393},{"x":783.333,"y":-30.6577},{"x":983.333,"y":-23.6622},{"x":1301.16,"y":-18.3295},{"x":1545.5,"y":-182.502},{"x":1772.17,"y":-322.669},{"x":2006.51,"y":-276.663},{"x":2222.02,"y":-47.4869},{"x":2274.17,"y":-18.0045},{"x":2552.01,"y":-16.6667},{"x":2516,"y":-704.989},{"x":3054.5,"y":-714.66},{"x":3055.33,"y":112.003},{"x":58.1896,"y":112.003},{"x":59.1835,"y":8.1708}],"rotation":0,"type":"ground","visible":true,"width":0,"x":-58.3333,"y":883.054},{"height":0,"id":5,"name":"Crate","polygon":[{"x":0,"y":0},{"x":148.537,"y":-18.8518},{"x":174.044,"y":-3.14196},{"x":172.543,"y":114.682},{"x":3.00075,"y":111.54}],"rotation":0,"type":"object","visible":true,"width":0,"x":834.209,"y":754.036},{"height":0,"id":12,"name":"ShackRoof","polygon":[{"x":0,"y":0},{"x":-214,"y":-26},{"x":-362,"y":-32},{"x":-570,"y":-34},{"x":-568,"y":-72},{"x":-284,"y":-40},{"x":-128,"y":-34},{"x":8,"y":-36}],"rotation":0,"type":"platform","visible":true,"width":0,"x":562,"y":634},{"height":104,"id":14,"name":"Box","rotation":-10,"type":"object","visible":true,"width":112,"x":1132,"y":800},{"ellipse":true,"height":100,"id":15,"name":"HayTop1","rotation":0,"type":"object","visible":true,"width":100,"x":76,"y":722},{"ellipse":true,"height":118,"id":17,"name":"HayTop2","rotation":0,"type":"object","visible":true,"width":110,"x":210,"y":730},{"height":106,"id":18,"name":"HayBottom","rotation":0,"type":"object","visible":true,"width":232,"x":80,"y":794}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":22,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":32,"tilesets":[],"tilewidth":32,"type":"map","version":1,"width":94}

/***/ }),
/* 358 */
/*!*****************************************!*\
  !*** ./assets/maps/IntroRoomStart.json ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":46,"layers":[{"image":"../images/levels/LevelStart.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":849,"y":1},{"x":848,"y":66},{"x":2,"y":68}],"rotation":0,"type":"collision","visible":true,"width":0,"x":362,"y":592},{"height":564,"id":5,"name":"","rotation":0,"type":"","visible":true,"width":82,"x":285,"y":96},{"height":564,"id":7,"name":"","rotation":0,"type":"","visible":true,"width":82,"x":1207,"y":98}],"offsetx":3,"offsety":-2,"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":8,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":12,"tilesets":[],"tilewidth":17,"type":"map","version":1,"width":49}

/***/ }),
/* 359 */
/*!*********************************!*\
  !*** ./assets/maps/Level1.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level1-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":918,"y":2},{"x":918,"y":128},{"x":0,"y":128}],"rotation":0,"type":"collision","visible":true,"width":0,"x":270,"y":418},{"height":0,"id":19,"name":"Floor","polygon":[{"x":-2,"y":5},{"x":-1518,"y":4},{"x":-1520,"y":-106},{"x":-2,"y":-106},{"x":-2,"y":-50}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1516,"y":798},{"height":0,"id":20,"name":"Floor","polygon":[{"x":8,"y":6},{"x":6,"y":-80},{"x":-36,"y":-80},{"x":-38,"y":-164},{"x":-116,"y":-164},{"x":-118,"y":-82},{"x":-168,"y":-82},{"x":-168,"y":-632},{"x":1610,"y":-628},{"x":1614,"y":-684},{"x":-192,"y":-686},{"x":-196,"y":12},{"x":-80,"y":6}],"rotation":0,"type":"collision","visible":true,"width":0,"x":190,"y":684},{"height":0,"id":21,"name":"Floor","polygon":[{"x":0,"y":0},{"x":498,"y":-2},{"x":498,"y":970},{"x":-1306,"y":970},{"x":-1302,"y":898},{"x":-450,"y":900},{"x":-448,"y":686},{"x":302,"y":682},{"x":302,"y":596},{"x":388,"y":596},{"x":388,"y":508},{"x":472,"y":506},{"x":472,"y":110},{"x":0,"y":114},{"x":0,"y":10}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1304,"y":326},{"height":90,"id":23,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":112,"x":742,"y":1138}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":24,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":13,"tilesets":[],"tilewidth":18,"type":"map","version":1,"width":100}

/***/ }),
/* 360 */
/*!*********************************!*\
  !*** ./assets/maps/Level2.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level2-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":2,"name":"Floor","polygon":[{"x":-12,"y":0},{"x":278.606,"y":0},{"x":281.116,"y":112.5},{"x":366.454,"y":117.5},{"x":369.984,"y":163},{"x":455.833,"y":167},{"x":516.072,"y":214},{"x":541.602,"y":274},{"x":612.43,"y":275},{"x":611.45,"y":402},{"x":-12.5498,"y":392.5}],"rotation":0,"type":"collision","visible":true,"width":0,"x":8.5498,"y":1510},{"height":0,"id":7,"name":"Floor","polygon":[{"x":6,"y":-4},{"x":-322,"y":-4},{"x":-322,"y":-114},{"x":-856,"y":-118},{"x":-862,"y":-168},{"x":-814,"y":-362},{"x":-832,"y":-388},{"x":-896,"y":-390},{"x":-894,"y":-478},{"x":-926,"y":-514},{"x":-1022,"y":-514},{"x":-1143.51515151515,"y":-493.454545454545},{"x":-1203.33333333333,"y":-495.696969696969},{"x":-1198,"y":60},{"x":-66,"y":73.3333333333333},{"x":-68,"y":758},{"x":-464,"y":758},{"x":-464,"y":840},{"x":4,"y":846}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1194,"y":1146},{"height":0,"id":8,"name":"Floor","polygon":[{"x":0,"y":0},{"x":2,"y":422},{"x":-78,"y":430},{"x":-98,"y":472},{"x":-218,"y":502},{"x":-244,"y":532},{"x":-251.333333333333,"y":592.666666666667},{"x":-770,"y":594},{"x":-770,"y":710},{"x":146.666666666667,"y":710.666666666667},{"x":148,"y":590},{"x":78,"y":590},{"x":72,"y":-2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1124,"y":1992},{"height":0,"id":9,"name":"Floor","polygon":[{"x":0,"y":0},{"x":838,"y":4},{"x":840,"y":120},{"x":70,"y":110},{"x":70,"y":560},{"x":152,"y":560},{"x":170,"y":600},{"x":254,"y":608},{"x":314,"y":656},{"x":328,"y":720},{"x":1294,"y":724},{"x":1296,"y":664},{"x":1362,"y":614},{"x":1454,"y":612},{"x":1468,"y":564},{"x":1576,"y":564},{"x":1536,"y":356},{"x":1558,"y":322},{"x":1620,"y":320},{"x":1620,"y":222},{"x":1656,"y":196},{"x":1918,"y":238},{"x":1890,"y":798},{"x":-2,"y":796}],"rotation":0,"type":"collision","visible":true,"width":0,"x":0,"y":2202},{"height":0,"id":10,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-98},{"x":-54,"y":-96},{"x":-90,"y":-162},{"x":-59.3333333333333,"y":-216},{"x":-4,"y":-216},{"x":10,"y":-602},{"x":-60,"y":-612},{"x":-82,"y":-570},{"x":-144,"y":-542},{"x":-260,"y":-594},{"x":-292,"y":-642},{"x":-306,"y":-758},{"x":-350,"y":-766},{"x":-380,"y":-904},{"x":-334,"y":-932},{"x":-296,"y":-934},{"x":-296,"y":-1018},{"x":-250,"y":-1055.33333333333},{"x":-160,"y":-1056},{"x":4,"y":-1016},{"x":6,"y":-1842},{"x":92,"y":-1840},{"x":82,"y":556},{"x":-26,"y":560}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1916,"y":2442},{"height":0,"id":11,"name":"Floor","polygon":[{"x":0,"y":0},{"x":2,"y":-32},{"x":460,"y":-34},{"x":456,"y":-140},{"x":368,"y":-141.333333333333},{"x":372,"y":-216},{"x":357.333333333333,"y":-261.333333333333},{"x":286,"y":-262},{"x":256,"y":-308},{"x":258,"y":-404},{"x":232,"y":-428},{"x":154,"y":-428},{"x":130,"y":-464},{"x":124,"y":-550},{"x":100,"y":-564},{"x":0,"y":-566}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1196,"y":2218},{"height":0,"id":12,"name":"Floor","polygon":[{"x":0,"y":0},{"x":82,"y":-2},{"x":176,"y":-54},{"x":206,"y":-112},{"x":188,"y":-178},{"x":146,"y":-212.666666666667},{"x":-2,"y":-214}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1202,"y":1472},{"height":0,"id":13,"name":"Floor","polygon":[{"x":0,"y":0},{"x":80,"y":0},{"x":96,"y":-72},{"x":90,"y":-104},{"x":56,"y":-118},{"x":-4,"y":-120},{"x":-30,"y":-70}],"rotation":0,"type":"collision","visible":true,"width":0,"x":666,"y":956},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":32,"y":76},{"x":110,"y":78},{"x":125.333333333333,"y":10},{"x":100,"y":-36},{"x":26,"y":-38},{"x":-4,"y":-4}],"rotation":0,"type":"collision","visible":true,"width":0,"x":882,"y":760},{"height":0,"id":15,"name":"Floor","polygon":[{"x":0,"y":0},{"x":28,"y":72},{"x":116,"y":70},{"x":126,"y":-2},{"x":104,"y":-40},{"x":26,"y":-42}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1106,"y":660},{"height":0,"id":18,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-1.33333,"y":-90.6667},{"x":92,"y":-90.6667},{"x":92,"y":-1.33333}],"rotation":0,"type":"collision","visible":true,"width":0,"x":564,"y":2205.33},{"height":0,"id":19,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":300},{"x":-78,"y":306},{"x":-78,"y":0}],"rotation":0,"type":"collision","visible":true,"width":0,"x":68,"y":1898}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":20,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":30,"tilesets":[],"tilewidth":20,"type":"map","version":1,"width":100}

/***/ }),
/* 361 */
/*!*********************************!*\
  !*** ./assets/maps/Level3.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level3-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-74,"y":22},{"x":-144,"y":88},{"x":-178,"y":2},{"x":-232,"y":0},{"x":-232,"y":120},{"x":-255,"y":126},{"x":-276.5,"y":133.5},{"x":-288.5,"y":141},{"x":-308,"y":154.5},{"x":-328,"y":176},{"x":-326,"y":256},{"x":-340,"y":290},{"x":-338,"y":316},{"x":-402,"y":418},{"x":-476,"y":432},{"x":-530,"y":448},{"x":-536,"y":644},{"x":-582,"y":660},{"x":-614,"y":542},{"x":-674,"y":546},{"x":-676,"y":672},{"x":-808,"y":672},{"x":-830,"y":718},{"x":-910,"y":724},{"x":-966,"y":776},{"x":-970,"y":982},{"x":-1218,"y":984},{"x":-1214,"y":886},{"x":-1234,"y":862},{"x":-1364,"y":854},{"x":-1366,"y":730},{"x":-1384,"y":680},{"x":-1476,"y":668},{"x":-1536,"y":632},{"x":-1542,"y":474},{"x":-1482,"y":428},{"x":-1478,"y":362},{"x":-1504,"y":350},{"x":-1554,"y":342},{"x":-1584,"y":320},{"x":-1744,"y":312},{"x":-1748,"y":132},{"x":-1798,"y":90},{"x":-1796,"y":988},{"x":2,"y":988},{"x":-4,"y":34}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1800,"y":310},{"height":0,"id":2,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-4,"y":24},{"x":54,"y":72},{"x":144,"y":86},{"x":182,"y":58},{"x":174,"y":2},{"x":118,"y":-12}],"rotation":0,"type":"collision","visible":true,"width":0,"x":458,"y":806}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":3,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":13,"tilesets":[],"tilewidth":18,"type":"map","version":1,"width":100}

/***/ }),
/* 362 */
/*!*********************************!*\
  !*** ./assets/maps/Level4.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level4-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":2,"name":"Floor","polygon":[{"x":0,"y":0},{"x":924.242,"y":6.06061},{"x":922.303,"y":91.8788},{"x":0,"y":81.8182}],"rotation":0,"type":"collision","visible":true,"width":0,"x":303.03,"y":845.455},{"height":0,"id":3,"name":"Floor","polygon":[{"x":0,"y":0},{"x":74,"y":1},{"x":96,"y":22},{"x":94,"y":85},{"x":-7,"y":87},{"x":-25,"y":51}],"rotation":0,"type":"collision","visible":true,"width":0,"x":245,"y":925},{"height":0,"id":4,"name":"Floor","polygon":[{"x":0,"y":0},{"x":168,"y":0},{"x":180,"y":0},{"x":175,"y":-110},{"x":320,"y":-111},{"x":324,"y":1},{"x":509,"y":1},{"x":518,"y":-60},{"x":586,"y":-109},{"x":666,"y":-113},{"x":684,"y":-159},{"x":847,"y":-159},{"x":869,"y":-113},{"x":948,"y":-110},{"x":1016,"y":-54},{"x":1026,"y":3},{"x":1871,"y":-1},{"x":1878,"y":67},{"x":0,"y":51}],"rotation":0,"type":"collision","visible":true,"width":0,"x":753,"y":1921},{"height":0,"id":5,"name":"Floor","polygon":[{"x":21,"y":0},{"x":-13,"y":-74},{"x":13,"y":-110},{"x":90,"y":-109},{"x":115,"y":-95},{"x":105,"y":0}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2440,"y":1919},{"height":0,"id":6,"name":"Floor","polygon":[{"x":0,"y":0},{"x":23,"y":-81},{"x":14,"y":-178},{"x":41,"y":-199},{"x":106,"y":-199},{"x":129,"y":-242},{"x":121,"y":-342},{"x":154,"y":-360},{"x":215,"y":-359},{"x":264,"y":-386},{"x":254,"y":-480},{"x":148,"y":-525},{"x":106,"y":-576},{"x":89,"y":-697},{"x":57,"y":-699},{"x":31,"y":-748},{"x":14,"y":-834},{"x":48.333333333333,"y":-860.666666666667},{"x":99,"y":-862},{"x":97,"y":-964},{"x":105,"y":-999},{"x":59,"y":-1016},{"x":55,"y":-1117},{"x":75,"y":-1128},{"x":141,"y":-1130},{"x":170,"y":-1180},{"x":164,"y":-1275},{"x":191,"y":-1292.66666666667},{"x":261,"y":-1292},{"x":302,"y":-1321},{"x":294,"y":-1412},{"x":309,"y":-1427},{"x":383,"y":-1428},{"x":381,"y":12},{"x":8,"y":11}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2617,"y":1915},{"height":0,"id":7,"name":"Floor","polygon":[{"x":0,"y":0},{"x":158,"y":0},{"x":189,"y":28},{"x":197,"y":91},{"x":174,"y":137},{"x":39,"y":140},{"x":-4,"y":87}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2422,"y":1464.0303030303},{"height":0,"id":9,"name":"Floor","polygon":[{"x":0,"y":0},{"x":16,"y":-24},{"x":95,"y":-25},{"x":111,"y":11},{"x":105,"y":62},{"x":18,"y":68},{"x":-5,"y":10}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2572,"y":1248.12121212121},{"height":0,"id":11,"name":"Floor","polygon":[{"x":0,"y":0},{"x":8,"y":-10},{"x":79,"y":-8},{"x":99,"y":32},{"x":92,"y":86},{"x":3,"y":93},{"x":-19,"y":34}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2446,"y":897.060606060606},{"height":0,"id":12,"name":"Floor","polygon":[{"x":0,"y":0},{"x":21,"y":-34},{"x":92,"y":-34},{"x":109,"y":-16},{"x":108,"y":55},{"x":23,"y":58}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1842,"y":1077},{"height":0,"id":13,"name":"Floor","polygon":[{"x":0,"y":0},{"x":16,"y":-4},{"x":157,"y":-1},{"x":186,"y":20},{"x":199,"y":77},{"x":102,"y":140},{"x":0,"y":132}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1528,"y":1192},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-3,"y":-125},{"x":151,"y":-126},{"x":180,"y":-105},{"x":193,"y":-38},{"x":146,"y":4}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1357,"y":890},{"height":0,"id":15,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-10},{"x":-60,"y":-118},{"x":-128,"y":-162},{"x":-54,"y":-364},{"x":-86,"y":-384},{"x":-214,"y":-392},{"x":-208,"y":-474},{"x":-264,"y":-506},{"x":-464,"y":-502},{"x":-758,"y":-480},{"x":-758,"y":10}],"rotation":0,"type":"collision","visible":true,"width":0,"x":750,"y":1916},{"height":0,"id":16,"name":"Floor","polygon":[{"x":-2,"y":-2},{"x":-622,"y":2},{"x":-620,"y":678},{"x":-698,"y":676},{"x":-696,"y":-64},{"x":-2,"y":-62}],"rotation":0,"type":"collision","visible":true,"width":0,"x":692,"y":460}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":17,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":20,"tilesets":[],"tilewidth":30,"type":"map","version":1,"width":100}

/***/ }),
/* 363 */
/*!*********************************!*\
  !*** ./assets/maps/Level5.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level5-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":931.090909090909,"y":1.030303030303},{"x":932.121212121212,"y":40.969696969697},{"x":0,"y":42}],"rotation":0,"type":"collision","visible":true,"width":0,"x":484.485,"y":1128.55},{"height":0,"id":2,"name":"Floor","polygon":[{"x":0,"y":0},{"x":284,"y":4},{"x":284,"y":50},{"x":0,"y":50}],"rotation":0,"type":"collision","visible":true,"width":0,"x":0.484848,"y":328.545},{"height":0,"id":3,"name":"Floor","polygon":[{"x":0,"y":0},{"x":135.454545454545,"y":-31.0909090909091},{"x":247.878787878788,"y":1.09090909090907},{"x":278,"y":92},{"x":184,"y":150},{"x":72,"y":158},{"x":-4,"y":150},{"x":12,"y":108}],"rotation":0,"type":"collision","visible":true,"width":0,"x":436.485,"y":500.545},{"height":0,"id":4,"name":"Floor","polygon":[{"x":0,"y":0},{"x":100,"y":16},{"x":164,"y":104},{"x":314,"y":118},{"x":314,"y":228},{"x":326,"y":282},{"x":296,"y":342},{"x":10,"y":368}],"rotation":0,"type":"collision","visible":true,"width":0,"x":-9.51515,"y":614.545},{"height":0,"id":5,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-126},{"x":14,"y":-140},{"x":162,"y":-130},{"x":194,"y":-90},{"x":194,"y":-48},{"x":86,"y":12}],"rotation":0,"type":"collision","visible":true,"width":0,"x":806.485,"y":894.545},{"height":0,"id":6,"name":"Floor","polygon":[{"x":0,"y":0},{"x":38,"y":130},{"x":212,"y":190},{"x":204,"y":270},{"x":220,"y":314},{"x":200,"y":424},{"x":210,"y":488},{"x":199.939393939394,"y":580.424242424242},{"x":80.3636363636364,"y":640.969696969697},{"x":-118,"y":636},{"x":-102,"y":4}],"rotation":0,"type":"collision","visible":true,"width":0,"x":104.485,"y":982.545},{"height":0,"id":7,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-130},{"x":28,"y":-148},{"x":156,"y":-142},{"x":186,"y":-108},{"x":186,"y":-44},{"x":72,"y":8}],"rotation":0,"type":"collision","visible":true,"width":0,"x":438.485,"y":1622.55},{"height":0,"id":9,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-12,"y":-156},{"x":196,"y":-102},{"x":310,"y":-156},{"x":426.666666666667,"y":-152.666666666667},{"x":428,"y":6}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1445.69212121212,"y":1846.36818181818},{"height":0,"id":10,"name":"Floor","polygon":[{"x":-68.7878787878788,"y":152.060606060606},{"x":-68,"y":-7.09090909090901},{"x":-72,"y":-127.575757575758},{"x":77.212121212121,"y":-132.787878787879},{"x":63.5151515151515,"y":-425.939393939394},{"x":150,"y":-440},{"x":292,"y":-470},{"x":386,"y":-496},{"x":400,"y":-374},{"x":366,"y":-290},{"x":396,"y":-214},{"x":374,"y":-104},{"x":390,"y":-50},{"x":388,"y":54},{"x":338,"y":148},{"x":14,"y":154}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1932.48,"y":1696.55},{"height":0,"id":11,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-100,"y":38},{"x":-176,"y":20},{"x":-176,"y":-92},{"x":-152,"y":-104},{"x":-18,"y":-100},{"x":8,"y":-78},{"x":26,"y":-16}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1744.48,"y":1398.55},{"height":0,"id":12,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-36,"y":0},{"x":-56,"y":-40},{"x":-30,"y":-78},{"x":46,"y":-80},{"x":64,"y":-52},{"x":56,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1513.4496969697,"y":937.580303030303},{"height":0,"id":13,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-26,"y":-52},{"x":-2,"y":-86},{"x":82,"y":-88},{"x":96,"y":-54},{"x":90,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1676.48,"y":775.635909090909},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-18,"y":-58},{"x":0,"y":-90},{"x":80,"y":-90},{"x":96,"y":-64},{"x":88,"y":-2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2498.48,"y":1658.55},{"height":0,"id":15,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-24,"y":-54},{"x":-6,"y":-84},{"x":80,"y":-88},{"x":90,"y":-60},{"x":86,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2600.48,"y":1039.64090909091},{"height":0,"id":16,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-22,"y":-22},{"x":-34,"y":-130},{"x":-10,"y":-182},{"x":-38,"y":-302},{"x":-4,"y":-370},{"x":-40,"y":-454},{"x":-36,"y":-604},{"x":66,"y":-634},{"x":136,"y":-638},{"x":200,"y":-722},{"x":166,"y":-800},{"x":242,"y":-856},{"x":168,"y":-804},{"x":46,"y":-866},{"x":20,"y":-908},{"x":6,"y":-1014},{"x":-51.212121212121,"y":-1059.33333333333},{"x":-66,"y":-1160},{"x":12.6666666666665,"y":-1196.30303030303},{"x":292,"y":-1276.60606060606},{"x":300,"y":128},{"x":228,"y":134},{"x":20,"y":62}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2706.48,"y":1350.55},{"height":0,"id":17,"name":"Floor","polygon":[{"x":0,"y":0},{"x":1540,"y":4},{"x":3016,"y":12},{"x":3012,"y":186},{"x":22,"y":188}],"rotation":0,"type":"collision","visible":true,"width":0,"x":-17.5152,"y":1820.55},{"height":0,"id":18,"name":"Floor","polygon":[{"x":-8,"y":-2.66666666666674},{"x":-10,"y":-38},{"x":-5.33333333333326,"y":-114.666666666667},{"x":-34,"y":-216},{"x":-8,"y":-304},{"x":46,"y":-326},{"x":78,"y":-388},{"x":236,"y":-436},{"x":312,"y":-364},{"x":324,"y":-270},{"x":304,"y":-70}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2008,"y":1272},{"height":0,"id":19,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-24,"y":-54},{"x":-6,"y":-84},{"x":80,"y":-88},{"x":90,"y":-60},{"x":86,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2626,"y":1441.09090909091},{"height":0,"id":20,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-24,"y":-54},{"x":-6,"y":-84},{"x":80,"y":-88},{"x":90,"y":-60},{"x":86,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2320,"y":1220},{"height":0,"id":22,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-148.484848484848},{"x":275.757575757576,"y":-154.545454545455},{"x":275.757575757576,"y":-75.7575757575758}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2724.24242424242,"y":148.484848484848}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":24,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":20,"tilesets":[],"tilewidth":30,"type":"map","version":1,"width":100}

/***/ }),
/* 364 */
/*!*********************************!*\
  !*** ./assets/maps/Level6.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level6-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":2,"name":"Floor","polygon":[{"x":4,"y":6.66666666666674},{"x":199.333333333333,"y":17.3333333333333},{"x":334.666666666667,"y":72},{"x":335.333333333333,"y":88},{"x":276,"y":64},{"x":286,"y":288},{"x":313.333333333333,"y":322.666666666667},{"x":562,"y":304.666666666667},{"x":706.666666666667,"y":323.333333333333},{"x":714,"y":333.333333333333},{"x":600,"y":326},{"x":320,"y":336},{"x":380,"y":432},{"x":382,"y":564},{"x":428,"y":574},{"x":460,"y":602},{"x":424,"y":686},{"x":374,"y":758},{"x":380,"y":772},{"x":362,"y":961.757575757576},{"x":-244,"y":984},{"x":-230,"y":18}],"rotation":0,"type":"collision","visible":true,"width":0,"x":224,"y":1888},{"height":0,"id":4,"name":"Floor","polygon":[{"x":6.66666666666663,"y":4},{"x":18,"y":14},{"x":88,"y":-12},{"x":116,"y":-58},{"x":148,"y":-54},{"x":169.090909090909,"y":-84.060606060606},{"x":149.393939393939,"y":-50.787878787879},{"x":164.484848484848,"y":-70.7272727272727},{"x":167.272727272727,"y":-81.6363636363635},{"x":163.333333333333,"y":-78.848484848485},{"x":167.939393939394,"y":-81.030303030303},{"x":164,"y":-82},{"x":234,"y":-86},{"x":250,"y":564},{"x":292,"y":572},{"x":1090,"y":504},{"x":1270,"y":504},{"x":1360,"y":506},{"x":1362,"y":490.666666666667},{"x":1270.66666666667,"y":489.333333333333},{"x":1269,"y":-106},{"x":1305,"y":-104.333333333333},{"x":1305.66666666667,"y":-121.333333333333},{"x":1061.33333333333,"y":-138},{"x":1070,"y":-274},{"x":898,"y":-280},{"x":901.333333333333,"y":-145.333333333333},{"x":697.333333333333,"y":-138.666666666667},{"x":606.666666666667,"y":-138.666666666667},{"x":606,"y":-64},{"x":420,"y":35.3333333333335},{"x":411.333333333333,"y":-125.333333333333},{"x":276,"y":-116.666666666667},{"x":118,"y":-90},{"x":98.6666666666666,"y":-78},{"x":79.3333333333334,"y":-24}],"rotation":0,"type":"collision","visible":true,"width":0,"x":860,"y":1150},{"height":0,"id":6,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-80,"y":32},{"x":-80.7272727272727,"y":31.6363636363635},{"x":-118.848484848485,"y":52.7878787878788},{"x":-120,"y":54},{"x":-152,"y":61},{"x":-234,"y":164},{"x":-229.333333333333,"y":202.666666666667},{"x":-361.333333333333,"y":258.666666666667},{"x":-364,"y":278},{"x":-220,"y":208},{"x":36,"y":26}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1116,"y":1700},{"height":0,"id":7,"name":"Floor","polygon":[{"x":0,"y":0},{"x":3206,"y":0},{"x":3180,"y":150},{"x":0,"y":150}],"rotation":0,"type":"collision","visible":true,"width":0,"x":-26,"y":2852},{"height":0,"id":8,"name":"Floor","polygon":[{"x":0,"y":0.573517164505964},{"x":493.137444139326,"y":0.860275746758946},{"x":494.96240056496,"y":-1.0514481349276},{"x":-1.88198631393521,"y":-1.14703432901193}],"rotation":2,"type":"collision","visible":true,"width":0,"x":1134.48052436571,"y":2258.8580528133},{"height":0,"id":9,"name":"Floor","polygon":[{"x":0,"y":0},{"x":284,"y":0},{"x":281.911764705882,"y":-4.4},{"x":0,"y":-6}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1016,"y":2502},{"height":0,"id":10,"name":"Floor","polygon":[{"x":1.33333333333348,"y":5.33333333333303},{"x":94,"y":24},{"x":324,"y":-1},{"x":325,"y":-8},{"x":93.333333333333,"y":17.3333333333335},{"x":2.66666666666652,"y":-1.33333333333348}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1494,"y":2498},{"height":0,"id":11,"name":"Floor","polygon":[{"x":10.6666666666667,"y":19.9999999999995},{"x":7.99999999999955,"y":30},{"x":113.333333333333,"y":46},{"x":334,"y":13.3333333333335},{"x":118,"y":28.666666666667}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1798,"y":2084},{"height":0,"id":13,"name":"Floor","polygon":[{"x":0,"y":0},{"x":4,"y":-24},{"x":51.333333333333,"y":-8},{"x":452,"y":-29.3333333333335},{"x":690,"y":-32},{"x":723.030303030303,"y":-483.939393939394},{"x":853.636363636364,"y":-518.848484848485},{"x":850,"y":-14},{"x":299.454545454545,"y":8.24242424242402},{"x":296,"y":282},{"x":120,"y":328},{"x":-38,"y":356},{"x":-192,"y":342},{"x":-186,"y":324},{"x":-30,"y":332},{"x":118,"y":312},{"x":84,"y":6}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2150,"y":2318},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-118,"y":-56},{"x":-140,"y":-134},{"x":-114,"y":-228},{"x":-50,"y":-318},{"x":-74.0606060606061,"y":-628.787878787879},{"x":-254,"y":-628},{"x":-255.212121212121,"y":-56.060606060606}],"rotation":0,"type":"collision","visible":true,"width":0,"x":254,"y":626},{"height":0,"id":15,"name":"Floor","polygon":[{"x":0,"y":0},{"x":70,"y":-66},{"x":130,"y":-30}],"rotation":0,"type":"collisio","visible":true,"width":0,"x":2870,"y":1830},{"height":0,"id":16,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-88,"y":40.6666666666667},{"x":-390,"y":216},{"x":-336,"y":250},{"x":0,"y":58}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2998,"y":530},{"height":0,"id":18,"name":"Floor","polygon":[{"x":1.33333333333348,"y":2.66666666666669},{"x":-236,"y":27.3333333333333},{"x":-244,"y":36},{"x":4,"y":16}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2994,"y":410},{"height":0,"id":19,"name":"Floor","polygon":[{"x":0,"y":0},{"x":258,"y":56},{"x":298,"y":270},{"x":126,"y":374},{"x":110,"y":402},{"x":84,"y":426},{"x":68,"y":484},{"x":68,"y":562},{"x":226,"y":608},{"x":246,"y":654},{"x":162,"y":684},{"x":218,"y":782},{"x":176,"y":962},{"x":214,"y":1104},{"x":206,"y":1294},{"x":226,"y":1326},{"x":2,"y":1338}],"rotation":0,"type":"collision","visible":true,"width":0,"x":0,"y":568},{"height":0,"id":21,"name":"Floor","polygon":[{"x":-0.666666666666657,"y":8},{"x":442.666666666667,"y":32},{"x":504,"y":126},{"x":506.666666666667,"y":145.333333333333},{"x":450,"y":60},{"x":410,"y":42},{"x":2,"y":14}],"rotation":0,"type":"collision","visible":true,"width":0,"x":242,"y":1210},{"height":0,"id":22,"name":"Floor","polygon":[{"x":0,"y":2.66666666666652},{"x":159.333333333333,"y":54},{"x":456,"y":66},{"x":452,"y":72},{"x":148,"y":60},{"x":-6,"y":4}],"rotation":0,"type":"collision","visible":true,"width":0,"x":420,"y":1522},{"height":0,"id":24,"name":"Floor","polygon":[{"x":0,"y":0},{"x":14,"y":28},{"x":10,"y":98},{"x":-32,"y":282},{"x":-32,"y":356},{"x":-46,"y":344},{"x":-46,"y":294},{"x":-2,"y":90},{"x":-70,"y":54},{"x":-46,"y":10}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1020,"y":1084},{"height":148,"id":25,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":168,"x":858,"y":2734},{"height":2,"id":26,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":0,"x":1464,"y":3062},{"height":132,"id":33,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":150,"x":2580,"y":2156}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":34,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":30,"tilesets":[],"tilewidth":30,"type":"map","version":1,"width":100}

/***/ }),
/* 365 */
/*!*********************************!*\
  !*** ./assets/maps/Level7.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level7-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-3045.45,"y":7.16061181500181},{"x":-3036.36,"y":143.212},{"x":6.06061,"y":139.632054450054}],"rotation":0,"type":"collision","visible":true,"width":0,"x":3003.03,"y":1859.82},{"height":0,"id":20,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-40,"y":-62},{"x":-22,"y":-724},{"x":576,"y":-722},{"x":576,"y":2}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2418,"y":732},{"height":0,"id":21,"name":"Floor","polygon":[{"x":0,"y":0},{"x":118.181818181818,"y":3.030303030303},{"x":160.242424242425,"y":46.7878787878787},{"x":156.848484848485,"y":112.121212121212},{"x":3.03030303030303,"y":109.090909090909}],"rotation":0,"type":"collision","visible":true,"width":0,"x":-7.03030303030303,"y":420.121212121212},{"height":0,"id":22,"name":"Floor","polygon":[{"x":8,"y":90},{"x":28,"y":38},{"x":174,"y":38},{"x":214,"y":94},{"x":198,"y":130},{"x":18,"y":138}],"rotation":0,"type":"collision","visible":true,"width":0,"x":98,"y":894},{"height":0,"id":23,"name":"Floor","polygon":[{"x":120,"y":58},{"x":140,"y":6},{"x":286,"y":6},{"x":322,"y":62},{"x":310,"y":98},{"x":130,"y":106}],"rotation":0,"type":"collision","visible":true,"width":0,"x":94,"y":1332},{"height":0,"id":24,"name":"Floor","polygon":[{"x":366,"y":-28},{"x":386,"y":-80},{"x":532,"y":-80},{"x":572,"y":-24},{"x":556,"y":12},{"x":376,"y":20}],"rotation":0,"type":"collision","visible":true,"width":0,"x":152,"y":1682},{"height":0,"id":25,"name":"Floor","polygon":[{"x":0,"y":0},{"x":20,"y":-52},{"x":166,"y":-52},{"x":206,"y":4},{"x":190,"y":40},{"x":10,"y":48}],"rotation":0,"type":"collision","visible":true,"width":0,"x":878,"y":1146},{"height":0,"id":26,"name":"Floor","polygon":[{"x":0,"y":0},{"x":0,"y":-50.6666666666666},{"x":166,"y":-52},{"x":206,"y":4},{"x":190,"y":40},{"x":10,"y":48}],"rotation":0,"type":"collision","visible":true,"width":0,"x":924,"y":764},{"height":0,"id":27,"name":"Floor","polygon":[{"x":0,"y":0},{"x":20,"y":-52},{"x":166,"y":-52},{"x":192,"y":8},{"x":190,"y":40},{"x":10,"y":48}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1631.66666666667,"y":1208},{"height":0,"id":29,"name":"Floor","polygon":[{"x":158,"y":56},{"x":184,"y":30},{"x":250,"y":26},{"x":270,"y":54},{"x":262,"y":94},{"x":168,"y":98}],"rotation":0,"type":"collision","visible":true,"width":0,"x":414,"y":1100},{"height":0,"id":30,"name":"Floor","polygon":[{"x":674,"y":90},{"x":700,"y":64},{"x":766,"y":60},{"x":786,"y":88},{"x":778,"y":128},{"x":684,"y":132}],"rotation":0,"type":"collision","visible":true,"width":0,"x":396,"y":1460},{"height":0,"id":32,"name":"Floor","polygon":[{"x":26,"y":-24},{"x":52,"y":-50},{"x":118,"y":-54},{"x":138,"y":-26},{"x":130,"y":14},{"x":36,"y":18}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1242,"y":564},{"height":0,"id":33,"name":"Floor","polygon":[{"x":62,"y":52},{"x":88,"y":26},{"x":154,"y":22},{"x":174,"y":50},{"x":166,"y":90},{"x":72,"y":94}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1268,"y":938},{"height":0,"id":41,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-538,"y":34},{"x":-634,"y":92},{"x":-640,"y":326},{"x":-570,"y":370},{"x":-530,"y":444},{"x":-464,"y":578},{"x":-336,"y":706},{"x":-432,"y":828},{"x":-404,"y":904},{"x":-326,"y":918},{"x":-292,"y":946},{"x":-234,"y":946},{"x":-190,"y":964},{"x":0,"y":966},{"x":0,"y":622}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2994,"y":944}],"offsetx":2,"offsety":-12,"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":43,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":20,"tilesets":[],"tilewidth":30,"type":"map","version":1,"width":100}

/***/ }),
/* 366 */
/*!*********************************!*\
  !*** ./assets/maps/Level8.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level8-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":382,"id":1,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":212,"x":-2,"y":420},{"height":206,"id":3,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":1604,"x":-8,"y":794},{"height":128,"id":4,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":1022,"x":1598,"y":668},{"height":210,"id":5,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":396,"x":2618,"y":790},{"height":0,"id":7,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-114,"y":6},{"x":-112,"y":-190},{"x":2,"y":-120}],"rotation":0,"type":"collision","visible":true,"width":0,"x":322,"y":790},{"height":104,"id":13,"name":"Floor","rotation":0,"type":"collision","visible":true,"width":145.333333333333,"x":325.333333333333,"y":688},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-34,"y":12},{"x":-52,"y":50},{"x":-34,"y":82},{"x":-74,"y":218},{"x":-82,"y":324},{"x":-68,"y":454},{"x":-102,"y":604},{"x":-68,"y":694},{"x":0,"y":694}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2998,"y":94}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":19,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":10,"tilesets":[],"tilewidth":30,"type":"map","version":1,"width":100}

/***/ }),
/* 367 */
/*!*********************************!*\
  !*** ./assets/maps/Level9.json ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/Level9-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":3,"name":"Floor","polygon":[{"x":5,"y":10},{"x":-976.181818181818,"y":5.27272727272702},{"x":-983.30303030303,"y":38.484848484849},{"x":-981.939393939394,"y":143.757575757576},{"x":0,"y":133.333333333334}],"rotation":0,"type":"collision ","visible":true,"width":0,"x":1990.90909090909,"y":4854.54545454545},{"height":0,"id":4,"name":"Floor","polygon":[{"x":0,"y":0},{"x":15.1515151515152,"y":-496.969696969697},{"x":-36.3636363636363,"y":-518.181818181818},{"x":-54.5454545454545,"y":-554.545454545455},{"x":-51.5151515151515,"y":-675.757575757576},{"x":3.03030303030306,"y":-681.818181818182},{"x":42.4242424242424,"y":-784.848484848485},{"x":103.030303030303,"y":-806.060606060606},{"x":124.242424242424,"y":-851.515151515152},{"x":121.212121212121,"y":-903.030303030303},{"x":140.363636363636,"y":-936.484848484848},{"x":118.30303030303,"y":-973.090909090909},{"x":95.9393939393939,"y":-995.060606060606},{"x":-87.8787878787879,"y":-997.121212121212},{"x":-84.8484848484848,"y":-1057.57575757576},{"x":-66.6666666666666,"y":-1066.66666666667},{"x":-69.6969696969697,"y":-1292.0303030303},{"x":-120.212121212121,"y":-1322.36363636364},{"x":-130.30303030303,"y":-1809.09090909091},{"x":-81.8181818181818,"y":-1851.51515151515},{"x":-78.7878787878788,"y":-1921.21212121212},{"x":63.6363636363637,"y":-2024.24242424242},{"x":63.6363636363637,"y":-2081.81818181818},{"x":909.090909090909,"y":-2078.78787878788},{"x":927.272727272727,"y":-2106.06060606061},{"x":1100,"y":-2100},{"x":1106.06060606061,"y":-2078.78787878788},{"x":1224.24242424242,"y":-2078.78787878788},{"x":1227.27272727273,"y":-2166.66666666667},{"x":1212.12121212121,"y":-2206.06060606061},{"x":1189.90909090909,"y":-2224.27272727273},{"x":-148.515151515152,"y":-2221.39393939394},{"x":-500,"y":-2233.33333333333},{"x":-503.030303030303,"y":-6.06060606060601}],"rotation":0,"type":"collision","visible":true,"width":0,"x":493.939393939394,"y":5006.06060606061},{"height":0,"id":5,"name":"Floor","polygon":[{"x":0,"y":0},{"x":121.212121212121,"y":0},{"x":175.757575757576,"y":-57.575757575758},{"x":175.757575757576,"y":-239.393939393939},{"x":400,"y":-236.363636363636},{"x":439.393939393939,"y":-306.060606060606},{"x":442.424242424242,"y":-569.69696969697},{"x":460.606060606061,"y":-587.878787878788},{"x":461.606060606061,"y":-610.151515151515},{"x":439.393939393939,"y":-608.151515151515},{"x":439.393939393939,"y":-1272.72727272727},{"x":418.181818181818,"y":-1281},{"x":255.545454545455,"y":-1281.9696969697},{"x":278.787878787879,"y":-1324.24242424242},{"x":276.787878787879,"y":-1365.75757575758},{"x":82.818181818182,"y":-1366.72727272727},{"x":84.969696969697,"y":-1277.84848484848},{"x":-12.121212121212,"y":-1276.84848484848},{"x":-78.7878787878788,"y":-1248.48484848485},{"x":-81.8181818181818,"y":-1030.30303030303},{"x":-30.3030303030303,"y":-1027.27272727273},{"x":6.06060606060623,"y":-984.848484848485},{"x":9.09090909090924,"y":-630.30303030303},{"x":-18.181818181818,"y":-609.090909090909},{"x":-112.121212121212,"y":-609.090909090909},{"x":-115.151515151515,"y":-587.878787878788},{"x":-84.8484848484848,"y":-560.606060606061},{"x":-84.8484848484848,"y":-442.424242424242},{"x":-78.7878787878788,"y":-287.878787878788},{"x":-39.3939393939393,"y":-233.333333333333},{"x":-39.3939393939393,"y":-136.363636363636},{"x":-45.4545454545453,"y":-72.727272727273}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1081.81818181818,"y":4509.09090909091},{"height":0,"id":6,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-42.4242424242425,"y":-27.2727272727279},{"x":-115.151515151515,"y":-33.3333333333339},{"x":-142.424242424242,"y":-48.484848484849},{"x":-290.909090909091,"y":-48.484848484849},{"x":-330.30303030303,"y":-96.969696969697},{"x":-333.363636363636,"y":-1235.45454545455},{"x":-315.151515151515,"y":-1250.60606060606},{"x":-215.151515151515,"y":-1257.57575757576},{"x":-100,"y":-1254.54545454545},{"x":-96.969696969697,"y":-2078.78787878788},{"x":-712.121212121212,"y":-2081.81818181818},{"x":-724.242424242424,"y":-2112.12121212121},{"x":-800,"y":-2130.30303030303},{"x":-824.242424242424,"y":-2175.75757575758},{"x":-1160.60606060606,"y":-2169.69696969697},{"x":-1154.54545454545,"y":-2248.48484848485},{"x":-1175.75757575758,"y":-2266.66666666667},{"x":-1148.48484848485,"y":-2303.0303030303},{"x":-809.090909090909,"y":-2300},{"x":-806.060606060606,"y":-2418.18181818182},{"x":-806.060606060606,"y":-2533.33333333333},{"x":-742.424242424242,"y":-2572.72727272727},{"x":-657.575757575758,"y":-2578.78787878788},{"x":-627.272727272727,"y":-2596.9696969697},{"x":-642.424242424242,"y":-2666.66666666667},{"x":-463.636363636364,"y":-2669.69696969697},{"x":-451.515151515152,"y":-2584.84848484848},{"x":-442.424242424242,"y":-2572.72727272727},{"x":-306.060606060606,"y":-2578.78787878788},{"x":-287.878787878788,"y":-2521.21212121212},{"x":-184.848484848485,"y":-2518.18181818182},{"x":-181.818181818182,"y":-2587.87878787879},{"x":-103.030303030303,"y":-2666.66666666667},{"x":-112.121212121212,"y":-3496.9696969697},{"x":-151.515151515152,"y":-3563.63636363636},{"x":-203.030303030303,"y":-3572.72727272727},{"x":-257.575757575758,"y":-3651.51515151515},{"x":-257.575757575758,"y":-3727.27272727273},{"x":-509.090909090909,"y":-3730.30303030303},{"x":-524.242424242424,"y":-3763.63636363636},{"x":-522.212121212121,"y":-3783.93939393939},{"x":11.090909090909,"y":-3778.87878787879}],"rotation":0,"type":"collision","visible":true,"width":0,"x":2000,"y":4475.75757575758},{"height":0,"id":8,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-2,"y":-430},{"x":18,"y":-422},{"x":32,"y":-426},{"x":32,"y":-592},{"x":48,"y":-626},{"x":30,"y":-658},{"x":2,"y":-680},{"x":-12,"y":-694},{"x":-12,"y":-972},{"x":60,"y":-1032},{"x":266,"y":-1040},{"x":264,"y":-1090},{"x":248,"y":-1110},{"x":264,"y":-1128},{"x":260,"y":-1210},{"x":-182,"y":-1204},{"x":-198,"y":-1192},{"x":-268,"y":-1196},{"x":-270,"y":-1880},{"x":-232,"y":-1914},{"x":-158,"y":-1918},{"x":-156,"y":-2222},{"x":-116,"y":-2254},{"x":-116,"y":-2310},{"x":-76,"y":-2420},{"x":194,"y":-2434},{"x":218,"y":-2488},{"x":286,"y":-2476},{"x":314,"y":-2488},{"x":322,"y":-2542},{"x":362,"y":-2592},{"x":410,"y":-2608},{"x":446,"y":-2722},{"x":438,"y":-2790},{"x":-354,"y":-2768},{"x":-346,"y":0}],"rotation":0,"type":"collision","visible":true,"width":0,"x":342.969696969697,"y":2765.0303030303},{"height":0,"id":9,"name":"Floor","polygon":[{"x":0,"y":0},{"x":62,"y":-8},{"x":168,"y":-2},{"x":164,"y":62},{"x":6,"y":70}],"rotation":0,"type":"collision","visible":true,"width":0,"x":926.969696969697,"y":2577.0303030303},{"height":0,"id":10,"name":"Floor","polygon":[{"x":0,"y":0},{"x":68,"y":-8},{"x":158,"y":2},{"x":154,"y":64},{"x":2,"y":70}],"rotation":0,"type":"collision","visible":true,"width":0,"x":256.969696969697,"y":1117.0303030303},{"height":0,"id":11,"name":"Floor","polygon":[{"x":0,"y":0},{"x":-2,"y":-28},{"x":86,"y":-32},{"x":98,"y":-16},{"x":94,"y":12},{"x":6,"y":10}],"rotation":0,"type":"collision","visible":true,"width":0,"x":880.969696969697,"y":1281.0303030303},{"height":0,"id":12,"name":"Floor","polygon":[{"x":0,"y":0},{"x":202,"y":-6},{"x":204,"y":-36},{"x":-6,"y":-34}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1132.9696969697,"y":1295.0303030303},{"height":0,"id":13,"name":"Floor","polygon":[{"x":0,"y":0},{"x":220,"y":-4},{"x":218,"y":-28},{"x":2,"y":-36}],"rotation":0,"type":"collision","visible":true,"width":0,"x":688.969696969697,"y":787.030303030303},{"height":0,"id":14,"name":"Floor","polygon":[{"x":0,"y":0},{"x":60,"y":70},{"x":226,"y":64},{"x":262,"y":22},{"x":268,"y":-4},{"x":264,"y":-350},{"x":272,"y":-384},{"x":204,"y":-388},{"x":112,"y":-380},{"x":86,"y":-356},{"x":64,"y":-362},{"x":40,"y":-380},{"x":-28,"y":-374},{"x":-26,"y":-236},{"x":0,"y":-174}],"rotation":0,"type":"collision","visible":true,"width":0,"x":1444.9696969697,"y":1495.0303030303}],"offsetx":3.03030303030323,"offsety":-3.030303030303,"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":15,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":50,"tilesets":[],"tilewidth":20,"type":"map","version":1,"width":100}

/***/ }),
/* 368 */
/*!*************************************!*\
  !*** ./assets/maps/FinalLevel.json ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"height":100,"layers":[{"image":"../images/levels/LevelFinal-bg.png","name":"Background","opacity":1,"type":"imagelayer","visible":true,"x":0,"y":0},{"draworder":"topdown","name":"Colliders","objects":[{"height":0,"id":1,"name":"Floor","polygon":[{"x":0,"y":0},{"x":16.06061,"y":-1121.27},{"x":498.848,"y":-1121.21},{"x":497.879,"y":-1173.64},{"x":523.091,"y":-1190.91},{"x":592.909,"y":-1188.91},{"x":594.909,"y":-1263.58},{"x":621.091,"y":-1290.91},{"x":755.636,"y":-1289.94},{"x":770.788,"y":-1265.64},{"x":770.788,"y":-1201.09},{"x":849.455,"y":-1200.09},{"x":871.667,"y":-1185.88},{"x":870.697,"y":-1120.3},{"x":1275.76,"y":-1121.21},{"x":1300,"y":-1096.97},{"x":1296.97,"y":-944.545},{"x":1482.79,"y":-943.515},{"x":1482.73,"y":-1090.91},{"x":1502,"y":-1111.27},{"x":1631.18,"y":-1112.27},{"x":1624.15,"y":-1167.7},{"x":1646.42,"y":-1200},{"x":1785.85,"y":-1199.03},{"x":1800,"y":-1172.73},{"x":1802,"y":-1121.27},{"x":1937.24,"y":-1120.21},{"x":1933.24,"y":-1188.88},{"x":1961.39,"y":-1196.06},{"x":2052.55,"y":-1196.06},{"x":2082.76,"y":-1172.76},{"x":2083.82,"y":-1122.3},{"x":2681.82,"y":-1122.27},{"x":2709.09,"y":-6.06061}],"rotation":0,"type":"collision","visible":true,"width":0,"x":757.576,"y":3990.91}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextobjectid":2,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.0.3","tileheight":40,"tilesets":[],"tilewidth":40,"type":"map","version":1,"width":100}

/***/ }),
/* 369 */
/*!*********************************!*\
  !*** ./src/states/TitleMenu.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

var _A = __webpack_require__(/*! ../sprites/A */ 370);

var _A2 = _interopRequireDefault(_A);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    _this._timer = new _phaser2.default.Time(_this.game);
    return _this;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.isScrolling = false; // need to reset to false
      this.fadeToBlack = false;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.sounds = this.game.add.audioSprite('sounds');
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }
  }, {
    key: 'create',
    value: function create() {
      this.setupKeyboard();

      this.sounds.play('TitleScreen', _config2.default.SFX_VOLUME);

      // Add the image for the title screen background
      this.title = this.game.add.sprite(_config2.default.gameWidth / 2, _config2.default.gameHeight + 430, 'TowerTitleScreen');
      this.title.anchor.setTo(0.5, 0.5);
      this.title.scale.setTo(0.67, 0.67);

      this.A = new _A2.default({
        game: this.game,
        x: _config2.default.gameWidth / 2 + 490,
        y: _config2.default.gameHeight / 2 - 130
      });
      this.A.scale.setTo(0.6, 0.6);
      this.game.add.existing(this.A);

      // Add the image for the title logo
      this.logo = this.game.add.image(_config2.default.gameWidth / 2 - 200, _config2.default.gameHeight / 2 - 130, 'Towj');
      this.logo.anchor.setTo(0.5, 0.5);
      this.logo.scale.setTo(0.25, 0.25);

      // Create the 'Start' buttton
      this.startBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 530, 'startBtn', function () {
        this.isScrolling = true;
      }, this, 1, 0, 0);
      this.startBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(this.startBtn);

      // Create the 'Controls' buttton
      this.controlsBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 620, 'controlsBtn', function () {
        this.sounds.stop('TitleScreen');
        this.game.state.start('ControlsMenu');
      }, this, 1, 0, 0);
      this.controlsBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(this.controlsBtn);

      // Create the 'Credits' buttton
      this.creditsBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 710, 'creditsBtn', function () {
        this.sounds.stop('TitleScreen');
        this.game.state.start('CreditsMenu');
      }, this, 1, 0, 0);
      this.creditsBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(this.creditsBtn);

      // Load the sprite for the fadein
      this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare');
      this.blackSquare.scale.setTo(4, 4);
      this.blackSquare.alpha = 0;
    }
  }, {
    key: 'update',
    value: function update() {
      // Load into a new state based on the button pressed
      if (this.playGame.justPressed()) {
        this.blackSquare.bringToTop();
      }
      if (this.isScrolling) {
        this.startBtn.visible = false;
        this.controlsBtn.visible = false;
        this.creditsBtn.visible = false;
        this.title.y -= this._timer.physicsElapsed * 1000 * (this.title.y / 650);
      }
      if (this.title.y <= 40) {
        this.blackSquare.alpha = 1;
        this.cache.addJSON('checkDeath', '', { justDied: false });
        this.sounds.stop('TitleScreen');
        this.sounds.play('MainTheme', 0.5);
        this.game.state.start('Start_Scene');
      }
      if (this.title.y <= 170) {
        this.fadeToBlack = true;
      }
      if (this.fadeToBlack) {
        this.blackSquare.alpha += this._timer.physicsElapsed;
      }
    }
  }, {
    key: 'setupKeyboard',
    value: function setupKeyboard() {
      this.playGame = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 370 */
/*!**************************!*\
  !*** ./src/sprites/A.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var A = function (_Phaser$Sprite) {
  _inherits(A, _Phaser$Sprite);

  function A(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, A);

    var _this = _possibleConstructorReturn(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, game, x, y, 'A', 0));

    _this.animations.add('default', [0, 1, 2], 10, true);
    _this.animations.play('default', 5, true);
    _this.anchor.setTo(0.5, 0.5);
    return _this;
  }

  return A;
}(_phaser2.default.Sprite);

exports.default = A;

/***/ }),
/* 371 */
/*!************************************!*\
  !*** ./src/states/ControlsMenu.js ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'prelaod',
    value: function prelaod() {
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }
  }, {
    key: 'create',
    value: function create() {
      // Add the image for the title screen background
      this.title = this.game.add.sprite(_config2.default.gameWidth / 2, _config2.default.gameHeight + 430, 'TowerTitleScreen');
      this.title.anchor.setTo(0.5, 0.5);
      this.title.scale.setTo(0.67, 0.67);

      // Add the image for controls
      this.controls = this.game.add.image(_config2.default.gameWidth / 2, 385, 'controlsText');
      this.controls.anchor.setTo(0.5, 0.5);
      this.controls.scale.setTo(0.38, 0.38);

      var controls = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 120, 'controlsBtn', function () {}, this, 0, 0, 0);
      controls.anchor.setTo(0.5, 0.5);
      this.game.add.existing(controls);

      // Create the 'Back' buttton
      var backBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 620, 'backBtn', function () {
        this.game.state.start('TitleMenu');
      }, this, 1, 0, 0);
      backBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(backBtn);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 372 */
/*!***********************************!*\
  !*** ./src/states/CreditsMenu.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'prelaod',
    value: function prelaod() {
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }
  }, {
    key: 'create',
    value: function create() {
      // Add the image for the title screen background
      this.title = this.game.add.sprite(_config2.default.gameWidth / 2, _config2.default.gameHeight + 430, 'TowerTitleScreen');
      this.title.anchor.setTo(0.5, 0.5);
      this.title.scale.setTo(0.67, 0.67);

      // Add the image for credits
      this.credits = this.game.add.image(_config2.default.gameWidth / 2, 385, 'creditsText');
      this.credits.anchor.setTo(0.5, 0.5);
      this.credits.scale.setTo(1.05, 1.05);

      var credits = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 120, 'creditsBtn', function () {}, this, 0, 0, 0);
      credits.anchor.setTo(0.5, 0.5);
      this.game.add.existing(credits);

      // Create the 'Back' buttton
      var backBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 620, 'backBtn', function () {
        this.game.state.start('TitleMenu');
      }, this, 1, 0, 0);
      backBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(backBtn);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 373 */
/*!********************************!*\
  !*** ./src/states/GameOver.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'preload',
    value: function preload() {
      // Load the audio sprite into the level
      this.sounds = this.game.add.audioSprite('sounds');
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
      // Load all of the assets for the game over screen
      this.load.image('gameOver', 'assets/images/gameOver.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.setupKeyboard();

      this.saveState = this.cache.getJSON('saveState');

      // Displays the 'Game Over' picture
      this.gameOver = this.game.add.sprite(_config2.default.gameWidth / 2, _config2.default.gameHeight / 2 - 90, 'gameOver');
      this.gameOver.anchor.setTo(0.5, 0.5);
      this.gameOver.scale.setTo(0.20, 0.20);
      this.gameOver.fixedToCamera = true;

      // Create the 'Continue' buttton
      this.continueBtn = new _phaser2.default.Button(this.game, _config2.default.gameWidth / 2, 620, 'continueBtn', function () {
        this.cache.addJSON('checkDeath', '', { justDied: true });
        // this.sounds.play('MainTheme', 0.5)
        this.state.start(this.saveState.levelName);
      }, this, 1, 0, 0);
      this.continueBtn.anchor.setTo(0.5, 0.5);
      this.game.add.existing(this.continueBtn);
    }
  }, {
    key: 'update',
    value: function update() {
      // Reurn to the title screen
      if (this.playGame.justDown === true) {
        this.playGame.reset(true); // Resets the key
        this.cache.addJSON('checkDeath', '', { justDied: true });
        this.state.start(this.saveState.levelName);
      }
    }
  }, {
    key: 'setupKeyboard',
    value: function setupKeyboard() {
      this.playGame = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 374 */
/*!*****************************************!*\
  !*** ./src/itemData/PlayerInventory.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Inventory = __webpack_require__(/*! ./Inventory.js */ 375);

var _Inventory2 = _interopRequireDefault(_Inventory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerInventory = function () {
  function PlayerInventory() {
    _classCallCheck(this, PlayerInventory);

    this.weaponList = new _Inventory2.default();
    this.abilityList = new _Inventory2.default();

    // Boolean States for different items
    this.hasSword = false;
    this.hasMeteorChain = false;
    this.hasHammer = false;
    // this.hasWallJump = true
    this.hasWallJump = false;
  }

  //  Adds an item to the appropriate inventory list


  _createClass(PlayerInventory, [{
    key: 'addToInventory',
    value: function addToInventory(pItem) {
      console.log(pItem.name);
      if (pItem.name === 'Sword') {
        this.hasSword = true;
      } else if (pItem.name === 'Meteor Chain') {
        this.hasMeteorChain = true;
      } else if (pItem.name === 'Hammer') {
        this.hasHammer = true;
      } else if (pItem.name === 'Wall Jump') {
        this.hasWallJump = true;
      }

      console.info('Pickup called in PlayerInventory');
      //  New Item is a Weapon
      if (pItem.isWeapon) {
        this.weaponList.add(pItem);
      } else {
        //  New Item is an Ability
        this.abilityList.add(pItem);
      }
    }

    //  Use the current Weapon

  }, {
    key: 'useWeapon',
    value: function useWeapon() {
      this.weaponList.useItem();
    }

    //  Use the current Ability

  }, {
    key: 'useAbility',
    value: function useAbility() {
      this.abilityList.useItem();
    }

    //  Returns the current Weapon

  }, {
    key: 'getWeapon',
    value: function getWeapon() {
      return this.weaponList.getItem();
    }

    //  Returns the current Ability

  }, {
    key: 'getAbility',
    value: function getAbility() {
      return this.abilityList.getItem();
    }
    //  Change Ability

  }, {
    key: 'nextAbility',
    value: function nextAbility() {
      return this.abilityList.getNextItem();
    }
  }, {
    key: 'previousAbility',
    value: function previousAbility() {
      return this.abilityList.getPreviousItem();
    }

    //  Change Weapon

  }, {
    key: 'nextWeapon',
    value: function nextWeapon() {
      return this.weaponList.getNextItem();
    }
  }, {
    key: 'previousWeapon',
    value: function previousWeapon() {
      return this.weaponList.getPreviousItem();
    }
  }]);

  return PlayerInventory;
}();

exports.default = PlayerInventory;

/***/ }),
/* 375 */
/*!***********************************!*\
  !*** ./src/itemData/Inventory.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InventoryList = function () {
  //  ItemList is an array of all the items in the player's Inventory
  //  curItem indicates which item in the array the player has equipped
  function InventoryList() {
    _classCallCheck(this, InventoryList);

    this.ItemList = [];
    this.curItem = -1;
  }

  //  Add an ability to the inventory


  _createClass(InventoryList, [{
    key: 'add',
    value: function add(pItem) {
      console.info('Pickup called in Inventory');
      this.ItemList.push(pItem);
      this.curItem = this.ItemList.length - 1;
    }

    //  Returns the next item in the inventory

  }, {
    key: 'getNextItem',
    value: function getNextItem() {
      //  If inventory is empty
      if (this.curItem === -1) {
        return null;
      }

      //  Move to the next item
      if (this.curItem < this.ItemList.length - 1) {
        this.curItem++;
      } else {
        //  Current item is the last item in the array

        //  Cycle back around to the first element
        this.curItem = 0;
      }
      //  Return the item
      return this.ItemList[this.curItem];
    }

    //  Returns the previous array element

  }, {
    key: 'getPreviousItem',
    value: function getPreviousItem() {
      //  If inventory is empty
      if (this.curItem === -1) {
        return null;
      }

      //  Move to the previous item
      if (this.curItem > 0) {
        this.curItem--;
      } else {
        //  Cycle back around to the last element
        this.curItem = this.ItemList.length - 1;
      }
      //  Return the item
      return this.ItemList[this.curItem];
    }

    //  Activates the current item

  }, {
    key: 'useItem',
    value: function useItem() {
      if (this.ItemList.length > 0) {
        this.ItemList[this.curItem].activate();
      }
    }

    //  Returns the current item

  }, {
    key: 'getItem',
    value: function getItem() {
      return this.ItemList[this.curItem];
    }
  }]);

  return InventoryList;
}();

exports.default = InventoryList;

/***/ }),
/* 376 */
/*!*************************************!*\
  !*** ./src/levelData/tutorial_0.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _Chest = __webpack_require__(/*! ../itemData/Chest.js */ 74);

var _Chest2 = _interopRequireDefault(_Chest);

var _Sword = __webpack_require__(/*! ../itemData/Sword.js */ 140);

var _Sword2 = _interopRequireDefault(_Sword);

var _Kunai = __webpack_require__(/*! ../itemData/Kunai.js */ 377);

var _Kunai2 = _interopRequireDefault(_Kunai);

var _MeteorChain = __webpack_require__(/*! ../itemData/MeteorChain.js */ 141);

var _MeteorChain2 = _interopRequireDefault(_MeteorChain);

var _MaskedTurtle = __webpack_require__(/*! ../Enemies/MaskedTurtle.js */ 378);

var _MaskedTurtle2 = _interopRequireDefault(_MaskedTurtle);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _PopsHead = __webpack_require__(/*! ../PopsBoss/PopsHead */ 143);

var _PopsHead2 = _interopRequireDefault(_PopsHead);

var _FlyingDemon = __webpack_require__(/*! ../Enemies/FlyingDemon.js */ 59);

var _FlyingDemon2 = _interopRequireDefault(_FlyingDemon);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'testMap-data', 1683.6, 637.7));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.startHere = this.cache.getJSON('start');

      // this.sounds.stop('naruto-stage')
      // this.sounds.play('naruto-stage')

      if (this.startHere !== null && this.startHere !== undefined) {}

      // Set player direction
      this.player.makeFaceLeft();

      // Tutorial messages
      this.tutorial_1 = this.game.add.image(1250, 500, 'arrow_keys');
      this.tutorial_2 = this.game.add.image(2000, 500, 'press_P');
      this.tutorial_3 = this.game.add.image(800, 600, 'press_Spacebar');
      this.tutorial_4 = this.game.add.image(300, 400, 'press_E');

      this.testChestClosed = true;
      this.swordChestClosed = true;
      this.bloodSwordChestClosed = true;

      this.leftLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: this.game.height,
        nextLevel: 'Tutorial_1'
      });
      this.game.add.existing(this.leftLevelColliderBot);

      this.leftLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: this.game.height + 100,
        nextLevel: 'Intro_1'
      });
      this.game.add.existing(this.leftLevelColliderTop);

      this.FlyingDemonGuy = new _FlyingDemon2.default({
        game: this.game,
        pX: this.world.centerX,
        pY: this.world.centerY,
        pPlayer: this.player,
        pHeightMin: this.world.centerY - 200,
        pHeightMax: this.world.centerY + 20
      });

      this.game.add.existing(this.FlyingDemonGuy);

      this.world.sendToBack(this.background);
      this.world.bringToTop(this.player);
    }
  }, {
    key: 'render',
    value: function render() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_Final', 'left', 2156.3, 3156.7);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_Start', 'left', 594.0, 702.3);
        }
      }

      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the second test level');
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 147.5, 1256.7);
      }

      //  Check for overlap with leftLevelColliderTop
      if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the first intro level');
        this.loadLevel(this.leftLevelColliderTop.getLevel(), 1629, 434.6);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 377 */
/*!*******************************!*\
  !*** ./src/itemData/Kunai.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item2 = __webpack_require__(/*! ./Item.js */ 58);

var _Item3 = _interopRequireDefault(_Item2);

var _Player = __webpack_require__(/*! ../sprites/Player */ 57);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kunai = function (_Item) {
  _inherits(Kunai, _Item);

  function Kunai() {
    _classCallCheck(this, Kunai);

    var _this = _possibleConstructorReturn(this, (Kunai.__proto__ || Object.getPrototypeOf(Kunai)).call(this, 'Kunai'));
    // Initialize object basics


    _this.isWeapon = true;
    _this.cooldown = 0.3;
    return _this;
  }

  _createClass(Kunai, [{
    key: 'activate',
    value: function activate(pPlayer) {
      pPlayer.actionState = _Player2.default.actionStates.KUNAI;
    }
  }]);

  return Kunai;
}(_Item3.default);

exports.default = Kunai;

/***/ }),
/* 378 */
/*!*************************************!*\
  !*** ./src/Enemies/MaskedTurtle.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WalkerAI2 = __webpack_require__(/*! ./WalkerAI.js */ 102);

var _WalkerAI3 = _interopRequireDefault(_WalkerAI2);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaskedTurtle = function (_WalkerAI) {
  _inherits(MaskedTurtle, _WalkerAI);

  function MaskedTurtle(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, MaskedTurtle);

    var _this = _possibleConstructorReturn(this, (MaskedTurtle.__proto__ || Object.getPrototypeOf(MaskedTurtle)).call(this, { game: game, pX: pX, pY: pY, speed: 125, spriteName: 'David', pPlayer: pPlayer }));

    _this.body.clearShapes();
    _this.body.addRectangle(100, 145, 200, 225);
    _this.body.addToWorld();
    _this.body.data.shapes[0].sensor = true;

    _this.setPoints(_this.x - 150, _this.y - 100, _this.x + 150, _this.y - 100);
    _this.animations.add('run', (0, _utils.sequentialNumArray)(8, 21), 10, true);
    _this.animations.add('dead', [1], 10, true);
    // this.animations.play('run')
    return _this;
  }

  return MaskedTurtle;
}(_WalkerAI3.default);

exports.default = MaskedTurtle;

/***/ }),
/* 379 */
/*!***************************!*\
  !*** ./src/PopsConfig.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  DAMAGE_TIMER: 1.0
};

/***/ }),
/* 380 */
/*!***********************************!*\
  !*** ./src/PopsBoss/PopsHands.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var PopsHands = function (_Phaser$Sprite) {
  _inherits(PopsHands, _Phaser$Sprite);

  function PopsHands(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y,
        pPopsHead = _ref.pPopsHead;

    _classCallCheck(this, PopsHands);

    var _this = _possibleConstructorReturn(this, (PopsHands.__proto__ || Object.getPrototypeOf(PopsHands)).call(this, game, x, y, 'pops-hands', 0));

    _this.BossHead = pPopsHead;
    _this.incorporeal = false;
    // this.animations.play('idle')

    _this.anchor.setTo(0.5, 0.5);
    _this.animations.add('Idle', [0], 10, true);
    _this.animations.add('SummonMonsters', [3, 4, 4, 4, 5, 5, 5, 4, 4, 6, 7], 10, false);
    _this.animations.add('PostSummon', [7], 10, true);
    _this.animations.add('SlamAttack', [18, 18, 19, 19, 20, 21, 22, 21, 19, 23], 10, false);

    _this.animations.getAnimation('SummonMonsters').onComplete.add(function () {
      _this.animations.play('PostSummon');
      _this.BossHead.setHandColliders();
    }, _this);

    _this.animations.getAnimation('SlamAttack').onComplete.add(function () {
      _this.animations.play('Idle');
      _this.BossHead.summoning = false;
      _this.BossHead.spawnWave();
    }, _this);
    return _this;
  }

  _createClass(PopsHands, [{
    key: 'takeDamage',
    value: function takeDamage() {
      // Tell the head to process the damage
      this.BossHead.startTakingDamage();
      // Become incorporeal to prevent the player from dealing all 5 damage in a single hit
      // Also prevents player from taking damage immediately after a successful attack
      this.incorporeal = true;
    }

    // Check for collision with the player

  }, {
    key: 'checkPlayer',
    value: function checkPlayer(bodyA, bodyB, shapeA, shapeB, contactData) {
      // check whether BossHands can interact with player
      if (this.incorporeal) {
        return;
      }

      // If the player is attacking, we check the player's hitbox AND the weapon hitbox
      if (this.player.meleeAttacking()) {
        if (bodyA === this.player.body) {
          // Take Damage
          this.takeDamage();
        }
        // If the player isn't attacking, only check the player's hitbox
      } else if (bodyA === this.player.body) {
        // Damage the player and give the player 1 second of iFrames
        this.damagePlayer();
      }
    }
  }]);

  return PopsHands;
}(_phaser2.default.Sprite);

exports.default = PopsHands;

/***/ }),
/* 381 */
/*!********************************!*\
  !*** ./src/Enemies/FlierAI.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _EnemyBase2 = __webpack_require__(/*! ./EnemyBase.js */ 142);

var _EnemyBase3 = _interopRequireDefault(_EnemyBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlierAI = function (_EnemyBase) {
  _inherits(FlierAI, _EnemyBase);

  function FlierAI(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        speed = _ref.speed,
        spriteName = _ref.spriteName,
        pPlayer = _ref.pPlayer,
        pHeightMax = _ref.pHeightMax,
        pHeightMin = _ref.pHeightMin;

    _classCallCheck(this, FlierAI);

    console.log(game);

    // Limits on the enemy's movement
    var _this = _possibleConstructorReturn(this, (FlierAI.__proto__ || Object.getPrototypeOf(FlierAI)).call(this, {
      game: game,
      pX: pX,
      pY: pY,
      pSpeed: speed,
      spriteName: spriteName,
      pPlayer: pPlayer }));

    _this.heightMin = pHeightMin;
    _this.heightMax = pHeightMax;
    _this.movingDown = true;
    _this.body.velocity.y = speed;
    return _this;
  }

  _createClass(FlierAI, [{
    key: 'setAnchor',
    value: function setAnchor(pX, pY) {
      this.anchor.setTo(pX, pY);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(FlierAI.prototype.__proto__ || Object.getPrototypeOf(FlierAI.prototype), 'update', this).call(this);
      if (this.movingDown && this.y >= this.heightMax) {
        this.body.velocity.y = -this.speed;
        this.movingDown = false;
        console.log('Moving Up');
      } else if (!this.movingDown && this.y <= this.heightMin) {
        this.body.velocity.y = this.speed;
        this.movingDown = true;
        console.log('Moving Down');
      }
    }
  }]);

  return FlierAI;
}(_EnemyBase3.default);

exports.default = FlierAI;

/***/ }),
/* 382 */
/*!***********************************!*\
  !*** ./src/PopsBoss/DyingPops.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _utils = __webpack_require__(/*! ../utils.js */ 35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var DyingPops = function (_Phaser$Sprite) {
  _inherits(DyingPops, _Phaser$Sprite);

  function DyingPops(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, DyingPops);

    var _this = _possibleConstructorReturn(this, (DyingPops.__proto__ || Object.getPrototypeOf(DyingPops)).call(this, game, x, y, 'pops-dying', 0));

    _this.anchor.setTo(0.5, 0.5);

    _this.animations.add('Dying', (0, _utils.sequentialNumArray)(0, 8), 5, false);
    _this.animations.getAnimation('Dying').onComplete.add(function () {
      _this.winGame();
    }, _this);

    _this.animations.play('Dying');
    return _this;
  }

  _createClass(DyingPops, [{
    key: 'winGame',
    value: function winGame() {
      this.game.state.start('Win');
    }
  }]);

  return DyingPops;
}(_phaser2.default.Sprite);

exports.default = DyingPops;

/***/ }),
/* 383 */
/*!**************************************!*\
  !*** ./src/levelData/Level_Start.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _Pops = __webpack_require__(/*! ../sprites/Pops.js */ 144);

var _Pops2 = _interopRequireDefault(_Pops);

var _SaveScroll = __webpack_require__(/*! ../objects/SaveScroll.js */ 103);

var _SaveScroll2 = _interopRequireDefault(_SaveScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'LevelStart-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: 1206.1,
        pY: 403,
        nextLevel: 'Level_1'
      });
      this.game.add.existing(this.rightLevelCollider);

      this.popsDesk = new _Pops2.default({
        game: this.game,
        x: 970,
        y: 470
      });
      this.popsDesk.scale.setTo(1.05, 1.05);
      this.game.add.existing(this.popsDesk);

      this.save = new _SaveScroll2.default({
        game: this.game,
        pX: 2000,
        pY: 2000
      });
      this.game.add.existing(this.save);

      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      // Don't show the health bar in the starting level
      this.UIhealth_bar1.visible = false;
      this.UIhealth_bar2.visible = false;
      this.UIhealth_bar3.visible = false;
      this.UIhealth_bar4.visible = false;

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Tutorial_0', 'right', 1683.3, 674.0);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_1', 'left', 1629, 434.6);
        }
      }

      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the first level');
        this.saveLevel('Level_Start', this.scale.x, this.player.x, this.player.y);
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 152.1, 1334.7);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 384 */
/*!**********************************!*\
  !*** ./src/states/StartScene.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _Pops = __webpack_require__(/*! ../sprites/Pops.js */ 144);

var _Pops2 = _interopRequireDefault(_Pops);

var _NinjaIdle = __webpack_require__(/*! ../sprites/NinjaIdle.js */ 145);

var _NinjaIdle2 = _interopRequireDefault(_NinjaIdle);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      this.setUpKeyboard();

      this.background = this.game.add.sprite(0, _config2.default.gamewidth, 'StartBG');
      // this.background.anchor.setTo(1, 1)
      // this.background.scale.setTo(1, 1)

      // Load the sprite for the fadeout
      this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare');
      this.blackSquare.scale.setTo(4, 4);
      this.blackSquare.alpha = 0;

      //  Create Pops
      this.popsDesk = new _Pops2.default({
        game: this.game,
        x: 970.0,
        y: 470.0
      });
      this.game.add.existing(this.popsDesk);

      // Create the ninja
      this.ninjaIdle = new _NinjaIdle2.default({
        game: this.game,
        x: 594.0,
        y: 702
      });
      this.ninjaIdle.scale.setTo(0.75, 0.75);
      this.ninjaIdle.scale.x *= -1;
      this.game.add.existing(this.ninjaIdle);

      //  Sets camera to follow player
      this.game.camera.follow(this.ninjaIdle, _phaser2.default.Camera.FOLLOW_PLATFORMER);
      var w = this.game.camera.width / 8;
      var h = this.game.camera.height / 3;
      this.game.camera.deadzone = new _phaser2.default.Rectangle((this.game.camera.width - w) / 2, (this.game.camera.height - h) / 2 + 1.5 * h * 0.25, w, h);

      // Add the Pops textboxes in order
      this.Pops1_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops1-7');
      this.Pops1_7.anchor.setTo(0.5, 0.5);
      this.Pops1_7.scale.setTo(0.7, 0.7);
      this.Pops1_7.alpha = 0;
      this.Pops1_7.fixedToCamera = true;

      this.Pops2_3 = this.game.add.sprite(this.game.width / 2, 630, 'Pops2-3');
      this.Pops2_3.anchor.setTo(0.5, 0.5);
      this.Pops2_3.scale.setTo(0.7, 0.7);
      this.Pops2_3.alpha = 0;
      this.Pops2_3.fixedToCamera = true;

      this.Pops3_4 = this.game.add.sprite(this.game.width / 2, 630, 'Pops3-4');
      this.Pops3_4.anchor.setTo(0.5, 0.5);
      this.Pops3_4.scale.setTo(0.7, 0.7);
      this.Pops3_4.alpha = 0;
      this.Pops3_4.fixedToCamera = true;

      this.Pops4_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops4-7');
      this.Pops4_7.anchor.setTo(0.5, 0.5);
      this.Pops4_7.scale.setTo(0.7, 0.7);
      this.Pops4_7.alpha = 0;
      this.Pops4_7.fixedToCamera = true;

      this.Pops4_12 = this.game.add.sprite(this.game.width / 2, 630, 'Pops4-12');
      this.Pops4_12.anchor.setTo(0.5, 0.5);
      this.Pops4_12.scale.setTo(0.7, 0.7);
      this.Pops4_12.alpha = 0;
      this.Pops4_12.fixedToCamera = true;

      this.Pops5_3 = this.game.add.sprite(this.game.width / 2, 630, 'Pops5-3');
      this.Pops5_3.anchor.setTo(0.5, 0.5);
      this.Pops5_3.scale.setTo(0.7, 0.7);
      this.Pops5_3.alpha = 0;
      this.Pops5_3.fixedToCamera = true;

      this.Pops6_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops6-7');
      this.Pops6_7.anchor.setTo(0.5, 0.5);
      this.Pops6_7.scale.setTo(0.7, 0.7);
      this.Pops6_7.alpha = 0;
      this.Pops6_7.fixedToCamera = true;

      this.Pops7_10 = this.game.add.sprite(this.game.width / 2, 630, 'Pops7-10');
      this.Pops7_10.anchor.setTo(0.5, 0.5);
      this.Pops7_10.scale.setTo(0.7, 0.7);
      this.Pops7_10.alpha = 0;
      this.Pops7_10.fixedToCamera = true;

      this.Pops8_12 = this.game.add.sprite(this.game.width / 2, 630, 'Pops8-12');
      this.Pops8_12.anchor.setTo(0.5, 0.5);
      this.Pops8_12.scale.setTo(0.7, 0.7);
      this.Pops8_12.alpha = 0;
      this.Pops8_12.fixedToCamera = true;

      this.Pops9_6 = this.game.add.sprite(this.game.width / 2, 630, 'Pops9-6');
      this.Pops9_6.anchor.setTo(0.5, 0.5);
      this.Pops9_6.scale.setTo(0.7, 0.7);
      this.Pops9_6.alpha = 0;
      this.Pops9_6.fixedToCamera = true;

      // Add the ninja's textbox
      this.ninjaTalk = this.game.add.sprite(this.game.width / 2, 630, 'NinjaTalk');
      this.ninjaTalk.anchor.setTo(0.5, 0.5);
      this.ninjaTalk.scale.setTo(0.7, 0.7);
      this.ninjaTalk.alpha = 0;
      this.ninjaTalk.fixedToCamera = true;

      // Counter to go through text
      this.counter = 0;
      this.createText(this.counter);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.nextTextKey.justPressed()) {
        // TODO: Switch case that increments itself, make sure to ignore the key after it's pressed
        this.counter++;
        this.createText(this.counter);
        this.nextTextKey.ignore = true;
      }
      if (this.nextTextKey.justReleased()) {
        this.nextTextKey.ignore = false;
      }
    }
  }, {
    key: 'createText',
    value: function createText(counter) {
      switch (counter) {
        case 0:
          this.Pops1_7.alpha = 1;
          break;
        case 1:
          this.Pops1_7.alpha = 0;
          this.ninjaTalk.alpha = 1;
          break;
        case 2:
          this.ninjaTalk.alpha = 0;
          this.Pops2_3.alpha = 1;
          break;
        case 3:
          this.Pops2_3.alpha = 0;
          this.ninjaTalk.alpha = 1;
          break;
        case 4:
          this.ninjaTalk.alpha = 0;
          this.Pops3_4.alpha = 1;
          break;
        case 5:
          this.Pops3_4.alpha = 0;
          this.ninjaTalk.alpha = 1;
          break;
        case 6:
          this.ninjaTalk.alpha = 0;
          this.Pops4_7.alpha = 1;
          break;
        case 7:
          this.Pops4_7.alpha = 0;
          this.Pops4_12.alpha = 1;
          break;
        case 8:
          this.Pops4_12.alpha = 0;
          this.ninjaTalk.alpha = 1;
          break;
        case 9:
          this.ninjaTalk.alpha = 0;
          this.Pops5_3.alpha = 1;
          break;
        case 10:
          this.Pops5_3.alpha = 0;
          this.Pops6_7.alpha = 1;
          break;
        case 11:
          this.Pops6_7.alpha = 0;
          this.ninjaTalk.alpha = 1;
          break;
        case 12:
          this.ninjaTalk.alpha = 0;
          this.Pops7_10.alpha = 1;
          break;
        case 13:
          this.Pops7_10.alpha = 0;
          this.Pops8_12.alpha = 1;
          break;
        case 14:
          this.Pops8_12.alpha = 0;
          this.Pops9_6.alpha = 1;
          break;
        case 15:
          this.Pops9_6.alpha = 0;
          this.game.state.start('Level_Start');
          break;
      }
    }
  }, {
    key: 'setUpKeyboard',
    value: function setUpKeyboard() {
      this.nextTextKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 385 */
/*!**********************************!*\
  !*** ./src/levelData/Level_1.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


// import Scroll from '../itemData/Scroll.js'
// import WallJumping from '../itemData/WallJumping.js'
// import SaveScroll from '../objects/SaveScroll.js'

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // TODO: FIX PLAYER STARTING POSITION BY CREATING A GLOBAL VARIABLE
    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level1-data'));
    // Set player position


    _this.name = 'Level_1';
    return _this;
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      if (true) {
        this.leftLevelColliderBot = new _LevelCollider2.default({
          game: this.game,
          pX: 0,
          pY: 1030, // 1330 - 300
          nextLevel: 'Level_Start'
        });
        this.game.add.existing(this.leftLevelColliderBot);
      }

      this.rightLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: this.game.width + 200,
        pY: 200,
        nextLevel: 'Level_2'
      });

      this.game.add.existing(this.rightLevelColliderTop);

      // this.save = new SaveScroll({
      //   game: this.game,
      //   pX: 477.2,
      //   pY: 1165
      // })
      // this.game.add.existing(this.save)
      //
      // this.wallJumpScroll = new Scroll({
      //   game: this.game,
      //   pX: 677.2,
      //   pY: 1165,
      //   pAbility: new WallJumping(),
      //   pPlayer: this.player
      // })
      // this.game.add.existing(this.wallJumpScroll)
      //
      // if (this.player.Inventory.hasWallJump) {
      //   this.wallJumpScroll.deactivate()
      // }

      // Makes sure the player passes on top of the saving scroll layer
      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_Start', 'left', 594.0, 702.3);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_2', 'right', 502.2, 1138.2);
        }
      }

      //  Check for overlap with rightLevelColliderTop
      if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the second level');
        this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 157.6, 750.0);
      }

      if (true) {
        //  Check for overlap with leftLevelColliderBot
        if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
          console.info('Going into the start level');
          this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1055.2, 702.3);
        }
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 386 */
/*!**********************************!*\
  !*** ./src/levelData/Level_2.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _FlyingDemon = __webpack_require__(/*! ../Enemies/FlyingDemon.js */ 59);

var _FlyingDemon2 = _interopRequireDefault(_FlyingDemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level2-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.leftLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 1320.1,
        nextLevel: 'Level_3'
      });
      this.game.add.existing(this.leftLevelColliderBot);

      this.leftLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 460.0,
        nextLevel: 'Level_1'
      });
      this.game.add.existing(this.leftLevelColliderTop);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: this.game.width + 400,
        pY: 412.3,
        nextLevel: 'Level_5'
      });
      this.game.add.existing(this.rightLevelCollider);

      // Place the monsters
      this.smallDemon_0 = new _smallDemon2.default({
        game: this.game,
        pX: this.world.centerX - 260,
        pY: this.world.centerY + 375,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_0);

      this.smallDemon_1 = new _smallDemon2.default({
        game: this.game,
        pX: this.world.centerX - 260,
        pY: this.world.centerY + 1050,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_1);

      this.FlyingDemon_0 = new _FlyingDemon2.default({
        game: this.game,
        pX: this.world.centerX + 450,
        pY: this.world.centerY - 1300,
        pPlayer: this.player,
        pHeightMin: this.world.centerY - 1300,
        pHeightMax: this.world.centerY - 1000
      });

      this.game.add.existing(this.FlyingDemon_0);

      this.FlyingDemon_1 = new _FlyingDemon2.default({
        game: this.game,
        pX: this.world.centerX + 550,
        pY: this.world.centerY - 1000,
        pPlayer: this.player,
        pHeightMin: this.world.centerY - 1300,
        pHeightMax: this.world.centerY - 1000
      });

      this.game.add.existing(this.FlyingDemon_1);

      this.FlyingDemon_2 = new _FlyingDemon2.default({
        game: this.game,
        pX: this.world.centerX + 650,
        pY: this.world.centerY - 1300,
        pPlayer: this.player,
        pHeightMin: this.world.centerY - 1300,
        pHeightMax: this.world.centerY - 1000
      });

      this.game.add.existing(this.FlyingDemon_2);

      this.FlyingDemon_3 = new _FlyingDemon2.default({
        game: this.game,
        pX: this.world.centerX + 750,
        pY: this.world.centerY - 1000,
        pPlayer: this.player,
        pHeightMin: this.world.centerY - 1300,
        pHeightMax: this.world.centerY - 1000
      });

      this.game.add.existing(this.FlyingDemon_3);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_1', 'left', 1629, 434.6);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_3', 'left', 177.8, 730);
        }
      }

      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the third level');
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1587.3, 420.2);
      }
      //  Check for overlap with leftLevelColliderTop
      if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the first level');
        this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 1629, 434.7);
      }
      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the fourth level');
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 207.7, 1931.7);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 387 */
/*!**********************************!*\
  !*** ./src/levelData/Level_3.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _Chest = __webpack_require__(/*! ../itemData/Chest.js */ 74);

var _Chest2 = _interopRequireDefault(_Chest);

var _Sword = __webpack_require__(/*! ../itemData/Sword.js */ 140);

var _Sword2 = _interopRequireDefault(_Sword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level3-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: this.game.width + 200,
        pY: 120.1,
        nextLevel: 'Level_2'
      });
      this.game.add.existing(this.rightLevelCollider);

      // Create and add a test Chest object
      this.swordChest = new _Chest2.default({
        game: this.game,
        pX: 150,
        pY: 570,
        pItem: new _Sword2.default(),
        pPlayer: this.player
      });
      this.swordChest.scale.setTo(-0.5, 0.5);
      this.game.add.existing(this.swordChest);

      if (this.player.Inventory.hasSword) {
        this.swordChest.deactivate();
      }

      this.UIhealth_bar1.bringToTop();
      this.UIhealth_bar2.bringToTop();
      this.UIhealth_bar3.bringToTop();
      this.UIhealth_bar4.bringToTop();
      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_2', 'right', 502.2, 1138.2);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_4', 'right', 200.0, 200.0);
        }
      }

      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the fourth level');
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 152.7, 1620);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 388 */
/*!**********************************!*\
  !*** ./src/levelData/Level_4.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

var _FlyingDemon = __webpack_require__(/*! ../Enemies/FlyingDemon.js */ 59);

var _FlyingDemon2 = _interopRequireDefault(_FlyingDemon);

var _Chest = __webpack_require__(/*! ../itemData/Chest.js */ 74);

var _Chest2 = _interopRequireDefault(_Chest);

var _Hammer = __webpack_require__(/*! ../itemData/Hammer.js */ 389);

var _Hammer2 = _interopRequireDefault(_Hammer);

var _SaveScroll = __webpack_require__(/*! ../objects/SaveScroll.js */ 103);

var _SaveScroll2 = _interopRequireDefault(_SaveScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level4-data'));
    // Set player position


    _this.name = 'Level_4';
    return _this;
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.leftLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 206.1,
        nextLevel: 'Level_9'
      });
      this.game.add.existing(this.leftLevelColliderTop);

      this.leftLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 1241.8,
        nextLevel: 'Level_6'
      });
      this.game.add.existing(this.leftLevelColliderBot);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: 2975.1 + 25,
        pY: 297.1,
        nextLevel: 'Level_7'
      });
      this.game.add.existing(this.rightLevelCollider);

      this.smallDemon_2 = new _smallDemon2.default({
        game: this.game,
        pX: this.world.centerX - 950,
        pY: this.world.centerY - 640,
        pPlayer: this.player
      });

      this.game.add.existing(this.smallDemon_2);

      this.bigDemon_0 = new _BigDemon2.default({
        game: this.game,
        pX: 700,
        pY: 740,
        pPlayer: this.player
      });

      this.game.add.existing(this.bigDemon_0);

      this.smallDemon_1 = new _smallDemon2.default({
        game: this.game,
        pX: this.world.centerX - 850,
        pY: this.world.centerY - 640,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_1);

      this.smallDemon_4 = new _smallDemon2.default({
        game: this.game,
        pX: this.world.centerX - 950,
        pY: this.world.centerY - 640,
        pPlayer: this.player
      });

      this.game.add.existing(this.smallDemon_4);

      this.smallDemon_5 = new _smallDemon2.default({
        game: this.game,
        pX: 1900,
        pY: 1900,
        pPlayer: this.player
      });

      this.game.add.existing(this.smallDemon_5);

      this.smallDemon_6 = new _smallDemon2.default({
        game: this.game,
        pX: 2000,
        pY: 1900,
        pPlayer: this.player
      });

      this.game.add.existing(this.smallDemon_6);

      this.smallDemon_7 = new _smallDemon2.default({
        game: this.game,
        pX: 2100,
        pY: 1900,
        pPlayer: this.player
      });

      this.game.add.existing(this.smallDemon_7);

      this.hammerChest = new _Chest2.default({
        game: this.game,
        pX: 1530.0,
        pY: 1715.4,
        pItem: new _Hammer2.default(),
        pPlayer: this.player
      });
      this.game.add.existing(this.hammerChest);

      // Deactivate the chest after the player receives the item
      if (this.player.Inventory.hasHammer) {
        this.hammerChest.deactivate();
      }

      this.save = new _SaveScroll2.default({
        game: this.game,
        pX: 483.2,
        pY: 337.8
      });
      this.game.add.existing(this.save);

      // Makes sure the player passes on top of the saving scroll layer
      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_3', 'left', 177.8, 730);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_5', 'left', 189.4, 441.0);
        }
      }

      //  Check for overlap with leftLevelColliderTop
      if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the ninth level');
        this.loadLevel(this.leftLevelColliderTop.getLevel(), 'right', 1752.2, 4973.4);
      }

      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the sixth level');
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 2856.1, 532.2);
      }
      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the fifth level');
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 102.9, 532.8);
      }

      // Save the game
      if (this.player.isDead !== true && this.save.overlapWithObject(this.player)) {
        console.info('Saving the game...');
        this.saveLevel(this.name, this.scale.x, this.player.x, this.player.y);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 389 */
/*!********************************!*\
  !*** ./src/itemData/Hammer.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Item2 = __webpack_require__(/*! ./Item.js */ 58);

var _Item3 = _interopRequireDefault(_Item2);

var _Player = __webpack_require__(/*! ../sprites/Player */ 57);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hammer = function (_Item) {
  _inherits(Hammer, _Item);

  function Hammer() {
    _classCallCheck(this, Hammer);

    var _this = _possibleConstructorReturn(this, (Hammer.__proto__ || Object.getPrototypeOf(Hammer)).call(this, 'Hammer'));
    // Initialize object basics


    _this.isWeapon = true;
    _this.cooldown = 0.6;
    return _this;
  }

  _createClass(Hammer, [{
    key: 'activate',
    value: function activate(pPlayer) {
      if (pPlayer.health === 1) {
        return;
      }
      //  pPlayer.body.y -= 100
      pPlayer.actionState = _Player2.default.actionStates.HAMMER_SWING;
      pPlayer.health--;
    }
  }]);

  return Hammer;
}(_Item3.default);

exports.default = Hammer;

/***/ }),
/* 390 */
/*!**********************************!*\
  !*** ./src/levelData/Level_5.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

var _SaveScroll = __webpack_require__(/*! ../objects/SaveScroll.js */ 103);

var _SaveScroll2 = _interopRequireDefault(_SaveScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level5-data'));
    // Set player position


    _this.name = 'Level_5';
    return _this;
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.leftLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 1630.7,
        nextLevel: 'Level_2'
      });
      this.game.add.existing(this.leftLevelColliderBot);

      this.leftLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 138.6,
        nextLevel: 'Level_6'
      });
      this.game.add.existing(this.leftLevelColliderTop);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: 2975.1 + 25,
        pY: 1642.5,
        nextLevel: 'Level_7'
      });
      this.game.add.existing(this.rightLevelCollider);

      // Place the monsters
      this.smallDemon_0 = new _smallDemon2.default({
        game: this.game,
        pX: 500,
        pY: 1100,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_0);

      this.smallDemon_1 = new _smallDemon2.default({
        game: this.game,
        pX: 600,
        pY: 1100,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_1);

      this.smallDemon_2 = new _smallDemon2.default({
        game: this.game,
        pX: 700,
        pY: 1100,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_2);

      this.smallDemon_3 = new _smallDemon2.default({
        game: this.game,
        pX: 900,
        pY: 1100,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_3);

      this.BigDemonBoi = new _BigDemon2.default({
        game: this.game,
        pX: 700,
        pY: 1716,
        pPlayer: this.player
      });
      this.game.add.existing(this.BigDemonBoi);

      this.save = new _SaveScroll2.default({
        game: this.game,
        pX: 1648.9,
        pY: 1236.4
      });
      this.game.add.existing(this.save);

      // Makes sure the player passes on top of the saving scroll layer
      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_4', 'right', 200.0, 200.0);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_6', 'right', 160, 600); // TODO: ISSUE LOADING
        }
      }

      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the second level');
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1856.6, 700.0); // 2849.9, 733.7
      }
      //  Check for overlap with leftLevelColliderTop
      if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the sixth level');
        this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 2810.7, 2962.1);
      }
      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the seventh level');
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 246.4, 1976.3);
      }

      // Save the game
      if (this.player.isDead !== true && this.save.overlapWithObject(this.player)) {
        console.info('Saving the game...');
        this.saveLevel(this.name, this.scale.x, this.player.x, this.player.y);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 391 */
/*!**********************************!*\
  !*** ./src/levelData/Level_6.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

var _Scroll = __webpack_require__(/*! ../itemData/Scroll.js */ 392);

var _Scroll2 = _interopRequireDefault(_Scroll);

var _WallJumping = __webpack_require__(/*! ../itemData/WallJumping.js */ 393);

var _WallJumping2 = _interopRequireDefault(_WallJumping);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level6-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.rightLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 2975.1 + 25,
        pY: 2662.1,
        nextLevel: 'Level_5'
      });
      this.game.add.existing(this.rightLevelColliderBot);

      this.rightLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 2975.1 + 25,
        pY: 222.1,
        nextLevel: 'Level_4'
      });
      this.game.add.existing(this.rightLevelColliderTop);

      this.wallJumpScroll = new _Scroll2.default({
        game: this.game,
        pX: 372.2,
        pY: 1163,
        pAbility: new _WallJumping2.default(),
        pPlayer: this.player
      });
      this.wallJumpScroll.scale.x *= -1;
      this.game.add.existing(this.wallJumpScroll);

      if (this.player.Inventory.hasWallJump) {
        this.wallJumpScroll.deactivate();
      }

      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_5', 'left', 189.4, 441.0);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_7', 'left', 539, 1997.8);
        }
      }

      //  Check for overlap with rightLevelColliderBot
      if (this.player.isDead !== true && this.rightLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the fourth level');
        this.loadLevel(this.rightLevelColliderBot.getLevel(), 'right', 200.1, 441.0);
      }
      //  Check for overlap with rightLevelColliderTop
      if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the fifth level');
        this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 202.6, 1528.8);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 392 */
/*!********************************!*\
  !*** ./src/itemData/Scroll.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scroll = function (_Phaser$Sprite) {
  _inherits(Scroll, _Phaser$Sprite);

  function Scroll(_ref) {
    var game = _ref.game,
        pX = _ref.pX,
        pY = _ref.pY,
        pAbility = _ref.pAbility,
        pPlayer = _ref.pPlayer;

    _classCallCheck(this, Scroll);

    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, game, pX, pY, 'scroll', 0));
    // Initialize object basics


    _this.game = game;
    _this.mAbility = pAbility;
    _this.player = pPlayer;
    _this.active = true;

    _this.scale.setTo(0.4, 0.4);
    _this.anchor.setTo(0.5, 0.5);

    _this.leftPoint = new _phaser2.default.Point(_this.x - 60, _this.y + 30);
    _this.centerPoint = new _phaser2.default.Point(_this.x, _this.y + 30);
    _this.rightPoint = new _phaser2.default.Point(_this.x + 60, _this.y + 30);

    _this._timer = new _phaser2.default.Time(_this.game);

    // Load the text for wall jump
    _this.wallJumpText = _this.game.add.sprite(_this.game.width / 2, _this.game.height * 0.75, 'wallJumpText');
    _this.wallJumpText.anchor.setTo(0.5, 0.5);
    _this.wallJumpText.alpha = 0;
    _this.wallJumpText.fixedToCamera = true;
    return _this;
  }

  // Return the ability i nthe scroll


  _createClass(Scroll, [{
    key: 'getAbility',
    value: function getAbility() {
      console.info('Pickup called in scroll');
      return this.mAbility;
    }
  }, {
    key: 'showText',
    value: function showText() {
      this.show = true;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.overlapWithObject(this.player) && this.active) {
        console.log('Adding an ability to inventory');
        console.log(this.player);
        console.log(this.mAbility);
        this.player.addToInventory(this.mAbility);
        this.deactivate();
      }

      // Show text for the Sword OR Meteor Chain
      if (this.show === true) {
        if (this.mAbility.name === 'Wall Jump') {
          this.wallJumpText.alpha = 5;
        }
        this.show = false;
      } else if (this.show === false && this.wallJumpText.alpha > 0) {
        this.wallJumpText.alpha -= this._timer.physicsElapsed;
        if (this.wallJumpText.alpha < 0) {
          this.wallJumpText.alpha = 0;
        }
      }
    }
  }, {
    key: 'deactivate',
    value: function deactivate() {
      this.active = false;
    }

    //  Checks whether the chest is overlapping with pSprite

  }, {
    key: 'overlapWithObject',
    value: function overlapWithObject(pSprite) {
      // Stops the function from executing if the player is attacking
      if (pSprite.meleeAttacking()) {
        return;
      }

      if (pSprite === null || pSprite === undefined) {
        return false;
      }
      if (!this.active) {
        return false;
      }

      //  Check left side of the collision box
      var bodies = this.game.physics.p2.hitTest(this.leftPoint);
      //  console.info(bodies.length)
      for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }

      //  Check center of the collision box
      bodies = this.game.physics.p2.hitTest(this.centerPoint);
      for (var _i = 0; _i < bodies.length; _i++) {
        if (bodies[_i].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
      //  Check right side of the collision box
      bodies = this.game.physics.p2.hitTest(this.rightPoint);
      for (var _i2 = 0; _i2 < bodies.length; _i2++) {
        if (bodies[_i2].parent.sprite === pSprite) {
          this.showText();
          return true;
        }
      }
    }
  }]);

  return Scroll;
}(_phaser2.default.Sprite);

exports.default = Scroll;

/***/ }),
/* 393 */
/*!*************************************!*\
  !*** ./src/itemData/WallJumping.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Item2 = __webpack_require__(/*! ./Item.js */ 58);

var _Item3 = _interopRequireDefault(_Item2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import MainPlayer from '../sprites/Player'

var WallJumping = function (_Item) {
  _inherits(WallJumping, _Item);

  function WallJumping() {
    _classCallCheck(this, WallJumping);

    var _this = _possibleConstructorReturn(this, (WallJumping.__proto__ || Object.getPrototypeOf(WallJumping)).call(this, 'Wall Jump'));
    // Initialize object basics


    _this.isWeapon = false;
    _this.cooldown = 0.0;
    return _this;
  }

  return WallJumping;
}(_Item3.default);

exports.default = WallJumping;

/***/ }),
/* 394 */
/*!**********************************!*\
  !*** ./src/levelData/Level_7.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _FlyingDemon = __webpack_require__(/*! ../Enemies/FlyingDemon.js */ 59);

var _FlyingDemon2 = _interopRequireDefault(_FlyingDemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */


var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level7-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.leftLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 1697.8,
        nextLevel: 'Level_5'
      });
      this.game.add.existing(this.leftLevelColliderBot);

      this.leftLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 230.3,
        nextLevel: 'Level_4'
      });
      this.game.add.existing(this.leftLevelColliderTop);

      this.rightLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: 2975.1 + 25,
        pY: 792.1,
        nextLevel: 'Level_8'
      });

      this.game.add.existing(this.rightLevelCollider);
      this.FlyingDemon_0 = new _FlyingDemon2.default({
        game: this.game,
        pX: 400,
        pY: 1000,
        pPlayer: this.player,
        pHeightMin: 600,
        pHeightMax: 1000
      });
      this.game.add.existing(this.FlyingDemon_0);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_6', 'right', 160, 600); // TODO: ISSUE LOADING
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_8', 'right', 181.7, 530.0);
        }
      }

      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the fifth level');
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 2790.2, 1941.7);
      }
      //  Check for overlap with leftLevelColliderTop
      if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the fourth level');
        this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 2813.6, 736.3);
      }
      //  Check for overlap with rightLevelCollider
      if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the eigth level');
        this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 181.7, 530.0);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 395 */
/*!**********************************!*\
  !*** ./src/levelData/Level_8.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

var _Chest = __webpack_require__(/*! ../itemData/Chest.js */ 74);

var _Chest2 = _interopRequireDefault(_Chest);

var _MeteorChain = __webpack_require__(/*! ../itemData/MeteorChain.js */ 141);

var _MeteorChain2 = _interopRequireDefault(_MeteorChain);

var _smallDemon = __webpack_require__(/*! ../Enemies/smallDemon.js */ 51);

var _smallDemon2 = _interopRequireDefault(_smallDemon);

var _BigDemon = __webpack_require__(/*! ../Enemies/BigDemon.js */ 52);

var _BigDemon2 = _interopRequireDefault(_BigDemon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level8-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.leftLevelCollider = new _LevelCollider2.default({
        game: this.game,
        pX: 0,
        pY: 230.1,
        nextLevel: 'Level_7'
      });
      this.game.add.existing(this.leftLevelCollider);

      this.meteorChainChest = new _Chest2.default({
        game: this.game,
        pX: 2860.7,
        pY: 750.0,
        pItem: new _MeteorChain2.default(),
        pPlayer: this.player
      });
      this.game.add.existing(this.meteorChainChest);

      // Deactivate the chest after the player receives the item
      if (this.player.Inventory.hasMeteorChain) {
        this.meteorChainChest.deactivate();
      }

      this.BigDemonBoi = new _BigDemon2.default({
        game: this.game,
        pX: 2000,
        pY: 565,
        pPlayer: this.player
      });
      this.game.add.existing(this.BigDemonBoi);

      this.smallDemon_0 = new _smallDemon2.default({
        game: this.game,
        pX: 1000,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_0);

      this.smallDemon_1 = new _smallDemon2.default({
        game: this.game,
        pX: 1100,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_1);

      this.smallDemon_2 = new _smallDemon2.default({
        game: this.game,
        pX: 1200,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_2);

      this.smallDemon_3 = new _smallDemon2.default({
        game: this.game,
        pX: 1300,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_3);

      this.smallDemon_4 = new _smallDemon2.default({
        game: this.game,
        pX: 1400,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_4);

      this.smallDemon_6 = new _smallDemon2.default({
        game: this.game,
        pX: 500,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_6);

      this.smallDemon_7 = new _smallDemon2.default({
        game: this.game,
        pX: 600,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_7);

      this.smallDemon_8 = new _smallDemon2.default({
        game: this.game,
        pX: 700,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_8);

      this.smallDemon_9 = new _smallDemon2.default({
        game: this.game,
        pX: 800,
        pY: 770,
        pPlayer: this.player
      });
      this.game.add.existing(this.smallDemon_9);

      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_7', 'left', 539, 1997.8);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_9', 'left', 815.6, 864.8);
        }
      }

      //  Check for overlap with leftLevelCollider
      if (this.player.isDead !== true && this.leftLevelCollider.overlapWithObject(this.player)) {
        console.info('Going into the seventh level');
        this.loadLevel(this.leftLevelCollider.getLevel(), 'left', 2810.7, 1064.7);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 396 */
/*!**********************************!*\
  !*** ./src/levelData/Level_9.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _LevelCollider = __webpack_require__(/*! ../levelData/LevelCollider.js */ 24);

var _LevelCollider2 = _interopRequireDefault(_LevelCollider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'Level9-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.rightLevelColliderTop = new _LevelCollider2.default({
        game: this.game,
        pX: 1975.1 + 25,
        pY: 506.4,
        nextLevel: 'Level_Final'
      });
      this.game.add.existing(this.rightLevelColliderTop);

      this.rightLevelColliderBot = new _LevelCollider2.default({
        game: this.game,
        pX: 1975.1 + 25,
        pY: 4674.4,
        nextLevel: 'Level_4'
      });
      this.game.add.existing(this.rightLevelColliderBot);
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_8', 'right', 181.7, 530.0);
        }

        if (this.nextLevelKey.justPressed()) {
          this.loadLevel('Level_Final', 'left', 2156.3, 3156.7);
        }
      }

      //  Check for overlap with rightLevelColliderTop
      if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
        console.info('Going into the final scene');
        this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 2156.3, 3156.7);
        this.game.state.start('Final_Scene');
      }

      //  Check for overlap with rightLevelColliderBot
      if (this.player.isDead !== true && this.rightLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the fourth level');
        this.loadLevel(this.rightLevelColliderBot.getLevel(), 'right', 200.0, 506.6);
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 397 */
/*!**********************************!*\
  !*** ./src/states/FinalScene.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _NinjaIdle = __webpack_require__(/*! ../sprites/NinjaIdle.js */ 145);

var _NinjaIdle2 = _interopRequireDefault(_NinjaIdle);

var _PopsBoss = __webpack_require__(/*! ../sprites/PopsBoss */ 398);

var _PopsBoss2 = _interopRequireDefault(_PopsBoss);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// TODO: POPS


var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      this.setUpKeyboard();

      this.background = this.game.add.image(-1350, -2500, 'FinalBG');

      this.popsHead = new _PopsBoss2.default({
        game: this.game,
        x: 770,
        y: -330
      });
      this.popsHead.scale.setTo(10, 10);
      this.game.add.existing(this.popsHead);

      // Load the sprite for the fadeout
      this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare');
      this.blackSquare.scale.setTo(4, 4);
      this.blackSquare.alpha = 0;

      // Create the ninja
      this.ninjaIdle = new _NinjaIdle2.default({
        game: this.game,
        x: 800.0,
        y: 650.0
      });
      this.ninjaIdle.scale.setTo(0.75, 0.75);
      this.ninjaIdle.scale.x *= -1;
      this.game.add.existing(this.ninjaIdle);

      // Add the End textboxes in order
      this.End1_1 = this.game.add.sprite(this.game.width / 2, 630, 'End1-1');
      this.End1_1.anchor.setTo(0.5, 0.5);
      this.End1_1.scale.setTo(0.7, 0.7);
      this.End1_1.alpha = 0;
      this.End1_1.fixedToCamera = true;

      this.End1_2 = this.game.add.sprite(this.game.width / 2, 630, 'End1-2');
      this.End1_2.anchor.setTo(0.5, 0.5);
      this.End1_2.scale.setTo(0.7, 0.7);
      this.End1_2.alpha = 0;
      this.End1_2.fixedToCamera = true;

      this.End1_3 = this.game.add.sprite(this.game.width / 2, 630, 'End1-3');
      this.End1_3.anchor.setTo(0.5, 0.5);
      this.End1_3.scale.setTo(0.7, 0.7);
      this.End1_3.alpha = 0;
      this.End1_3.fixedToCamera = true;

      this.End1_4 = this.game.add.sprite(this.game.width / 2, 630, 'End1-4');
      this.End1_4.anchor.setTo(0.5, 0.5);
      this.End1_4.scale.setTo(0.7, 0.7);
      this.End1_4.alpha = 0;
      this.End1_4.fixedToCamera = true;

      this.End1_5 = this.game.add.sprite(this.game.width / 2, 630, 'End1-5');
      this.End1_5.anchor.setTo(0.5, 0.5);
      this.End1_5.scale.setTo(0.7, 0.7);
      this.End1_5.alpha = 0;
      this.End1_5.fixedToCamera = true;

      this.End1_6 = this.game.add.sprite(this.game.width / 2, 630, 'End1-6');
      this.End1_6.anchor.setTo(0.5, 0.5);
      this.End1_6.scale.setTo(0.7, 0.7);
      this.End1_6.alpha = 0;
      this.End1_6.fixedToCamera = true;

      // Add the ninja's textbox
      this.ninjaTalk = this.game.add.sprite(this.game.width / 2, 630, 'NinjaTalk');
      this.ninjaTalk.anchor.setTo(0.5, 0.5);
      this.ninjaTalk.scale.setTo(0.7, 0.7);
      this.ninjaTalk.alpha = 0;
      this.ninjaTalk.fixedToCamera = true;

      // Counter to go through text
      this.counter = 0;
      this.createText(this.counter);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.nextTextKey.justPressed()) {
        // TODO: Switch case that increments itself, make sure to ignore the key after it's pressed
        this.counter++;
        this.createText(this.counter);
        this.nextTextKey.ignore = true;
      }
      if (this.nextTextKey.justReleased()) {
        this.nextTextKey.ignore = false;
      }
    }
  }, {
    key: 'createText',
    value: function createText(counter) {
      switch (counter) {
        case 0:
          this.End1_1.alpha = 1;
          break;
        case 1:
          this.End1_1.alpha = 0;
          this.End1_2.alpha = 1;
          break;
        case 2:
          this.End1_2.alpha = 0;
          this.End1_3.alpha = 1;
          break;
        case 3:
          this.End1_3.alpha = 0;
          this.End1_4.alpha = 1;
          break;
        case 4:
          this.End1_4.alpha = 0;
          this.End1_5.alpha = 1;
          break;
        case 5:
          this.End1_5.alpha = 0;
          this.End1_6.alpha = 1;
          break;
        case 6:
          this.End1_6.alpha = 0;
          this.game.state.start('Level_Final');
          break;
      }
    }
  }, {
    key: 'setUpKeyboard',
    value: function setUpKeyboard() {
      this.nextTextKey = this.game.input.keyboard.addKey(_phaser2.default.Keyboard.SPACEBAR);
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ }),
/* 398 */
/*!*********************************!*\
  !*** ./src/sprites/PopsBoss.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopsBoss = function (_Phaser$Sprite) {
  _inherits(PopsBoss, _Phaser$Sprite);

  function PopsBoss(_ref) {
    var game = _ref.game,
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, PopsBoss);

    var _this = _possibleConstructorReturn(this, (PopsBoss.__proto__ || Object.getPrototypeOf(PopsBoss)).call(this, game, x, y, 'pops-head', 0));

    _this.animations.add('default', [0], 10, true);
    _this.animations.play('default', 5, true);
    _this.anchor.setTo(0.5, 0.5);
    return _this;
  }

  return PopsBoss;
}(_phaser2.default.Sprite);

exports.default = PopsBoss;

/***/ }),
/* 399 */
/*!**************************************!*\
  !*** ./src/levelData/Level_Final.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Level2 = __webpack_require__(/*! ../states/Level.js */ 16);

var _Level3 = _interopRequireDefault(_Level2);

var _PopsHead = __webpack_require__(/*! ../PopsBoss/PopsHead.js */ 143);

var _PopsHead2 = _interopRequireDefault(_PopsHead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals __DEV__ */

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class() {
    _classCallCheck(this, _class);

    // Set player position
    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, 'LevelFinal-data'));
  }

  _createClass(_class, [{
    key: 'create',
    value: function create() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'create', this).call(this);

      this.popsHead = new _PopsHead2.default({
        game: this.game,
        x: this.world.centerX + 100,
        y: this.world.centerY + 200,
        pPlayer: this.player,
        background: this.background
      });

      this.game.add.existing(this.popsHead);

      this.popsHead.scale.setTo(10, 10);

      this.platform = this.game.add.image(2008.0, 3350.0, 'LevelFinalPlatform');
      this.platform.anchor.setTo(0.5, 0.5);
      this.game.add.existing(this.platform);

      this.popsHead.BossHands.bringToTop();

      this.player.x = 2156.3;
      this.player.y = 3156.7;

      this.UIhealth_bar1.bringToTop();
      this.UIhealth_bar2.bringToTop();
      this.UIhealth_bar3.bringToTop();
      this.UIhealth_bar4.bringToTop();
      this.player.bringToTop();
    }
  }, {
    key: 'update',
    value: function update() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'update', this).call(this);

      if (true) {
        if (this.previousLevelKey.justPressed()) {
          this.loadLevel('Level_9', 'right', 815.6, 864.8);
        }

        if (this.nextLevelKey.justPressed()) {
          this.game.state.start('Win');
          // this.loadLevel('Tutorial_0', 'left', 1629, 434.6)
        }
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 400 */
/*!***************************!*\
  !*** ./src/states/Win.js ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _phaser = __webpack_require__(/*! phaser */ 5);

var _phaser2 = _interopRequireDefault(_phaser);

var _config = __webpack_require__(/*! ../config */ 23);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Phaser$State) {
  _inherits(_class, _Phaser$State);

  function _class(_ref) {
    var game = _ref.game;

    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, game));

    _this.game = game;
    return _this;
  }

  _createClass(_class, [{
    key: 'preload',
    value: function preload() {
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
    }
  }, {
    key: 'create',
    value: function create() {
      // Displays the 'You Win' picture
      this.win = this.game.add.sprite(_config2.default.gameWidth / 2, _config2.default.gameHeight / 2, 'Win');
      this.win.anchor.setTo(0.5, 0.5);
      this.win.scale.setTo(0.20, 0.20);
      this.win.fixedToCamera = true;
    }
  }]);

  return _class;
}(_phaser2.default.State);

exports.default = _class;

/***/ })
],[146]);
//# sourceMappingURL=bundle.js.map