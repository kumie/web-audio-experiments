var Note = Stapes.subclass({

  constructor: function(config) {
    this.container = new AudioContext();
    this.source = this.createSoundSource();

    this.setPitch(config.pitch);
    this.setVolumeController();
    this.setWaveType(config.waveType || 0);
    this.connectToSpeakers();
  },

  play: function(config) {
    config = config || {};
    _.defaults(config, {
      delay: 0
    });
    this.source.noteOn(config.delay);

    if (config.duration) {
      _.delay(function() {
        this.stop();
      }.bind(this), config.duration);
    }
  },

  stop: function() {
    this.source.disconnect();
    console.log('stopped');
  },

  setPitch: function(pitch) {
    this.source.frequency.value = pitch;
  },

  setVolumeController: function() {
    this.volumeController = this.container.createGain();
  },

  setVolume: function(config) {
    var currentVolume = this.volumeController.gain.value,
        percentageAsFloat = config.percentage / 100;

    this.volumeController.gain.value = config.action === 'increase' ?
        currentVolume + percentageAsFloat : currentVolume - percentageAsFloat;

    this.connectSoundToController();
    this.connectControllerToSpeakers();
    console.log('new volume: ' + this.volumeController.gain.value);
  },

  setWaveType: function(type) {
    this.source.type = type;
  },

  createSoundSource: function() {
    return this.container.createOscillator();
  },

  connectToSpeakers: function() {
    this.source.connect(this.container.destination);
  },

  connectSoundToController: function() {
    this.source.connect(this.volumeController);
  },

  connectControllerToSpeakers: function() {
    this.volumeController.connect(this.container.destination);
  },

  getVolume: function() {
    return this.volumeController.gain.value;
  },

  fadeOut: function() {

  }

});