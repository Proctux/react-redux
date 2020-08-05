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
      files.map(async f => {
        if (ignorePaths.includes(f)) return

        const fullPath = path.join(directoryName, f)
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
const createDevBranch = () =>
  new Promise((resolve, reject) => {
    exec('git fetch --all && git checkout -b dev', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        console.info(stdout)
        resolve('\n\n============== Dev branch created ==============\n\n')
      }
    })
  })

const questionStorybook = stdout => {
  console.info(stdout)
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

const mergeOnMaster = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    exec('git checkout master && git merge --no-edit dev', (error, output) => {
      if (error) {
        reject(error)
      } else {
        console.info(output)
        resolve('\n\n============== Dev branch merged on master ==============\n\n')
      }
    })
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

const finalMessage = stdout => {
  console.info(stdout)
}

const deleteDevBranch = () => {
  exec('git checkout master && git branch -D dev', (error, stdout) => {
    console.info(stdout)
  })
}

// Execute flow
createDevBranch()
  .then(stdout => questionStorybook(stdout))
  .then(stdout => questionServer(stdout))
  .then(stdout => modifyFiles(stdout))
  .then(stdout => mergeOnMaster(stdout))
  .then(stdout => runningYarn(stdout))
  .then(stdout => deleteGit(stdout))
  .then(stdout => finalMessage(stdout))
  .catch(() => deleteDevBranch())
