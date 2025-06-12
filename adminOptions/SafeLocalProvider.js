// const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { BaseProvider } = require('@adminjs/upload');

// class SafeLocalProvider extends BaseProvider {
//   constructor(bucket, opts = {}) {
//     super(bucket, opts);
//     this.bucket = bucket;
//     this.opts = opts;
//   }

//   path(key) {
//     return path.join(this.bucket, key);
//   }
  

//   async upload(file, key) {
//     const destination = this.path(key);
//     console.log(`Uploading file to: ${destination}`);
//     await fsp.mkdir(path.dirname(destination), { recursive: true });

//     await fsp.copyFile(file.path, destination);
//     await fsp.unlink(file.path);
//     console.log(`File uploaded: ${destination}`);
//   }

//   async delete(key) {
//     const destination = this.path(key);
//     console.log(`Deleting file: ${destination}`);
//     await fsp.unlink(destination).catch(() => {});
//     console.log(`File deleted: ${destination}`);
//   }

//   async exists(key) {
//     const destination = this.path(key);
//     try {
//       await fsp.access(destination);
//       console.log(`File exists: ${destination}`);
//       return true;
//     } catch {
//       console.log(`File not found: ${destination}`);
//       return false;
//     }
//   }
// }

class SafeLocalProvider extends BaseProvider {
  constructor(bucket, opts = {}) {
    super(bucket, opts);
    this.bucket = bucket;
    this.opts = opts;
  }

  path(key) {
    return path.join(this.bucket, key);
  }

  publicPath(key) {
    // Возвращает относительный публичный URL для файла
    return `${this.opts.baseUrl}/${key}`;
  }

  async upload(file, key) {
    const destination = this.path(key);
    console.log(`Uploading file to: ${destination}`);
    await fsp.mkdir(path.dirname(destination), { recursive: true });

    await fsp.copyFile(file.path, destination);
    await fsp.unlink(file.path);
    console.log(`File uploaded: ${destination}`);
  }

  async delete(key) {
    const destination = this.path(key);
    console.log(`Deleting file: ${destination}`);
    await fsp.unlink(destination).catch(() => {});
    console.log(`File deleted: ${destination}`);
  }

  async exists(key) {
    const destination = this.path(key);
    try {
      await fsp.access(destination);
      console.log(`File exists: ${destination}`);
      return true;
    } catch {
      console.log(`File not found: ${destination}`);
      return false;
    }
  }
}


module.exports = SafeLocalProvider;

// const { BaseProvider } = require('@adminjs/upload');
// const path = require('path');
// const fsp = require('fs/promises');

// class SafeLocalProvider extends BaseProvider {
//   constructor(bucket, opts = {}) {
//     super(bucket, opts);
//     this.bucket = bucket;
//     this.opts = opts;
//   }

//   // Это путь на диске
//   path(key) {
//     return path.join(this.bucket, key);
//   }

//   // А вот это — путь в браузере, чтобы AdminJS мог показать превью
//   publicPath(key) {
//     return `${this.opts.baseUrl}/${key}`; // <== ВАЖНО!
//   }

//   async upload(file, key) {
//     const destination = this.path(key);
//     await fsp.mkdir(path.dirname(destination), { recursive: true });
//     await fsp.copyFile(file.path, destination);
//     await fsp.unlink(file.path);
//   }

//   async delete(key) {
//     const destination = this.path(key);
//     await fsp.unlink(destination).catch(() => {});
//   }

//   async exists(key) {
//     const destination = this.path(key);
//     try {
//       await fsp.access(destination);
//       return true;
//     } catch {
//       return false;
//     }
//   }
// }

// module.exports = SafeLocalProvider;
