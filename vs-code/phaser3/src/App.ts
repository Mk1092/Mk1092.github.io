///<reference path="../js/phaser.d.ts" />

namespace App {
    // game
    export let game: Phaser.Game = null;
}

// -------------------------------------------------------------------------
function launch(): void {

    let game = new GreedyArcher.Game();
    App.game = game;
}

// -------------------------------------------------------------------------
window.onload = launch;