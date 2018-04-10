/* globals __DEV__ */

import Phaser from 'phaser'

class JSONMap {
  constructor ({ name, game, mapData }) {
    console.log('constructing JSONMap')
    this.mapName = name
    this.game = game
    this.mapData = mapData
    this.backgroundKey = `${this.mapName}-background`
    mapData.layers.forEach((layer) => {
      if (layer.name === 'Colliders') {
        this.colliders = layer
      } else if (layer.name === 'Background') {
        // Loads the background image according to the directory in the .json file
        this.background = layer
      }
    })

    if (this.background) {
      this.loadBackground()
    }
  }

  processColliders (material, type) {
    console.log('colliders')
    this.bodies = []
    this.colliders.objects.forEach((object) => {
      if (typeof type === 'undefined' || object.type === type) {
        let body = new Phaser.Physics.P2.Body(this.game, null, object.x, object.y)

        let points = []
        if (object.polyline || object.polygon) {
          if (object.polyline) {
            object.polyline.forEach((point) => {
              points.push([point.x, point.y])
            })
            console.log(`${object.name}: polyline`)
          } else {
            object.polygon.forEach((point) => {
              points.push([point.x, point.y])
            })
            console.log(`${object.name}: polygon`)
          }
        } else if (object.ellipse) {
          if (Math.abs(object.width - object.height) < 0.01) {
            let rad = object.width / 2
            body.addCircle(rad, rad, rad)
          } else {
            let angle = 0
            let angleInc = 2 * Math.PI / JSONMap.ELLIPSE_SUBDIVS
            let xRad = object.width / 2
            let yRad = object.height / 2

            for (let i = 0; i < JSONMap.ELLIPSE_SUBDIVS; i++) {
              points.push([Math.cos(angle) * xRad + xRad, Math.sin(angle) * yRad + yRad])
              angle += angleInc
            }
          }
          console.log(`${object.name}: ellipse`)
        } else {
          let x = 0
          let y = 0
          points.push([x, y])
          points.push([x + object.width, y])
          points.push([x + object.width, y + object.height])
          points.push([x, y + object.height])
          console.log(`${object.name}: rectangle`)
        }

        if (object.rotation && points.length > 0) {
          let M = new Phaser.Matrix()
          M.translate(points[0][0], points[0][1])
          M.rotate(object.rotation / 180 * Math.PI)
          M.translate(-points[0][0], -points[0][1])

          let newPoints = []
          points.forEach((point) => {
            let newPoint = M.apply(new Phaser.Point(point[0], point[1]))
            newPoints.push([newPoint.x, newPoint.y])
          })
          points = newPoints
        }

        if (points.length > 0) {
          body.addPolygon({ skipSimpleCheck: true, removeCollinearPoints: 0.01 }, points)
        }
        // body.debug = __DEV__
        body.static = true
        body.setMaterial(material)
        body.addToWorld()
        body.isWallJumpable = true
        this.bodies.push(body)
      }
    })
    return this.bodies
  }

  loadBackground () {
    this.game.load.image('background', this.background.image.replace('..', 'assets'))
    let path = this.background.image
    path = path.replace(/\.\.\//g, '')
    path = 'assets/' + path
    this.game.load.image(this.backgroundKey, path)
  }
}

JSONMap.ELLIPSE_SUBDIVS = 16

export default JSONMap
