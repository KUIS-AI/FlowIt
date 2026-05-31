window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: false,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    breakpoints: [
      {
        changePoint: 1023,
        slidesToShow: 2,
        slidesToScroll: 1
      },
      {
        changePoint: 768,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    ]
};

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    var flowCarouselElement = document.querySelector('#flow-carousel');
    if (flowCarouselElement && flowCarouselElement.bulmaCarousel) {
      var flowCarousel = flowCarouselElement.bulmaCarousel;
      flowCarousel.on('after:show', function(state) {
        var lastStartIndex = Math.max(0, state.length - Math.ceil(flowCarousel.slidesToShow));
        if (state.index >= lastStartIndex && state.index !== 0) {
          setTimeout(function() {
            flowCarousel.show(0, true);
          }, 0);
        }
      });
    }

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

;(function() {
  var comparisonScenes = {
    kitti_00005: {
      label: 'KITTI 00005',
      rgb1: './static/images/kitti/kitti_train_000005_10.jpg',
      rgb2: './static/images/kitti/kitti_train_000005_img2.jpg',
      flowseek: './static/images/kitti/kitti_train_flowseek_00005.jpg',
      searaft: './static/images/kitti/kitti_train_searaft_00005.jpg',
      waft: './static/images/kitti/kitti_train_waft_000005.jpg',
      ours: './static/images/kitti/kitti_train_ours_00005.jpg'
    },
    kitti_00087: {
      label: 'KITTI 00087',
      rgb1: './static/images/kitti/kitti_train_000087_10.jpg',
      rgb2: './static/images/kitti/kitti_train_000087_img2.jpg',
      flowseek: './static/images/kitti/kitti_train_flowseek_00087.jpg',
      searaft: './static/images/kitti/kitti_train_searaft_00087.jpg',
      waft: './static/images/kitti/kitti_train_waft_000087.jpg',
      ours: './static/images/kitti/kitti_train_ours_00087.jpg'
    },
    kitti_00117: {
      label: 'KITTI 00117',
      rgb1: './static/images/kitti/kitti_train_000117_10.jpg',
      rgb2: './static/images/kitti/kitti_train_000117_img2.jpg',
      flowseek: './static/images/kitti/kitti_train_flowseek_00117.jpg',
      searaft: './static/images/kitti/kitti_train_searaft_00117.jpg',
      waft: './static/images/kitti/kitti_train_waft_000117.jpg',
      ours: './static/images/kitti/kitti_train_ours_00117.jpg'
    },
    layered_150: {
      label: 'Layered 150',
      rgb1: './static/images/layered/150_img.jpg',
      rgb2: './static/images/layered/150_img2.jpg',
      flowseek: './static/images/layered/150_flowseek.png',
      searaft: './static/images/layered/150_searaft.png',
      waft: './static/images/layered/150_waft.png',
      ours: './static/images/layered/150_ours.png'
    },
    layered_374: {
      label: 'Layered 374',
      rgb1: './static/images/layered/374_img.jpg',
      rgb2: './static/images/layered/374_img2.jpg',
      flowseek: './static/images/layered/374_flowseek.png',
      searaft: './static/images/layered/374_searaft.png',
      waft: './static/images/layered/374_waft.png',
      ours: './static/images/layered/374_ours.png'
    },
    spring_01509: {
      label: 'Spring 01509',
      rgb1: './static/images/spring/01509_rgb.jpg',
      rgb2: './static/images/spring/01509_rgb_img2.jpg',
      flowseek: './static/images/spring/01509_flowseek.jpg',
      searaft: './static/images/spring/01509_searaft.jpg',
      waft: './static/images/spring/01509_waft.jpg',
      ours: './static/images/spring/01509_ours.jpg',
      gt: './static/images/spring/01509_gt.jpg'
    },
    spring_01683: {
      label: 'Spring 01683',
      rgb1: './static/images/spring/01683_rgb.jpg',
      rgb2: './static/images/spring/01683_rgb_img2.jpg',
      flowseek: './static/images/spring/01683_flowseek.jpg',
      searaft: './static/images/spring/01683_searaft.jpg',
      waft: './static/images/spring/01683_waft.jpg',
      ours: './static/images/spring/01683_ours.jpg',
      gt: './static/images/spring/01683_gt.jpg'
    },
    spring_03815: {
      label: 'Spring 03815',
      rgb1: './static/images/spring/03815_rgb.jpg',
      rgb2: './static/images/spring/03815_rgb_img2.jpg',
      flowseek: './static/images/spring/03815_flowseek.jpg',
      searaft: './static/images/spring/03815_searaft.jpg',
      waft: './static/images/spring/03815_waft.jpg',
      ours: './static/images/spring/03815_ours.jpg',
      gt: './static/images/spring/03815_gt.jpg'
    },
    spring_04357: {
      label: 'Spring 04357',
      rgb1: './static/images/spring/04357_rgb.jpg',
      rgb2: './static/images/spring/04357_rgb_img2.jpg',
      flowseek: './static/images/spring/04357_flowseek.jpg',
      searaft: './static/images/spring/04357_searaft.jpg',
      waft: './static/images/spring/04357_waft.jpg',
      ours: './static/images/spring/04357_ours.jpg',
      gt: './static/images/spring/04357_gt.jpg'
    },
    sintel_frame6: {
      label: 'Sintel frame6',
      rgb1: './static/images/sintel/frame6_rgb.jpg',
      rgb2: './static/images/sintel/frame6_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame6_flowseek.jpg',
      searaft: './static/images/sintel/frame6_searaft.jpg',
      waft: './static/images/sintel/frame6_waft.jpg',
      ours: './static/images/sintel/frame6_ours.jpg',
      gt: './static/images/sintel/frame6_gt.jpg'
    },
    sintel_frame313: {
      label: 'Sintel frame313',
      rgb1: './static/images/sintel/frame313_rgb.jpg',
      rgb2: './static/images/sintel/frame313_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame313_flowseek.jpg',
      searaft: './static/images/sintel/frame313_searaft.jpg',
      waft: './static/images/sintel/frame313_waft.jpg',
      ours: './static/images/sintel/frame313_ours.jpg',
      gt: './static/images/sintel/frame313_gt.jpg'
    },
    sintel_frame360: {
      label: 'Sintel frame360',
      rgb1: './static/images/sintel/frame360_rgb.jpg',
      rgb2: './static/images/sintel/frame360_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame360_flowseek.jpg',
      searaft: './static/images/sintel/frame360_searaft.jpg',
      waft: './static/images/sintel/frame360_waft.jpg',
      ours: './static/images/sintel/frame360_ours.jpg',
      gt: './static/images/sintel/frame360_gt.jpg'
    },
    sintel_frame384: {
      label: 'Sintel frame384',
      rgb1: './static/images/sintel/frame384_rgb.jpg',
      rgb2: './static/images/sintel/frame384_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame384_flowseek.jpg',
      searaft: './static/images/sintel/frame384_searaft.jpg',
      waft: './static/images/sintel/frame384_waft.jpg',
      ours: './static/images/sintel/frame384_ours.jpg',
      gt: './static/images/sintel/frame384_gt.jpg'
    },
    sintel_frame565: {
      label: 'Sintel frame565',
      rgb1: './static/images/sintel/frame565_rgb.jpg',
      rgb2: './static/images/sintel/frame565_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame565_flowseek.jpg',
      searaft: './static/images/sintel/frame565_searaft.jpg',
      waft: './static/images/sintel/frame565_waft.jpg',
      ours: './static/images/sintel/frame565_ours.jpg',
      gt: './static/images/sintel/frame565_gt.jpg'
    },
    sintel_frame766: {
      label: 'Sintel frame766',
      rgb1: './static/images/sintel/frame766_rgb.jpg',
      rgb2: './static/images/sintel/frame766_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame766_flowseek.jpg',
      searaft: './static/images/sintel/frame766_searaft.jpg',
      waft: './static/images/sintel/frame766_waft.jpg',
      ours: './static/images/sintel/frame766_ours.jpg',
      gt: './static/images/sintel/frame766_gt.jpg'
    },
    sintel_frame836: {
      label: 'Sintel frame836',
      rgb1: './static/images/sintel/frame836_rgb.jpg',
      rgb2: './static/images/sintel/frame836_rgb_img2.jpg',
      flowseek: './static/images/sintel/frame836_flowseek.jpg',
      searaft: './static/images/sintel/frame836_searaft.jpg',
      waft: './static/images/sintel/frame836_waft.jpg',
      ours: './static/images/sintel/frame836_ours.jpg',
      gt: './static/images/sintel/frame836_gt.jpg'
    }
  };

  var comparisonState = {
    scene: 'sintel_frame360',
    methods: {
      1: 'waft',
      2: 'ours'
    }
  };

  var methodLabels = {
    flowseek: 'FlowSeek',
    searaft: 'SEA-RAFT',
    waft: 'WAFT',
    ours: 'Ours',
    gt: 'Ground-truth'
  };

  function updateComparisonImage(viewer) {
    var scene = comparisonScenes[comparisonState.scene];
    var method = comparisonState.methods[viewer];
    var image = document.getElementById('comparisonImage' + viewer);
    if (!scene || !method || !image || !scene[method]) return;

    image.src = scene[method];
    image.alt = methodLabels[method] + ' output for ' + scene.label;
  }

  function updateComparison() {
    ensureAvailableMethods();
    updateMethodButtons();
    updateComparisonImage(1);
    updateComparisonImage(2);
    updateRgbImages();
  }

  function ensureAvailableMethods() {
    var scene = comparisonScenes[comparisonState.scene];
    if (!scene) return;

    Object.keys(comparisonState.methods).forEach(function(viewer) {
      if (!scene[comparisonState.methods[viewer]]) {
        comparisonState.methods[viewer] = 'ours';
      }
    });
  }

  function updateMethodButtons() {
    var scene = comparisonScenes[comparisonState.scene];
    var wrapper = document.getElementById('image-compare-wrapper');
    if (!scene || !wrapper) return;

    wrapper.querySelectorAll('.method-button').forEach(function(button) {
      var viewer = button.dataset.viewer;
      var method = button.dataset.method;
      var isAvailable = Boolean(scene[method]);

      button.disabled = !isAvailable;
      button.classList.toggle('is-disabled', !isAvailable);
      button.classList.toggle('active', isAvailable && comparisonState.methods[viewer] === method);
    });
  }

  function updateRgbImages() {
    var scene = comparisonScenes[comparisonState.scene];
    var image1 = document.getElementById('comparisonRgb1');
    var image2 = document.getElementById('comparisonRgb2');
    if (!scene || !image1 || !image2) return;

    image1.src = scene.rgb1;
    image1.alt = 'First RGB frame for ' + scene.label;
    image2.src = scene.rgb2;
    image2.alt = 'Second RGB frame for ' + scene.label;
  }

  function initQualitativeComparison() {
    var wrapper = document.getElementById('image-compare-wrapper');
    var selectionPanel = document.getElementById('comparisonSelectionPanel');
    if (!wrapper || !selectionPanel) return;

    wrapper.querySelectorAll('.method-button').forEach(function(button) {
      button.addEventListener('click', function() {
        var viewer = button.dataset.viewer;
        var method = button.dataset.method;
        var scene = comparisonScenes[comparisonState.scene];
        if (button.disabled || !scene || !scene[method]) return;

        comparisonState.methods[viewer] = method;
        updateComparison();
      });
    });

    selectionPanel.querySelectorAll('.selectable-image').forEach(function(button) {
      button.addEventListener('click', function() {
        comparisonState.scene = button.dataset.scene;

        selectionPanel.querySelectorAll('.selectable-image').forEach(function(peerButton) {
          peerButton.classList.toggle('selected', peerButton === button);
        });

        updateComparison();
      });
    });

    updateComparison();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQualitativeComparison);
  } else {
    initQualitativeComparison();
  }
})();

// Resize each .bal-container-small to match the aspect ratio of its contained image.
// This keeps the before/after widget responsive: the container height is set to
// containerWidth / (naturalWidth / naturalHeight).
;(function() {
  function setContainerHeightFromImage($container) {
    var img = $container.find('.bal-after img, .bal-before img').first()[0];
    if (!img) return;

    function apply() {
      if (!img.naturalWidth || !img.naturalHeight) return;
      var aspect = img.naturalWidth / img.naturalHeight;
      var width = $container.width();
      var newHeight = Math.round(width / aspect);
      // optional caps to avoid extremely tall widgets on narrow phones
      var maxHeight = Math.round(window.innerHeight * 0.75);
      if (newHeight > maxHeight) newHeight = maxHeight;
      $container.css('height', newHeight + 'px');
    }

    if (img.complete) {
      apply();
    } else {
      // wait for image to load
      $(img).on('load', apply);
    }
  }

  function adjustAllBalContainers() {
    $('.bal-container-small').each(function() {
      setContainerHeightFromImage($(this));
    });
  }

  // Debounce helper
  function debounce(fn, wait) {
    var t = null;
    return function() {
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function() { fn.apply(null, args); }, wait);
    };
  }

  // Run after DOM ready (covers images already present) and after a short delay
  $(function() { adjustAllBalContainers(); });

  // Recompute on window resize
  $(window).on('resize', debounce(adjustAllBalContainers, 120));

  // Also re-run when orientation changes on mobile
  window.addEventListener('orientationchange', function() {
    setTimeout(adjustAllBalContainers, 200);
  });
})();
