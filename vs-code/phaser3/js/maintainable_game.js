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
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 300
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
    function hello(xp, yp, obj, dimX, dimY) {
        var x = dimX * xp / 100 - obj.width / 2;
        var y = dimY * yp / 100 - obj.height / 2;
        obj.setPosition(x, y);
    }
    MaintainableGame.hello = hello;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        /*--------------------------------------------------------------------*/
        function Player(scene, x, y, texture) {
            var _this = _super.call(this, scene, x, y, texture) || this;
            _this.speed = 200;
            _this.direction = { x: 0, y: 0 };
            scene.physics.add.existing(_this);
            scene.add.existing(_this);
            _this.lastUpdate = new Date().getTime();
            var WKey = scene.input.keyboard.addKey('W');
            var AKey = scene.input.keyboard.addKey('A');
            var SKey = scene.input.keyboard.addKey('S');
            var DKey = scene.input.keyboard.addKey('D');
            var player = _this;
            WKey.on('down', function (event) { player.setDir(0, -1); });
            AKey.on('down', function (event) { player.setDir(-1, 0); });
            SKey.on('down', function (event) { player.setDir(0, 1); });
            DKey.on('down', function (event) { player.setDir(1, 0); });
            WKey.on('up', function (event) { player.nullDir(false); });
            AKey.on('up', function (event) { player.nullDir(true); });
            SKey.on('up', function (event) { player.nullDir(false); });
            DKey.on('up', function (event) { player.nullDir(true); });
            return _this;
        }
        Player.prototype.setDir = function (x, y) {
            this.direction.x += x;
            this.direction.y += y;
            this.direction.x = Math.max(Math.min(this.direction.x, 1), -1);
            this.direction.y = Math.max(Math.min(this.direction.y, 1), -1);
        };
        Player.prototype.nullDir = function (horizontal) {
            if (horizontal) {
                this.direction.x = 0;
            }
            else {
                this.direction.y = 0;
            }
        };
        Player.prototype.move = function () {
            /*let now = new Date().getTime()
            let deltaTime = now - this.lastUpdate
            this.lastUpdate = now*/
            var vx = this.direction.x * this.speed;
            var vy = this.direction.y * this.speed;
            //this.setPosition(px, py)
            this.setVelocity(vx, vy);
        };
        return Player;
    }(Phaser.Physics.Arcade.Sprite));
    MaintainableGame.Player = Player;
})(MaintainableGame || (MaintainableGame = {}));
var MaintainableGame;
(function (MaintainableGame) {
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
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
        // -------------------------------------------------------------------------
        /*constructor(){
            super({
                key: "level1",
                //plugins: ["TweenManager"]
            })
        }*/
        Level1.prototype.preload = function () {
            this.load.image('bg', './assets/garden.jpeg');
            this.load.image('player', './assets/bomb.png');
            this.load.image('obstacle', './assets/dude.png');
            /*var config = {
                map: {
                    add: 'makeStuff',
                    load: 'loader',
                    physics : "arcade"
                }
            };
    
            Phaser.Scene.call(this, config)*/
        };
        Level1.prototype.create = function () {
            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            // focus on 0, 0
            this.setView();
            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');
            this.player = new MaintainableGame.Player(this, 0, 0, "player");
            //this.object = this.physics.add.image(0, 20, "player")
            this.obstacle = this.physics.add.staticImage(0, 200, "obstacle");
            //this.obstacle.setAcceleration(0, -300)
            this.physics.add.collider(this.player, this.obstacle);
        };
        Level1.prototype.update = function () {
            this.bg.tilePositionY += 2;
            this.player.move();
            //this.physics.collide(this.player, this.obstacle, function(event){console.log("collision")})
            //this.physics.overlap(this.object, this.obstacle, function(event){console.log("overlap")})
            //this.physics.world.collide(this.object, this.obstacle, function(event){console.log("collision")})
            //this.physics.world.overlap(this.object, this.obstacle, function(event){console.log("overlap")})
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
            //this.logo = this.add.image(+InitPhaser.gameRef.config["width"]/2, +InitPhaser.gameRef.config["height"] / 3, 'logo');
            this.logo = this.add.image(width / 2, height / 2, 'logo');
            //lalala.hello(50, 50, this.logo, window.innerWidth, window.innerHeight)
            this.logo.setScale(.5, .5);
            var tween = this.tweens.add({
                targets: this.logo,
                scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                yoyo: true,
                repeat: -1
            });
            //this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
            var style = { font: "bold 24px Arial", fill: "#fff" };
            //  The Text is positioned at 0, 100
            var text = this.add.text(0, 0, "Premi invio", style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            MaintainableGame.hello(50, 45, text, width, height);
            var ctx = this;
            var keyObj = this.input.keyboard.addKey('Enter');
            //keyObj.on('down', function(event) {ctx.scene.start("Menu")});
            keyObj.on('down', function (event) { ctx.scene.start("Level1"); });
        };
        return Welcome;
    }(MaintainableGame.BaseScene));
    MaintainableGame.Welcome = Welcome;
})(MaintainableGame || (MaintainableGame = {}));
//# sourceMappingURL=maintainable_game.js.map