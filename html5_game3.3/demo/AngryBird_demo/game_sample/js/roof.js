var roof = function () {
    this.arraySize = [];
    this.component;
    Object.defineProperty(this, 'position', {
        get : function () {
            this.component.position;
        },
        set : function (newValue) {
            this.component.position = newValue;
        },
    });

    Object.defineProperty(this, 'scale', {
        get : function () {
            this.component.scale;
        },
        set : function (newValue) {
            this.component.scale = newValue;
        },
    });

    Object.defineProperty(this, 'rotation', {
        get : function () {
            this.component.rotation;
        },
        set : function (newValue) {
            this.component.rotation = newValue;
        },
    });

    Object.defineProperty(this, 'isSensor', {
        get : function () {
            this.component.isSensor;
        },
        set : function (newValue) {
            this.component.isSensor = newValue;
        },
    });

    this.init = function (sprite, box2D) {
        this.pic = new Framework.Sprite(define.imagePath + sprite);
        this.component = new Framework.polygonComponent(this.pic, box2D.bodyType_Dynamic, box2D, this.arraySize);
        this.component.fixtureDef.m_restitution = 0;
        this.component.Body.m_userData = "roof";
    };

    this.update = function () {
        this.component.update();
    };
    this.draw = function () {
        this.pic.draw();
    };
}
                