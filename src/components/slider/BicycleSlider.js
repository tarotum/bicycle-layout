import "./style.scss";

export default class BicycleSlider {
  constructor({
    mainClass,
    itemClass,
    dotClass,
    activeClass,
    dotsWrapper,
    interval
  }) {
    this.slider = document.querySelector(`.${mainClass || "slider"}`);
    this.slides = this.slider.querySelectorAll(
      `.${itemClass || "slider__item"}`
    );
    this.activeClass = activeClass || "active";
    this.dotClass = dotClass || "slider__dot";
    this.dotsWrapper = this.slider.querySelector(
      `.${dotsWrapper || "slider__dots"}`
    );
    this.interval = interval || 3000;

    this.dots = null;
    this.position = 0;
    this.isHover = false;

    this.init();
  }

  /**
   *  Build dots
   */
  init() {
    // Create and and slider dots in DOM
    const sliderDots = document.createDocumentFragment();

    for (let i = 0; i < this.slides.length; i++) {
      const Dot = document.createElement("button");
      Dot.className = this.dotClass;
      Dot.setAttribute("data-index", i);
      Dot.onclick = ({ currentTarget }) => {
        const index = currentTarget.getAttribute("data-index");
        this.setPositionByIndex(index);
      };
      if (i === this.position) Dot.classList.add(this.activeClass);
      sliderDots.appendChild(Dot);
    }

    this.dotsWrapper.appendChild(sliderDots);

    this.dots = this.dotsWrapper.querySelectorAll(`.${this.dotClass}`);
    this.slides[0].classList.add(this.activeClass);

    // Detect onhover
    this.slider.onmouseover = () => {
      this.isHover = true;
    };
    this.slider.onmouseout = () => {
      this.isHover = false;
    };

    /**
     * Auto change slider position
     */
    setInterval(() => {
      if (!this.isHover) this.increaseIndex();
    }, this.interval);
  }

  /**
   * Remove active class from slides and dots
   */
  removeActive() {
    this.dots.forEach(dot => dot.classList.remove(this.activeClass));
    this.slides.forEach(slide => slide.classList.remove(this.activeClass));
  }
  /**
   * Set active class in slides and dots
   * @param {Number} index
   */
  setPositionByIndex(index) {
    this.removeActive();

    this.slides[index].classList.toggle(this.activeClass);
    this.dots[index].classList.toggle(this.activeClass);
  }
  /**
   * Increase slider position
   * if position === last then position = 0
   */
  increaseIndex() {
    this.removeActive();

    if (this.position === this.slides.length - 1) {
      this.slides[0].classList.add(this.activeClass);
      this.dots[0].classList.add(this.activeClass);
      this.position = 0;
    } else {
      this.slides[this.position + 1].classList.add(this.activeClass);
      this.dots[this.position + 1].classList.add(this.activeClass);

      this.position++;
    }
  }
}
