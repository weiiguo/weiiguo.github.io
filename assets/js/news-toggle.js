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

  document.addEventListener("DOMContentLoaded", function() {
    var newsHeading = document.getElementById("news");
    var newsList = getNewsList(newsHeading);

    if (!newsList) {
      return;
    }

    var items = Array.prototype.slice.call(newsList.children).filter(function(item) {
      return item.tagName === "LI";
    });
    var visibleCount = 5;
    var hiddenItems = items.slice(visibleCount);

    if (hiddenItems.length === 0) {
      return;
    }

    if (!newsList.id) {
      newsList.id = "news-list";
    }

    newsList.classList.add("news-list--enhanced");

    hiddenItems.forEach(function(item) {
      item.hidden = true;
    });

    var toggleButton = document.createElement("button");
    var expanded = false;

    toggleButton.type = "button";
    toggleButton.className = "news-toggle";
    toggleButton.setAttribute("aria-controls", newsList.id);

    updateToggleLabel(toggleButton, expanded);

    toggleButton.addEventListener("click", function() {
      expanded = !expanded;

      hiddenItems.forEach(function(item) {
        item.hidden = !expanded;
      });

      updateToggleLabel(toggleButton, expanded);
    });

    newsList.insertAdjacentElement("afterend", toggleButton);
  });
})(document);
