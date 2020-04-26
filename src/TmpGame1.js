var Game1={

    preload: function () {
        game.load.image("background", "assets/background.png");
        game.load.image("tail", "assets/tail.png");
        game.load.image("head", "assets/head.png");
        game.load.image("stage1", "assets/stage1.png");
        game.load.image("flag","assets/flag1.png");
        game.load.image("turnBall","assets/turnBall.png");
        game.load.image("turnBar","assets/turnBar.png");
    }

};

Game1.StateA = function () {
    this.tail1;
    this.tail2;
    this.tail3;
    this.tail;
    this.head1;
    this.head2;
    this.head3;
    this.stage1;
    this.ball;
    this.turn = 3;
    this.next1=false;
    this.next2=false;
    this.next3=false;
};

Game1.StateA.prototype = {
    preload: function () {
        Game1.preload();
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        var style = { font: "32px Arial", fill: "#000"};

        this.add.image(0, 0, "background");
        this.stage1 = game.add.sprite(game.world.width/2 - 475,25, "stage1" );

        turnBar = game.add.image(game.world.width/2,50,"turnBar");
        turnBar.anchor.set(0.5);

        this.ball = [];
        for(i=0; i<this.turn; i++){
            newBall = this.add.sprite(turnBar.x - turnBar.width/2 + 15 + i*23,turnBar.y,"turnBall");
            newBall.anchor.set(0.5);
            game.physics.arcade.enable(newBall);
            this.ball.push(newBall);
        }
        for(i=0; i<3-this.turn; i++){
            newBall = this.add.sprite(turnBar.x + turnBar.width/2 - 15 - i*23,turnBar.y,"turnBall");
            newBall.anchor.set(0.5);
            game.physics.arcade.enable(newBall);
            this.ball.push(newBall);
        }

        backButton = this.add.text(this.stage1.x + 5, this.stage1.y+7, "<", { font: "40px Arial", fill: " #00BFFF", align: "center" });
        backButton2 = this.add.text(this.stage1.x + 30, this.stage1.y+14, "Back", { font: "25px Arial", fill: " #00BFFF", align: "center" });
        backButton.inputEnabled = true;
        backButton2.inputEnabled = true;
        backButton.events.onInputUp.add(this.back, this);
        backButton2.events.onInputUp.add(this.back, this);

        bounds = new Phaser.Rectangle(game.world.width/2 - 473, 78, 608, 580);

        this.tail=[];
        for(i=0;i<3;i++){
            newTail = game.add.sprite(this.stage1.x + 100, this.stage1.y + 75 +25*i, "tail");
            game.physics.arcade.enable(newTail);
            newTail.inputEnabled = true;
            newTail.input.enableDrag();
            newTail.input.boundsRect = bounds;
            this.tail.push(newTail);
        }
        this.tail1 = game.add.sprite(this.stage1.x + 100, this.stage1.y + 75, "tail");
        game.physics.arcade.enable(this.tail1);
        this.tail1.inputEnabled = true;
        this.tail1.input.enableDrag();
        this.tail1.input.boundsRect = bounds;

        textTail1 = game.add.text(100, 100, 27, style);
        textTail1.anchor.set(0.5);

        this.tail2 = game.add.sprite(this.stage1.x + 100, this.stage1.y + this.tail1.height + 100, "tail");
        game.physics.arcade.enable(this.tail2);
        this.tail2.inputEnabled = true;
        this.tail2.input.enableDrag();
        this.tail2.input.boundsRect = bounds;

        textTail2 = game.add.text(100, 100, 36, style);
        textTail2.anchor.set(0.5);

        this.tail3 = game.add.sprite(this.stage1.x + 100, this.stage1.y + 2*this.tail1.height + 125, "tail");
        game.physics.arcade.enable(this.tail3);
        this.tail3.inputEnabled = true;
        this.tail3.input.enableDrag();
        this.tail3.input.boundsRect = bounds;

        textTail3 = game.add.text(100, 100, 8, style);
        textTail3.anchor.set(0.5);

        this.head1 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + 75, "head" );
        this.head2 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + this.tail1.height + 100, "head" );
        this.head3 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + 2*this.tail1.height + 125, "head" );

        var flag1 = game.add.image(this.head1.x+200,this.head1.y-6,"flag");
        var flag2 = game.add.image(this.head2.x+200,this.head2.y-6,"flag");
        var flag3 = game.add.image(this.head3.x+200,this.head3.y-6,"flag");


        textHead1 = game.add.text(100, 100, 42, style);
        textHead1.anchor.set(0.5);

        textHead2 = game.add.text(100, 100, 13, style);
        textHead2.anchor.set(0.5);

        textHead3 = game.add.text(100, 100, 34, style);
        textHead3.anchor.set(0.5);

    },

    gotoStateB: function () {
        this.state.start('StateB');
    },

    back: function () {
        game.state.start("Start");
    },

    update: function  () {

        this.moveTail(this.tail1,this.stage1.x + 100, this.head1.y);
        this.moveTail(this.tail2,this.stage1.x + 100, this.head2.y);
        this.moveTail(this.tail3,this.stage1.x + 100, this.head3.y);

        textTail1.x = Math.floor(this.tail1.x + this.tail1.width / 2 + 1);
        textTail1.y = Math.floor(this.tail1.y + this.tail1.height / 2 + 8);

        textTail2.x = Math.floor(this.tail2.x + this.tail1.width / 2 + 1);
        textTail2.y = Math.floor(this.tail2.y + this.tail1.height / 2 + 8);

        textTail3.x = Math.floor(this.tail3.x + this.tail1.width / 2 + 1);
        textTail3.y = Math.floor(this.tail3.y + this.tail1.height / 2 + 8);

        textHead1.x = Math.floor(this.head1.x + this.head1.width / 2 - 47);
        textHead1.y = Math.floor(this.head1.y + this.head1.height / 2 + 8 );

        textHead2.x = Math.floor(this.head2.x + this.head1.width / 2 - 47);
        textHead2.y = Math.floor(this.head2.y + this.head1.height / 2 + 8 );

        textHead3.x = Math.floor(this.head3.x + this.head1.width / 2 - 47);
        textHead3.y = Math.floor(this.head3.y + this.head1.height / 2 + 8 );

        if(this.next1 && this.next2 && this.next3) {
            game.physics.arcade.moveToXY(this.ball[2], turnBar.x + turnBar.width/2 - 15, turnBar.y, 100, 300);
            a=this.game.time.events.add(2000, this.gotoStateB, this);
        }
    },

    moveTail: function (a,x,y) {
        if(game.input.mousePointer.isDown ) {
            a.body.velocity.setTo(0, 0);
        }
        else {
            if(a.x !== x || a.y !== y) {
                if (a.x < this.stage1.x + 325) {
                    game.physics.arcade.moveToXY(a, x, y, 100, 100);
                }
                else {
                    if (a.y < this.head2.y-this.head1.height/2){
                        game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head1.y, 100, 100);
                        if(a===this.tail3)this.next3=true;
                    }
                    else {
                        if (a.y < this.head3.y-this.head2.height/2) {
                            game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head2.y, 100, 100);
                            if (a===this.tail1) this.next1=true;
                        }
                        else {
                            game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head3.y, 100, 100);
                            if (a===this.tail2) this.next2=true;
                        }
                    }
                }
            }
        }
    }

};

Game1.StateB = function () {
    this.tail1;
    this.tail2;
    this.tail3;
    this.head1;
    this.head2;
    this.head3;
    this.stage1;
    this.ball;
    this.turn = 2;
};

Game1.StateB.prototype = {

    preload: function () {
        Game1.preload();
    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.add.image(0, 0, "background");

        this.stage1 = game.add.sprite(game.world.width/2 - 475,25, "stage1" );
        game.physics.arcade.enable(this.stage1);

        turnBar = game.add.image(game.world.width/2,50,"turnBar");
        turnBar.anchor.set(0.5);

        this.ball = [];
        for(i=0; i<this.turn; i++){
            newBall = this.add.sprite(turnBar.x - turnBar.width/2 + 15 + i*23,turnBar.y,"turnBall");
            newBall.anchor.set(0.5);
            game.physics.arcade.enable(newBall);
            this.ball.push(newBall);
        }
        for(i=0; i<3-this.turn; i++){
            newBall = this.add.sprite(turnBar.x + turnBar.width/2 - 15 - i*23,turnBar.y,"turnBall");
            newBall.anchor.set(0.5);
            game.physics.arcade.enable(newBall);
            this.ball.push(newBall);
        }

        bounds = new Phaser.Rectangle(game.world.width/2 - 473, 78, 608, 580);

        this.tail1 = game.add.sprite(this.stage1.x + 100, this.stage1.y + 75, "tail");
        game.physics.arcade.enable(this.tail1);
        this.tail1.inputEnabled = true;
        this.tail1.input.enableDrag(false,false);
        this.tail1.input.boundsRect = bounds;

        this.tail2 = game.add.sprite(this.stage1.x + 100, this.stage1.y + this.tail1.height + 100, "tail");
        game.physics.arcade.enable(this.tail2);
        this.tail2.inputEnabled = true;
        this.tail2.input.enableDrag(false,false);
        this.tail2.input.boundsRect = bounds;

        this.tail3 = game.add.sprite(this.stage1.x + 100, this.stage1.y + 2*this.tail1.height + 125, "tail");
        game.physics.arcade.enable(this.tail3);
        this.tail3.inputEnabled = true;
        this.tail3.input.enableDrag(false,false);
        this.tail3.input.boundsRect = bounds;

        this.head1 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + 75, "head" );
        game.physics.arcade.enable(this.head1);
        this.head1.body.immovable = true;

        this.head2 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + this.tail1.height + 100, "head" );
        game.physics.arcade.enable(this.head2);
        this.head2.body.immovable = true;

        this.head3 = game.add.sprite(this.stage1.x + this.stage1.width - 266 - 75, this.stage1.y + 2*this.tail1.height + 125, "head" );
        game.physics.arcade.enable(this.head3);
        this.head3.body.immovable = true;

        var flag1 = game.add.image(this.head1.x+201,this.head1.y-6,"flag");
        var flag2 = game.add.image(this.head2.x+201,this.head2.y-6,"flag");
        var flag3 = game.add.image(this.head3.x+201,this.head3.y-6,"flag");

        var style = { font: "32px Arial", fill: "#000"};
        textTail1 = game.add.text(100, 100, 100, style);
        textTail1.anchor.set(0.5);

        textTail2 = game.add.text(100, 100, 100, style);
        textTail2.anchor.set(0.5);

        textTail3 = game.add.text(100, 100, 8, style);
        textTail3.anchor.set(0.5);

        textHead1 = game.add.text(100, 100, 42, style);
        textHead1.anchor.set(0.5);

        textHead2 = game.add.text(100, 100, 13, style);
        textHead2.anchor.set(0.5);

        textHead3 = game.add.text(100, 100, 34, style);
        textHead3.anchor.set(0.5);
    },

    gotoStateC: function () {

        this.state.start('StateC');

    },

    update: function  () {

        this.moveTail(this.tail1,this.stage1.x + 100, this.head1.y);
        this.moveTail(this.tail2,this.stage1.x + 100, this.head2.y);
        this.moveTail(this.tail3,this.stage1.x + 100, this.head3.y);

        textTail1.x = Math.floor(this.tail1.x + this.tail1.width / 2 + 1);
        textTail1.y = Math.floor(this.tail1.y + this.tail1.height / 2 + 8);

        textTail2.x = Math.floor(this.tail2.x + this.tail1.width / 2 + 1);
        textTail2.y = Math.floor(this.tail2.y + this.tail1.height / 2 + 8);

        textTail3.x = Math.floor(this.tail3.x + this.tail1.width / 2 + 1);
        textTail3.y = Math.floor(this.tail3.y + this.tail1.height / 2 + 8);

        textHead1.x = Math.floor(this.head1.x + this.head1.width / 2 - 47);
        textHead1.y = Math.floor(this.head1.y + this.head1.height / 2 + 8 );

        textHead2.x = Math.floor(this.head2.x + this.head1.width / 2 - 47);
        textHead2.y = Math.floor(this.head2.y + this.head1.height / 2 + 8 );

        textHead3.x = Math.floor(this.head3.x + this.head1.width / 2 - 47);
        textHead3.y = Math.floor(this.head3.y + this.head1.height / 2 + 8 );
    },


    moveTail: function (a,x,y) {
        if(game.input.mousePointer.isDown ) {
            a.body.velocity.setTo(0, 0);
        }
        else {
            if(a.x !== this.stage1.x + 100) {
                if (a.x < this.stage1.x + 325) {
                    game.physics.arcade.moveToXY(a, x, y, 100, 100);
                }
                else {
                    if (a.y < this.head2.y-this.head1.height/2){
                        game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head1.y, 100, 100);
                    }
                    else {
                        if (a.y < this.head3.y-this.head2.height/2) {
                            game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head2.y, 100, 100);
                        }
                        else game.physics.arcade.moveToXY(a, this.head1.x - this.tail1.width, this.head3.y, 100, 100);
                    }
                }
            }
        }
    }
};