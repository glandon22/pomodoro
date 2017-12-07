$(document).ready(function() {
    //determine whether clock is running or paused
    var paused = false;
    var running = false;
    //determine whether clock is in work period or break period
    var restStatus = false;
    //store values of work period and break period
    var work = 25;
    var rest = 5;
    //get variables from DOM for quick access and manipulation
    var timer = $(".timer");
    var timerVal = $(".timer-val");
    var breakUp = $(".break-up");
    var breakDown = $(".break-down");
    var workUp = $(".work-up");
    var workDown = $(".work-down")
    var input = $(".input");
    var breakVal = $(".break-val");
    var workVal = $(".work-val");
    var breakTime = $(".break");
    var workTime = $(".work");
    //determine amount of seconds in work/break periods
    var workSeconds = work * 60;
    var breakSeconds = rest * 60;
    //set intervals for countdownå
    var workInterval;
    var breakInterval;
    //count how many seconds have passed in timer
    var ticks = 0;
    //clome of breakSeconds,workSeconds,rest,work for internal interval manipulation
    var bsc;
    var bc;
    var wsc;
    var wc;
    var changedWork = false;
    var changedBreak = false;

    breakUp.on("click", function() {
        if (running) {
            return;
        }

        else {
            if (rest == 99) {
                return;
            }

            else {
                ++rest;
                breakVal.text(rest);
                breakSeconds = rest * 60;
                //update rest value on screen if in break period
                if (restStatus) {
                    timerVal.html('<span class="timer-val">' + rest + ':00' + '</span>');
                    ticks = 0;
                }
                changedBreak = true;
            }
        }
    });

    breakDown.on("click", function() {
        if (running) {
            return;
        }

        else {
            if (rest == 1) {
                return;
            }

            else {
                --rest;
                breakVal.text(rest);
                breakSeconds = rest * 60;
                //update rest value on screen if in break period
                if (restStatus) {
                    timerVal.html('<span class="timer-val">' + rest + ':00' + '</span>');
                    ticks = 0;
                }
                changedBreak = true;
            }
        }
    });

    workUp.on("click", function() {
        if (running) {
            return;
        }

        else {
            if (work == 99) {
                return;
            }

            else {
                ++work;
                workVal.text(work);
                workSeconds = work * 60;
                //update work value on screen if in work period
                if (!restStatus) {
                    timerVal.html('<span class="timer-val">' + work + ':00' + '</span>');
                    ticks = 0;
                }
                changedWork = true;
            }
        }
    });

    workDown.on("click", function() {
        if (running) {
            return;
        }

        else {
            if (work == 1) {
                return;
            }

            else {
                --work;
                workVal.text(work);
                workSeconds = work * 60;
                //update work value on screen if in work period
                if (!restStatus) {
                    timerVal.html('<span class="timer-val">' + work + ':00' + '</span>');
                    ticks = 0;
                }
                changedWork = true;
            }
        }
    });

    timer.on("click", function() {
        if (running) {
            if (restStatus) {
                clearInterval(breakInterval);
                running = false;
                paused = true;


            }

            else {
                clearInterval(workInterval);
                running = false;
                paused = true;
            }
            changedBreak = false;
            changedWork = false;
        }

        else if (!restStatus && paused && changedWork) {
            ticks = 0;
            wc = work;
            wsc = workSeconds;

            stuff();
            paused = false;
            changedBreak = false;
            changedWork = false;
        }

        else if (restStatus && paused && changedBreak) {
            ticks = 0;
            bc = rest;
            bsc = breakSeconds;

            relax();
            paused = false;
            changedBreak = false;
            changedWork = false;
        }

        else if (restStatus) {

            relax();
            paused = false;
            changedBreak = false;
            changedWork = false;
        }

        else {

            stuff();
            paused = false;
            changedBreak = false;
            changedWork = false;
        }

    });

    function relax() {
        workTime.removeClass("active");
        breakTime.addClass("active");
        if (!paused) {
            bsc = breakSeconds;
            bc = rest;
        }

        breakInterval = setInterval(function() {
                bsc--;
                ticks++;
                var temp = ((ticks/breakSeconds) * 100).toFixed(2);
                timer.css("background", "linear-gradient(180deg, #9099a2, #9099a2 " + temp + "%, #f0dbcd, #f0dbcd 0%)");
                if (bsc < 60) {
                    if (bsc < 10) {
                        if (bsc == 0) {
                            clearInterval(breakInterval);
                            restStatus = false;
                            //breakSeconds = ticks;
                            ticks = 0;
                            stuff();

                        }
                        timerVal.html('<span class="timer-val">' + '00:0' + bsc + '</span>');
                    }

                    else {
                        timerVal.html('<span class="timer-val">' + '00:' + bsc + '</span>');
                    }
                }

                else {
                    if (ticks == 1 || ticks%60 == 1) {
                        bc = (bsc + 1) / 60 - 1;
                    }

                    else {
                    }

                    var seconds = bsc%60;

                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }

                    timerVal.html('<span class="timer-val">' + bc + ':' + seconds + '</span>');
                }
            }, 1000);
            running = true;
    };

    function stuff() {
        breakTime.removeClass("active");
        workTime.addClass("active");

        if (!paused) {
            wsc = workSeconds;
            wc = work;
        }

        workInterval = setInterval(function() {
                console.log(wsc);
                console.log(wc);
                console.log(ticks);
                console.log('----------');
                wsc--;
                ticks++;
                var temp = 100 - ((ticks/workSeconds) * 100).toFixed(2);
                timer.css("background", "linear-gradient(180deg, #9099a2, #9099a2 " + temp + "%, #f0dbcd, #f0dbcd 0%)");
                if (wsc < 60) {
                    if (wsc < 10) {
                        if (wsc == 0) {
                            clearInterval(workInterval);
                            restStatus = true;
                            ticks = 0;
                            relax();
                        }

                        timerVal.html('<span class="timer-val">' + '00:0' + wsc + '</span>');
                    }

                    else {
                        timerVal.html('<span class="timer-val">' + '00:' + wsc + '</span>');
                    }
                }

                else {
                    if (ticks == 1 || ticks%60 == 1) {
                        wc = (wsc + 1) / 60 - 1;
                    }

                    else {
                    }

                    var seconds = wsc%60;

                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }

                    timerVal.html('<span class="timer-val">' + wc + ':' + seconds + '</span>');
                }
            }, 1000);
            running = true;
    };
});