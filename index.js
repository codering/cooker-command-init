var path = require('path')
var join = path.join
var basename = path.basename
var renameSync = require('fs').renameSync
var emptyDir = require('empty-dir').sync;
var vfs = require('vinyl-fs')
var through = require('through2')

exports.name = 'init';
exports.desc = 'init project';
exports.options = {
  '-h, --help': 'print this help message'
};

exports.run = function(argv, cli){

    // 则输出帮助信息。
  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }

  var cwd = join(__dirname, './boilerplates', 'app');
  var dest = process.cwd();
  var projectName = basename(dest);

  if (!emptyDir(dest)) {
    console.error('Existing files here, please run init command in an empty folder!');
    process.exit(1);
  }

  console.log('Creating a new  App in' + dest + '.');
  console.log();

  vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest))
    .pipe(vfs.dest(dest))
    .on('end', function() {
      //console.log(`  ${cat('Rename')} ./gitignore to ./.gitignore`);
      console.log(join(dest, 'gitignore'))
      renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));
      // if (install) {
      //   //require('./install')(printSuccess);
      // } else {
      //   //printSuccess();
      // }
    })
    .resume();

}

function template(dest) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    //console.log(`   ${cat('Write')} %s`, simplifyFilename(join(dest, basename(file.path))));
    this.push(file);
    cb();
  });
}

function simplifyFilename(file) {
  return file.replace(process.cwd(), '.');
}