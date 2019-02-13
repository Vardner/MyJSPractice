particlesJS('particles-js', {
  'particles': {
    'number': {
      'value': 80,
      'density': {'enable': true, 'value_area': 790}
    },
    'color': {'value': '#ffffff'},
    'shape': {
      'type': 'circle',
      'stroke': {'width': 0, 'color': '#000000'},
      'polygon': {'nb_sides': 3},
      'image': {'src': 'img/github.svg', 'width': 100, 'height': 100}
    },
    'opacity': {
      'value': 0.5,
      'random': false,
      'anim': {'enable': false, 'speed': 1, 'opacity_min': 0.1, 'sync': false}
    },
    'size': {'value': 3, 'random': true, 'anim': {'enable': false, 'speed': 40, 'size_min': 0.1, 'sync': false}},
    'line_linked': {'enable': true, 'distance': 150, 'color': '#ffffff', 'opacity': 0.4, 'width': 1},
    'move': {
      'enable': true,
      'speed': 4.810236182596568,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'bounce',
      'bounce': false,
      'attract': {'enable': false, 'rotateX': 1523.2414578222467, 'rotateY': 1282.7296486924183}
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {'enable': false, 'mode': 'repulse'},
      'onclick': {'enable': false, 'mode': 'bubble'},
      'resize': true
    },
    'modes': {
      'grab': {'distance': 400, 'line_linked': {'opacity': 1}},
      'bubble': {
        'distance': 146.17389821424212,
        'size': 16.241544246026905,
        'duration': 0.3248308849205381,
        'opacity': 0.46288401101176674,
        'speed': 3
      },
      'repulse': {'distance': 200, 'duration': 0.4},
      'push': {'particles_nb': 4},
      'remove': {'particles_nb': 2}
    }
  },
  'retina_detect': false
});
