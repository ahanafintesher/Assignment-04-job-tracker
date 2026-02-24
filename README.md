## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Answer:**  
getElementById finds one element using its unique ID, getElementsByClassName finds multiple elements by class name, and querySelector/querySelectorAll let you select elements using any CSS selector.

---

## 2. How do you create and insert a new element into the DOM?

**Answer:**  
You create a new element with `document.createElement()` and insert it into the page using methods like `append()` or `appendChild()`.

---

## 3. What is Event Bubbling? And how does it work?

**Answer:**  
Event Bubbling means when you click something, the event first happens on that element and then moves up to its parent elements.

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

**Answer:**  
Event Delegation is when you add one event listener to a parent instead of many children, so it can handle events for all child elements.

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?

**Answer:**  
preventDefault() stops the browser’s default behavior and stopPropagation() stops the event from moving up to parent elements.
