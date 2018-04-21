// ui elements
var ui = {
  buttons: document.querySelectorAll('.btn'),
  output: document.querySelector('.output')
}

// calculator state
var state = {
  outputNumber: '',
  bufferNumber: 0,
  operator:  null,
  resetOnNext: false
}


// helper function to guess if a value is a number
function isNumber(value) {
  return !isNaN(parseInt(value, 10))
}

// run the operation with the given operator and operands
function operation(operator, a, b) {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      return a / b
    default:
      return b
  }
}

// helper function to update the output string for a given state and input
function output(input, outputString='', reset) {
  // no need to append anything when we reset or when the only thing in the output is 0
  if (reset || outputString === '0') {
    return String(input)
  } else {
    return String(outputString + input)
  }
}

// callback for when the user clicks a button
function handleButtonClick(event) {
  // get the text written inside the clicked button
  var value = event.target.innerHTML

  // clear the calculator state
  if (value === 'C') {
    state.bufferNumber = 0
    state.outputNumber = ''
    state.operator = null
    state.resetOnNext = false

  // execute the operation and update the output string
  } else if (value === '=') {
    state.bufferNumber = operation(state.operator, state.bufferNumber, parseFloat(state.outputNumber, 10))
    state.outputNumber = output(state.bufferNumber)
    state.operator = null
    state.resetOnNext = true

  // add a coma if there is not one already
  } else if (value === '.') {
    if (!state.outputNumber.includes('.')) {
      state.outputNumber = output('.', state.outputNumber, state.resetOnNext)
      state.resetOnNext = false
    }

  // append the pressed number to the end of the output string
  } else if (isNumber(value)) {
    state.outputNumber = output(value, state.outputNumber, state.resetOnNext)
    state.resetOnNext = false

  // execute the last operation in memory and prepare for a new one
  } else { // if operator
    state.bufferNumber = operation(state.operator, state.bufferNumber, parseFloat(state.outputNumber, 10))
    state.outputNumber = output(state.bufferNumber)
    state.operator = value
    state.resetOnNext = true
  }

  // update the output content in the HTML
  ui.output.innerHTML = state.outputNumber
}


// for each found button on the page
for (var button of ui.buttons) {
  // make it react every time it is clicked
  button.addEventListener('click', handleButtonClick)
}

