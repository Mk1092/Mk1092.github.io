///<reference path = "BaseLevel.ts" />

namespace GreedyArcher {

    export class Level1 extends BaseLevel {

        preload() {

            this.load.image('bg', './assets/pavement3.png')
            this.load.image('obstacle', './assets/bomb.png')
            this.load.image('projectile', './assets/arrow3.png')
            this.load.spritesheet('player', './assets/archerD.png', { frameWidth: 52, frameHeight: 64 })
            this.load.spritesheet('enemy', './assets/omino.png', { frameWidth: 26, frameHeight: 64 })
            
        }

        public create() {
            super.create()
            
            this.objects.createDanger(150, 150)
            this.objects.createDanger(120, 150)

            this.enemies.createEnemy(100, -200)
            this.enemies.createEnemy(-300, 250, false)
        }

        /*public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }*/
    }
}