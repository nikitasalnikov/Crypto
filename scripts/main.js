/***accordion***/

var acc = document.getElementsByClassName("accordion");
var i;

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

let burger = document.querySelector(".burger__menu"),
  navList = document.querySelector(".header__nav-list"),
  headerLink = document.querySelectorAll(".header__nav-link"),
  body = document.querySelector("body");

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

let mySwiper;

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
