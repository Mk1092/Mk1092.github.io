namespace GreedyArcher{
    export class Danger extends Phaser.Physics.Arcade.Image {

        constructor(scene : BaseScene, x: number, y : number){
            super(scene, x, y, "obstacle")

            this.setScale(2, 2)
        }
    }

    export class ObjectGroup extends Phaser.Physics.Arcade.Group {

        private static dFactor = 0.999
        private static bounce = 1
        
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)
        }

        createDanger(x : number, y : number){
            let danger = new Danger(<BaseScene>this.scene, x, y)

            super.add(danger, true)

            danger.setCollideWorldBounds(true)

            danger.setDamping(true)
            danger.setDrag(ObjectGroup.dFactor)
            danger.setBounce(ObjectGroup.bounce)
        }

        /*addObject(child: Phaser.Physics.Arcade.Image | Phaser.Physics.Arcade.Sprite){
            super.add(child, true)

            child.setCollideWorldBounds(true)

            child.setDamping(true)
            child.setDrag(ObjectGroup.dFactor)
            child.setBounce(ObjectGroup.bounce)
        }*/
    }
}