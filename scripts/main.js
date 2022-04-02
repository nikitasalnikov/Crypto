let burger = document.querySelector(".burger__menu"),
  navList = document.querySelector(".header__nav-list"),
  headerLink = document.querySelectorAll(".header__nav-link"),
  body = document.querySelector("body");

let mySwiper;
var acc = document.getElementsByClassName("accordion");
var i;

("use strict");

window.onload = function () {
  const headerContent = document.querySelector(".header__content");

  if (headerContent) {
    const blueCandles = document.querySelector(".header__content-bg");

    //Коэффиценты
    const forCandles = 40;

    //Скорость анимации
    const speed = 1;

    //обьявление переменных

    let positionX = 0,
      positionY = 0;
    let coordXprocent = 0,
      coordYprocent = 0;

    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + distX * speed;
      positionY = positionY + distY * speed;

      blueCandles.style.cssText = `
        transform: translate(${positionX / forCandles}%, ${
        positionY / forCandles
      }%);
      transition: 0.5s;
      `;

      requestAnimationFrame(setMouseParallaxStyle);
    }
    setMouseParallaxStyle();

    headerContent.addEventListener("mouseover", function (e) {
      const parallaxWidth = headerContent.offsetWidth;
      const parallaxHeight = headerContent.offsetHeight;

      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      coordXprocent = (coordX / parallaxWidth) * 100;
      coordYprocent = (coordY / parallaxHeight) * 100;
    });

    let thresholdSets = [];

    for (let i = 0; i <= 1; i += 0.05) {
      thresholdSets.push(i);
    }
    const callback = function (entries, observer) {
      const scrollTopProcent =
        (window.pageYOffset / headerContent.offsetHeight) * 100;
      setParallaxItemsStyle(scrollTopProcent);
    };
    const observer = new IntersectionObserver(callback, {
      threshold: thresholdSets,
    });
    observer.observe(blueCandles);

    function setParallaxItemsStyle(scrollTopProcent) {
      blueCandles.style.cssText = `transform: translate(0%, -${
        scrollTopProcent / 6
      }%);
      transition: 0.5s;`;
    }
  }
};

/***accordion***/

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/***burger menu***/

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navList.classList.toggle("active");
  body.classList.toggle("active");
});
function activeRemove() {
  if (window.innerWidth > 1000) {
    navList.classList.remove("active");
    burger.classList.remove("active");
    body.classList.remove("active");
  }
}
window.addEventListener("resize", () => activeRemove());

for (let i = 0; i < headerLink.length; i++) {
  headerLink[i].addEventListener("click", () => {
    burger.classList.remove("active");
    navList.classList.toggle("active");
    body.classList.remove("active");
  });
}

/****slider****/

const slider = document.querySelector(".swiper");

function mobileSlider() {
  if (window.innerWidth <= 768 && slider.dataset.mobile == "false") {
    mySwiper = new Swiper(slider, {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      slideClass: "swiper-slide",
    });

    slider.dataset.mobile = true;
  } else if (window.innerWidth > 768 && mySwiper) {
    slider.dataset.mobile = false;
    console.log(mySwiper);
    mySwiper.destroy();
  }
}

mobileSlider();

window.addEventListener("resize", () => {
  mobileSlider();
});
