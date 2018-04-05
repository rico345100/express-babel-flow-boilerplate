const config = require('./config/app.json');
const gulp = require('gulp');
const yargs = require('yargs');
const { exec } = require('child_process');
const argv = yargs.argv;

process.env.FORCE_COLOR = 1;

if(config.environment === 'production') {
    process.env.NODE_ENV = 'production';
    process.env.BABEL_ENV = 'production';
}
else {
    process.env.BABEL_ENV = 'dev';
}

function runBabel(watch, done) {
	var command = watch ? "node_modules/.bin/babel --watch ./src -d ./dist" : "node_modules/.bin/babel ./src -d ./dist";

	// Include sourcemap if it is dev env.
	if(config.environment === 'development') {
		command += ' -s';
    }
    
    console.log('Enviroment: ' + config.environment);

	exec(command, (err, stdout, stderr) => {
        if(err) {
            console.log(err);
            console.log(stderr);
        }
        else {
            console.log(stdout);
        }

        done();
    });
}

gulp.task('default', (done) => {
	return runBabel(argv.watch, done);
});