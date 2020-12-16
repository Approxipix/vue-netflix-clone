// Component props
export const props = {
  props: {
    arrows: {
      type: Boolean,
      default: true,
    },

    // Set the carousel to be the navigation of other carousels
    asNavFor: {
      type: Array,
      default: function() {
        return [];
      },
    },

    // Enable autoplay
    autoplay: {
      type: Boolean,
      default: false,
    },

    // Autoplay interval in milliseconds
    autoplaySpeed: {
      type: Number,
      default: 3000,
    },

    // Enable centered view when slidesToShow > 1
    centerMode: {
      type: Boolean,
      default: false,
    },

    // Slides padding in center mode
    centerPadding: {
      type: String,
      default: '15%',
    },

    // Enable dot indicators/pagination
    dots: {
      type: Boolean,
      default: true,
    },

    // Enable fade effect
    fade: {
      type: Boolean,
      default: false,
    },

    // Infinite loop sliding
    infinite: {
      type: Boolean,
      default: true,
    },

    // Index of slide to start on
    initialSlide: {
      type: Number,
      default: 0,
    },

    // Enable mobile first calculation for responsive settings
    mobileFirst: {
      type: Boolean,
      default: true,
    },

    // Enable prev/next navigation buttons
    navButtons: {
      type: Boolean,
      default: true,
    },

    // Depreciated
    nextArrow: {
      type: String,
      default: null,
    },

    // All settings as one object
    options: {
      type: Object,
      default: () => null,
    },

    // Pause autoplay when a dot is hovered
    pauseOnDotsHover: {
      type: Boolean,
      default: false,
    },

    // Pause autoplay when a slide is hovered
    pauseOnHover: {
      type: Boolean,
      default: true,
    },

    // Depreciated
    prevArrow: {
      type: String,
      default: null,
    },

    // Object containing breakpoints and settings objects
    responsive: {
      type: Array,
      default: () => null,
    },

    // Enable right-to-left mode
    rtl: {
      type: Boolean,
      default: false,
    },

    // Number of slides to scroll
    slidesToScroll: {
      type: Number,
      default: 1,
    },

    // Number of slides to show
    slidesToShow: {
      type: Number,
      default: 1,
    },

    // Slide animation speed in milliseconds
    speed: {
      type: Number,
      default: 300,
    },

    // Transition timing function
    // Available: ease, linear, ease-in, ease-out, ease-in-out
    timing: {
      type: String,
      default: 'ease',
    },

    // Disable Agile carousel
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      initialSettings: {
        asNavFor: this.asNavFor,
        autoplay: this.autoplay,
        autoplaySpeed: this.autoplaySpeed,
        centerMode: this.centerMode,
        centerPadding: this.centerPadding,
        dots: this.dots,
        fade: this.fade,
        infinite: this.infinite,
        initialSlide: this.initialSlide,
        mobileFirst: this.mobileFirst,
        navButtons: this.navButtons,
        pauseOnDotsHover: this.pauseOnDotsHover,
        pauseOnHover: this.pauseOnHover,
        responsive: this.responsive,
        rtl: this.rtl,
        slidesToScroll: this.slidesToScroll,
        slidesToShow: this.slidesToShow,
        speed: this.speed,
        timing: this.timing,
        disabled: this.disabled,
      }
    }
  },
};

// Handlers methods for mouse/touch events
export const handlers = {
  methods: {
    handleMouseDown(e) {
      if (!e.touches) e.preventDefault();
      this.mouseDown = true;
      this.dragStartX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX;
      this.dragStartY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY;
    },

    handleMouseMove(e) {
      let positionX = ('ontouchstart' in window) ? e.touches[0].clientX : e.clientX;
      let positionY = ('ontouchstart' in window) ? e.touches[0].clientY : e.clientY;
      let dragDistanceX = Math.abs(positionX - this.dragStartX);
      let dragDistanceY = Math.abs(positionY - this.dragStartY);
      if (dragDistanceX > 3 * dragDistanceY) {
        this.disableScroll();
        this.dragDistance = positionX - this.dragStartX;
      }
    },

    handleMouseUp() {
      this.mouseDown = false;
      this.enableScroll();
    },

    handleMouseOver(element) {
      const { autoplay, pauseOnDotsHover, pauseOnHover } = this.settings;
      if (!autoplay) return;
      if ((element === 'dot' && pauseOnDotsHover) || (element === 'track' && pauseOnHover)) {
        this.pauseAutoPlay = true;
      }
    },

    handleMouseOut(element) {
      const { autoplay, pauseOnDotsHover, pauseOnHover } = this.settings;
      if (!autoplay) return;
      if ((element === 'dot' && pauseOnDotsHover) || (element === 'track' && pauseOnHover)) {
        this.pauseAutoPlay = false;
      }
    }
  }
};

// Helpers methods
export const helpers = {
  methods: {
    htmlCollectionToArray(collection) {
      return Array.prototype.slice.call(collection, 0);
    },

    compare(a, b) {
      if (a.breakpoint < b.breakpoint) return (this.initialSettings.mobileFirst) ? -1 : 1;
      if (a.breakpoint > b.breakpoint) return (this.initialSettings.mobileFirst) ? 1 : -1;
      return 0;
    },

    getWidth() {
      this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.widthContainer = this.$refs.list.clientWidth;
    }
  }
};

// Carousel preparation methods
export const preparations = {
  methods: {
    prepareSettings() {
      const { responsive, mobileFirst } = this.initialSettings;
      if (!responsive) {
        this.toggleFade();
        this.toggleAutoPlay();
        return false;
      }

      let newSettings = Object.assign({}, this.initialSettings);
      delete newSettings.responsive;

      responsive.forEach(option => {
        if (mobileFirst ? option.breakpoint < this.widthWindow : option.breakpoint > this.widthWindow) {
          for (let key in option.settings) {
            newSettings[key] = option.settings[key];
          }
        }
      });

      this.settings = Object.assign({}, newSettings);
    },

    prepareSlides() {
      this.slides = this.htmlCollectionToArray(this.$refs.slides.children);

      if (this.clonedSlides) {
        this.slidesClonedBefore = this.htmlCollectionToArray(this.$refs.slidesClonedBefore.children);
        this.slidesClonedAfter = this.htmlCollectionToArray(this.$refs.slidesClonedAfter.children);
      }

      for (let slide of this.allSlides) {
        slide.classList.add('Slider__slide');
      }
    },

    prepareSlidesClasses() {
      if (this.currentSlide === null) return false;
      for (let i = 0; i < this.slidesCount; i++) {
        this.slides[i].classList.remove('Slider__slide--active');
        this.slides[i].classList.remove('Slider__slide--current');
        this.slides[i].classList.remove('Slider__slide--last');
      }

      this.slides[this.currentSlide].classList.add('Slider__slide--active');
      this.slides[this.currentSlide + this.options.slidesToShow - 1].classList.add('Slider__slide--last');

      let start = (this.clonedSlides) ? this.slidesCount + this.currentSlide : this.currentSlide;

      if (this.centerMode) {
        start -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0));
      }

      for (let i = Math.max(start, 0); i < Math.min(start + this.settings.slidesToShow, this.slidesCount); i++) {
        this.allSlides[i].classList.add('Slider__slide--current');
      }
    },

    prepareCarousel() {
      this.widthSlide = !this.settings.disabled ? this.widthContainer / this.settings.slidesToShow : 'auto';

      for (let i = 0; i < this.allSlidesCount; i++) {
        this.allSlides[i].style.width = this.widthSlide + 'px';
      }

      if (this.settings.disabled) {
        this.translateX = 0;
      } else {
        if (this.currentSlide === null && this.slidesCount) {
          this.currentSlide = this.settings.initialSlide;
        }

        this.goTo(this.currentSlide, false, false);
      }
    }
  }
};

// Component watchers
export const watchers = {
  watch: {
    widthWindow(newValue, oldValue) {
      if (oldValue) {
        this.prepareCarousel();
        this.toggleFade();
      }
    },

    currentSlide() {
      this.prepareSlidesClasses();
      this.autoplayStart = (this.settings.autoplay) ? +new Date() : null;
      this.$emit('afterChange', { currentSlide: this.currentSlide });
    },

    currentBreakpoint() {
      this.prepareSettings();
      this.$emit('breakpoint', { breakpoint: this.currentBreakpoint });
    },

    dragDistance() {
      if (this.mouseDown) {
        const { rtl } = this.settings;
        const dragDistance = this.dragDistance * (rtl ? -1 : 1);

        if (dragDistance > this.swipeDistance && this.canGoToPrev) {
          this.goToPrev();
          this.handleMouseUp();
        }

        if (dragDistance < -1 * this.swipeDistance && this.canGoToNext) {
          this.goToNext();
          this.handleMouseUp();
        }
      }
    },

    'settings.fade'() {
      this.toggleFade();
    },

    'settings.autoplay'() {
      this.toggleAutoPlay();
    },

    pauseAutoPlay(nevValue) {
      if (nevValue) {
        this.remaining = this.settings.autoplaySpeed - (+new Date() - this.autoplayStart);
        this.disableAutoPlay();
        this.clearAutoPlayPause();
      } else {
        this.autoplayTimeout = setTimeout(() => {
          this.clearAutoPlayPause();
          this.goToNext();
          this.toggleAutoPlay();
        }, this.remaining)
      }
    }
  },
};


