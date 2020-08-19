namespace GreedyArcher{
    export class Obstacle extends Phaser.Physics.Arcade.Image {

        constructor(scene : BaseScene, x: number, y : number){
            super(scene, x, y, "obstacle")

            this.setScale(2, 2)
        }
    }

    export class ObstacleGroup extends Phaser.Physics.Arcade.Group {

        private static dFactor = 0.999
        private static bounce = 1
        
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)
        }

        addObject(child: Phaser.Physics.Arcade.Image | Phaser.Physics.Arcade.Sprite){
            super.add(child, true)

            child.setCollideWorldBounds(true)

            child.setDamping(true)
            child.setDrag(ObstacleGroup.dFactor)
            child.setBounce(ObstacleGroup.bounce)
        }
    }
}