/* globals __DEV__ */
// **************************************
// **************************************
// DELETE THIS FILE BEFORE THE GAME SHIPS
// **************************************
// **************************************

import Phaser from 'phaser'
import MainPlayer from '../sprites/Player'
import config from '../config'
import Chest from '../itemData/Chest.js'
import Sword from '../itemData/Sword.js'
import BloodSword from '../itemData/bloodSword.js'
import Kunai from '../itemData/Kunai.js'
import MaskedTurtle from '../Enemies/MaskedTurtle.js'

//  import Pops from '../Pops/pops.js'

export default class extends Phaser.State {
  init () {}

  preload () {
    // Set/Reset world bounds
    this.game.world.setBounds(0, 0, this.game.width * 3, this.game.height)
  }

  create () {
    // Choose a map here
    // Setup maps
    this.map = this.cache.getJSON('testMap-data')
    this.map2 = this.cache.getJSON('testMap2-data')

    // Start the P2 Physics Engine
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.game.physics.p2.setImpactEvents(true)
    this.game.physics.p2.gravity.y = 0
    this.testChestClosed = true
    this.swordChestClosed = true
    this.bloodSwordChestClosed = true

    // Setup the map image and colliders
    this.background = this.game.add.image(0, 0, 'background')
    this.game.world.setBounds(0, 0, this.background.width, this.background.height)
    this.map.processColliders(this.worldMaterial)

    // Tutorial messages
    this.tutorial_1 = this.game.add.image(1250, 500, 'arrow_keys')
    this.tutorial_2 = this.game.add.image(2000, 500, 'press_P')
    this.tutorial_3 = this.game.add.image(800, 600, 'press_Spacebar')
    this.tutorial_4 = this.game.add.image(300, 400, 'press_E')

    //  UI hearts
    // Create the hearts
    this.UIheart_1 = this.game.add.image(60, 40, 'uiHeart')
    this.UIheart_2 = this.game.add.image(160, 40, 'uiHeart')
    this.UIheart_3 = this.game.add.image(260, 40, 'uiHeart')

    //  Add the hearts to the game
    this.game.add.existing(this.UIheart_1)
    this.game.add.existing(this.UIheart_2)
    this.game.add.existing(this.UIheart_3)

    //  Fix the hearts to the camera
    this.UIheart_1.fixedToCamera = true
    this.UIheart_2.fixedToCamera = true
    this.UIheart_3.fixedToCamera = true

    //  Scale the hearts to the right size
    this.UIheart_1.scale.setTo(0.04, 0.04)
    this.UIheart_2.scale.setTo(0.04, 0.04)
    this.UIheart_3.scale.setTo(0.04, 0.04)

    //  Item cooldowns
    this.weaponCooldown = 0.0
    this.abilityCooldown = 0.0

    // Chests for test map 1
    // Create and add the main player object
    this.player = new MainPlayer({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY
    })

    this.player.drag = 1000

    // Create and add a test Chest object
    this.testChest = new Chest({
      game: this.game,
      pX: this.world.centerX + 780,
      pY: this.world.centerY + 230,
      pItem: new Kunai()
    })
    this.game.add.existing(this.testChest)

    // Create and add a sword Chest object
    this.swordChest = new Chest({
      game: this.game,
      pX: this.world.centerX - 520,
      pY: this.world.centerY + 230,
      pItem: new Sword()
    })
    this.game.add.existing(this.swordChest)

    // Create and add a blood sword Chest object
    this.bloodSwordChest = new Chest({
      game: this.game,
      pX: this.world.centerX - 1400,
      pY: this.world.centerY - 50,
      pItem: new BloodSword()
    })
    this.game.add.existing(this.bloodSwordChest)

    // Create and add a Masked Turtle
    this.maskedTurtle_0 = new MaskedTurtle({
      game: this.game,
      pX: this.world.centerX + 300,
      pY: this.world.centerY,
      pPlayer: this.player
    })
    this.game.add.existing(this.maskedTurtle_0)

    // Create and add pops
    // this.pops = new Pops({
    //   game: this.game,
    //   pX: this.world.centerX - 100,
    //   pY: this.world.centerY - 100
    // })
    // this.game.add.existing(this.pops)

    //  Sets camera to follow player
    this.game.camera.follow(this.player)

    // Add player after the floor
    this.game.add.existing(this.player)

    // Setup all the audio
    this.setupAudio()
    //  The following line sets up the background music
    //  but I was listening to jazz while working so I turned it off
    //  this.sounds.play('music-intro', config.MUSIC_VOLUME)

    // Setup the key objects
    this.setupKeyboard()

    this.spriteMaterial = this.physics.p2.createMaterial('spriteMaterial', this.player.body)
    this.worldMaterial = this.physics.p2.createMaterial('worldMaterial')
    this.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true)
    this.contactMaterial = this.physics.p2.createContactMaterial(this.spriteMaterial, this.worldMaterial)
    // Friction to use in the contact of these two materials.
    this.contactMaterial.friction = 0.3
    // Restitution (i.e. how bouncy it is!) to use in the contact of
    this.contactMaterial.restitution = 0.0
  }

  setupAudio () {
    // Load the audio sprite into the level
    let sounds = this.sounds = this.game.add.audioSprite('sounds')

    // Make the different music sections flow into one another
    // in a seamless loop
    this.sounds.get('music-intro').onStop.add(() => {
      sounds.play('music-theme1', config.MUSIC_VOLUME)
    })

    for (let i = 1; i < 4; i++) {
      this.sounds.get(`music-theme${i}`).onStop.add(() => {
        sounds.play(`music-theme${i + 1}`, config.MUSIC_VOLUME)
      })
    }

    this.sounds.get('music-theme4').onStop.add(() => {
      sounds.play('music-bridge', config.MUSIC_VOLUME)
    })

    // Theme 2 seems to flow out of the bridge better than theme 1
    this.sounds.get('music-bridge').onStop.add(() => {
      sounds.play('music-theme2', config.MUSIC_VOLUME)
    })
  }

  setupKeyboard () {
    //  Register the keys
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.useWeaponKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.useAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    this.nextWeaponKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E)
    this.nextAbilityKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q)

    //  These keys are for debugging only
    this.testDamageKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P)
    this.testHealKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O)

    //  Stop the following keys from propagating up to the browser
    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.SHIFT,
      Phaser.Keyboard.Q
    ])
  }

  update () {
    //  Debugging in update
    if (this.testDamageKey.justPressed()) {
      this.player.takeDamage()
    }
    if (this.testHealKey.justPressed()) {
      this.player.heal()
    }

    //  Check for overlap with a testChest
    if (this.testChestClosed && this.testChest.overlapWithObject(this.player)) {
      console.info('Pickup test called in update')
      this.player.addToInventory(this.testChest.getItem())
      this.testChestClosed = false
    }

    //  Check for overlap with swordChest
    if (this.swordChestClosed && this.swordChest.overlapWithObject(this.player)) {
      console.info('Pickup sword called in update')
      this.player.addToInventory(this.swordChest.getItem())
      this.swordChestClosed = false
    }
    //  Check for overlap with bloodSwordChest
    if (this.bloodSwordChestClosed && this.bloodSwordChest.overlapWithObject(this.player)) {
      console.info('Pickup blood sword called in update')
      this.player.addToInventory(this.bloodSwordChest.getItem())
      this.bloodSwordChestClosed = false
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
    if (this.abilityCooldown <= 0.0) {
      //  Check if player is using an ability
      if (this.useAbilityKey.justPressed() && this.player.getCurAbility() !== undefined) {
        this.player.useCurAbility()
        this.abilityCooldown = this.player.getCurAbility().cooldown
      }
    } else {
      this.abilityCooldown -= this.game.time.physicsElapsed
    }

    //  Check to cycle through weapons
    if (this.nextWeaponKey.justPressed()) {
      this.player.nextWeapon()
    }

    // Check for jumping.
    if (this.jumpKey.justPressed() && !this.player.action) {
      //  This actionState is now being set in Player.js
      //  this.player.actionState = MainPlayer.actionStates.JUMPING
      this.player.willJump = true
      this.player.body.velocity.y = config.JUMP_INITIAL
      this.player.isFalling = true
      this.player._jump_timer = this.player._jump_boost_time
      this.sounds.stop('running')
    } else {
      // Check state of keys to control main character
      if (this.player.isDead) {
        return
      }
      var speed = 0
      if (this.rightKey.isDown) { speed++ }
      if (this.leftKey.isDown) { speed-- }

      // Update sprite facing direction
      if (speed > 0 && !this.player.isFacingRight()) {
        this.player.makeFaceRight()
      } else if (speed < 0 && !this.player.isFacingLeft()) {
        this.player.makeFaceLeft()
      }

      // TODO: Fix this later on
      // Update state of movement
      if (Math.abs(speed) > 1) {
        this.player.moveState = MainPlayer.moveStates.RUNNING
        if (!this.player.action && !this.sounds.get('running').isPlaying) {
          this.sounds.play('running', config.SFX_VOLUME)
        }
      } else if (Math.abs(speed) > 0) {
        this.player.moveState = MainPlayer.moveStates.RUNNING
        if (!this.player.action && !this.sounds.get('running').isPlaying) {
          this.sounds.play('running', config.SFX_VOLUME)
        }
      } else {
        this.player.moveState = MainPlayer.moveStates.STOPPED
        this.sounds.stop('running')
      }
    }
  }

  render () {
    //  UI Renderer
    this.UIheart_1.visible = true
    this.UIheart_2.visible = true
    this.UIheart_3.visible = true
    if (this.player.health < 3) {
      this.UIheart_3.visible = false
    }
    if (this.player.health < 2) {
      this.UIheart_2.visible = false
    }
    if (this.player.health < 1) {
      this.UIheart_1.visible = false
    }

    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.text(
        `Movement: ${this.player.moveState}, Action: ${this.player.actionState}`,
        this.game.width - 350, 32)
      if (this.player.getCurWeapon() === undefined) {
        this.game.debug.text(`Weapon: NONE`, this.game.width - 350, 64)
      } else {
        this.game.debug.text(`Weapon: ${this.player.getCurWeapon().name}`, this.game.width - 350, 64)
      }

      if (this.player.getCurAbility() === undefined) {
        this.game.debug.text(`Ability: NONE`, this.game.width - 350, 96)
      } else {
        this.game.debug.text(`Ability: ${this.player.getCurAbility().name}`, this.game.width - 350, 64)
      }

      this.game.debug.text(`isFalling: ${this.player.isFalling}`, this.game.width - 350, 128)

      this.game.debug.text('DEV BUILD', this.game.width - 100, this.game.height - 10, '#AA0000')
    }
    this.game.debug.geom(this.maskedTurtle_0.leftPoint, 'rgba(255, 255, 255, 1)')
    this.game.debug.geom(this.maskedTurtle_0.rightPoint, 'rgba(255, 255, 255, 1)')
    this.game.debug.body(this.player)
  }
}
