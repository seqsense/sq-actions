import * as core from '@actions/core'
import cp from 'child_process'

export const dockerRun = () => {
  try {
    const image = core.getInput('image')
    const imageRegex = new RegExp('^[a-zA-Z0-9-./]+:[a-zA-Z0-9-]+$')
    if (!imageRegex.test(image)) {
      core.setFailed(`invalid image tag: ${image}`)
      return
    }

    const ports = core
      .getInput('ports')
      .trim()
      .split(/\s/)
      .map((p) => {
        const f = p.split(':')
        return `-p ${parseInt(f[0])}:${parseInt(f[1])}`
      })
      .join(' ')

    const containerId = cp
      .execSync(`docker run -d ${ports} ${image}`)
      .toString()
    core.saveState('containerId', containerId)
  } catch (error) {
    core.setFailed(error.message)
  }
}

export const dockerRunPost = () => {
  try {
    const containerId = core.getState('containerId')
    cp.execSync(`docker kill ${containerId}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}
