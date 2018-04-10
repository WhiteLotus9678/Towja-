/* globals __DEV__ */
import { sequentialNumArray } from '../utils.js'
import config from '../config'
import Phaser from 'phaser'
import P2 from 'p2'
import PlayerInventory from '../itemData/PlayerInventory.js'

class MainPlayer extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    // Initialize object basics
    super(game, x, y, 'player-main', 0)
    this.name = 'Main Player'
    this.anchor.setTo(0.5, 1.0)
    this.smoothed = false
    this.hasWallJump = true
    this.game = game
    this.willJump = false


    this.dabbing = false
    this.dontDieOnDab = false

    this.dabD = false
    this.dabA = false
    this.dabB = false

    this.collCount = 0

    this.Inventory = new PlayerInventory()
    this.isFalling = true
    this.health = 3
    this.isDead = false

    this.offGroundTimer = 0.0

    this.flickerBeginTime = 0.0

    this.damagingHitbox = null

    // Setup all the animations
    this.setupAnimations()

    // All variabes that start with '_' are meant to be private
    // Initial state is stopped
    this._move_state = MainPlayer.moveStates.UNKNOWN
    this._action_state = MainPlayer.actionStates.NONE
    this._SCALE = config.PLAYER_SCALE
    this._idle_countdown = config.IDLE_COUNTDOWN

    // Initialize jump properties
    this._timer = new Phaser.Time(this.game)
    this._jump_timer = 0
    this._jump_boost_time = 0.2
    this._falling_constant = 2300

    this.iFrames = 0.0

    // Initialize the sprite scale
    this.scale.setTo(this._SCALE)

    // Enable physics (gravity and collisions)
    this.body = new Phaser.Physics.P2.Body(this.game, this, x, y)
    // this.body.debug = __DEV__
    //  this.body.debug = false
    this.body.mass = config.PLAYER_MASS
    this.body.fixedRotation = true
    // this.body.data.gravityScale = 0

    // Turning on sensors for wall jumping
    // this.body.data.shapes[0].sensor = true

    // this.body.onBeginContact.add(this.checkGround, this)
    // this.body.onEndContact.add(this.leaveGround, this)

    // Set a reasonable shape to the collision box
    // Note: Keep in mind the anchor point is at the feet
    this.body.clearShapes()
    this.body.addRectangle(50, 120, 0, -170)
    this.body.addToWorld()

    this.wallJumpingTimer = 0.0
    this.wallTouchingSide = 'LEFT'
    this.wallJumpCountLeft = 0
    this.wallJumpCountRight = 0
    this.wallJumpLimit = 2

    this.leftWallSet = new Set()
    this.leftSensor = this.body.addRectangle(1, 80, -25, -170) // TODO: Make smaller for now (width, height, x, y)
    this.leftSensor.sensor = true
    this.leftSensor.wallJumpSensor = true

    this.rightWallSet = new Set()
    this.rightSensor = this.body.addRectangle(1, 80, 25, -170)
    this.rightSensor.sensor = true
    this.rightSensor.wallJumpSensor = true

    this.body.onBeginContact.add(this.checkWallJump, this)
    this.body.onEndContact.add(this.removeWallJump, this)
  }

  // Setter and getter for the 'state' property
  get moveState () { return this._move_state }

  set moveState (newState) {
    if (this._move_state !== newState &&
        (this._move_state !== MainPlayer.moveStates.IDLE ||
         newState !== MainPlayer.moveStates.STOPPED)) {
      // Update the state
      this._move_state = newState
      this.updateAnimation()
    }
  }

  get actionState () { return this._action_state }

  set actionState (newState) {
    if (this._action_state !== newState) {
      // Update the state
      this._action_state = newState
      this.updateAnimation()
    }
  }

  // Getters for read-only movement properties
  get running () { return this.moveState === MainPlayer.moveStates.RUNNING }

  // Getters for read-only action properties
  get action () { return this.actionState !== MainPlayer.actionStates.NONE }
  get jumping () { return this.actionState === MainPlayer.actionStates.JUMPING }
  get walllatched () { return this.actionState === MainPlayer.actionStates.WALLLATCHED }
  get falling () { return this.actionState === MainPlayer.actionStates.FALLING }
  get usingSword () { return this.actionState === MainPlayer.actionStates.SWORD }
  get usingKunai () { return this.actionState === MainPlayer.actionStates.KUNAI }

  // Functions to help manage the way the character is facing
  isFacingRight () { return (this.scale.x < 0) }
  isFacingLeft () { return (this.scale.x > 0) }

  makeFaceRight () { this.scale.set(-this._SCALE, this._SCALE) }
  makeFaceLeft () { this.scale.set(this._SCALE, this._SCALE) }

  makeAboutFace () {
    if (this.facingRight()) {
      this.makeFaceLeft()
    } else {
      this.makeFaceRight()
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

  addToSwordSet (bodyA, bodyB, shapeA, shapeB, contactData) {
    // this.swordSet
  }

  checkWallJump (bodyA, bodyB, shapeA, shapeB) {
    if (bodyB.parent !== null && bodyB.parent !== undefined) {
      if (shapeA && shapeA.wallJumpSensor && bodyB && bodyB.parent.isWallJumpable) {
        if (shapeA === this.leftSensor) {
          this.leftWallSet.add(bodyB)
          this.wallTouchingSide = 'LEFT'
        } else {
          this.rightWallSet.add(bodyB)
          this.wallTouchingSide = 'RIGHT'
        }
      }
    }
  }

  removeWallJump (bodyA, bodyB, shapeA, shapeB) {
    if (bodyB.parent !== null && bodyB.parent !== undefined) {
      if (shapeA && shapeA.wallJumpSensor && bodyB && bodyB.parent.isWallJumpable) {
        if (shapeA === this.leftSensor) {
          this.leftWallSet.delete(bodyB)
        } else {
          this.rightWallSet.delete(bodyB)
        }
      }
    }
  }

  canWallJump () {
    if (!this.Inventory.hasWallJump) {
      return false
    }
    if ((this.leftWallSet.size > 0 || this.rightWallSet.size > 0) && !this.touchingDown()) {
      if (this.wallTouchingSide === 'LEFT' && this.wallJumpCountLeft >= this.wallJumpLimit) {
        return false
      }

      if (this.wallTouchingSide === 'RIGHT' && this.wallJumpCountRight >= this.wallJumpLimit) {
        return false
      }

      return true
    }
  }

  touchingDown () {
    var yAxis = P2.vec2.fromValues(0, 1)
    var result = false
    for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; i++) {
      // Cycles through all the contactEquations until it finds our "someone"
      var c = this.game.physics.p2.world.narrowphase.contactEquations[i]
      if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
        var d = P2.vec2.dot(c.normalA, yAxis) // Normal dot Y-axis
        if (c.bodyA === this.body.data) { d *= -1 }
        if (d > 0.5) result = true
      }
    }
    return result
  }

  touchingWall () {
    // take advantage of collision groups
    // create sensors on the player to sense walls and the direction
    // use enemy ai to help
  }

  // Update animation to match state (called only when state changes)
  updateAnimation () {
    if (this.isDead) {
      this.actionState = MainPlayer.actionStates.DEATH
    }

    switch (this._action_state) {
      case MainPlayer.actionStates.HURT:
        // if (__DEV__) console.info('Playing "Hurt"')
        this.animations.play('hurt')
        break

      case MainPlayer.actionStates.DEATH:
        // if (__DEV__) console.info('Playing "Death"')
        this.animations.play('dying')
        break

      case MainPlayer.actionStates.SWORD:
        // if (__DEV__) console.info('Playing "Sword"')
        this.animations.play('sword_attack')
        break

      case MainPlayer.actionStates.KUNAI:
        // if (__DEV__) console.info('Playing "Kunai"')
        this.animations.play('kunai_attack')
        break

      case MainPlayer.actionStates.METEOR_CHAIN_SWING:
        this.animations.play('meteor_chain_swing')
        break

      case MainPlayer.actionStates.METEOR_CHAIN_ATTACK:
        this.animations.play('meteor_chain_attack')
        break

      case MainPlayer.actionStates.HAMMER_SWING:
        this.animations.play('hammer_swing')
        break

      case MainPlayer.actionStates.HAMMER_ATTACK:
        this.animations.play('hammer_attack')
        break
      case MainPlayer.actionStates.DAB:
        this.animations.play('dab')
        break
      case MainPlayer.actionStates.JUMPING:
        if (!this.animations.getAnimation('jump').isPlaying) {
          // if (__DEV__) console.info('Playing "jump"')
          // console.log('Line 179')
          this.animations.play('jump')
        }
        break

      case MainPlayer.actionStates.WALLLATCHED:
        // if (__DEV__) console.info('Playing 'wall jump"')
        this.animations.play('wall_latched')
        break

      case MainPlayer.actionStates.FALLING:
        // if (__DEV__) console.info('Playing "fall"')
        this.animations.play('fall')
        break
    }

    // No move update when there's an overriding action
    if (this.action) return

    switch (this._move_state) {
      case MainPlayer.moveStates.STOPPED:
        if (__DEV__) console.info('Playing "stop"')
        this.animations.play('stop')
        this._idle_countdown = config.IDLE_COUNTDOWN
        break

      case MainPlayer.moveStates.RUNNING:
        if (__DEV__) console.info('Playing "run"')
        this.animations.play('run')
        break

      case MainPlayer.moveStates.IDLE:
        if (__DEV__) console.info('Playing "idle"')
        this.animations.play('idle')
        break
    }
  }

  meleeAttacking () {
    if (this.actionState === MainPlayer.actionStates.SWORD || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_ATTACK || this.actionState === MainPlayer.actionStates.HAMMER_ATTACK) {
      return true
    } else {
      return false
    }
  }

  checkInvulnerable () {
    if (this.actionState === MainPlayer.actionStates.SWORD) {
      return true
    }

    if (this.iFrames > 0) {
      return true
    }

    return false
  }

  takeDamage () {
    if (this.checkInvulnerable()) {
      return false
    }

    this.health--
    if (this.health > 0) {
      this.actionState = MainPlayer.actionStates.HURT
    } else {
      this.kill()
    }
    return true
  }

  heal () {
    this.health = 3
  }

  // Funcion called when health === 0
  kill () {
    this.isDead = true
    // this.body.velocity.y = 0
    // this.body.kinematic = true
    this.actionState = MainPlayer.actionStates.DEATH
  }

  //  START ITEM FUNCTIONS
  //  All item functions for the player are found here
  //  Function to add an item to the inventory
  addToInventory (pItem) {
    console.info('Pickup called in player')
    this.Inventory.addToInventory(pItem)
  }

  clearWeaponHitboxes () {
    this.body.removeShape(this.leftWeaponSensor)
    this.body.removeShape(this.rightWeaponSensor)
  }

  setWeaponHitboxes () {
    this.clearWeaponHitboxes()
    // Get the current weapon name
    let weaponName = this.getCurWeapon().name

    switch (weaponName) {
      case 'Sword':
        if (this.isFacingLeft()) {
          this.leftWeaponSensor = this.body.addRectangle(80, 30, -60, -170)
          this.leftWeaponSensor.sensor = true
        } else {
          this.rightWeaponSensor = this.body.addRectangle(80, 30, 60, -170)
          this.rightWeaponSensor.sensor = true
        }

        break
      case 'Meteor Chain':
        if (this.isFacingLeft()) {
          this.leftWeaponSensor = this.body.addRectangle(80, 50, -60, -160)
          this.leftWeaponSensor.sensor = true
        } else {
          this.rightWeaponSensor = this.body.addRectangle(80, 50, 60, -160)
          this.rightWeaponSensor.sensor = true
        }
        break

      case 'Hammer':
        this.leftWeaponSensor = this.body.addRectangle(1000, 600, 0, -200)
        this.leftWeaponSensor.sensor = true
        break
      default:
        console.error(weaponName + ' is not a recognized weapon name')
    }
  }

  //  Returns the current Weapon
  getCurWeapon () {
    return this.Inventory.getWeapon()
  }

  //  Uses the current Weapon
  useCurWeapon () {
    this.Inventory.getWeapon().activate(this)
    if (this.Inventory.getWeapon().name !== 'Meteor Chain' && this.Inventory.getWeapon().name !== 'Hammer') {
      this.setWeaponHitboxes()
    }
  }

  //  Cycles forward to the next weapon
  nextWeapon () {
    return this.Inventory.nextWeapon()
  }

  //  Cycles back to the previous weapon
  previousWeapon () {
    return this.Inventory.previousWeapon()
  }

  //  Returns the current Ability
  getCurAbility () {
    return this.Inventory.getAbility()
  }

  //  Uses the current Ability
  useCurAbility () {
    this.Inventory.getAbility().activate(this)
  }

  //  Cycles forward to the next ability
  nextAbility () {
    return this.Inventory.nextAbility()
  }

  //  Cycles back to the previous ability
  previousAbility () {
    return this.Inventory.previousAbility()
  }

  setiFrames (frames) {
    this.iFrames = Math.max(frames, this.iFrames)
  }

  // Causes the sprite to flicker
  flickerSprite () {
    if (this.alpha === 1) {
      this.alpha = 0.0
    } else {
      this.alpha = 1
    }
  }

  // Function that runs every tick to update this sprite
  update () {
    // Always give parent a chance to update
    super.update()

    if (this.dabD && this.dabA && this.dabB) {
      this.dab()
    }

    this.iFrames -= this._timer.physicsElapsed

    if (this.iFrames > 0) {
      if (this.flickerBeginTime === 0) {
        this.flickerBeginTime = this.iFrames
        this.flickerSprite()
      } else if (this.iFrames <= this.flickerBeginTime - 0.1 - this.alpha * 0.1) {
        this.flickerSprite()
        this.flickerBeginTime = this.iFrames
        console.log('FlickerCalled')
      }
    } else {
      this.alpha = 1
      this.flickerBeginTime = 0.0
    }

    // Causes the player to fall down when they die
    if (this.isDead) {
      this.body.velocity.y += this._timer.physicsElapsed * this._falling_constant
      return
    }

    // Runs left or right based on face of direction
    if (this.wallJumpingTimer <= 0.0) {
      if (this.running && (this.scale.x < 0)) {
        this.body.velocity.x = config.RUN_SPEED
      } else if (this.running && (this.scale.x > 0)) {
        this.body.velocity.x = (-config.RUN_SPEED)
      }
    } else {
      this.wallJumpingTimer -= this._timer.physicsElapsed
    }

    // Dashes left or right based on face of direction when the sword is used
    if (this.usingSword && (this.scale.x < 0)) {
      this.body.velocity.x = config.DASH_SPEED
    } else if (this.usingSword && (this.scale.x > 0)) {
      this.body.velocity.x = (-config.DASH_SPEED)
    }

    //  Stops movement when the player is using a kunai
    if (this.usingKunai || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_ATTACK || this.actionState === MainPlayer.actionStates.METEOR_CHAIN_SWING) {
      this.body.velocity.x = 0
    }

    if (this.jumping && this.body.velocity.y >= 0) {
      if (this.canWallJump()) {
        this.actionState = MainPlayer.actionStates.WALLLATCHED
      } else {
        this.actionState = MainPlayer.actionStates.FALLING
      }
    }

    if (!this.touchingDown() && !this.jumping && !this.walllatched && !this.falling) {
      if (this.canWallJump()) {
        this.actionState = MainPlayer.actionStates.WALLLATCHED
        this.updateAnimation()
      } else {
        this.isFalling = true
        this.offGroundTimer += this._timer.physicsElapsed
      }
    }
    if (!this.touchingDown()) {
      this.isFalling = true
    }
    if (this.touchingDown()) {
      this.offGroundTimer = 0.0
      this.isFalling = false
      // console.log('Landing')
      if (this.falling || this.jumping || this.walllatched) {
        this.endOfAction()
      }
    }
    if (this.offGroundTimer >= config.FALL_LEEWAY && this.actionState === MainPlayer.actionStates.NONE) {
      this.actionState = MainPlayer.actionStates.JUMPING
    }
    //  console.log(`jumping Timer: ${this._jump_timer}`)
    //  console.log(`offGroundTimer: ${this.offGroundTimer}`)

    //  If falling
    if (this.isFalling) {
      if (this.willJump) {
        this.actionState = MainPlayer.actionStates.JUMPING
        this.willJump = false
      }

      if (this.canWallJump()) {
        this.actionState = MainPlayer.actionStates.WALLLATCHED
      } else if (this.actionState === MainPlayer.actionStates.WALLLATCHED) {
        this.endOfAction()
      }

      //  Set jump timer to 0 if the player releases the jump button
      if (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        //  console.log('Not pressing jump')
        this._jump_timer = 0
      }
      if (this._jump_timer <= 0.0) {
        //  console.log('Normal Falling')
        this.body.velocity.y += (this._timer.physicsElapsed * this._falling_constant)
      } else {
        //  console.log('high jump')
        //  console.log(`Time Elapsed: ${this._timer.physicsElapsed}`)
        this._jump_timer -= this._timer.physicsElapsed
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
      this.body.velocity.x = 0
      if (this._idle_countdown <= 0) {
        this.moveState = MainPlayer.moveStates.IDLE
      } else {
        this._idle_countdown -= 1
      }
    }
  }

  // Function to setup all the animation data
  setupAnimations () {
    this.animations.add('stop', [24], 1, false)
    this.animations.add('run', sequentialNumArray(8, 21), 10, true)

    this.animations.add('dab', [108, 107, 109, 110, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111, 111], 10, false)
    this.animations.add('ContinueDab', [111, 111], 10, true)

    this.animations.add('dying', sequentialNumArray(40, 48), 10, false)
    this.animations.add('dead', [48], 10, true)
    this.animations.add('hurt', [32], 7, false)

    this.animations.add('idle', sequentialNumArray(24, 31), 4, true)

    this.animations.add('sword_attack', sequentialNumArray(0, 4), 15, false)
    this.animations.add('kunai_attack', sequentialNumArray(0, 4), 12, false)
    this.animations.add('hammer_swing', sequentialNumArray(80, 85), 30, false)
    this.animations.add('hammer_attack', [86, 86, 86], 12, false)
    this.animations.add('chain_attack', sequentialNumArray(80, 86), 12, false)
    this.animations.add('meteor_chain_attack', sequentialNumArray(89, 91), 10, false)
    this.animations.add('meteor_chain_swing', [96, 97, 98, 99, 100, 88], 30, false)

    //  this.animations.add('dash', [34, 35, 36, 37], 20, false)
    this.animations.add('jump', [33], 10, true)
    this.animations.add('fall', [34], 10, true)
    this.animations.add('wall_latched', [35], 10, true)

    // Setup dash to resume movement state once finished
    this.animations.getAnimation('kunai_attack').onComplete.add(() => {
      this.endOfAction()
    }, this)
    this.animations.getAnimation('meteor_chain_attack').onComplete.add(() => {
      this.endOfAction()
      this.clearWeaponHitboxes()
    }, this)

    this.animations.getAnimation('dab').onComplete.add(() => {
      this.endOfAction()
      this.health = 0
      if (this.dontDieOnDab) {
        this.animations.play('ContinueDab')
      } else {
        this.kill()
      }
    }, this)

    this.animations.getAnimation('hurt').onComplete.add(() => {
      this.endOfAction()
    }, this)

    this.animations.getAnimation('dying').onComplete.add(() => {
      this.play('dead')
    }, this)

    // Transition to meteor chain attack after meteor chain swing is finished
    this.animations.getAnimation('meteor_chain_swing').onComplete.add(() => {
      this.animations.play('meteor_chain_attack')
      this.actionState = MainPlayer.actionStates.METEOR_CHAIN_ATTACK
      this.body.velocity.y = -1500
      this.setWeaponHitboxes()
    }, this)
    // Transition to hammer attack after hammer swing is finished
    this.animations.getAnimation('hammer_swing').onComplete.add(() => {
      this.animations.play('hammer_attack')
      this.actionState = MainPlayer.actionStates.HAMMER_ATTACK
      this.game.camera.shake(0.01, 250)
      this.setWeaponHitboxes()
    }, this)
    this.animations.getAnimation('hammer_attack').onComplete.add(() => {
      this.endOfAction()
      this.clearWeaponHitboxes()
    }, this)
    // Setup dash to resume movement state once finished
    this.animations.getAnimation('sword_attack').onComplete.add(() => {
      this.endOfAction()
      this.clearWeaponHitboxes()
    }, this)
    this.animations.getAnimation('sword_attack').onComplete.add(() => {
      if (this.isFalling) {
        this.actionState = MainPlayer.actionStates.FALLING
      }
    }, this)
  }

  dab () {
    this.makeFaceLeft()
    this.actionState = MainPlayer.actionStates.DAB
    this.dabbing = true
  }

  endOfAction () {
    this.clearWeaponHitboxes()
    // this.body.setZeroVelocity()
    // this.body.setZeroForce()

    this._action_state = MainPlayer.actionStates.NONE
    if (this.isFalling) {
      this.actionState = MainPlayer.actionStates.FALLING
    }
    if (this._move_state === MainPlayer.moveStates.IDLE) {
      this._move_state = MainPlayer.moveStates.STOPPED
    }

    this.wallJumpCountLeft = this.wallJumpCountRight = 0

    this.updateAnimation()
  }
}

// All possible player 'states'
MainPlayer.moveStates = Object.freeze({
  UNKNOWN: 'unknown',
  STOPPED: 'stopped',
  RUNNING: 'running',
  IDLE: 'idle'
})

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
})

export default MainPlayer
