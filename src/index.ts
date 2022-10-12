#! /usr/bin/env node
import fs from 'fs'
import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { aggregate } from './command/aggregate'
import { entity } from './command/entity'
import { init } from './command/inti'
import { mapper } from './command/mapper'
import { useCase } from './command/use-case'
import { valueObject } from './command/value-object'

yargs(hideBin(process.argv))
  .option('create', {
    describe: 'Create files',
  })
  .option('init', {
    describe: 'Start project DDD',
  })
  .command(
    'create', 'fetch the contents of the URL', (yargs) => {
      return yargs
      .option('name', {
        alias: 'n',
        description: 'Name'
      })
      .option('path', {
        alias: 'p',
        description: 'Path to create'
      })
      .option('module', {
        alias: 'm',
        description: 'Module'
      })
      .option('force', {
        alias: 'f',
        description: 'Force'
      })
      .command(
        'use-case', 
        'create use-case', 
        () => {}, 
        ({name, module}) => {
          if(name && module) {
            useCase(String(module), String(name))
          }
        }
      )
      .command(
        'aggregate', 
        'create aggregate', 
        () => {},
        ({name, module}) => {
          if(name && module) {
            aggregate(String(module), String(name))
          }
        }
      )
      .command(
        'entity', 
        'create entity', 
        () => {},
        ({name, module}) => {
          if(name && module) {
            entity(String(module), String(name))
          }
        }
      )
      .command(
        'value-object', 
        'create value-object', 
        () => {},
        ({name, module}) => {
          if(name && module) {
            valueObject(String(module), String(name))
          }
        }
      )
      .command(
        'mapper', 
        'create mapper', 
        () => {},
        ({name, module, force}) => {
          if(name && module) {
            mapper(String(module), String(name), force === 'true')
          }
        }
      )
    }, (argv) => {
    console.info(argv.url)
    console.log('Test')
  })
  .command(
    'init', 
    'init', 
    () => {}, 
    () => { init() }
  )
  .demandCommand(0)
  .parse()

  function createFile(directoryPath: string, fileName: string, content: string){
    const values = directoryPath.split('/')
    const p = path.join('.', ...values)

    fs.mkdirSync(p, {
      recursive: true
    })

    fs.writeFileSync(`${p}/${fileName}`, content)
  }

  function dtoFileContent(name: string) {
    const pathFile = path.join(__dirname, 'base', 'dto.ts')
    const content = fs.readFileSync(pathFile, 'utf-8')

    return content.replace(/Generic/g, camelize(upperFirstLetter(name)))
  }

  function camelize(str: string) {
    return str.replace(/\W+(.)/g, function(match: any, chr: any)
     {
          return chr.toUpperCase();
      });
  }

  function upperFirstLetter(str: string){
    return str.charAt(0).toUpperCase()
    + str.slice(1)
  }