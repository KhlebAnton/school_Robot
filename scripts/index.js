const swiper = document.getElementById('swiper');
const slideNext = document.querySelector('slider-next');
const slidePrev = document.querySelector('slider-prev');
const sliderBar = document.querySelector('.slider-bar-vision');
const sliders = swiper.querySelectorAll('.slide');

let sliderOnVisible = 0;
let widthSliderBar = document.querySelector('.slider-bar').clientWidth;
sliders.forEach((slide) => {
    let swiperRight = parseInt(swiper.getBoundingClientRect().right);
    let lastSlide = parseInt(slide.getBoundingClientRect().right)
    if (swiperRight >= lastSlide) {
        sliderOnVisible++;
    }
});

sliderBar.style.width = `calc(${widthSliderBar}px / ${sliders.length} * ${sliderOnVisible})`;


function nextSlide() {
    let swiperRight = parseInt(swiper.getBoundingClientRect().right);
    let lastSlide = parseInt(sliders[sliders.length - 1].getBoundingClientRect().right)
    if (swiperRight <= lastSlide) {
        sliders.forEach((slide) => {
            slide.style.left = (parseInt(slide.style.left) - slide.clientWidth) + 'px';
        });
        sliderBar.style.marginLeft = parseInt(sliderBar.style.marginLeft) + widthSliderBar / sliders.length + 'px';
    }


}
function prevSlide() {
    let swiperLeft = parseInt(swiper.getBoundingClientRect().left);
    let firstSlide = parseInt(sliders[0].getBoundingClientRect().right)
    if (swiperLeft >= firstSlide) {
        sliders.forEach((slide) => {
            slide.style.left = (parseInt(slide.style.left) + slide.clientWidth) + 'px';

        });
        sliderBar.style.marginLeft = parseInt(sliderBar.style.marginLeft) - widthSliderBar / sliders.length + 'px';
    }

}
// Вешаем на прикосновение функцию handleTouchStart
swiper.addEventListener('touchstart', handleTouchStart, false);
// А на движение пальцем по экрану - handleTouchMove      
swiper.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            nextSlide()
        } else {
            prevSlide()
        }
    } 
    /* reset values */
    xDown = null;
    yDown = null;
};


function scrollToWind(id) {
    let coordY = document.getElementById(id).getBoundingClientRect().top;
    window.scrollTo({
        top: coordY,
        behavior: 'smooth'
    });
}