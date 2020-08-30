///<reference path = "BaseLevel.ts" />

namespace GreedyArcher {

    export class Level2 extends BaseLevel {

        preload() {
            this.load.image('bg', './assets/pavement3.png')
            this.load.image('obstacle', './assets/bomb.png')
            this.load.image('projectile', './assets/arrow3.png')
            this.load.spritesheet('player', './assets/archerD.png', { frameWidth: 52, frameHeight: 64 })
            this.load.image('goal', './assets/goal.png')
            this.load.image('walls', './assets/pavement2.png')
            this.load.image('crate', './assets/pavement.png')
        }

        public create() {
            super.create()
            
            this.player.setY(50)

            this.objects.createGoal(0, -275)

            this.walls.createWall(-65, -250, 50, 100)
            this.walls.createWall(65, -260, 50, 80)
            this.walls.createWall(55, -210, 70, 20)
            this.walls.createWall(65, -135, 50, 70)
            
            this.objects.createCrate(0, -160)
        }

        /*public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }*/
    }
}