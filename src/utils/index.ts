import fs from 'fs';
import path from 'path';
// @ts-ignore
import stringReplaceStream from 'string-replace-stream';

function createFile(directoryPath: string, fileName: string, content: string) {
  const values = directoryPath.split('/');
  const p = path.join('.', ...values);

  fs.mkdirSync(p, {
    recursive: true,
  });

  fs.writeFileSync(`${p}/${fileName}`, content);
}

function dtoFileContent(name: string) {
  const pathFile = path.join(__dirname, 'base', 'dto.ts');
  const content = fs.readFileSync(pathFile, 'utf-8');

  return content.replace(/Generic/g, camelize(upperFirstLetter(name)));
}

function camelize(str: string) {
  return str.replace(/\W+(.)/g, function (match: any, chr: any) {
    return chr.toUpperCase();
  });
}

function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

function upperFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowerFirstLetter(str: string) {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1);
}

async function copyDir({ src, dest, ignore, replaceWord }: CopyDirProps) {
  const copy = async (copySrc: string, copyDest: string) => {
    const list = fs.readdirSync(copySrc);
    await Promise.all(
      list.map(async (item) => {
        const curSrc = path.resolve(copySrc, item);
        const curDest = path.resolve(copyDest, item);
        const stat = fs.statSync(curSrc);

        if (stat.isFile()) {
          const fileAlreadyExists = fs.existsSync(curDest);
          if (fileAlreadyExists) return;
          if (ignore && curSrc.includes(ignore)) return;
          const content = fs.createReadStream(curSrc);
          if (replaceWord) {
            content
              .pipe(
                stringReplaceStream(replaceWord?.current, replaceWord?.next),
              )
              .pipe(fs.createWriteStream(curDest));
          } else {
            content.pipe(fs.createWriteStream(curDest));
          }

          await new Promise((resolve, reject) => {
            content.on('end', resolve);
            content.on('error', reject);
          });
        } else if (stat.isDirectory()) {
          fs.mkdirSync(curDest, { recursive: true });
          await copy(curSrc, curDest);
        }
      }),
    );
  };

  try {
    fs.accessSync(dest);
    await copy(src, dest);
  } catch (error) {
    fs.mkdirSync(dest, { recursive: true });
    await copy(src, dest);
  }
}

async function copyFile({
  src,
  dest,
  ignore,
  replaceWord,
  replaceWords,
  forceRewrite,
}: Omit<CopyDirProps, 'callback'>) {
  const fileAlreadyExists = fs.existsSync(dest);
  if (fileAlreadyExists && !forceRewrite) {
    console.warn("File already exists. Add '-f true' to rewrite it.");
    return;
  }

  if (ignore && src.includes(ignore)) return;

  if (!fileAlreadyExists) {
    fs.mkdirSync(dest.split('/').slice(0, -1).join('/'), { recursive: true });
  }

  let content = fs.createReadStream(src);
  if (replaceWords && replaceWords?.length > 0) {
    for (const value of replaceWords) {
      content = content.pipe(stringReplaceStream(value.current, value.next));
    }
    content.pipe(fs.createWriteStream(dest));
  } else if (replaceWord) {
    content
      .pipe(stringReplaceStream(replaceWord?.current, replaceWord?.next))
      .pipe(fs.createWriteStream(dest));
  }

  await new Promise((resolve, reject) => {
    content.on('end', resolve);
    content.on('error', reject);
  });
}

type CopyDirProps = {
  src: string;
  dest: string;
  ignore?: string;
  replaceWord?: {
    current: string;
    next: string;
  };
  replaceWords?: {
    current: string;
    next: string;
  }[];
  forceRewrite?: boolean;
};

function readDir(fullPath: string) {
  fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error);
    files.forEach((file) => console.log(file));
  });
}

function getFileList(dirName: string) {
  let files: string[] = [];
  const items = fs.readdirSync(dirName, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFileList(`${dirName}/${item.name}`)];
    } else {
      files.push(`${dirName}/${item.name}`);
    }
  }

  return files;
}

export {
  camelize,
  createFile,
  dtoFileContent,
  upperFirstLetter,
  copyDir,
  readDir,
  getFileList,
  copyFile,
  camelToSnakeCase,
  lowerFirstLetter,
};
