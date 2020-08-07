namespace MaintainableGame{

    export class Player extends Phaser.Physics.Arcade.Sprite{
        speed : number = 200;
        direction = {x: 0, y: 0}
        lastUpdate : number

        /*--------------------------------------------------------------------*/

        constructor(scene : Phaser.Scene, x : number, y:number, texture:string){
            super(scene, x, y, texture)

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.lastUpdate = new Date().getTime()

            var WKey = scene.input.keyboard.addKey('W')
            var AKey = scene.input.keyboard.addKey('A')
            var SKey = scene.input.keyboard.addKey('S')
            var DKey = scene.input.keyboard.addKey('D')

            let player = this

            WKey.on('down', function(event) {player.setDir(0, -1)});
            AKey.on('down', function(event) {player.setDir(-1, 0)});
            SKey.on('down', function(event) {player.setDir(0, 1)});
            DKey.on('down', function(event) {player.setDir(1, 0)});

            WKey.on('up', function(event) {player.nullDir(false)});
            AKey.on('up', function(event) {player.nullDir(true)});
            SKey.on('up', function(event) {player.nullDir(false)});
            DKey.on('up', function(event) {player.nullDir(true)});
        }

        setDir(x : number, y : number){
            this.direction.x += x
            this.direction.y += y

            this.direction.x = Math.max(Math.min(this.direction.x, 1), -1)
            this.direction.y = Math.max(Math.min(this.direction.y, 1), -1)
        }

        nullDir(horizontal : boolean){
            if(horizontal){
                this.direction.x = 0
            }
            else{
                this.direction.y = 0
            }
        }

        public move(){

            /*let now = new Date().getTime()
            let deltaTime = now - this.lastUpdate
            this.lastUpdate = now*/

            let vx = this.direction.x * this.speed
            let vy = this.direction.y * this.speed
            //this.setPosition(px, py)

            this.setVelocity(vx, vy)
        }
    }

}