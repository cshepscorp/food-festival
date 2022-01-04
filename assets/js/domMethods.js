function createEl(htmlString, attrs, ...children) {
    if (typeof htmlString !== "string") {
      throw Error("Argument 'htmlString' is required and must be a string");
    }
  
    const el = document.createElement(htmlString);
  
    if (typeof attrs === "object") {
      for (let key in attrs) {
        if (key.substring(0, 2) === "on") {
          el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
        } else {
          el.setAttribute(key, attrs[key]);
        }
      }
    }
  
    children.forEach(function(child) {
      let node;
  
      if (child.constructor.name.includes("Element")) {
        node = child;
      } else {
        node = document.createTextNode(child);
      }
  
      el.appendChild(node);
    });
  
    return el;
  };

// we are able to use require() and module.exports in the front-end environment because we created a Node.js application to handle our front-end asset management.
module.exports = createEl;