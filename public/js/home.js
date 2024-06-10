

document.addEventListener("DOMContentLoaded", function() {
  let lazyVideos = [...document.querySelectorAll("video.lazy")]
 
  if ("IntersectionObserver" in window) {
    let lazyVideoObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (let source in video.target.children) {
            let videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }
 
          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });
 
    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
 });




function toggle_read_more(className) {
  const readMore = document.getElementById(className);
  readMore.parentElement.classList.toggle('active');
  if (readMore.textContent ===  'Less More') {
    readMore.innerText = 'See More'
  } else {
    readMore.innerText = 'Less More'
  }
}


$(document).ready(function () {
  $(".stepsSwiper video").hover(function () {
      $(this)[0].play();
      $(".marquee-two").stop();
  }, function () {
      var el = $(this)[0];
      el.pause();
      el.currentTime = 0;
  });
});

//steps

document.addEventListener("DOMContentLoaded", function() {
var text1 = document.getElementById('text1');
text1.classList.add('active');
// Trigger click event on Text 1 to change the animation content
text1.click();
});

function changeContent(animationName, textId) {
var animationPath = '';
switch (animationName) {
case 'animation1':
  animationPath = './assets/videos/step1.json'; // Path to your first animation
  break;
case 'animation2':
  animationPath = './assets/videos/step2.json'; // Path to your second animation
  break;
case 'animation3':
  animationPath = './assets/videos/step3.json'; // Path to your third animation
  break;
}

// Load the Lottie animation
var animationContainer = document.getElementById('animationContainer');
animationContainer.innerHTML = ''; // Clear previous animation
var animation = bodymovin.loadAnimation({
container: animationContainer,
renderer: 'svg',
loop: true,
autoplay: true,
path: animationPath
});



// Move the text container
var container = document.getElementById('textContainer');
var textElement = document.getElementById(textId);
var currentPosition = container.getBoundingClientRect().top;
var targetPosition = textElement.getBoundingClientRect().top;
var difference = targetPosition - currentPosition;

// Remove active class from all text elements
var textElements = container.querySelectorAll('p');
textElements.forEach(function(element) {
element.classList.remove('active');
});

// Add active class to the clicked text element
textElement.classList.add('active');

// Move the clicked text element up
container.style.transform = `translateY(-${difference}px)`;
}

// Function to load Lottie animations
function loadLottieAnimation(containerId, animationPath,width, height) {
var container = document.getElementById(containerId);

container.style.width = width + 'px'; // Set width
container.style.height = height + 'px'; // Set height

var anim = lottie.loadAnimation({
  container: container,
  renderer: 'svg', // You can choose the renderer - svg / canvas / html
  loop: true,
  autoplay: true,
  path: animationPath // Path to your animation JSON file
});
}


loadLottieAnimation('lottie-container1', './assets/videos/first-video.json');

loadLottieAnimation('lottie-container2', './assets/videos/second-video.json');

loadLottieAnimation('lottie-container3', './assets/videos/third-video.json');

loadLottieAnimation('lottie-container4', './assets/videos/fourth-video.json');

loadLottieAnimation('lottie-main-video', './assets/videos/Hero Animation.json');

loadLottieAnimation('lottie-container5', './assets/videos/Hero Animation.json');



// Add more animations as needed

$(".sec-btn, .dropdown-toggle").click(function(){
$(this).parent('li').toggleClass("menu-open").siblings().removeClass();
});

$(document).scroll(function () {
var $nav = $("#vidzy-navbar");
$nav.toggleClass('stciky', $(this).scrollTop() > $nav.height());
});

$('#type-text').typed({
strings: [
  "", "Creativity.", "Innovation.", "Social Media Influencers.", "Celebrities.", "Story Telling."
],
typeSpeed: 75,
backSpeed: 75,
backDelay: 400,
startDelay: 200,
loop: true,
showCursor: false,
cursorChar: "|",
attr: null,
});

function toggle_read_more(className) {
const readMore = document.getElementById(className);
readMore.parentElement.classList.toggle('active');
if (readMore.textContent ===  'Less More') {
readMore.innerText = 'See More'
} else {
readMore.innerText = 'Less More'
}
}

function scrollToTop() {
// $("html, body").animate({ scrollTop: 0 }, "slow");
addEventListener("click",()=>{
  scrollTo(0,0)
})

}

var swiper = new Swiper(".testiSwiper", {
slidesPerView: 1,
spaceBetween: 30,
freeMode: true,
pagination: {
el: ".swiper-pagination",
clickable: true,
},
autoplay: {
delay: 2000,
},
breakpoints: {
320: {
slidesPerView: 1.1,
spaceBetween: 15,
},
480: {
slidesPerView: 1.3,
spaceBetween: 20,
},
576: {
slidesPerView:1.3,
spaceBetween:15,
spaceBetween:0,
},     
768: {
slidesPerView: 1.2,
spaceBetween: 15,
},
992: {
slidesPerView:2,
spaceBetween:15,
},
1200: {
slidesPerView:2.5,
spaceBetween: 1,
centeredSlides: true,
spaceBetween:20
},    
},
});