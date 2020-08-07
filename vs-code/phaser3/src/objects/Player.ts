namespace MaintainableGame{

    export class Player extends Phaser.GameObjects.Sprite{
        speed : number;

        /*--------------------------------------------------------------------*/

        constructor(scene : Phaser.Scene, x : number, y:number, texture:string){
            super(scene, x, y, texture)
            
            scene.physics.add.existing(this)
            scene.add.existing(this)
            
            //this.body.onCollide = true;
        }

        public move(vx : number, vy : number){
            moveBy(vx, vy)
        }
    }

}