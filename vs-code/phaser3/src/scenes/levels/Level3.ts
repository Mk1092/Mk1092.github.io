///<reference path = "BaseLevel.ts" />

namespace GreedyArcher {

    export class Level3 extends BaseLevel {

        preload() {
            this.load.image('bg', './assets/pavement3.png')
            this.load.image('obstacle', './assets/bomb.png')
            this.load.image('projectile', './assets/arrow3.png')
            this.load.spritesheet('player', './assets/archerD.png', { frameWidth: 52, frameHeight: 64 })
            this.load.spritesheet('enemy', './assets/omino.png', { frameWidth: 26, frameHeight: 64 })
            this.load.image('goal', './assets/goal.png')
            this.load.image('walls', './assets/pavement2.png')
            this.load.image('crate', './assets/pavement.png')
        }

        public create() {
            super.create()

            this.objects.createGoal(0, -275)

            this.player.setX(-50)
            
            let coord = 275
            this.enemies.createEnemy(coord, coord, false)
            this.enemies.createEnemy(0, coord)
            this.enemies.createEnemy(-coord, coord, false)
            this.enemies.createEnemy(-coord, 0)
            this.enemies.createEnemy(-coord, -coord, false)
            this.enemies.createEnemy(0, -coord)
            this.enemies.createEnemy(coord, -coord, false)
            this.enemies.createEnemy(coord, 0)

            this.objects.createDanger(50, 0)
        }

        /*public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }*/
    }
}