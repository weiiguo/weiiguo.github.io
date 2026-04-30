(function(document) {
  function getNewsList(heading) {
    var element = heading ? heading.nextElementSibling : null;

    while (element) {
      if (element.tagName === "UL") {
        return element;
      }

      if (/^H[1-6]$/.test(element.tagName)) {
        return null;
      }

      element = element.nextElementSibling;
    }

    return null;
  }

  function updateToggleLabel(button, expanded) {
    button.textContent = expanded ? "Show less news" : "Show older news";
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  }

  function initNewsToggle() {
    var newsList = document.getElementById("news-list");

    if (!newsList) {
      newsList = getNewsList(document.getElementById("news"));
    }

    if (!newsList) {
      return;
    }

    var items = Array.prototype.slice.call(newsList.children).filter(function(item) {
      return item.tagName === "LI";
    });
    var visibleCount = 5;

    if (items.length <= visibleCount) {
      return;
    }

    if (!newsList.id) {
      newsList.id = "news-list";
    }

    newsList.classList.add("news-list");
    newsList.classList.add("news-list--enhanced");

    var toggleButton = document.createElement("button");
    var expanded = false;

    toggleButton.type = "button";
    toggleButton.className = "news-toggle";
    toggleButton.setAttribute("aria-controls", newsList.id);

    updateToggleLabel(toggleButton, expanded);

    toggleButton.addEventListener("click", function() {
      expanded = !expanded;

      newsList.classList.toggle("is-expanded", expanded);
      updateToggleLabel(toggleButton, expanded);
    });

    newsList.insertAdjacentElement("afterend", toggleButton);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNewsToggle);
  } else {
    initNewsToggle();
  }
})(document);
