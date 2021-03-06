var MyGame = Framework.Class(Framework.Level, {
    load: function () {

        this.gameMap = new GameMap();
        this.gameMap.load();
        this.rootScene.attach(this.gameMap);


        this.position = {
            x: 100,
            y: 100
        }
        this.rotation = 0;

        this.pic = new Framework.Sprite(define.imagePath + 'firststage.png');
        this.pic.position = {
            x: 100,
            y: 100
        };
        this.rootScene.attach(this.pic);

/*
        this.pic2 = new Framework.Sprite(define.imagePath + 'shit.bmp');
        this.pic2.position = {
            x: 800,
            y: 800
        };
        this.rootScene.attach(this.pic2);
*/

        var characterPosition;

        this.isStop = false;
        this.isPlayed = false;

        this.clock = new Framework.Sprite(define.imagePath + 'clock.png');
        this.clock.scale = 0.3;
        this.clock.position = {
            x: 0,
            y: 0
        };

        characterPosition = { x: 0, y: -1138 * this.clock.scale };
        this.secondHand = new Framework.Sprite(define.imagePath + 'secondHand.jpg');
        this.firen = new Character(define.imagePath + 'firen.png', { position: characterPosition, run: { from: 20, to: 22 }, beHit: { from: 30, to: 35 }, hit: { from: 10, to: 13 } });
        this.freeze = new Character(define.imagePath + 'freeze.png', { position: characterPosition, scale: 1, run: { from: 29, to: 27 }, beHit: { from: 39, to: 35 }, hit: { from: 19, to: 16 } });

        this.clockCenter = new Framework.Scene();
        this.clockCenter.position = {
            x: -10.5 * this.clock.scale,
            y: 51 * this.clock.scale
        };

        this.clockCenterNeg = new Framework.Scene();
        this.clockCenterNeg.position = {
            x: -10.5 * this.clock.scale,
            y: 51 * this.clock.scale
        };

        this.secondHand.position = {
            x: 0,
            y: -100
        };

        this.wholeClock = new Framework.Scene();
        this.wholeClock.position = {
            x: Framework.Game.getCanvasWidth() / 2,
            y: Framework.Game.getCanvasHeight() / 2
        };


        this.secondHandRotationRate = 0.3;
        this.wholeClock.attach(this.clock);
        this.clockCenter.attach(this.secondHand);
        this.clockCenter.attach(this.firen.sprite);
        this.clockCenterNeg.attach(this.freeze.sprite);
        this.wholeClock.attach(this.clockCenterNeg);
        this.wholeClock.attach(this.clockCenter);
        this.rootScene.attach(this.wholeClock);

        //繪製Sprite的boundry (Debug用)
        this.firen.sprite.isDrawBoundry = true;
        this.clock.isDrawBoundry = true;

        //載入要被播放的音樂清單
        //資料夾內只提供mp3檔案, 其餘的音樂檔案, 請自行轉檔測試
        this.audio = new Framework.Audio({
            kick: {
                mp3: define.musicPath + 'kick2.mp3',
                //ogg: define.musicPath + 'kick2.ogg',
                //wav: define.musicPath + 'kick2.wav'
            }, song1: {
                mp3: define.musicPath + 'NTUT_classic.mp3',
                //ogg: define.musicPath + 'Hot_Heat.ogg',
                //wav: define.musicPath + 'Hot_Heat.wav'
            }, song2: {
                mp3: define.musicPath + 'NTUT_modern.mp3',
                //ogg: define.musicPath + 'The_Messenger.ogg',
                //wav: define.musicPath + 'The_Messenger.wav'
            }
        });

        //播放時, 需要給name, 其餘參數可參考W3C
        this.audio.play({ name: 'song2', loop: true });

        this.rectPosition = {
            x: Framework.Game.getCanvasWidth() / 2 - 130,
            y: Framework.Game.getCanvasHeight() / 2 - 90
        };

        this.position = {
            x: 100,
            y: 100
        }
        this.rotation = 0;

        //
        this.practice = new Practice();
        this.practice.load();
        this.rootScene.attach(this.practice.pic);  

    },

    initialize: function () {


    },

    update: function () {
        var game = this;
        this.rootScene.update();
        //
        this.practice.update();
        this.gameMap.update();
        

        this.position.x ++;
        this.rotation ++;
        this.pic.position = this.position;
        this.pic.rotation = this.rotation;

        //以下為當被攻擊時會停下來, 並且當被攻擊的動畫播放完時便繼續跑的Scenario
        if (this.firen.collide(this.freeze) && !this.isStop && !this.isPlayed) {
            this.isStop = true;
            this.isPlayed = true;
            //當碰攻擊時, 播放音效(可一次播放多首音樂)
            this.audio.play({ name: 'kick' });
            this.firen.hit(function () {
                game.freeze.beHit(function () {
                    game.isStop = false;
                    game.freeze.run();
                });
                game.firen.run();
            });

        }
        else if (!this.firen.collide(this.freeze)) {
            this.isPlayed = false;
            this.clockCenter.rotation += this.secondHandRotationRate;
            this.clockCenterNeg.rotation = -this.clockCenter.rotation;
        }
        else if (this.firen.collide(this.freeze) && !this.isStop) {
            this.clockCenter.rotation += this.secondHandRotationRate;
            this.clockCenterNeg.rotation = -this.clockCenter.rotation;
        }
        //以上為當被攻擊時會停下來, 並且當被撞到的動畫播放完時便繼續跑的Scenario


        this.isPlayHit = this.firen.collide(this.freeze)



    },

    draw: function (parentCtx) {

        this.pic.draw();
        //this.pic2.draw();

        this.rootScene.draw();
        //可支援畫各種單純的圖形和字
        parentCtx.fillStyle = (this.secondHandRotationRate > 0) ? 'green' : 'red';
        parentCtx.fillRect(this.rectPosition.x, this.rectPosition.y, 260, 90);
        parentCtx.font = '65pt bold';
        parentCtx.fillStyle = 'white';
        parentCtx.textBaseline = 'top';
        parentCtx.textAlign = 'center';
        parentCtx.fillText('Click Me', this.rectPosition.x + 130, this.rectPosition.y, 260);


    },

    keydown: function (e, list) {
        Framework.DebugInfo.Log.warning(e.key);
        if (e.key === 'Numpad +' || e.key === '=') {
            this.secondHandRotationRate += 0.05;
        }

        if (e.key === 'Numpad -' || e.key === '-') {
            this.secondHandRotationRate -= 0.05;
        }

        if (e.key === 'Pause/Break') {
            //AnimationSprite支援停止正在播放的圖片
            this.firen.sprite.stop();
        }

        if (e.key === 'F5') {
            //AnimationSprite可以恢復暫停正在播放的圖片
            this.firen.sprite.resume();
        }

        if (e.key === 'Enter') {
            if (!this.isFullScreen) {
                Framework.Game.fullScreen();
                this.isFullScreen = true;
            } else {
                Framework.Game.exitFullScreen();
                this.isFullScreen = false;
            }

        }
    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        this.click({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    click: function (e) {

        console.log(e.x, e.y);
        console.log("stop");
        if (!this.rectPosition) {
            return;
        }

        if (e.x >= this.rectPosition.x && e.x <= this.rectPosition.x + 260 && e.y >= this.rectPosition.y && e.y <= this.rectPosition.y + 90) {
            if (!this.isClockStop) {
                this.secondHandRotationRate = 0;
                this.isClockStop = true;
                //Audio可以一次暫停所有的音樂
                this.audio.pauseAll();
            } else {
                this.isClockStop = false;
                this.secondHandRotationRate = 0.3;
                //Audio也可以針對一首歌進行操作(繼續播放)
                this.audio.resume('song2');
            }
        } else if (e.x >= this.clock.upperLeft.x && e.x <= this.clock.lowerRight.x && e.y >= this.clock.upperLeft.y && e.y <= this.clock.lowerRight.y) {
            //由於Click Me在太小的螢幕的情況下會蓋到Clock, 導致點擊Click Me時, 會回到前一個Level,
            //故使用else if, 並優先選擇Click Me會觸發的條件
            this.audio.stopAll();
            Framework.Game.goToPreviousLevel();
            return;
        }
    },
});