const fs = require('fs')
const path = require('path')
const readline = require('readline')
const { exec } = require('child_process')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

const ignorePaths = ['node_modules', '.git', '.vscode', '.gitignore', 'yarn.lock', 'setup.js']
const stepsAnswers = { storybook: false, ssr: false }

const getRegularExpression = key =>
  new RegExp(`(// <${key}>|{/\\* <${key}> \\*/})([\\s\\S]*?)(// </${key}>|{/\\* </${key}> \\*/})`)

const scanAndReplace = async (directoryName = './', results = []) => {
  const stepsAnswersKeys = Object.keys(stepsAnswers)
  const files = await readdir(directoryName)
  try {
    await Promise.all(
      files.map(async file => {
        if (ignorePaths.includes(file)) {
          return
        }

        const fullPath = path.join(directoryName, file)
        const stats = await stat(fullPath)
        if (stats.isDirectory()) {
          await scanAndReplace(fullPath, results)
        } else {
          const originalContent = await readFile(fullPath, 'utf8')
          let newContent = originalContent

          stepsAnswersKeys.forEach(key => {
            if (getRegularExpression(key).test(newContent)) {
              const re = getRegularExpression(key)

              let match = re.exec(newContent)
              while (match) {
                if (stepsAnswers[key]) {
                  newContent = newContent.replace(getRegularExpression(key), match[2])
                } else {
                  newContent = newContent.replace(getRegularExpression(key), '')
                }
                match = re.exec(newContent)
              }
            }
          })
          if (originalContent !== newContent) {
            await writeFile(fullPath, newContent)
          }
          results.push(fullPath)
        }
      })
    )
  } catch (error) {
    throw error
  }
  return results
}

// Setup functions
const questionStorybook = () => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface(process.stdin, process.stdout)
    rl.question('Would you like to use storybook?\n1- Yes\n2- No\n', answer => {
      if (answer === '1') {
        stepsAnswers.storybook = true
        resolve('\n\n=============== Storybook selected ================\n\n')
      } else if (answer === '2') {
        resolve('\n\n============== No storybook selected ==============\n\n')
      } else {
        reject(answer)
      }
      rl.close()
    })
  })
}

const questionServer = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface(process.stdin, process.stdout)
    rl.question('Would you like to use express server with ssr?\n1- Yes\n2- No\n', answer => {
      if (answer === '1') {
        stepsAnswers.ssr = true
        resolve('\n\n================ Expresss server with ssr selected ===============\n\n')
      } else if (answer === '2') {
        resolve('\n\n============== No expresss server with ssr selected ==============\n\n')
      } else {
        reject(answer)
      }
      rl.close()
    })
  })
}

const modifyFiles = stdout => {
  console.info(stdout)
  return new Promise(async (resolve, reject) => {
    try {
      await scanAndReplace()
      exec('yarn eslint-fix && cross-env NODE_ENV=test prettier --write *.js', (error, output) => {
        console.info(output)
        resolve('\n\n============== Files successfully modified ==============\n\n')
      })
    } catch (error) {
      reject(error)
    }
  })
}

const runningYarn = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    exec('yarn', (error, output) => {
      if (error) {
        reject(error)
      } else {
        console.info(output)
        resolve('\n\n============== Yarn executed successfully ==============\n\n')
      }
    })
  })
}

const deleteGit = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    exec('rm -rf .git/ && rm -rf setup.js', (error, output) => {
      if (error) {
        reject(error)
      } else {
        console.info(output)
        resolve('\n\n============== Delete git and setup files ==============\n\n')
      }
    })
  })
}

const initGit = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    exec('git init', (error, output) => {
      if (error) {
        reject(error)
      } else {
        console.info(output)
        const rl = readline.createInterface(process.stdin, process.stdout)
        rl.question(
          'Would you like to add a remote origin to git?\n1- Yes\n2- No\n',
          selectedOption => {
            rl.close()
            if (selectedOption === '1') {
              rl.question(
                'Type in the origin url. e.g. https://github.com/JungleDevs/boilerplate-react.git',
                answer => {
                  exec(`git remote add origin ${answer}`, (gitRemoteError, gitRemoteOutput) => {
                    console.info(gitRemoteOutput)
                    if (gitRemoteError) {
                      reject(gitRemoteError)
                    } else {
                      resolve('\n\n============== Git successfully initiated ==============\n\n')
                    }
                    rl.close()
                  })
                }
              )
            } else if (selectedOption === '2') {
              resolve('\n\n============== Git successfully initiated ==============\n\n')
            } else {
              reject(selectedOption)
            }
          }
        )
      }
    })
  })
}

const finalMessage = stdout => {
  console.info(stdout)
}

const restoreBranch = () => {
  exec('git fetch origin && git reset --hard origin/master', (error, stdout) => {
    console.info(stdout)
  })
}

// Execute flow
questionStorybook()
  .then(stdout => questionServer(stdout))
  .then(stdout => modifyFiles(stdout))
  .then(stdout => runningYarn(stdout))
  .then(stdout => deleteGit(stdout))
  .then(stdout => initGit(stdout))
  .then(stdout => finalMessage(stdout))
  .catch(restoreBranch)
