var TEST = [
    {
        content: "zero I'm creating some new animations for a project at work. T",
    }, {
        content: "one I'd like to add a text moving to the top, like with y velocity but I can't find a way to do it, I'm that dumb ? (yes is strongly possible :rolleyes:",
    }, {
        content: "two moving to the top, like with y velocity but I can'",
    }, {
        content: "three I'm creating some new animations for a project at work. T",
    }, {
        content: "four Toro new animations for a project at work. T",
    }, {
        content: "five This is an array of string",
    },{
        content: "six I'm creating some new animations for a project at work. T",
    }, {
        content: "seven I'd like to add a text moving to the top, like with y velocity but I can't find a way to do it, I'm that dumb ? (yes is strongly possible :rolleyes:",
    }, {
        content: "eight moving to the top, like with y velocity but I can'",
    }, {
        content: "nine I'm creating some new animations for a project at work. T",
    }, {
        content: "ten Toro new animations for a project at work. T",
    }, {
        content: "eleven This is an array of string",
    }
];

var game = new Phaser.Game(1280, 712, Phaser.CANVAS, 'target', {


    content: "",

    stringArray:[],
    currentStringNum:0,
    rockStartTime: 0,
    lighting: false,
    rocking: false,
    scrollingText: false,

    resize: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setUserScale(window.innerWidth / 1280, window.innerHeight / 712, 0, 0);
        game.scale.refresh();

    },

    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxWidth = 1280;
        this.scale.maxHeight = 712;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.updateLayout();
    },
    preload: function() {
        game.load.spritesheet('player_idle', 'static/assets_2/player_idle.png', 122, 190);
        game.load.spritesheet('player_move', 'static/assets_2/player_move.png', 306, 432);
        game.load.image('bg_dark','static/assets_2/background_dark.png');
        game.load.image('bg_light','static/assets_2/background_light.png');
        game.load.image('red','static/assets_2/light_red.png');
        game.load.image('yellow','static/assets_2/light_yellow.png');
        game.load.image('blue','static/assets_2/light_blue.png');
        game.load.image('lCover','static/assets_2/letter_cover.png');
        this.load.bitmapFont('Bazaronite', 'static/assets_2/font.png', 'static/assets_2/font.xml');
    },

    create: function(){

        game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);

        this.background = game.add.sprite(game.world.centerX, game.world.centerY,'bg_dark');
        this.background.anchor.set(0.5);


        this.player = game.add.sprite(game.world.centerX, game.world.centerY * 0.65, 'player_idle');
        this.player.anchor.set(0.5);
        this.player.scale.set(2,2);
        this.player.animations.add('idle',[0,1],5,true);
        this.player.animations.play('idle');

        
        this.lightBG = game.add.sprite(game.world.centerX, game.world.centerY,'bg_light');
        this.lightBG.anchor.set(0.5);
        this.lightBG.alpha = 0;

        this.playerRock = game.add.sprite(game.world.centerX, game.world.centerY * 0.65, 'player_move');
        this.playerRock.anchor.set(0.5);
        this.playerRock.animations.add('move1',[0,1,0],10,false);
        this.playerRock.animations.add('move2',[1,0,1],10,false);
        this.playerRock.animations.add('move3',[3,2,3],10,false);
        this.playerRock.animations.add('move4',[2,3,2],10,false);
        this.playerRock.animations.add('move5',[4,5,4],10,false);
        this.playerRock.animations.add('move6',[5,4,5],10,false);
        this.playerRock.alpha = 0;

        this.Rlight = game.add.sprite(game.world.width, 0,'red');
        this.Rlight.anchor.set(1,0);
        this.Rlight.alpha = 0;

        this.Ylight = game.add.sprite(game.world.centerX, 0,'yellow');
        this.Ylight.anchor.set(0.5,0);
        this.Ylight.alpha = 0;

        this.Blight = game.add.sprite(0, 0,'blue');
        this.Blight.anchor.set(0,0);
        this.Blight.alpha = 0;

        this.lightButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.lightButton.onDown.add(this.addToStringArray,this);

        this.rockButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.rockButton.onDown.add(this.onRock,this);

        this.content = TEST[0]['content'];
        this.scrollText = game.add.bitmapText(0.9 * game.world.width, 0.8 * game.world.height, 'Bazaronite', this.content, 60);
        this.scrollText.align = 'left';
        // this.scrollText = game.add.bitmapText(0.9 * game.world.width, 0.8 * game.world.height, 'Bazaronite', "ABCDEFGHIJKLMNOPQRSTUV", 60);
        // this.scrollText.align = 'left';
        

        this.letterCover = game.add.sprite(game.world.centerX, game.world.centerY,'lCover');
        this.letterCover.anchor.set(0.5);
        this.letterCover.tint = 0x14151b;

        this.letterCover2 = game.add.sprite(game.world.centerX, game.world.centerY,'lCover');
        this.letterCover2.anchor.set(0.5);
        this.letterCover2.tint = 0x21232a;
        this.letterCover2.alpha = 0;

        window.onresize = this.resize;
        this.resize();
    },

    update: function() {
        if(this.rocking){
            if(!this.lighting)  this.lightOn();
        }else{
            if(this.lighting)   this.lightOff();
        }

        if(this.stringArray.length > this.currentStringNum){
            this.scrollText.text = this.stringArray[this.currentStringNum];
            if(this.scrollTextTween == null){
                this.scrollTextTween = game.add.tween(this.scrollText).to({x:-(this.scrollText.textWidth*this.scrollText.text.length + 520)}, 10000, "Linear", true, 0, 0);
                this.scrollTextTween.onComplete.add(this.readNextText, this);
            }else{
                if(!this.scrollTextTween.isRunning){
                    this.scrollTextTween.start();
                }
            }
        }else{
            if(game.time.time - this.rockStartTime >= 1000){
                this.scrollText.text = ''
                this.rocking = false;
            }
        }

    },

    readNextText: function() {
        this.scrollText.text = '';
        this.currentStringNum += 1;
        this.scrollText.x = game.world.width * 0.9;
        this.rockStartTime = game.time.time;
    },

    render: function(){
        //this.game.debug.spriteBounds(this.myInput);
    },

    // changeState: function() {
    //  if(this.recivedInput == true) {
    //      this.recivedInput = false;
    //  }else{
    //      this.recivedInput = true;
    //  }
    // },

    addToStringArray: function() {
        // this.scrollText = game.add.bitmapText(0.9 * game.world.width, 0.8 * game.world.height, 'Bazaronite', TEST[0]['content'], 60);
        // this.scrollText.align = 'left';
        var index = Math.floor(Math.random() * 10);
        this.content = TEST[index]['content'];
        this.stringArray.push(this.content);
        this.onRock();
        this.rockStartTime = game.time.time;
    },

    onRock: function() {

        this.rocking = true;

        this.player.alpha = 0;
        this.playerRock.alpha = 1;
        this.letterCover2.alpha = 1;
        this.lightBG.alpha = 0.7;
        this.Rlight.alpha = 0.25;
        this.Ylight.alpha = 0.4;
        this.Blight.alpha = 0.3;
        this.Rlight.angle = 0;
        this.Blight.angle = 0;

        this.randNum = game.rnd.integerInRange(0,5);
        switch(this.randNum){
            case 0:
                this.playerRock.animations.play('move1');
                break;
            case 1:
                this.playerRock.animations.play('move2');
                break;
            case 2:
                this.playerRock.animations.play('move3');
                break;
            case 3:
                this.playerRock.animations.play('move4');
                break;
            case 4:
                this.playerRock.animations.play('move5');
                break;
            case 5:
                this.playerRock.animations.play('move6');
                break;
        }

        game.plugins.screenShake.shake(10);

    },

    lightOff: function(){

        this.lighting = false;

        this.rocking = false;

        this.player.alpha = 1;
        this.playerRock.alpha = 0;
        this.lightBG.alpha = 0;
        this.Rlight.alpha = 0;
        this.Ylight.alpha = 0;
        this.Blight.alpha = 0;
        this.Rlight.angle = 0;
        this.Blight.angle = 0;
        this.letterCover2.alpha = 0;

        if(this.playerTween!=null)  game.tweens.remove(this.playerTween);
        if(this.stageTween!=null)   game.tweens.remove(this.stageTween);
        if(this.rlightTween!=null)  game.tweens.remove(this.rlightTween);
        if(this.rlightRotateTween!=null)    game.tweens.remove(this.rlightRotateTween);
        if(this.ylightTween!=null)  game.tweens.remove(this.ylightTween);
        if(this.blightTween!=null)  game.tweens.remove(this.blightTween);
        if(this.blightRotateTween!=null)    game.tweens.remove(this.blightRotateTween);
        if(this.letterCover2Tween!=null)    game.tweens.remove(this.letterCover2Tween);

    },

    lightOn: function(){

        this.lighting = true;

        if(this.playerTween!=null)  game.tweens.remove(this.playerTween);
        if(this.stageTween!=null)   game.tweens.remove(this.stageTween);
        if(this.rlightTween!=null)  game.tweens.remove(this.rlightTween);
        if(this.rlightRotateTween!=null)    game.tweens.remove(this.rlightRotateTween);
        if(this.ylightTween!=null)  game.tweens.remove(this.ylightTween);
        if(this.blightTween!=null)  game.tweens.remove(this.blightTween);
        if(this.blightRotateTween!=null)    game.tweens.remove(this.blightRotateTween);
        if(this.letterCover2Tween!=null)    game.tweens.remove(this.letterCover2Tween);

        this.playerTween = game.add.tween(this.playerRock).to({ alpha: 0.6 }, 200, "Linear", true, 0, -1, true);
        this.stageTween = game.add.tween(this.lightBG).to({ alpha: 0.5 }, 200, "Linear", true, 0, -1, true);
        this.rlightTween = game.add.tween(this.Rlight).to({ alpha: 0.1 }, 200, "Linear", true, 0, -1, true);
        this.rlightRotateTween = game.add.tween(this.Rlight).to({ angle: 10 }, 1000, "Linear", true, 0, -1, true);
        this.ylightTween = game.add.tween(this.Ylight).to({ alpha: 0.1 }, 200, "Linear", true, 0, -1, true);
        this.blightTween = game.add.tween(this.Blight).to({ alpha: 0.05 }, 200, "Linear", true, 0, -1, true);
        this.blightRotateTween = game.add.tween(this.Blight).to({ angle: -15 }, 800, "Linear", true, 0, -1, true);
        this.letterCover2Tween = game.add.tween(this.letterCover2).to({ alpha: 0.8 }, 200, "Linear", true, 0, -1, true);
        // this.playerTween.frameBased = true;
        // this.stageTween.frameBased = true;
        // this.rlightTween.frameBased = true;
        // this.ylightTween.frameBased = true;
        // this.blightTween.frameBased = true;
    }
});
