const textElement = document.getElementById('text')
const optionA = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showLevel(1)
}

function showLevel(LevelIndex) {
  const Level = Levels.find(Level => Level.id === LevelIndex)
  textElement.innerText = Level.text
  while (optionA.firstChild) {
    optionA.removeChild(optionA.firstChild)
  }

  Level.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionA.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextLevelId = option.nextText
  if (nextLevelId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showLevel(nextLevelId)
}

const Levels = [
  {
    id: 1,
    text: 'Najdi poklad. Vyber si levé nebo pravé dveøe.',
    options: [
      {
        text: 'Levé dveøe',
        nextText: 2
      },
      {
        text: 'Pravé dveøe',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Našel jsi meè. Chceè si ho vzít?',
    options: [
      {
        text: 'Ano.',
        setState: { sword: true },
        nextText: 1
      },
      {
        text: 'Ne.',
        setState: { sword: false },
        nextText: 1
      }
    ]
  },
  {
    id: 3,
    text: 'Našel jsi poklad, ale v cestì ti stojí drak.',
    options: [
      {
        text: 'Zabít draka.',
        requiredState: (currentState) => currentState.sword,
        nextText: 4
      },
      {
        text: 'Jít zpìt.',
        nextText: 1
      }
    ]
  },
  {
    id: 4,
    text: 'Super! Zabil jsi draka a získal poklad.',
    options: [
      {
        text: 'Hrát znova.',
        nextText: -1
      }
    ]
  }
]

startGame()