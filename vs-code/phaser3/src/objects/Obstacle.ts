namespace GreedyArcher{
    export class Obstacle extends Phaser.Physics.Arcade.Image {

        baseScene : BaseScene

        constructor(scene : BaseScene, x: number, y : number){
            super(scene, x, y, "obstacle")

            //scene.physics.add.existing(this)
            //scene.add.existing(this)

            this.baseScene = scene

            this.setScale(2, 2)
        }
    }
}