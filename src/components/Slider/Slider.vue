<template>
  <div class="Slider" :class="sliderClasses">
    <div ref="list" class="Slider__list">
      <div
        ref="track"
        class="Slider__track"
        :style="{transform: `translate(${translateX + marginX}px)`, transition: `transform ${settings.timing} ${transitionDelay}ms`}"
        @mouseover="handleMouseOver('track')"
        @mouseout="handleMouseOut('track')"
      >
        <div
          :class="['Slider__slides', 'Slider__slides--cloned', settings.extraClass]"
          ref="slidesClonedBefore"
          v-if="clonedSlides"
        >
          <slot />
        </div>
        <div :class="['Slider__slides', 'Slider__slides--regular', settings.extraClass]" ref="slides">
          <slot />
        </div>
        <div
          :class="['Slider__slides', 'Slider__slides--cloned', settings.extraClass]"
          ref="slidesClonedAfter"
          v-if="clonedSlides"
        >
          <slot />
        </div>
      </div>
    </div>

    <div class="Slider__actions" v-if="!settings.disabled && (settings.navButtons || settings.dots)">
      <button
        type="button"
        ref="prevButton"
        v-if="settings.navButtons && !settings.disabled"
        class="Slider__nav-button Slider__nav-button--prev"
        :disabled="!canGoToPrev"
        @click="goToPrev(), restartAutoPlay()"
      >
        <slot name="prevButton">←</slot>
      </button>

      <ul ref="dots" v-if="settings.dots && !settings.disabled" class="Slider__dots">
        <li
          v-for="n in slidesCount"
          :key="n" class="Slider__dot"
          :class="{'Slider__dot--current': n - 1 === currentSlide}"
          @mouseover="handleMouseOver('dot')"
          @mouseout="handleMouseOut('dot')"
        >
          <button @click="goTo(n - 1), restartAutoPlay()" type="button">{{n}}</button>
        </li>
      </ul>

      <button
        type="button"
        ref="nextButton"
        v-if="settings.navButtons && !settings.disabled"
        class="Slider__nav-button Slider__nav-button--next"
        :disabled="!canGoToNext"
        @click="goToNext(), restartAutoPlay()"
      >
        <slot name="nextButton">→</slot>
      </button>
    </div>

    <div class="Spinner__overflow" v-if="loading">
      <Spinner />
    </div>
  </div>
</template>

<script>
  import { props, handlers, helpers, preparations, watchers } from '../../services/SliderService';
  import Spinner from '../../components/Spinner/Spinner.vue';

  export default {
    name: 'slider',
    mixins: [handlers, helpers, preparations, props, watchers],
    data () {
      return {
        slides: [],
        slidesClonedBefore: [],
        slidesClonedAfter: [],
        autoplayInterval: null,
        autoplayTimeout: null,
        pauseAutoPlay: false,
        autoplayStart: null,
        autoplayRemaining: null,
        currentSlide: null,
        mouseDown: false,
        dragStartX: 0,
        dragStartY: 0,
        dragDistance: 0,
        swipeDistance: 50,
        translateX: 0,
        transitionDelay: 0,
        widthWindow: 0,
        widthContainer: 0,
        widthSlide: 0,
        settings: {},
        loading: false,
      };
    },
    components: {
      Spinner,
    },
    computed: {
      sliderClasses() {
        return {
          'Slider--auto-play': this.settings.autoplay,
          'Slider--disabled': this.settings.disabled,
          'Slider--fade': this.settings.fade && !this.settings.disabled,
          'Slider--rtl': this.settings.rtl
        };
      },
      canGoToPrev() {
        return this.settings.infinite || this.currentSlide > 0;
      },
      canGoToNext() {
        return this.settings.infinite || this.currentSlide < this.slidesCount - 1;
      },
      clonedSlides() {
        return !this.settings.disabled && !this.settings.fade && this.settings.infinite;
      },
      breakpoints() {
        if (!this.initialSettings.responsive) return [];
        return this.initialSettings.responsive.map(item => item.breakpoint);
      },
      currentBreakpoint() {
        let breakpoints = this.breakpoints.map(item => item).reverse();
        if (this.initialSettings.mobileFirst) return breakpoints.find(item => item < this.widthWindow) || 0;
        return breakpoints.find(item => item > this.widthWindow) || null;
      },
      allSlides() {
        if (this.clonedSlides) return [...this.slidesClonedBefore, ...this.slides, ...this.slidesClonedAfter];
        return this.slides;
      },
      slidesCount() {
        return this.slides.length;
      },
      allSlidesCount() {
        return this.allSlides.length;
      },
      marginX() {
        let marginX = (this.clonedSlides) ? this.slidesCount * this.widthSlide : 0;
        if (this.settings.centerMode) {
          marginX -= (Math.floor(this.settings.slidesToShow / 2) - +(this.settings.slidesToShow % 2 === 0)) * this.widthSlide;
        }
        return (this.settings.rtl) ? marginX : -1 * marginX;
      }
    },
    methods: {
      reload() {
        this.getWidth();
        this.prepareSettings();
        this.prepareSlides();
        this.prepareCarousel();
        this.toggleFade();
      },
      toggleFade() {
        let enabled = (!this.settings.disabled && this.settings.fade);
        for (let i = 0; i < this.slidesCount; i++) {
          this.slides[i].style.transition = (enabled)
            ? `opacity ${this.settings.timing} ${this.settings.speed}ms`
            : 'none';
          this.slides[i].style.transform = (enabled)
            ? `translate(-${i * this.widthSlide}px)`
            : 'none';
        }
      },
      toggleAutoPlay() {
        let enabled = (!this.settings.disabled && this.settings.autoplay);
        if (!this.autoplayInterval && enabled) {
          this.autoplayInterval = setInterval(() => {
            if (!document.hidden) {
              if (!this.canGoToNext) this.disableAutoPlay();
              else this.goToNext();
            }
          }, this.settings.autoplaySpeed)
        } else {
          this.disableAutoPlay();
        }
      },
      toggleLoading() {
        this.loading = !this.loading;
      },
      restartAutoPlay() {
        this.disableAutoPlay();
        this.toggleAutoPlay();
      },
      disableAutoPlay() {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      },
      clearAutoPlayPause() {
        clearTimeout(this.autoplayTimeout);
        this.autoplayRemaining = null;
      },
      disableScroll() {
        document.ontouchmove = e => e.preventDefault();
      },
      enableScroll() {
        document.ontouchmove = () => true;
      },
      getCurrentSlide() {
        return this.currentSlide;
      },
      getCurrentBreakpoint() {
        return this.currentBreakpoint;
      },
      getCurrentSettings() {
        return this.settings;
      },
      getInitialSettings() {
        return this.initialSettings;
      },
      goToNext() {
        if (this.canGoToNext) {
          this.goTo(this.currentSlide + 1 * this.settings.slidesToScroll);
        }
      },
      goToPrev() {
        if (this.canGoToPrev) {
          this.goTo(this.currentSlide - 1 * this.settings.slidesToScroll);
        }
      },
      goTo(n, transition = true, asNav = false) {
        if (this.settings.disabled) return false;

        if (!asNav) {
          this.settings.asNavFor.forEach(carousel => {
            if (carousel) carousel.goTo(n, transition, true);
          });
        }

        let realNextSlide = n;

        if (transition) {
          if (this.settings.infinite && n < 0) {
            realNextSlide = this.slidesCount - 1;
          } else if (n >= this.slidesCount) {
            realNextSlide = 0;
          }

          this.$emit('beforeChange', { currentSlide: this.currentSlide, nextSlide: realNextSlide });

          this.currentSlide = realNextSlide;

          if (n !== realNextSlide) {
            setTimeout(() => {
              this.goTo(realNextSlide, false);
            }, this.settings.speed)
          }
        }

        let translateX = (!this.settings.fade) ? n * this.widthSlide : 0;
        this.transitionDelay = (transition) ? this.speed : 0;
        this.translateX = (this.settings.rtl) ? translateX : -1 * translateX;
      },
    },
    created() {
      // Read settings from options object
      if (this.options) {
        for (let key in this.options) {
          this.initialSettings[key] = this.options[key];
        }
      }
      // Sort breakpoints
      if (this.initialSettings.responsive) {
        this.initialSettings.responsive.sort(this.compare);
      }
      // Set first load settings
      Object.assign(this.settings, this.initialSettings);
    },
    mounted() {
      window.addEventListener('resize', this.getWidth);
      if ('ontouchstart' in window) {
        this.$refs.track.addEventListener('touchstart', this.handleMouseDown);
        this.$refs.track.addEventListener('touchend', this.handleMouseUp);
        this.$refs.track.addEventListener('touchmove', this.handleMouseMove);
      } else {
        this.$refs.track.addEventListener('mousedown', this.handleMouseDown);
        this.$refs.track.addEventListener('mouseup', this.handleMouseUp);
        this.$refs.track.addEventListener('mousemove', this.handleMouseMove);
      }
      this.reload();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getWidth);

      this.$refs.track.removeEventListener(('ontouchstart' in window) ? 'touchstart' : 'mousedown', this.handleMouseDown);
      this.$refs.track.removeEventListener(('ontouchstart' in window) ? 'touchend' : 'mouseup', this.handleMouseUp);
      this.$refs.track.removeEventListener(('ontouchstart' in window) ? 'touchmove' : 'mousemove', this.handleMouseMove);

      this.disableAutoPlay();
    },
  }
</script>

<style lang="scss">
  @import "Slider";
</style>
