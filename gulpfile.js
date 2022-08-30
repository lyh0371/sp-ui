import { parallel } from 'gulp'
async function task1() {
  console.log('task1')
}

export default parallel(task1)
