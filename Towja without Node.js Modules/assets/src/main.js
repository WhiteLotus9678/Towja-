import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import TitleMenuState from './states/TitleMenu'
import ControlsMenuState from './states/ControlsMenu'
import CreditsMenuState from './states/CreditsMenu'
import GameOverState from './states/GameOver'
import LevelState from './states/Level'
import TutorialLevel0 from './levelData/tutorial_0'
import IntroRoomStart from './levelData/Level_Start'
import StartScene from './states/StartScene'
import Level1 from './levelData/Level_1'
import Level2 from './levelData/Level_2'
import Level3 from './levelData/Level_3'
import Level4 from './levelData/Level_4'
import Level5 from './levelData/Level_5'
import Level6 from './levelData/Level_6'
import Level7 from './levelData/Level_7'
import Level8 from './levelData/Level_8'
import Level9 from './levelData/Level_9'
import FinalScene from './states/FinalScene'
import LevelFinal from './levelData/Level_Final'
import Win from './states/Win'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    super(config.gameWidth, config.gameHeight, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('TitleMenu', TitleMenuState, false)
    this.state.add('ControlsMenu', ControlsMenuState, false)
    this.state.add('CreditsMenu', CreditsMenuState, false)
    this.state.add('GameOver', GameOverState, false)
    this.state.add('Start_Scene', StartScene, false)
    this.state.add('Level', LevelState, false)
    this.state.add('Tutorial_0', TutorialLevel0, false)
    this.state.add('Level_Start', IntroRoomStart, false)
    this.state.add('Level_1', Level1, false)
    this.state.add('Level_2', Level2, false)
    this.state.add('Level_3', Level3, false)
    this.state.add('Level_4', Level4, false)
    this.state.add('Level_5', Level5, false)
    this.state.add('Level_6', Level6, false)
    this.state.add('Level_7', Level7, false)
    this.state.add('Level_8', Level8, false)
    this.state.add('Level_9', Level9, false)
    this.state.add('Level_Final', LevelFinal, false)
    this.state.add('Final_Scene', FinalScene, false)
    this.state.add('Win', Win, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
