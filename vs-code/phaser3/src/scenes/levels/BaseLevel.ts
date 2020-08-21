namespace GreedyArcher {

    export class BaseLevel extends Phaser.Scene {
        bg : Phaser.GameObjects.TileSprite;

        player : Player
        enemies : EnemyGroup

        objects : ObjectGroup
        projectiles : ProjectileGroup
        debugText : Phaser.GameObjects.Text

        create(){
            this.setView()
            this.initFields()
            this.initAnimsAndCollider()
        }

        public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }

        /*/ --------------------------------------------------------------------
        public get gameWidth(): number {
            return this.sys.game.config.width as number;
        }

        // --------------------------------------------------------------------
        public get gameHeight(): number {
            return this.sys.game.config.height as number;
        }*/

        // --------------------------------------------------------------------
        public get gameRect() : Phaser.Geom.Rectangle {

            let c = this.sys.game.config
            let w = <number> c.width
            let h = <number> c.height
            
            let camX = this.cameras.main.centerX
            let camY = this.cameras.main.centerY
            
            let x = -camX
            let y = -camY

            return new Phaser.Geom.Rectangle(x, y, w, h)
        }

        // --------------------------------------------------------------------
        public get worldRect() : Phaser.Geom.Rectangle {
            return this.physics.world.bounds
        }

        // --------------------------------------------------------------------
        protected setView(): void {

            let {x, y} = this.gameRect

            // setup debug text
            let style = { font: "bold 18px Arial", fill: "#f44"};
            this.debugText = this.add.text(x, y, "", style);
            this.debugText.depth = 2

            // focus on center
            this.cameras.main.centerOn(0, 0);

            // background color
            //this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            this.cameras.main.backgroundColor = GUIUtils.bgColor
        }

        private initFields(){
            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');

            this.projectiles = new ProjectileGroup(this)
            this.player = new Player(this, 0, 0)
            this.objects = new ObjectGroup(this)
            this.enemies = new EnemyGroup(this)
        }

        private initAnimsAndCollider(){

            Player.loadAnims(this)
            Enemy.loadAnims(this)
            
            this.physics.add.collider(this.player, this.objects,
                function(player : Player, obstacle : Danger){player.gotHit()})

            this.physics.add.collider(this.projectiles, this.objects)
            
            this.physics.add.collider(this.objects, this.objects)

            this.physics.add.collider(this.enemies, this.objects,
                function(enemy : Enemy, obstacle : Danger){enemy.hitByDanger()})

            this.physics.add.collider(this.enemies, this.projectiles,
                function(enemy : Enemy, projectile : Projectile){enemy.hitByProjectile(); projectile.onHit()})

            this.physics.add.collider(this.enemies, this.player,
                function(player : Player, enemy : Enemy){player.gotHit()})

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