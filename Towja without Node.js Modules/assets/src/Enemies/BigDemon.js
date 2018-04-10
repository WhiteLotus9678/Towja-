import WalkerAI from './WalkerAI.js'

export default class BigDemon extends WalkerAI {
  constructor ({game, pX, pY, pPlayer}) {
    super({game, pX, pY, speed: 700, spriteName: 'bigDemon', pPlayer, pointXSet: 220, pointYSet: 150})

    this.scale.setTo(1, 1)
    this.body.clearShapes()
    this.body.addRectangle(400, 200, 0, 0)
    this.body.addToWorld()
    this.body.data.shapes[0].sensor = true
    this.oldSpeed = this.speed
    this.isMoving = true

    this.setAnchor(0.5, 0.5)
    this.setPoints(0, 0, 0, 0)

    this.animations.add('Standing', [0, 1, 2, 3], 10, false)
    this.animations.add('Jumping', [5, 6, 6], 5, false)
    this.animations.add('dead', [0], 10, false)

    this.animations.getAnimation('Jumping').onComplete.add(() => {
      this.changeState()
    }, this)

    this.animations.getAnimation('Standing').onComplete.add(() => {
      this.changeState()
    }, this)

    this.animations.play('Jumping')
  }

  death () {
    super.death()
    this.game.camera.shake(0.01, 200)
  }

  changeState () {
    if (!this.isMoving) {
      this.isMoving = true
      this.animations.play('Jumping')
      this.body.velocity.x = this.oldSpeed
    } else {
      this.isMoving = false
      this.animations.play('Standing')
      this.oldSpeed = this.body.velocity.x
      this.body.velocity.x = 0
    }
  }
}
