function to_arr_numb(n) {
    var n = n.toString().split(''),
        arr = [];

    if ( n.length < 2 ) arr.push(0);

    for (var i = 0; i < n.length; i++) {
        arr.push(parseInt(n[i]));
    }

    return arr;
}

var clock = Snap(".clock");

var hours = [];
hours.push( new ClockGroup(clock, 1) );
hours.push( new ClockGroup(clock, 131) );

var minutes = [];
minutes.push( new ClockGroup(clock, 281) );
minutes.push( new ClockGroup(clock, 411) );

var seconds = [];
seconds.push( new ClockGroup(clock, 561) );
seconds.push( new ClockGroup(clock, 691) );



function update() {
    var d = new Date();
    var s = to_arr_numb( d.getSeconds() );
    var m = to_arr_numb( d.getMinutes() );
    var h = to_arr_numb( d.getHours() );

    for (var i = 0; i < 2; i++) {
        hours[i].setTime( h[i] );
        minutes[i].setTime( m[i] );
        seconds[i].setTime( s[i] );
    }
}

setInterval(update, 1000);
