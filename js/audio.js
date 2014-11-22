var Audio = Stapes.subclass({

  constructor: function() {
    var note1 = new Note({
      pitch: 300,
      waveType: 0
    });

    var note2 = new Note({
      pitch: 600,
      waveType: 1
    });

    note1.play();
    note2.play({ delay: 1 });

    var int = setInterval(function() {
      if (note1.getVolume() > -0.9999999403953552) {
        note1.setVolume({ action: 'decrease', percentage: 20 });
        note2.setVolume({ action: 'decrease', percentage: 20 });
      } else {
        clearInterval(int);
        note1.stop();
        note2.stop();
      }
    }, 1000);

  }

});

