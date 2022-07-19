import * as core from '@actions/core'

export const clearEnv = () => {
  try {
    const pattern = core.getInput('pattern')
    const re = new RegExp(pattern)
    Object.keys(process.env)
      .filter((key) => key.match(re))
      .forEach((key) => {
        core.info(`clear ${key}`)
        core.exportVariable(key, '')
      })
  } catch (error) {
    core.setFailed(error.message)
  }
}
