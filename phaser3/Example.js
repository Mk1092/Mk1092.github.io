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
/// <reference path='./src/libs/phaser.d.ts'/>
var Example;
(function (Example) {
    var InitPhaser = /** @class */ (function () {
        function InitPhaser() {
        }
        InitPhaser.initGame = function () {
            var config = {
                type: Phaser.AUTO,
                width: 480,
                height: 320,
                scene: [Example.ExampleScene],
                banner: true,
                title: 'Example',
                url: 'https://updatestage.littlegames.app',
                version: '1.0.0'
            };
            this.gameRef = new Phaser.Game(config);
        };
        return InitPhaser;
    }());
    Example.InitPhaser = InitPhaser;
})(Example || (Example = {}));
window.onload = function () {
    Example.InitPhaser.initGame();
};
var Example;
(function (Example) {
    var ExampleScene = /** @class */ (function (_super) {
        __extends(ExampleScene, _super);
        function ExampleScene() {
            return _super.call(this, { key: "ExampleScene" }) || this;
        }
        ExampleScene.prototype.preload = function () {
            this.load.image('logo', './assets/sky.png');
        };
        ExampleScene.prototype.create = function () {
            this.logo = this.add.image(+Example.InitPhaser.gameRef.config["width"] / 2, +Example.InitPhaser.gameRef.config["height"] / 3, 'logo');
            this.logo.setScale(.5, .5);
            var tween = this.tweens.add({
                targets: this.logo,
                scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                yoyo: true,
                repeat: -1
            });
        };
        return ExampleScene;
    }(Phaser.Scene));
    Example.ExampleScene = ExampleScene;
})(Example || (Example = {}));
//# sourceMappingURL=Example.js.map