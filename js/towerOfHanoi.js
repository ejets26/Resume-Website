var main = function() {

    var NUMBER_OF_DISKS = 7;

    var towerA = [];
    var towerB = [];
    var towerC = [];

    for (var i = NUMBER_OF_DISKS; i > 0; i -= 1) {
        towerA.push(i);
    }

    var updateTowers = function() {
        for (i = 0; i < towerA.length; i += 1) {
            $(".disc-" + towerA[i]).css({
                left: 40,
                transform: "rotate(0deg)"
            });
        }

        for (i = 0; i < towerB.length; i += 1) {
            $(".disc-" + towerB[i]).css({
                left: 400,
                transform: "rotate(360deg)"
            });
        }

        for (i = 0; i < towerC.length; i += 1) {
            $(".disc-" + towerC[i]).css({
                left: 760,
                transform: "rotate(720deg)"
            });
        }
    }

    var move = function(n, source, target, auxiliary) {
        return new Promise(function(resolve, reject) {
            if (n > 0) {
                move(n - 1, source, auxiliary, target).then(function() {
                    window.setTimeout(function() {
                        target.push(source.pop());
                        updateTowers();

                        move(n - 1, auxiliary, target, source).then(function() {
                            updateTowers();
                            resolve();
                        });
                    }, 1000);
                });
            } else {
                resolve();
            }
        });
    }

    console.log(towerA, towerB, towerC);
    updateTowers();

    var moveThere = function() {
        move(NUMBER_OF_DISKS, towerA, towerC, towerB).then(moveBack);
    }

    var moveBack = function() {
        move(NUMBER_OF_DISKS, towerC, towerA, towerB).then(moveThere);
    }

    moveThere();
}
main();