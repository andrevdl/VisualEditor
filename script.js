var Canvas = {
    img : null,
    img_name : "",
    ctx : null,
    grid : {
      x : 25, y : 20
    },
    memory : [],
    init : function (canvas) {
        this.ctx = canvas.getContext("2d");

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        canvas.addEventListener("click", function(event) {
            var mouse = getMousePos(canvas, event);

            if (Canvas.img == null)
                return;

            console.log(Canvas.getTile(mouse));

            var pos = Canvas.snapToGrid(mouse);
            Canvas.drawImage(pos.x, pos.y);

            Canvas.save(Canvas.getTile(mouse));
        }, false);
    },
    save : function(mouse) {
        this.memory.push({
            "point" : [mouse.x, mouse.y],
            "image" : this.img_name,
            "solid" : true
        })
    },
    dump : function() {
        document.getElementsByName("export")[0].value = JSON.stringify(this.memory);
    },
    drawImage : function(x, y) {
        if (this.img != null)
            this.ctx.drawImage(this.img, x, y);
    },
    snapToGrid : function(pos) {
        pos = this.getTile(pos);
        return { "x" : pos.x * 32, "y" : pos.y * 32 }
    },
    getTile : function(pos) {
        return { "x" : Math.floor(pos.x / 32), "y" : Math.floor(pos.y / 32) };
    }
};
Canvas.init(document.getElementById("myCanvas"));

$(".select").on("click", function() {
    Canvas.img_name = this.name;
    Canvas.img = this;
});

$(".export").on("click", function() {
    Canvas.dump();
});