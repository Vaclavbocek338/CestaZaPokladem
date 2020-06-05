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
    text: 'Najdi poklad. Vyber si lev� nebo prav� dve�e.',
    options: [
      {
        text: 'Lev� dve�e',
        nextText: 2
      },
      {
        text: 'Prav� dve�e',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Na�el jsi me�. Chce� si ho vz�t?',
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
    text: 'Na�el jsi poklad, ale v cest� ti stoj� drak.',
    options: [
      {
        text: 'Zab�t draka.',
        requiredState: (currentState) => currentState.sword,
        nextText: 4
      },
      {
        text: 'J�t zp�t.',
        nextText: 1
      }
    ]
  },
  {
    id: 4,
    text: 'Super! Zabil jsi draka a z�skal poklad.',
    options: [
      {
        text: 'Hr�t znova.',
        nextText: -1
      }
    ]
  }
]

startGame()