namespace GreedyArcher {

    export class BaseScene extends Phaser.Scene {
        bg : Phaser.GameObjects.TileSprite;

        player : Player
        enemies : EnemyGroup

        obstacles : ObstacleGroup
        projectiles : ProjectileGroup
        debugText : Phaser.GameObjects.Text

        create(){
            var style = { font: "bold 18px Arial", fill: "#f44"};

            this.debugText = this.add.text(-400, -300, "", style);
            this.debugText.depth = 2

            // focus on 0, 0
            this.setView();

            // background color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);

            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');

            this.projectiles = new ProjectileGroup(this)
            this.player = new Player(this, 0, 0)
            this.player.loadAnims()

            this.obstacles = new ObstacleGroup(this)

            /*this.enemies = new Phaser.Physics.Arcade.Group(this.physics.world, this)
            this.enemies.runChildUpdate = true*/
            this.enemies = new EnemyGroup(this)
            Enemy.loadAnims(this)

            //this.enemies.createEnemy(100, -200)
            //this.enemies.createEnemy(-300, 250, false)
            
            this.physics.add.collider(this.player, this.obstacles, 
                function(player : Player, obstacle : Obstacle){player.gotHit()})

            this.physics.add.collider(this.projectiles, this.obstacles)
            
            this.physics.add.collider(this.obstacles, this.obstacles)

            this.physics.add.collider(this.enemies, this.obstacles, 
                function(enemy : Enemy, obstacle : Obstacle){enemy.hitByDanger()})

            this.physics.add.collider(this.enemies, this.projectiles, 
                function(enemy : Enemy, projectile : Projectile){enemy.hitByProjectile(); projectile.onHit()})

            this.physics.add.collider(this.enemies, this.player, 
                function(player : Player, enemy : Enemy){player.gotHit()})
        }

        public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }

        // --------------------------------------------------------------------
        public get gameWidth(): number {
            return this.sys.game.config.width as number;
        }

        // --------------------------------------------------------------------
        public get gameHeight(): number {
            return this.sys.game.config.height as number;
        }

        // --------------------------------------------------------------------
        protected setView(): void {
            // focus on center
            this.cameras.main.centerOn(0, 0);
        }

        public setDebugText(message : string){
            if(this.debugText)
                this.debugText.setText(message)
        }

        public gameOver(){
            this.scene.start("gameOver")
        }
    }
}