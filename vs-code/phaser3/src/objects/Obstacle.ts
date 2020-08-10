namespace GreedyArcher{
    export class Obstacle extends Phaser.Physics.Arcade.Image {

        constructor(scene : BaseScene, x: number, y : number){
            super(scene, x, y, "obstacle")
            this.setScale(2, 2)
        }
    }

    export class ObstacleGroup extends Phaser.Physics.Arcade.Group {
        
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)
        }

        addObject(child: Phaser.Physics.Arcade.Image | Phaser.Physics.Arcade.Sprite){
            super.add(child, true)
            child.setCollideWorldBounds(true)
        }
    }
}