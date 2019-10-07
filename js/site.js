(function() {
  var technologies = [['W', 'e', 'b'], ['M', 'o', 'b', 'i', 'l', 'e'], ['T', 'a', 'b', 'l', 'e', 't'], ['D', 'e', 's', 'k', 't', 'o', 'p'], ['C', 'l', 'o', 'u', 'd']];
  var technologiesContainer = document.querySelector(".technologies");
  var technologyIndex = 0;
  var wordIndex = 0;
  var deleting = false;

  function technologyAnimationFrame() {
    if (!deleting) {
      technologiesContainer.innerText += technologies[technologyIndex][wordIndex];
      if (wordIndex == technologies[technologyIndex].length - 1) {
        technologyIndex = technologyIndex == technologies.length - 1 ? 0 : technologyIndex + 1;
        deleting = true;
        setTimeout(technologyAnimationFrame, 1000);
      } else {
        wordIndex++;
        setTimeout(technologyAnimationFrame, 100);
      }
    } else {
      technologiesContainer.innerText = technologiesContainer.innerText.substring(0, technologiesContainer.innerText.length - 1);
      if (wordIndex == 0) {
        deleting = false;
        setTimeout(technologyAnimationFrame, 1000);
      } else {
        wordIndex--;
        setTimeout(technologyAnimationFrame, 100);
      }
    }
  };

  function addEventListeners() {
    window.addEventListener("resize", function() {
      var container = document.querySelector(".container");
      container.style.paddingTop = window.innerHeight / 2 - container.offsetHeight / 2 + "px";
    });
  };

  function initialLoad() {
    technologyAnimationFrame();
    var container = document.querySelector(".container");
    container.style.paddingTop = window.innerHeight / 2 - container.offsetHeight / 2 + "px";
  };

  document.addEventListener("DOMContentLoaded", function() {
    initialLoad();
    addEventListeners();
  });

})();