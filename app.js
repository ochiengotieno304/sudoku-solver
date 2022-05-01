const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const squares = 81
let submission = []

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement('input')
  inputElement.setAttribute('type', 'number')
  inputElement.setAttribute('min', 1)
  inputElement.setAttribute('max', 9)
  puzzleBoard.appendChild(inputElement)

  if (i % 9 == 0) {
    inputElement.classList.add('shaded')
  }
}


// join values push them to submission
const joinValues = () => {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    if (input.value) {
      submission.push(input.value)
    } else {
      submission.push('.')
    }
  })

  console.log(submission)
}

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll('input')
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i]
    })
  }
}

// Solve Function
const solve = () => {
  joinValues()
  const data = { numbers: submission.join('') }
  console.log('data', data)

  fetch('http://localhost:5000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(
      data => {
        console.log(data),
          populateValues(data.solvable, data.solution),
          submission = []
      }
    )
    .catch((error) => {
      console.error('Error', error)
    })
}



solveButton.addEventListener('click', solve)