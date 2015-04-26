/* TODO */
function SwitchModel(a) {
    this.view = a;
	this.distribution = "constant"
	this.params = [null, null]
    this.dest = [null, null]
    this.view.image.attr({
        title: "Parameters = " + this.params + " Distribution = " + this.distribution
    })
	this.stat={}
}

SwitchModel.prototype.jsonify = function() {
    return {
		distribution: this.distribution,
        params: this.params
    }
};

SwitchModel.prototype.clearAndUpdateForm = function() {

};

SwitchModel.prototype.start = function() {
    this.entity = QueueApp.sim.addEntity(SwitchEntity, this.distribution, this.params)
};

SwitchModel.prototype.connect = function() {
    this.entity.dest1 = this.dest[0] ? this.dest[0].entity : null;
    this.entity.dest2 = this.dest[1] ? this.dest[1].entity : null
};

SwitchModel.prototype.showSettings = function() {
    var a = $("#switch_form");
    QueueApp.form_view = this.view;
    a.find("#switch_form_distribution").val(this.distribution);
	if(this.params.length == 2){
		a.find("#switch_form_param1").val(this.params[0])
		a.find("#switch_form_param2").val(this.params[1])
	}
	else if(this.params.length == 1){
		a.find("#switch_form_param1").val(this.params[0])
	}
	a.find("#switch_form_spawn").val(this.spawn)
    a.show().position({
        of: $(this.view.image.node),
        at: "center center",
        my: "left top"
    })
};

SwitchModel.prototype.saveSettings = function() {
    a = $("#switch_form")
	this.distribution = a.find("#switch_form_distribution").val();
	this.params = [];
	this.params.push(a.find("#switch_form_param1").val());
	this.params.push(a.find("#switch_form_param2").val());
	switch(this.distribution){
		case "gamma":
		case "weibull":
		case "uniform":
		case "gaussian":
			this.params = [this.params[0], this.params[1]];
			break
		case "pareto":
		case "exponential":
			this.params = [this.params[0], null]
			break
		case "random":
			this.params = [null, null];
			break
	}
	this.spawn = a.find("#switch_form_spawn").val()
    this.view.image.attr({
        title: "Parameters = " + this.params + " Distribution = " + this.distribution
    })
};

SwitchModel.prototype.unlink = function() {
    this.view = null
};

SwitchModel.prototype.showStats = function() {
	//TODO more stat showing
	this.stat["arrive"]=["Arrived", this.entity.arrived]
	
    //call animation manager function
    //var value = a.toFixed(1);
    stat_animation_manager(this.view.image.node.id, "switch", 100);
};

SwitchModel.prototype.saveStats = function(){
	tempstr = ""
	for(var k in this.stat){
		if(this.stat.hasOwnProperty(k)){
			tempstr = tempstr + "  " + this.stat[k][0]+ ": " + this.stat[k][1] + "\n"
		}
	}
	return tempstr
}

var SwitchEntity = {
        start: function(a, b) {
			// Arguments: Distribution, Params array
			this.distribution = a
            this.params = b;
            this.to2 = this.to1 = this.arrived = 0
			this.switchSlot = false //TODO: Make this not clunky as hell.
			this.switchdest = this.dest1/* TODO ideally should be random or user selected*/
			this.setTimer(randDist(this.distribution, this.params, QueueApp.random)).done(this.trafficSwitch)
			
			//debug properties
			this.switchTimes = []
			this.switched = 0
        },
        onMessage: function(sender, message) {
            this.arrived++;
			this.send(message, 0, this.switchdest)
        },
		trafficSwitch: function() {
			if(this.switchSlot === true){
				this.switchdest = this.dest1
				this.switchSlot = false
			}else{
				this.switchdest = this.dest2
				this.switchSlot = true
			}
			//Debug stores
			this.switched++
			this.switchTimes.push(this.time())
			this.setTimer(randDist(this.distribution, this.params, QueueApp.random)).done(this.trafficSwitch)
		}
    },
	SwitchView = function(a, b, c, d, e) {
        this.canvas = a;
        this.type = b;
        this.name = c;
        this.hidden = [a.rect(d, e, 10, 10), a.rect(d, e, 10, 10)];
        this.width = 28.7;
        this.height = 48 * 0.7;
        this.image = a.image("images/switcher.png", d, e, this.width, this.height);
        this.x = d;
        this.y = e;
        this.hidden[0].attr({
            "stroke-width": "0"
        });
        this.hidden[1].attr({
            "stroke-width": "0"
        });
        this.image.attr({
            cursor: "move"
        });
        this.image.view = this;
        this.image.animate({
            scale: "1.2 1.2"
        }, 200, function() {
            this.animate({
                scale: "1 1"
            }, 200)
        });
        this.arrows = [null, null];
        this.counters = a.text(d, e, "");
        for (b = 0; b < 2; b++) c = a.image("images/orange-arrow.gif", d, e, 12, 12), c.view = this, c.id = b, c.drag(function(a, b) {
            this.attr({
                x: this.ox + a,
                y: this.oy + b
            });
            this.paper.connection(this.conn)
        }, function() {
            this.conn = this.paper.connection(this.view.hidden[this.id], this, "#000");
            this.ox = this.attr("x");
            this.oy = this.attr("y")
        }, function() {
            this.conn.line.remove();
            this.conn = null;
            var a = QueueApp.views,
                b = a.length,
                c = this.attr("x"),
                d = this.attr("y");
            for (b -= 1; b >= 0; b--) {
                var e = a[b];
                if (e.acceptDrop(c, d)) {
                    this.hide();
                    this.view.connect(e, this.id);
                    return
                }
            }
            a = this.view;
            this.id === 0 ? this.attr({
                x: a.x + a.width + 2,
                y: a.y + 5
            }) : this.attr({
                x: a.x + a.width + 2,
                y: a.y + a.height - 15
            })
        }), this.arrows[b] = c;
        this.moveto(d, e);
        this.image.drag(function(a, b) {
                var c = this.view;
                c.moveto(c.ox + a, c.oy + b)
            }, function() {
                var a = this.view;
                a.ox = a.x;
                a.oy = a.y
            },
            function() {});
        this.image.dblclick(function() {
            this.view.model.showSettings()
        })
    };

SwitchView.prototype.moveto = function(a, b) {
    var c;
    if (!(a > 800 - this.width || b > 400 - this.height || a < 0 || b < 0)) {
        this.x = a;
        this.y = b;
        this.image.attr({
            x: a,
            y: b
        });
        this.hidden[0].attr({
            x: this.x + this.width - 20,
            y: this.y + 5
        });
        this.hidden[1].attr({
            x: this.x + this.width - 20,
            y: this.y + this.height - 15
        });
        this.arrows[0].attr({
            x: this.x + this.width + 2,
            y: this.y + 5
        });
        this.arrows[1].attr({
            x: this.x + this.width + 2,
            y: this.y + this.height - 15
        });
        this.counters.attr({
            x: this.x + this.width / 2,
            y: this.y + this.height + 5
        });
        for (c = QueueApp.views.length - 1; c >= 0; c--) QueueApp.views[c].moveConnection(this);
        this.arrows[0].conn && this.canvas.connection(this.arrows[0].conn, 0, 0, 0, 0, this.arrows[0].conn.toView.type == "reverser");
        this.arrows[1].conn && this.canvas.connection(this.arrows[1].conn, 0, 0, 0, 0, this.arrows[1].conn.toView.type == "reverser");
    }
};

SwitchView.prototype.connect = function(a, b) {
    var c = this.canvas.connection(this.hidden[b], a.dropObject(), "#000", 0, 0, a.type == "reverser");
    c.line.attr({
        "stroke-width": 3,
        stroke: "#F7D68A"
    });
    //c.line.node.id = getID();     //here  splitter
    c.fromView = this;
    c.toView = a;
    this.arrows[b].conn = c;
    this.arrows[b].hide();
    this.model.dest[b] = a.model
};

SwitchView.prototype.unlink = function() {
    var a, b;
    a = QueueApp.models.length;
    for (a -= 1; a >= 0; a--)
        if (QueueApp.models[a] === this.model) {
            b = a;
            break
        }
    b && QueueApp.models.splice(b, 1);
    this.model && this.model.unlink();
    this.disconnect();
    a = QueueApp.views.length;
    for (a -= 1; a >= 0; a--) QueueApp.views[a].disconnect(this), QueueApp.views[a] === this && (b = a);
    QueueApp.views.splice(b, 1);
    this.image.remove();
    this.arrows[0].remove();
    this.arrows[1].remove();
    this.hidden[0].remove();
    this.hidden[0].remove();
    this.counters.remove()
};

SwitchView.prototype.disconnect = function(a) {
    for (var b = 0; b < 2; b++) {
        var c = this.arrows[b];
        if (c && c.conn && (!a || c.conn.toView === a)) c.conn.line.remove(), c.conn = null, b === 0 ? c.attr({
            x: this.x + this.width + 2,
            y: this.y + 5
        }) : c.attr({
            x: this.x + this.width + 2,
            y: this.y + this.height - 15
        }), c.show()
    }
};

SwitchView.prototype.dropObject = function() {
    return this.image
};

SwitchView.prototype.acceptDrop = function(a, b) {
    return a > this.x - 10 && a < this.x + this.width + 10 && b > this.y - 10 && b < this.y + this.height + 10
};

SwitchView.prototype.moveConnection = function(a) {
    for (var b = 0; b < 2; b++) {
        var c = this.arrows[b];
        c && c.conn && c.conn.toView === a && this.canvas.connection(c.conn, 0, 0, 0, 0, a.type == "reverser")
    }
};

SwitchView.prototype.jsonify = function() {
    for (var a = {
            x: this.x,
            y: this.y,
            type: this.type,
            name: this.name,
            out: [null, null]
        }, b = 0; b < 2; b++) {
        var c = this.arrows[b];
        if (c.conn) a.out[b] = c.conn.toView.name
    }
    if (this.model) a.model = this.model.jsonify();
    return a
};
