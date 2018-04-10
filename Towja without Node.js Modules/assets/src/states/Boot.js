import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  // Initialize the stage and any simple settings
  init () {
    this.stage.backgroundColor = '#7f7f7f'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  // Load all data needed for this game state
  preload () {
    // Load needed font (will load asynchronously)
    // Calls fontsLoaded() when complete
    WebFont.load({
      google: {
        families: ['Libre Franklin']
      },
      active: this.fontsLoaded
    })

    this.game.load.video('6SDSplash', '../../splash/6SDSplash.mp4')

    // Show message that fonts are loading
    let text = this.add.text(this.world.centerX, this.world.centerY,
      'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    // Read the assets for the splash screen (used in next stage)
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('logo', './assets/images/title_logo.png')

    // Scale the window to be fullscreen
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.windowConstraints.bottom = 'visual'
    this.scale.fullscreenScaleMode = Phaser.ScaleManager.EXACT_FIT
  }

  // Called repeatedly after pre-load to draw the stage
  render () {
    // Wait for font before proceeding
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  // Signal that the font has finished loading
  fontsLoaded () {
    this.fontsReady = true
  }
}
