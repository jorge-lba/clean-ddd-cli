import fs from 'fs'
import path from 'path'
//@ts-ignore
import stringReplaceStream from 'string-replace-stream';
import { autoMapperByDomainProps } from '../command/auto-mapper-by-domain-props';

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

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function upperFirstLetter(str: string){
  return str.charAt(0).toUpperCase()
  + str.slice(1)
}

function copyDir ({
  src, dest, callback, ignore, replaceWord
}: CopyDirProps){
  const copy = (copySrc: string, copyDest: string) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err);
        return;
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item);
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err);
          } else {
            const curSrc = path.resolve(copySrc, item);
            const curDest = path.resolve(copyDest, item);
            
            if (stat.isFile()) {
              const fileAlreadyExists = fs.existsSync(curDest)
              if(fileAlreadyExists) return
              if(ignore && curSrc.includes(ignore)) return
              const content = fs.createReadStream(curSrc)
              if(replaceWord){
                content
                .pipe(stringReplaceStream(replaceWord?.current, replaceWord?.next))
                .pipe(fs.createWriteStream(curDest));
              } else {
                content.pipe(fs.createWriteStream(curDest));
              }
              
            } else if (stat.isDirectory()) {
              fs.mkdirSync(curDest, { recursive: true });
              copy(curSrc, curDest);
            }
          }
        });
      });
    });
  };

  fs.access(dest, (err) => {
    if (err) {
      fs.mkdirSync(dest, { recursive: true });
    }
    copy(src, dest);
  });
};

function copyFile({
  src,
  dest, 
  ignore,
  replaceWord,
  replaceWords,
  forceRewrite
}: Omit<CopyDirProps, 'callback'>){
  const fileAlreadyExists = fs.existsSync(dest)
  if(fileAlreadyExists && !forceRewrite){
    console.warn(`File already exists. Add '-f true' to rewrite it.`)
    return
  } 

  if(ignore && src.includes(ignore)) return

  if(!fileAlreadyExists) fs.mkdirSync(
    dest.split('/').slice(0, -1).join('/'), 
    { recursive: true }
  );

  let content = fs.createReadStream(src)
  if(replaceWords && replaceWords?.length > 0){
    for(let value of replaceWords ){
      content = content.pipe(stringReplaceStream(value.current, value.next))
    }
    content.pipe(fs.createWriteStream(dest));
    // content.on('end', () => autoMapperByDomainProps(dest, 'string'))
  } else if(replaceWord){
    content
    .pipe(stringReplaceStream(replaceWord?.current, replaceWord?.next))
    .pipe(fs.createWriteStream(dest));
  } else {
    // content.pipe(fs.createWriteStream(dest));
  }

}

type CopyDirProps = {
  src: string,
  dest: string,
  callback: (err: any) => any,
  ignore?: string,
  replaceWord?: {
    current: string,
    next: string
  },
  replaceWords?: {
    current: string,
    next: string
  }[],
  forceRewrite?: boolean,
}

function readDir(fullPath: string){
  fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error)
    files.forEach( file => console.log(file))
    })
}

function getFileList (dirName: string) {
  let files: string[] = [];
  const items = fs.readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...getFileList(`${dirName}/${item.name}`),
      ];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
};

export {
  camelize,
  createFile, 
  dtoFileContent,
  upperFirstLetter,
  copyDir,
  readDir,
  getFileList,
  copyFile,
  camelToSnakeCase
}