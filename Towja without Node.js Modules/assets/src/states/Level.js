/* globals __DEV__ */

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

import Phaser from 'phaser'
import MainPlayer from '../sprites/Player'
import config from '../config'

export default class extends Phaser.State {
  init () {}

  constructor (JSONDataKey) {
    super()

    this.mapKey = JSONDataKey // ex) testMap-Data
    // this.startX = startX
    // this.startY = startY
    // this.loading = false
    // this._timer = new Phaser.Time(this.game)
  }

  preload () {
    // Set/Reset world bounds
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
  }

  create () {
    this.game.world.scale.setTo(1.0, 1.0)
    // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.gravity.y = 0

    // Setup the map
    this.map = this.cache.getJSON(this.mapKey)
    this.background = this.game.add.image(0, 0, this.map.backgroundKey)
    this.game.world.setBounds(0, 0, this.background.width, this.background.height)
    this.map.processColliders()

    // Keep the chests closed
    this.testChestClosed = true
    this.swordChestClosed = true
    this.bloodSwordChestClosed = true

    // Load the sprite for loading
    this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare')
    this.blackSquare.scale.setTo(4, 4)
    this.blackSquare.alpha = 0

    // Pause Menu Text
    if (__DEV__) {
      this.paused = this.game.add.image(-90, 0, 'paused')
      this.game.add.existing(this.paused)
      this.paused.visible = false
      this.paused.fixedToCamera = true
      this.paused.scale.setTo(1.63, 1.63)
    }

    //  UI hearts
    // Create the hearts
    this.UIhealth_bar1 = this.game.add.image(0, -130, 'uiHealthBar1')
    this.UIhealth_bar2 = this.game.add.image(0, -130, 'uiHealthBar2')
    this.UIhealth_bar3 = this.game.add.image(0, -130, 'uiHealthBar3')
    this.UIhealth_bar4 = this.game.add.image(0, -130, 'uiHealthBar4')

    //  Add the hearts to the game
    this.game.add.existing(this.UIhealth_bar1)
    this.game.add.existing(this.UIhealth_bar2)
    this.game.add.existing(this.UIhealth_bar3)
    this.game.add.existing(this.UIhealth_bar4)

    //  Fix the hearts to the camera
    this.UIhealth_bar1.fixedToCamera = true
    this.UIhealth_bar2.fixedToCamera = true
    this.UIhealth_bar3.fixedToCamera = true
    this.UIhealth_bar4.fixedToCamera = true

    // UI weapons
    this.hasSword = this.game.add.image(440, 40, 'sword')
    this.hasSword.visible = false
    this.game.add.existing(this.hasSword)
    this.hasSword.fixedToCamera = true

    this.hasChain = this.game.add.image(440, 40, 'chain')
    this.hasChain.visible = false
    this.game.add.existing(this.hasChain)
    this.hasChain.fixedToCamera = true

    this.hasHammer = this.game.add.image(440, 40, 'hammer')
    this.hasHammer.visible = false
    this.game.add.existing(this.hasHammer)
    this.hasHammer.fixedToCamera = true

    //  Item cooldowns
    this.weaponCooldown = 0.0
    this.abilityCooldown = 0.0

    // If player died, then load from saveState
    // if (this.isDead === false) {
    //   this.playerData = this.cache.getJSON('playerState')
    //   console.info('Loading from playerState')
    // } else if (this.isDead === true) {
    //   this.playerData = this.cache.getJSON('saveState')
    //   console.info('Loading from saveState')
    // }
    // TODO: Check whether player was previously dead
    this.check = this.cache.getJSON('checkDeath')
    if (this.check.justDied === false) {
      this.playerData = this.cache.getJSON('playerState')
    } else if (this.check.justDied === true) {
      this.playerData = this.cache.getJSON('saveState')
      this.cache.addJSON('checkDeath', '', {justDied: false})
    }
    // console.info('is dead', this.isDead)
    // Create and add the main player object
    console.info('setting player location')
    if (this.playerData !== null && this.playerData !== undefined) {
      this.player = new MainPlayer({
        game: this.game,
        x: this.playerData.pX,
        y: this.playerData.pY
      })

      this.player.Inventory = this.playerData.Inventory
      this.player.health = this.playerData.health
      if (this.playerData.facing === 'left') {
        this.player.makeFaceLeft()
      } else if (this.playerData.facing === 'right') {
        this.player.makeFaceRight()
      }
    } else {
      this.player = new MainPlayer({
        game: this.game,
        x: this.startX = 594.0,
        y: this.startY = 702.3
      })
      this.player.makeFaceRight()
    }

    this.game.add.existing(this.player)

    this.player.drag = 1000

    //  Sets camera to follow player
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER)
    var w = this.game.camera.width / 8
    var h = this.game.camera.height / 3
    this.game.camera.deadzone = new Phaser.Rectangle((this.game.camera.width - w) / 2, (this.game.camera.height - h) / 2 + 1.5 * h * 0.25, w, h)

    // Setup all the audio
    this.setupAudio()

    // Setup the key objects
    this.setupKeyboard()

    this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.itemCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.levelCollisionGroup = this.map.collisionGroup

    this.spriteMaterial = this.physics.p2.createMaterial('spriteMaterial', this.player.body)
    this.worldMaterial = this.physics.p2.createMaterial('worldMaterial')
    this.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true)
    this.contactMaterial = this.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial)

    // Friction to use in the contact of these two materials.
    this.contactMaterial.friction = 0.3

    // Restitution (i.e. how bouncy it is!) to use in the contact of
    this.contactMaterial.restitution = 0.0

    // Event listener for unpausing
    if (__DEV__) {
      this.game.input.onDown.add(this.unpause, this)
    }
  }

  // Method handling unpausing
  unpause (event) {
    if (__DEV__) {
      if (this.game.paused) {
        this.game.paused = false
        this.paused.visible = false
        this.blackSquare.alpha = 0
      }
    }
  }

  setupAudio () {
    // Load the audio sprite into the level
    this.sounds = this.game.add.audioSprite('sounds')
  }

  setupKeyboard () {
    //  Register the keys
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.useWeaponKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    // this.useAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    this.nextWeaponKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E)
    this.previousWeaponKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q)
    this.dabDKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    this.dabAKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
    this.dabBKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B)
    // this.nextAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q)

    //  These keys are for debugging only
    if (__DEV__) {
      this.testDamageKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P)
      this.testHealKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O)
      this.previousLevelKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
      this.nextLevelKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO)
      this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    }

    //  Stop the following keys from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.SHIFT,
      Phaser.Keyboard.Q
    ])
  }

  saveLevel (levelName, facing, pX, pY) {
    this.player.health = 3
    this.cache.addJSON('saveState', '', {levelName, Inventory: this.player.Inventory, pX, pY, health: this.player.health, facing})
  }

  loadLevel (levelName, facing, pX, pY) {
    this.cache.addJSON('playerState', '', {Inventory: this.player.Inventory, pX, pY, health: this.player.health, facing})
    this.sounds.stop('Run')
    this.state.start(levelName)
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

  update () {
    if (this.player.animations.getAnimation('dead').isPlaying) {
      this.sounds.stop('Run')
      this.sounds.stop('MainTheme')
      this.state.start('GameOver')
    }

    // // Fades to black if still loading
    // if (this.loading) {
    //   console.log('update: this.loading is ' + this.loading)
    //   this.blackSquare.alpha = 1 // += this._timer.physicsElapsed
    // }

    // Pause the game
    if (__DEV__) {
      if (this.pauseKey.justPressed()) {
        this.game.paused = true
        this.paused.visible = true
        this.blackSquare.alpha = 0
        this.blackSquare.bringToTop()
        this.paused.bringToTop()
        console.log('Game paused.')
      }
    }

    if (__DEV__) {
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
        this.player.useCurWeapon()
        this.weaponCooldown = this.player.getCurWeapon().cooldown
      }
    } else {
      this.weaponCooldown -= this.game.time.physicsElapsed
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
      this.player.nextWeapon()
    } else if (this.previousWeaponKey.justPressed()) {
      this.player.previousWeapon()
    }

    if (this.dabDKey.justPressed()) { this.player.dabD = true }
    if (this.dabDKey.justReleased()) { this.player.dabD = false }
    if (this.dabAKey.justPressed()) { this.player.dabA = true }
    if (this.dabAKey.justReleased()) { this.player.dabA = false }
    if (this.dabBKey.justPressed()) { this.player.dabB = true }
    if (this.dabBKey.justReleased()) { this.player.dabB = false }

    if (this.rightKey.justReleased()) { this.rightKey.ignore = false }
    if (this.leftKey.justReleased()) { this.leftKey.ignore = false }

    // Check for attacking
    if (this.useWeaponKey.justPressed() && ((this.player.actionState === MainPlayer.actionStates.SWORD))) {
      this.sounds.play('Sword miss', config.SFX_VOLUME) // sword hit
    } else if (this.useWeaponKey.justPressed() && ((this.player.actionState === MainPlayer.actionStates.METEOR_CHAIN_SWING))) {
      this.sounds.play('Metor chain', config.SFX_VOLUME)
    }

    // Check for jumping.
    if (this.jumpKey.justPressed() && (!this.player.action || (this.player.actionState === MainPlayer.actionStates.WALLLATCHED))) {
      this.player.willJump = true
      this.player.body.velocity.y = config.JUMP_INITIAL
      this.player.isFalling = true
      this.player._jump_timer = this.player._jump_boost_time

      // Walljumping
      if (this.player.actionState === MainPlayer.actionStates.WALLLATCHED) {
        console.log('WallJump')
        this.player.wallJumpingTimer = 0.1
        this.player.body.velocity.y = config.WALLJUMP_Y_INITIAL

        // Change x-velocity based on the direction the player is facing
        if (this.player.wallTouchingSide === 'LEFT') {
          this.player.body.velocity.x = config.WALLJUMP_X_INITIAL
          this.player.wallJumpCountLeft++
          this.player.wallJumpCountRight = 0
          // this.leftKey.ignore = true
          this.player.makeFaceRight()
          console.info(this.player.body.velocity.x)
        } else if (this.player.wallTouchingSide === 'RIGHT') {
          this.player.body.velocity.x = (-config.WALLJUMP_X_INITIAL)
          this.player.wallJumpCountRight++
          this.player.wallJumpCountLeft = 0
          // this.rightKey.ignore = true
          this.player.makeFaceLeft()
          console.info(this.player.body.velocity.x)
        }
      // Regular Jump
      } else {
        console.log('Normal Jump')
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
        return
      }
      var speed = 0
      // if (this.rightKey.isDown && !this.rightKey.ignore) {
      //   speed++
      // } else
      if (this.rightKey.isDown) {
        speed++
      }
      // if (this.leftKey.isDown && !this.leftKey.ignore) {
      //   speed--
      // } else
      if (this.leftKey.isDown) {
        speed--
      }

      // Update sprite facing direction
      if (speed > 0 && !this.player.isFacingRight()) {
        this.player.makeFaceRight()
      } else if (speed < 0 && !this.player.isFacingLeft()) {
        this.player.makeFaceLeft()
      }

      // Update state of movement
      if (Math.abs(speed) > 1) {
        this.player.moveState = MainPlayer.moveStates.RUNNING
        if (!this.player.action && !this.sounds.get('Run').isPlaying) {
          this.sounds.play('Run', config.SFX_VOLUME - 0.75)
        }
      } else if (Math.abs(speed) > 0) {
        this.player.moveState = MainPlayer.moveStates.RUNNING
        if (!this.player.action && !this.sounds.get('Run').isPlaying) {
          this.sounds.play('Run', config.SFX_VOLUME - 0.75)
        }
      } else {
        this.player.moveState = MainPlayer.moveStates.STOPPED
        this.sounds.stop('Run')
      }
    }
  }

  render () {
    //  UI Renderer
    this.UIhealth_bar1.visible = true
    this.UIhealth_bar2.visible = false
    this.UIhealth_bar3.visible = false
    this.UIhealth_bar4.visible = false

    if (this.player.health < 3) {
      this.UIhealth_bar1.visible = false
      this.UIhealth_bar2.visible = true
    }
    if (this.player.health < 2) {
      this.UIhealth_bar2.visible = false
      this.UIhealth_bar3.visible = true
    }
    if (this.player.health < 1) {
      this.UIhealth_bar3.visible = false
      this.UIhealth_bar4.visible = true
    }

    this.hasSword.visible = false
    this.hasChain.visible = false
    this.hasHammer.visible = false

    console.log(this.hasHammer.visible)

    if (this.player.getCurWeapon() !== undefined) {
      if (this.player.getCurWeapon().name === 'Sword') {
        console.log('Ninja has sword text showing')
        this.hasSword.visible = true
        this.hasChain.visible = false
        this.hasHammer.visible = false
      } else if (this.player.getCurWeapon().name === 'Meteor Chain') {
        console.log('Ninja has chain text showing')
        this.hasChain.visible = true
        this.hasSword.visible = false
        this.hasHammer.visible = false
      } else if (this.player.getCurWeapon().name === 'Hammer') {
        console.log('Ninja has hammer text showing')
        this.hasSword.visible = false
        this.hasChain.visible = false
        this.hasHammer.visible = true
      }
    }

    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.text(
        `Movement: ${this.player.moveState}, Action: ${this.player.actionState}`,
        this.game.width - 350, 32)
      if (this.player.getCurWeapon() === undefined || this.player.getCurWeapon() === null) {
        this.game.debug.text(`Weapon: NONE`, this.game.width - 350, 64)
      } else {
        this.game.debug.text(`Weapon: ${this.player.getCurWeapon().name}`, this.game.width - 350, 64)
      }

      if (this.player.getCurAbility() === undefined || this.player.getCurAbility() === null) {
        this.game.debug.text(`Ability: NONE`, this.game.width - 350, 96)
      } else {
        this.game.debug.text(`Ability: ${this.player.getCurAbility().name}`, this.game.width - 350, 64)
      }

      this.game.debug.text(`isFalling: ${this.player.isFalling}`, this.game.width - 350, 128)
      this.game.debug.text(`can Wall Jump: ${this.player.canWallJump() ? 'YES' : 'no'}`, this.game.width - 350, 160)

      this.game.debug.text('DEV BUILD', this.game.width - 100, this.game.height - 10, '#AA0000')
    }

    // this.game.debug.body(this.player)
    // this.game.debug.body(this.player.weaponHitbox)
  }
}
