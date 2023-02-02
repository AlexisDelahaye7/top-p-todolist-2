function closestWithinChildren(element, selector) {
    let node = element;
    while (node) {
      if (node.matches(selector)) {
        return node;
      }
      node = Array.from(node.children).find(child => child.matches(selector)) || node.parentElement;
    }
    return null;
  }
  