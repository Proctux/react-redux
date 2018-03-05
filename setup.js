/* eslint-disable */
const readline = require('readline')
const { exec } = require('child_process')

const Promise = require('bluebird')

const rl = readline.createInterface(process.stdin, process.stdout)

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
    rl.question('Would you like to use storybook?\n1- Yes\n2- No\n', answer => {
      if (answer === '1') {
        exec('git merge origin/storybook', (error, output) => {
          if (error) {
            reject(error)
          }
          console.info(output)
          resolve('\n\n============== Merged storybook branch ==============\n\n')
        })
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
    rl.question('Would you like to use express server with ssr?\n1- Yes\n2- No\n', answer => {
      if (answer === '1') {
        exec('git merge origin/ssr', (error, output) => {
          if (error) {
            reject(error)
          }
          console.info(output)
          resolve('\n\n============== Merged ssr branch ==============\n\n')
        })
      } else if (answer === '2') {
        resolve('\n\n============== No expresss server with ssr selected ==============\n\n')
      } else {
        reject(answer)
      }
      rl.close()
    })
  })
}

const mergeOnMaster = stdout => {
  console.info(stdout)
  return new Promise((resolve, reject) => {
    exec('git checkout master && git merge dev', (error, output) => {
      if (error) {
        reject(error)
      } else {
        console.info(output)
        resolve('\n\n============== Dev branch merged on master ==============\n\n')
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
  .then(stdout => mergeOnMaster(stdout))
  .then(stdout => deleteGit(stdout))
  .then(stdout => finalMessage(stdout))
  .catch(() => deleteDevBranch())
