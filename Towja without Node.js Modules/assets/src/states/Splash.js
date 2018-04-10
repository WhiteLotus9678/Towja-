import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import config from '../config'
import JSONMap from '../objects/jsonMap'
// import MainPlayer from '../sprites/Player.js'

// Importing all JSON map files
import mapData from '../../assets/maps/testMap.json'
// Non-tutorial levels
import LevelStart from '../../assets/maps/IntroRoomStart.json'
import Level1 from '../../assets/maps/Level1.json'
import Level2 from '../../assets/maps/Level2.json'
import Level3 from '../../assets/maps/Level3.json'
import Level4 from '../../assets/maps/Level4.json'
import Level5 from '../../assets/maps/Level5.json'
import Level6 from '../../assets/maps/Level6.json'
import Level7 from '../../assets/maps/Level7.json'
import Level8 from '../../assets/maps/Level8.json'
import Level9 from '../../assets/maps/Level9.json'
import LevelFinal from '../../assets/maps/FinalLevel.json'

export default class extends Phaser.State {
  init () {
    this.started = this.game.time.time
    this.logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo')
    centerGameObjects([this.logo])

    this.video6SD = this.game.add.video('6SDSplash')
    let scale = this.game.width / this.video6SD.width
    this.video6SDSprite = this.video6SD.addToWorld(0, this.game.height / 2, 0, 0.5, scale, scale)

    this.video6SD.onComplete.add(() => {
      this.video6SDSprite.visible = false
    }, this)

    if (this.video6SD.video) {
      this.video6SDSprite.bringToTop()
      this.video6SD.play()
    }
  }

  preload () {
    // Set / Reset world bounds
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)

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
    this.load.spritesheet('player-main', 'assets/images/newNinjaSpritesheet.png', 450, 450)
    this.load.spritesheet('smallDemon', 'assets/images/smallDemon.png', 150, 150)
    this.load.spritesheet('bigDemon', './assets/images/BigDemon.png', 600, 300)
    this.load.spritesheet('flyingDemon', './assets/images/FlyingDemon.png', 450, 450)
    this.load.spritesheet('David', 'assets/images/David.png', 450, 450)
    this.load.spritesheet('tChest', './assets/images/tChest.png', 467, 450)
    this.load.spritesheet('pops-hands', './assets/images/Pops/Hands.png', 500, 250)
    this.load.spritesheet('pops-dying', './assets/images/Pops/PopsDie.png', 1333.33333333, 1000)
    this.load.spritesheet('pops-head', './assets/images/Pops/Head.png', 187.5, 140.625)

    this.load.spritesheet('popsDesk', './assets/images/popsDesk.png', 500, 450)
    this.load.audioSprite('sounds', [
      'assets/audio/sounds.ogg', 'assets/audio/sounds.mp3',
      'assets/audio/sounds.m4a', 'assets/audio/sounds.ac3'
    ], 'assets/audio/sounds.json')

    // Load health bar related images
    this.load.image('uiHeart', 'assets/images/heartIcon.png')
    this.load.image('uiHealthBar1', 'assets/images/UI/health_bar1.png')
    this.load.image('uiHealthBar2', 'assets/images/UI/health_bar2.png')
    this.load.image('uiHealthBar3', 'assets/images/UI/health_bar3.png')
    this.load.image('uiHealthBar4', 'assets/images/UI/health_bar4.png')

    // Load weapons related images
    this.load.image('sword', 'assets/images/text/sword.png')
    this.load.image('chain', 'assets/images/text/chain.png')
    this.load.image('hammer', 'assets/images/text/hammer.png')

    // Load all the assets needed for the Title Screen
    this.load.image('TowerTitleScreen', 'assets/images/TowerTitleScene_.png')
    this.load.image('Towj', 'assets/images/mainMenu/towj.png')
    this.load.spritesheet('A', 'assets/images/mainMenu/A.png', 1000, 680)
    this.load.spritesheet('startBtn', './assets/images/start_btn.png', 288, 71)
    this.load.spritesheet('controlsBtn', './assets/images/controls_btn.png', 288, 71)
    this.load.spritesheet('creditsBtn', './assets/images/credits_btn.png', 288, 71)
    this.load.spritesheet('backBtn', './assets/images/back_btn.png', 288, 71)
    this.load.image('controlsText', 'assets/images/mainMenu/controlsText.png')
    this.load.image('creditsText', 'assets/images/mainMenu/creditsText.png')

    // Assets for game over and controls screen
    this.load.spritesheet('continueBtn', './assets/images/continue_btn.png', 288, 71)

    // Black out image
    this.load.image('BlackSquare', 'assets/images/BlackSquare.jpg')

    // Load the background for the Text Scenes
    this.load.image('StartBG', 'assets/images/levels/LevelStart.png')
    this.load.image('FinalBG', 'assets/images/levels/LevelFinal-bg2.png')

    // Win Asset
    this.load.image('Win', 'assets/images/win.png')

    // Pause Menu text
    this.load.image('paused', 'assets/images/paused.png')

    // Test stage text
    this.load.image('arrow_keys', 'assets/images/movement_tutorial.png')
    this.load.image('press_P', 'assets/images/damage_tutorial.png')
    this.load.image('press_Spacebar', 'assets/images/ability_tutorial.png')
    this.load.image('press_E', 'assets/images/inventory_tutorial.png')

    // Start Scene Text
    this.load.image('Pops1-7', 'assets/images/text/startScene/1-7.png')
    this.load.image('Pops2-3', 'assets/images/text/startScene/2-3.png')
    this.load.image('Pops3-4', 'assets/images/text/startScene/3-4.png')
    this.load.image('Pops4-7', 'assets/images/text/startScene/4-7.png')
    this.load.image('Pops4-12', 'assets/images/text/startScene/4-12.png')
    this.load.image('Pops5-3', 'assets/images/text/startScene/5-3.png')
    this.load.image('Pops6-7', 'assets/images/text/startScene/6-7.png')
    this.load.image('Pops7-10', 'assets/images/text/startScene/7-10.png')
    this.load.image('Pops8-12', 'assets/images/text/startScene/8-12.png')
    this.load.image('Pops9-6', 'assets/images/text/startScene/9-6.png')

    // Final Scene Text
    this.load.image('End1-1', 'assets/images/text/finalScene/1-1.png')
    this.load.image('End1-2', 'assets/images/text/finalScene/1-2.png')
    this.load.image('End1-3', 'assets/images/text/finalScene/1-3.png')
    this.load.image('End1-4', 'assets/images/text/finalScene/1-4.png')
    this.load.image('End1-5', 'assets/images/text/finalScene/1-5.png')
    this.load.image('End1-6', 'assets/images/text/finalScene/1-6.png')

    // Ninja Dialogue
    this.load.image('NinjaTalk', 'assets/images/text/startScene/ninja/1-5.png')

    // Process the map data
    this.processMapData(mapData, 'testMap-data', 'assets/maps/testMap.json')
    // Non-tutorial stages
    this.processMapData(LevelStart, 'LevelStart-data', 'assets/maps/IntroRoomStart.json')
    this.processMapData(Level1, 'Level1-data', 'assets/maps/Level1.json')
    this.processMapData(Level2, 'Level2-data', 'assets/maps/Level2.json')
    this.processMapData(Level3, 'Level3-data', 'assets/maps/Level3.json')
    this.processMapData(Level4, 'Level4-data', 'assets/maps/Level4.json')
    this.processMapData(Level5, 'Level5-data', 'assets/maps/Level5.json')
    this.processMapData(Level6, 'Level6-data', 'assets/maps/Level6.json')
    this.processMapData(Level7, 'Level7-data', 'assets/maps/Level7.json')
    this.processMapData(Level8, 'Level8-data', 'assets/maps/Level8.json')
    this.processMapData(Level9, 'Level9-data', 'assets/maps/Level9.json')
    this.processMapData(LevelFinal, 'LevelFinal-data', 'assets/maps/FinalLevel.json')
    this.load.image('LevelFinalPlatform', 'assets/images/levels/LevelFinal-platform.png')

    // Saving Scroll
    this.load.image('savedTextbox', 'assets/images/savedTextbox.png')
    this.load.image('savingScroll', 'assets/images/savingScroll.png')

    // Scroll for abilities
    this.load.image('scroll', 'assets/images/scroll.png')
    this.load.image('wallJumpText', 'assets/images/text/wallJumpText.png')

    // Loading text for the weapons
    this.load.image('swordText', 'assets/images/text/swordText.png')
    this.load.image('chainText', 'assets/images/text/chainText.png')
    this.load.image('hammerText', 'assets/images/text/hammerText.png')
  }

  // Load map JSON data into the cache
  processMapData (mapData, key, URL) {
    let map = new JSONMap({name: key, game: this.game, mapData: mapData})
    this.cache.addJSON(key, URL, map)
  }

  // Pre-load is done
  create () {
    // Destroy progress bar assets
    this.loaderBar.destroy()
    this.loaderBg.destroy()
  }

  update () {
    if (!this.video6SD.playing && this.game.time.elapsedSecondsSince(this.started) >= config.MIN_SPLASH_SECONDS) {
      // Switch to 'TitlMenu' state
      this.state.start('TitleMenu')
    }
  }
}
