// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )

// const container = document.getElementById("root")
// ReactDOM.render(element, container)

// ****************

function createElement(type, props, ...children) { // rest parameter syntax will cause
// all remaining parameters to be placed in an array
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === "object" 
          ? child 
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

function render(element, container) {
  // create a textnode or regular node accordingly
  const dom = 
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)

  // assign element props to the node
  const isProperty = key => key !== "children"
  Object.keys(element.props) // "id"
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  // recursively render each child node
  element.props.children.forEach(child => {
    render(child, dom)
  })

  // append the dom node to the container
  container.appendChild(dom)
}

let nextUnitOfWork = null

function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {

}

const Freact = {
  createElement,
  render,
}

/** @jsx Freact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

const container = document.getElementById("root")
Freact.render(element, container)