import path from 'path'
import { copyDir, getFileList } from "../utils"

function init(){
  const files = new Set<string>()
  const pathFolder = path.join(__dirname, '..', '..', 'src', 'base', 'core')
  getFileList(pathFolder)
  .filter(file =>  !file.includes('.spec'))
  .map(file => {
    const values = file.split('/')
    values.pop()

    return values.join('/')
  })
  .forEach(file => files.add(file))

  Array.from(files.values())
  .forEach(file => copyDir({
    src: file,
    dest: file.replace(pathFolder, 'src/core'),
    ignore: '.spec.ts',
    callback: console.log
  }))
}

export { init }
