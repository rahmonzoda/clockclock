var numeral = [
    [   // zero
        [3, 6],
        [0, 6],
        [0, 3],

        [6, 9],
        [0, 6],
        [0, 9]
    ],
    [   // one
        [7, 7],
        [7, 7],
        [7, 7],

        [6, 6],
        [0, 6],
        [0, 0]
    ],
    [   // two
        [3, 3],
        [3, 6],
        [0, 3],

        [6, 9],
        [0, 9],
        [9, 9]
    ],
    [   // three
        [3, 3],
        [3, 3],
        [3, 3],

        [6, 9],
        [0, 9],
        [0, 9]
    ],
    [   // four
        [0, 6],
        [0, 3],
        [7, 7],

        [6, 6],
        [0, 3],
        [0, 0]
    ],
    [   // five
        [3, 6],
        [0, 3],
        [3, 3],

        [9, 9],
        [9, 6],
        [0, 9]
    ],
    [   // six
        [3, 6],
        [0, 6],
        [0, 3],

        [9, 9],
        [9, 6],
        [0, 9]
    ],
    [   // seven
        [3, 9],
        [3, 3],
        [7, 7],

        [6, 9],
        [0, 6],
        [0, 0]
    ],
    [   // eight
        [3, 6],
        [0, 4],
        [0, 3],

        [6, 9],
        [0, 8],
        [0, 9]
    ],
    [   // nine
        [3, 6],
        [0, 3],
        [3, 3],

        [6, 9],
        [0, 6],
        [0, 9]
    ]
];

function Clock(clock, position) {
    this.clock = clock;
    this.position = position;
    this.create();
}

Clock.prototype.create = function () {
    var clock = this.clock;

    this.x = this.position[0] || 0;
    this.y = this.position[1] || 0;

    this.frame = clock.rect( (this.x + 1), (this.y + 1), 60, 60, 0).attr({
        fill: "#fff",
        stroke: "#000"
    });

    this.hours = clock.rect( (this.x + 30), (this.y + 10), 3, 20).attr({fill: "#333"});  

    this.minutes = clock.rect( (this.x + 31), (this.y + 10), 3, 20).attr({fill: "#333"});


    this.middle = clock.circle( ( this.x + 32 ), ( this.y + 32 ), 3).attr({
        fill: "#ffffff",
        stroke: "#333"
    });

    this.ticks = clock.circle((this.x + 31), (this.y + 31), 27).attr({
        fill: "#fff",
        stroke: '#333',
        strokeWidth: 3,
        strokeDasharray: '2, 12'
    });

    this.group = clock.group(this.frame, this.ticks, this.hours, this.minutes, this.middle);
    this.setTime([getRandomInt(0, 9), getRandomInt(0, 9)]);
};

Clock.prototype.setTime = function(hm) {
    var that = this,
        h = hm[0],
        m = hm[1];

    this.hours.animate({transform: "r" + (h * 30) + "," + ( this.x + 32 ) + "," + ( this.y + 32 ) }, 800);
    this.minutes.animate({transform: "r" + (m * 30) + "," + ( this.x + 32 ) + "," + ( this.y + 32 ) }, 800);
};

function ClockGroup(svg, n) {
    this.svg = svg;
    this.n = n;

    this.create();
}

ClockGroup.prototype.create = function() {
    var  x, a, b,
        n = this.n;

    this.groups = [];

    for ( a = 0; a < 2; a++) {

        for ( b = 0; b < 3; b++) {
            x = [];

            x[0] = n + (a*65);
            x[1] = b*65;

            this.groups.push( new Clock( this.svg, x) );
        }
    }
};

ClockGroup.prototype.setTime = function(n) {

    for (var b = 0; b < numeral[n].length; b++) {
        this.groups[b].setTime( numeral[n][b] );
    }
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}