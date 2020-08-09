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
    var game = new MaintainableGame.Game();
    App.game = game;
}
// -------------------------------------------------------------------------
window.onload = launch;
var MaintainableGame;
(function (MaintainableGame) {
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
                width: 800,
                height: 600,
                title: "Maintainable Game",
            }) || this;
            // states
            _this.scene.add("Welcome", MaintainableGame.Welcome);
            _this.scene.add("Level1", MaintainableGame.Level1);
            _this.scene.add("Preloader", MaintainableGame.Preloader);
            _this.scene.add("Menu", MaintainableGame.Menu);
            // start
            _this.scene.start("Welcome");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MaintainableGame.Game = Game;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    function setSizeblePos(xp, yp, obj, dimX, dimY) {
        var x = dimX * xp / 100 - obj.width / 2;
        var y = dimY * yp / 100 - obj.height / 2;
        obj.setPosition(x, y);
    }
    MaintainableGame.setSizeblePos = setSizeblePos;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        /*--------------------------------------------------------------------*/
        function Player(scene, x, y) {
            var _this = _super.call(this, scene, x, y, "player") || this;
            _this.direction = { x: 0, y: 0 };
            _this.isMoving = false;
            _this.lastShot = 0;
            _this.aim2Player = true;
            _this.aimLine = null;
            scene.physics.add.existing(_this);
            scene.add.existing(_this);
            _this.baseScene = scene;
            _this.setCollideWorldBounds(true);
            _this.addMovementKey('W', 0, -1);
            _this.addMovementKey('A', -1, 0);
            _this.addMovementKey('S', 0, 1);
            _this.addMovementKey('D', 1, 0);
            var player = _this;
            scene.setDebugText("Personaggio");
            _this.addDownKeyCommand('Space', function () {
                player.aim2Player = !player.aim2Player;
                if (player.aim2Player)
                    scene.setDebugText("Personaggio");
                else {
                    scene.setDebugText("Centro");
                }
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
        Player.prototype.shoot = function (mousePos) {
            var aim;
            if (this.aim2Player) {
                aim = this.body.center;
            }
            else {
                aim = new Phaser.Math.Vector2(0, 0);
            }
            this.setLine(mousePos, aim);
            var now = new Date().getTime();
            if (now > this.lastShot + Player.shotInterval) {
                new MaintainableGame.Projectile(this.scene, this.body.center, mousePos, this.aim2Player);
                this.lastShot = now;
            }
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
        Player.prototype.move = function () {
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
            if (leftDown) {
                var _a = this.scene.game.canvas, width = _a.width, height = _a.height;
                var center = new Phaser.Math.Vector2(width / 2, height / 2);
                var mousePos = this.scene.input.mousePointer.position.clone().subtract(center);
                this.shoot(mousePos);
            }
            else {
                this.setLine();
            }
        };
        Player.prototype.setLine = function (start, end) {
            if (start === void 0) { start = null; }
            if (end === void 0) { end = null; }
            this.aimLine.destroy();
            if (start !== null && end != null)
                this.aimLine = this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, 0xff0000).setOrigin(0, 0);
        };
        Player.speed = 200;
        Player.shotInterval = 1000;
        return Player;
    }(Phaser.Physics.Arcade.Sprite));
    MaintainableGame.Player = Player;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    var Projectile = /** @class */ (function (_super) {
        __extends(Projectile, _super);
        function Projectile(scene, position, mousePos, playerAim) {
            if (playerAim === void 0) { playerAim = true; }
            var _this = _super.call(this, scene, position.x, position.y, "projectile") || this;
            _this.stopTime = null;
            scene.physics.add.existing(_this);
            scene.add.existing(_this);
            _this.setCircle(_this.body.width / 2);
            var vel = mousePos.clone();
            vel.negate();
            if (playerAim) {
                vel.add(position);
            }
            _this.setVelocity(vel.x * Projectile.vFactor, vel.y * Projectile.vFactor);
            _this.setDamping(true);
            _this.setDrag(Projectile.dFactor);
            var angle = Phaser.Math.Angle.Between(0, 0, vel.x, vel.y);
            angle = angle * 180 / 3.14 + 90;
            _this.setAngle(angle);
            _this.destroyAfterLongStop();
            return _this;
        }
        Projectile.prototype.setTimerEvent = function () {
            var projectile = this;
            var timer = this.scene.time.addEvent({
                delay: 200,
                callback: function () { projectile.destroyAfterLongStop(); },
                //args: [],
                //callbackScope: context,
                loop: false
            });
        };
        Projectile.prototype.destroyAfterLongStop = function () {
            if (this.body.velocity.length() < 20) {
                if (this.stopTime === null) {
                    this.stopTime = new Date().getTime();
                }
                else {
                    var now = new Date().getTime();
                    if (now > this.stopTime + Projectile.stillLifetime) {
                        this.destroy();
                        return;
                    }
                }
            }
            this.setTimerEvent();
        };
        Projectile.vFactor = 1.8;
        Projectile.dFactor = 0.98;
        Projectile.stillLifetime = 2000;
        return Projectile;
    }(Phaser.Physics.Arcade.Image));
    MaintainableGame.Projectile = Projectile;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseScene.prototype.create = function () {
            var style = { font: "bold 18px Arial", fill: "#f44" };
            this.debugText = this.add.text(-400, -300, "", style);
            this.debugText.depth = 2;
            //this.debugText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
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
            this.debugText.setText(message);
        };
        return BaseScene;
    }(Phaser.Scene));
    MaintainableGame.BaseScene = BaseScene;
})(MaintainableGame || (MaintainableGame = {}));
///<reference path = "BaseScene.ts" />
var MaintainableGame;
(function (MaintainableGame) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //pFactory : ProjectileFactory
        // -------------------------------------------------------------------------
        /*constructor(){
            super({
                key: "level1",
                //plugins: ["TweenManager"]
            })
        }*/
        Level1.prototype.preload = function () {
            this.load.image('bg', './assets/garden.jpeg');
            this.load.image('obstacle', './assets/dude.png');
            this.load.image('projectile', './assets/arrow.png');
            this.load.spritesheet('player', './assets/omino.png', { frameWidth: 26, frameHeight: 64 });
        };
        Level1.prototype.create = function () {
            _super.prototype.create.call(this);
            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            // focus on 0, 0
            this.setView();
            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
            //this.pFactory = new ProjectileFactory()
            this.player = new MaintainableGame.Player(this, 0, 0 /*, this.pFactory*/);
            this.player.loadAnims();
            this.obstacle = this.physics.add.staticImage(0, 200, "obstacle");
            this.physics.add.collider(this.player, this.obstacle);
        };
        Level1.prototype.update = function () {
            this.bg.tilePositionY += 2;
            this.player.move();
            this.player.checkMouseLeftClick();
        };
        return Level1;
    }(MaintainableGame.BaseScene));
    MaintainableGame.Level1 = Level1;
})(MaintainableGame || (MaintainableGame = {}));
///<reference path = "BaseScene.ts" />
var MaintainableGame;
(function (MaintainableGame) {
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
    }(MaintainableGame.BaseScene));
    MaintainableGame.Menu = Menu;
})(MaintainableGame || (MaintainableGame = {}));
///<reference path = "BaseScene.ts" />
var MaintainableGame;
(function (MaintainableGame) {
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
    }(MaintainableGame.BaseScene));
    MaintainableGame.Preloader = Preloader;
})(MaintainableGame || (MaintainableGame = {}));
///<reference path = "BaseScene.ts" />
///<reference path = "../GameUtils.ts" />
var MaintainableGame;
(function (MaintainableGame) {
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
            // bacground color
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
            MaintainableGame.setSizeblePos(50, 45, text, width, height);
            var ctx = this;
            var keyObj = this.input.keyboard.addKey('Enter');
            keyObj.on('down', function (event) { ctx.scene.start("Level1"); });
        };
        return Welcome;
    }(MaintainableGame.BaseScene));
    MaintainableGame.Welcome = Welcome;
})(MaintainableGame || (MaintainableGame = {}));
//# sourceMappingURL=maintainable_game.js.map