var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="../js/phaser.d.ts" />
var App;
(function (App) {
    // game
    App.game = null;
})(App || (App = {}));
// -------------------------------------------------------------------------
function launch() {
    var game = new GreedyArcher.Game();
    App.game = game;
}
// -------------------------------------------------------------------------
window.onload = launch;
var GreedyArcher;
(function (GreedyArcher) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        // --------------------------------------------------------------------
        function Game() {
            var _this = this;
            // default renderer
            var renderer = Phaser.AUTO;
            // init game
            _this = _super.call(this, {
                type: renderer,
                parent: "game_content",
                physics: {
                    default: "arcade",
                    arcade: {
                        gravity: { x: 0, y: 0 },
                        debug: false,
                        x: -400,
                        y: -300,
                        width: 800,
                        height: 600
                    }
                },
                //width: 800,
                //height: 600,
                width: 1000,
                height: 800,
                title: "Maintainable Game",
            }) || this;
            // states
            _this.scene.add("Welcome", GreedyArcher.Welcome);
            _this.scene.add("Level1", GreedyArcher.Level1);
            _this.scene.add("Preloader", GreedyArcher.Preloader);
            _this.scene.add("Menu", GreedyArcher.Menu);
            // start
            _this.scene.start("Welcome");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    GreedyArcher.Game = Game;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    function setSizeblePos(xp, yp, obj, dimX, dimY) {
        var x = dimX * xp / 100 - obj.width / 2;
        var y = dimY * yp / 100 - obj.height / 2;
        obj.setPosition(x, y);
    }
    GreedyArcher.setSizeblePos = setSizeblePos;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(scene, x, y, mimic) {
            if (mimic === void 0) { mimic = true; }
            var _this = _super.call(this, scene, x, y, mimic ? "player" : "enemy") || this;
            _this.minDangerDistance = 100;
            _this.walkingSpeed = 50;
            _this.runningSpeed = 120;
            _this.isMoving = false;
            _this.hitNumber = 0;
            _this.player = scene.player;
            _this.obstacles = scene.obstacles;
            _this.mimic = mimic;
            return _this;
        }
        Enemy.loadAnims = function (scene) {
            scene.anims.create({
                key: 'enemyStill',
                frames: scene.anims.generateFrameNumbers('enemy', { start: 0 }),
                frameRate: 0,
                repeat: -1
            });
            scene.anims.create({
                key: 'enemyWalk',
                frames: scene.anims.generateFrameNumbers('enemy', { start: 1, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        };
        Enemy.prototype.animateMovement = function () {
            var walk = this.mimic ? "walk" : "enemyWalk";
            var still = this.mimic ? "still" : "enemyStill";
            if (this.body.velocity.length() > 0) {
                if (!this.isMoving) {
                    this.scene.anims.play(walk, this);
                    this.isMoving = true;
                }
            }
            else {
                if (this.isMoving) {
                    this.scene.anims.play(still, this);
                    this.isMoving = false;
                }
            }
        };
        Enemy.prototype.hitByProjectile = function () {
            this.hitNumber += 1;
            var timer = this.scene.time.addEvent({
                delay: 500,
                callback: function () { this.hitNumber -= 1; },
                //args: [],
                callbackScope: this,
                loop: false
            });
        };
        Enemy.prototype.hitByDanger = function () {
            this.destroy();
        };
        Enemy.prototype.getNearestDangerDirection = function () {
            var distance = 10000;
            var dir = new Phaser.Math.Vector2(0, 0);
            this.obstacles.children.each(function (obstacle) {
                var newDir = this.body.position.clone().subtract(obstacle.body.position);
                var newDist = newDir.length();
                if (newDist < distance) {
                    distance = newDist;
                    dir = newDir;
                }
            }, this);
            return dir;
        };
        Enemy.prototype.update = function () {
            this.animateMovement();
            if (this.hitNumber > 0)
                return;
            var escapeDir = this.getNearestDangerDirection();
            if (escapeDir.length() < this.minDangerDistance) {
                escapeDir.normalize().scale(this.runningSpeed);
                this.setVelocity(escapeDir.x, escapeDir.y);
                return;
            }
            var playerDistance = this.player.body.position.clone();
            playerDistance.subtract(this.body.position);
            var vel = playerDistance.normalize().scale(this.walkingSpeed);
            this.setVelocity(vel.x, vel.y);
        };
        return Enemy;
    }(Phaser.Physics.Arcade.Sprite));
    GreedyArcher.Enemy = Enemy;
    var EnemyGroup = /** @class */ (function (_super) {
        __extends(EnemyGroup, _super);
        function EnemyGroup(scene) {
            var _this = _super.call(this, scene.physics.world, scene) || this;
            _this.runChildUpdate = true;
            return _this;
        }
        EnemyGroup.prototype.createEnemy = function (x, y, mimic) {
            var enemy = new Enemy(this.scene, x, y, mimic);
            _super.prototype.add.call(this, enemy, true);
            enemy.setCollideWorldBounds(true);
        };
        return EnemyGroup;
    }(Phaser.Physics.Arcade.Group));
    GreedyArcher.EnemyGroup = EnemyGroup;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var Obstacle = /** @class */ (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle(scene, x, y) {
            var _this = _super.call(this, scene, x, y, "obstacle") || this;
            _this.setScale(2, 2);
            return _this;
        }
        return Obstacle;
    }(Phaser.Physics.Arcade.Image));
    GreedyArcher.Obstacle = Obstacle;
    var ObstacleGroup = /** @class */ (function (_super) {
        __extends(ObstacleGroup, _super);
        function ObstacleGroup(scene) {
            return _super.call(this, scene.physics.world, scene) || this;
        }
        ObstacleGroup.prototype.addObject = function (child) {
            _super.prototype.add.call(this, child, true);
            child.setCollideWorldBounds(true);
            child.setDamping(true);
            child.setDrag(ObstacleGroup.dFactor);
            child.setBounce(ObstacleGroup.bounce);
        };
        ObstacleGroup.dFactor = 0.999;
        ObstacleGroup.bounce = 1;
        return ObstacleGroup;
    }(Phaser.Physics.Arcade.Group));
    GreedyArcher.ObstacleGroup = ObstacleGroup;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        /*--------------------------------------------------------------------*/
        function Player(scene, x, y) {
            var _this = _super.call(this, scene, x, y, "player") || this;
            _this.direction = { x: 0, y: 0 };
            _this.isMoving = false;
            _this.lastShot = 0;
            _this.playerAim = true;
            _this.aimLine = null;
            _this.arrowLoaded = false;
            scene.physics.add.existing(_this);
            scene.add.existing(_this);
            //this.baseScene = scene
            _this.projectiles = scene.projectiles;
            _this.setCollideWorldBounds(true);
            _this.addMovementKey('W', 0, -1);
            _this.addMovementKey('A', -1, 0);
            _this.addMovementKey('S', 0, 1);
            _this.addMovementKey('D', 1, 0);
            var player = _this;
            scene.setDebugText("Personaggio");
            _this.addDownKeyCommand('Space', function () {
                player.playerAim = !player.playerAim;
                scene.setDebugText(player.playerAim ? "Personaggio" : "Centro");
            });
            _this.aimLine = _this.scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000).setOrigin(0, 0);
            return _this;
        }
        Player.prototype.addMovementKey = function (key, xDir, yDir) {
            var MovKey = this.scene.input.keyboard.addKey(key);
            var player = this;
            MovKey.on('down', function (event) { player.updateDir(xDir, yDir); });
            MovKey.on('up', function (event) { player.updateDir(-xDir, -yDir); });
        };
        Player.prototype.addDownKeyCommand = function (key, callback) {
            var commandKey = this.scene.input.keyboard.addKey(key);
            commandKey.on('down', callback);
        };
        Player.prototype.updateDir = function (x, y) {
            this.direction.x += x;
            this.direction.y += y;
            this.direction.x = Math.max(Math.min(this.direction.x, 1), -1);
            this.direction.y = Math.max(Math.min(this.direction.y, 1), -1);
        };
        Player.prototype.showAimLine = function (mousePos) {
            if (!mousePos) {
                this.setLine();
                return;
            }
            var aim = this.playerAim ? this.body.center : new Phaser.Math.Vector2(0, 0);
            this.setLine(mousePos, aim);
        };
        Player.prototype.shoot = function (mousePos) {
            var now = new Date().getTime();
            if (now > this.lastShot + Player.shotInterval) {
                this.projectiles.fire(this.body.center, mousePos, this.playerAim);
                this.lastShot = now;
            }
        };
        Player.prototype.gotHit = function () {
            this.scene.scene.start("Welcome");
        };
        Player.prototype.loadAnims = function () {
            this.scene.anims.create({
                key: 'still',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 0 }),
                frameRate: 0,
                repeat: -1
            });
            this.scene.anims.create({
                key: 'walk',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
                frameRate: 10,
                repeat: -1
            });
        };
        Player.prototype.animateMovement = function () {
            var vx = this.direction.x * Player.speed;
            var vy = this.direction.y * Player.speed;
            this.setVelocity(vx, vy);
            if (vx != 0 || vy != 0) {
                if (!this.isMoving) {
                    this.scene.anims.play('walk', this);
                    this.isMoving = true;
                }
            }
            else {
                if (this.isMoving) {
                    this.scene.anims.play('still', this);
                    this.isMoving = false;
                }
            }
        };
        Player.prototype.checkMouseLeftClick = function () {
            var leftDown = this.scene.input.mousePointer.leftButtonDown();
            var _a = this.scene.game.canvas, width = _a.width, height = _a.height;
            var center = new Phaser.Math.Vector2(width / 2, height / 2);
            var mousePos = this.scene.input.mousePointer.position.clone().subtract(center);
            if (leftDown) {
                this.arrowLoaded = true;
                this.showAimLine(mousePos);
            }
            else {
                this.setLine();
                if (this.arrowLoaded) {
                    this.shoot(mousePos);
                    this.arrowLoaded = false;
                }
            }
        };
        Player.prototype.update = function () {
            this.animateMovement();
            this.checkMouseLeftClick();
        };
        Player.prototype.setLine = function (start, end) {
            if (start === void 0) { start = null; }
            if (end === void 0) { end = null; }
            this.aimLine.destroy();
            if (start !== null && end != null)
                this.aimLine = this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, 0xff0000).setOrigin(0, 0);
        };
        Player.speed = 200;
        Player.shotInterval = 500;
        return Player;
    }(Phaser.Physics.Arcade.Sprite));
    GreedyArcher.Player = Player;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var Projectile = /** @class */ (function (_super) {
        __extends(Projectile, _super);
        function Projectile(scene) {
            var _this = _super.call(this, scene, 0, 0, "projectile") || this;
            _this.stopTime = null;
            return _this;
            /*scene.physics.add.existing(this)
            scene.add.existing(this)

            this.setCircle(this.body.width/2)*/
        }
        Projectile.prototype.fire = function (position, mousePos, playerAim) {
            if (playerAim === void 0) { playerAim = true; }
            this.body.reset(position.x, position.y);
            this.setActive(true);
            this.setVisible(true);
            this.setCollideWorldBounds(true);
            var vel = mousePos.clone();
            vel.negate();
            if (playerAim) {
                vel.add(position);
            }
            this.setVelocity(vel.x * Projectile.vFactor, vel.y * Projectile.vFactor);
            //this.setDamping(true)
            //this.setDrag(Projectile.dFactor)
        };
        Projectile.prototype.onHit = function () {
            this.setCollideWorldBounds(false);
            this.body.reset(1000, 1000);
            this.setActive(false);
            this.setVisible(false);
        };
        Projectile.prototype.update = function (time, delta) {
            var vel = this.body.velocity;
            if (vel.length() < 20) {
                if (this.stopTime === null) {
                    this.stopTime = time;
                }
                else {
                    if (time > this.stopTime + Projectile.stillLifetime) {
                        this.onHit();
                    }
                }
            }
            var angle = Phaser.Math.Angle.Between(0, 0, vel.x, vel.y);
            angle = angle * 180 / 3.14 + 90;
            this.setAngle(angle);
        };
        Projectile.vFactor = 1.8;
        Projectile.stillLifetime = 2000;
        return Projectile;
    }(Phaser.Physics.Arcade.Image));
    GreedyArcher.Projectile = Projectile;
    var ProjectileGroup = /** @class */ (function (_super) {
        __extends(ProjectileGroup, _super);
        function ProjectileGroup(scene) {
            var _this = _super.call(this, scene.physics.world, scene) || this;
            _this.createMultiple({
                frameQuantity: 30,
                key: 'bullet',
                active: false,
                visible: false,
                setXY: { x: 1000, y: 1000 },
                classType: Projectile
            });
            _this.runChildUpdate = true;
            var projectiles = _this.getChildren();
            for (var _i = 0, projectiles_1 = projectiles; _i < projectiles_1.length; _i++) {
                var gameobject = projectiles_1[_i];
                var projectile = gameobject;
                projectile.setCircle(projectile.body.width / 2);
                projectile.setDamping(true);
                projectile.setDrag(ProjectileGroup.dFactor);
                projectile.setBounce(ProjectileGroup.bounce);
            }
            return _this;
        }
        ProjectileGroup.prototype.fire = function (position, mousePos, playerAim) {
            var projectile = this.getFirstDead();
            if (projectile) {
                projectile.fire(position, mousePos, playerAim);
            }
        };
        ProjectileGroup.dFactor = 0.98;
        ProjectileGroup.bounce = 0.7;
        return ProjectileGroup;
    }(Phaser.Physics.Arcade.Group));
    GreedyArcher.ProjectileGroup = ProjectileGroup;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseScene.prototype.create = function () {
            var style = { font: "bold 18px Arial", fill: "#f44" };
            this.debugText = this.add.text(-400, -300, "", style);
            this.debugText.depth = 2;
            // focus on 0, 0
            this.setView();
            // background color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
            this.projectiles = new GreedyArcher.ProjectileGroup(this);
            this.player = new GreedyArcher.Player(this, 0, 0);
            this.player.loadAnims();
            this.obstacles = new GreedyArcher.ObstacleGroup(this);
            /*this.enemies = new Phaser.Physics.Arcade.Group(this.physics.world, this)
            this.enemies.runChildUpdate = true*/
            this.enemies = new GreedyArcher.EnemyGroup(this);
            GreedyArcher.Enemy.loadAnims(this);
            //this.enemies.createEnemy(100, -200)
            //this.enemies.createEnemy(-300, 250, false)
            this.physics.add.collider(this.player, this.obstacles, function (player, obstacle) { player.gotHit(); });
            this.physics.add.collider(this.projectiles, this.obstacles);
            this.physics.add.collider(this.obstacles, this.obstacles);
            this.physics.add.collider(this.enemies, this.obstacles, function (enemy, obstacle) { enemy.hitByDanger(); });
            this.physics.add.collider(this.enemies, this.projectiles, function (enemy, projectile) { enemy.hitByProjectile(); projectile.onHit(); });
            this.physics.add.collider(this.enemies, this.player, function (player, enemy) { player.gotHit(); });
        };
        BaseScene.prototype.update = function (time, delta) {
            this.player.update();
            this.projectiles.preUpdate(time, delta);
            this.enemies.preUpdate(time, delta);
        };
        Object.defineProperty(BaseScene.prototype, "gameWidth", {
            // --------------------------------------------------------------------
            get: function () {
                return this.sys.game.config.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseScene.prototype, "gameHeight", {
            // --------------------------------------------------------------------
            get: function () {
                return this.sys.game.config.height;
            },
            enumerable: false,
            configurable: true
        });
        // --------------------------------------------------------------------
        BaseScene.prototype.setView = function () {
            // focus on center
            this.cameras.main.centerOn(0, 0);
        };
        BaseScene.prototype.setDebugText = function (message) {
            if (this.debugText)
                this.debugText.setText(message);
        };
        BaseScene.prototype.gameOver = function () {
            this.scene.start("gameOver");
        };
        return BaseScene;
    }(Phaser.Scene));
    GreedyArcher.BaseScene = BaseScene;
})(GreedyArcher || (GreedyArcher = {}));
var GreedyArcher;
(function (GreedyArcher) {
    var GameOver = /** @class */ (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GameOver;
    }(GreedyArcher.BaseScene));
    GreedyArcher.GameOver = GameOver;
})(GreedyArcher || (GreedyArcher = {}));
///<reference path = "BaseScene.ts" />
var GreedyArcher;
(function (GreedyArcher) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.preload = function () {
            this.load.image('bg', './assets/pavement3.png');
            this.load.image('obstacle', './assets/bomb.png');
            this.load.image('projectile', './assets/arrow3.png');
            this.load.spritesheet('player', './assets/archerD.png', { frameWidth: 52, frameHeight: 64 });
            this.load.spritesheet('enemy', './assets/omino.png', { frameWidth: 26, frameHeight: 64 });
        };
        Level1.prototype.create = function () {
            _super.prototype.create.call(this);
            this.obstacles.addObject(new GreedyArcher.Obstacle(this, 150, 150));
            this.obstacles.addObject(new GreedyArcher.Obstacle(this, 120, 150));
            this.enemies.createEnemy(100, -200);
            this.enemies.createEnemy(-300, 250, false);
        };
        return Level1;
    }(GreedyArcher.BaseScene));
    GreedyArcher.Level1 = Level1;
})(GreedyArcher || (GreedyArcher = {}));
///<reference path = "BaseScene.ts" />
var GreedyArcher;
(function (GreedyArcher) {
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // -------------------------------------------------------------------------
        Menu.prototype.create = function () {
            console.log("Menu");
            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x808080);
            // focus on 0, 0
            this.setView();
            // red circle
            var graphics = this.add.graphics();
            graphics.fillStyle(0xff0000);
            graphics.fillCircle(0, 0, 50);
        };
        return Menu;
    }(GreedyArcher.BaseScene));
    GreedyArcher.Menu = Menu;
})(GreedyArcher || (GreedyArcher = {}));
///<reference path = "BaseScene.ts" />
var GreedyArcher;
(function (GreedyArcher) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // -------------------------------------------------------------------------
        Preloader.prototype.create = function () {
            console.log("Preloader");
            this.scene.start("Menu");
        };
        return Preloader;
    }(GreedyArcher.BaseScene));
    GreedyArcher.Preloader = Preloader;
})(GreedyArcher || (GreedyArcher = {}));
///<reference path = "BaseScene.ts" />
///<reference path = "../GameUtils.ts" />
var GreedyArcher;
(function (GreedyArcher) {
    var Welcome = /** @class */ (function (_super) {
        __extends(Welcome, _super);
        function Welcome() {
            return _super.call(this, { key: "Welcome" }) || this;
        }
        Welcome.prototype.preload = function () {
            this.load.image('logo', './assets/dude.png');
        };
        Welcome.prototype.create = function () {
            //Canvas dims
            var _a = this.sys.game.canvas, width = _a.width, height = _a.height;
            // background color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            this.logo = this.add.image(width / 2, height / 2, 'logo');
            this.logo.setScale(.5, .5);
            var tween = this.tweens.add({
                targets: this.logo,
                scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                yoyo: true,
                repeat: -1
            });
            var style = { font: "bold 24px Arial", fill: "#fff" };
            var text = this.add.text(0, 0, "Premi invio", style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            GreedyArcher.setSizeblePos(50, 45, text, width, height);
            var scene = this;
            var keyObj = this.input.keyboard.addKey('Enter');
            keyObj.on('down', function (event) { scene.scene.start("Level1"); });
        };
        return Welcome;
    }(Phaser.Scene));
    GreedyArcher.Welcome = Welcome;
})(GreedyArcher || (GreedyArcher = {}));
//# sourceMappingURL=maintainable_game.js.map