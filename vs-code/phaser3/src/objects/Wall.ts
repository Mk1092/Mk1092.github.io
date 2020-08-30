namespace GreedyArcher {

    export class WallGroup extends Phaser.Physics.Arcade.Group {

        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene, 
                {
                    collideWorldBounds: true,
                    immovable: true
                })
        }

        createWall(x : number, y : number, width : number, height : number){
            super.add(new Phaser.GameObjects.TileSprite(this.scene, x, y, width, height, "walls"), true)
        }
    }
}