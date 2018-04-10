export default {
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
}
