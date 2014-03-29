// Load modules

var Summary = require('./summary');
var Utils = require('./utils');


// Declare internals

var internals = {
    width: 50
};


exports = module.exports = function (emitter, options) {

    var count = 0;

    emitter.on('test', function (test) {

        if (!count) {
            process.stdout.write('\n');
            if (!options.verbose) {
                process.stdout.write('  ');
            }
        }

        ++count;

        if (options.verbose) {
            var format = Utils.color('  ' + (test.err ? '#red[\u2716]' : '#green[\u2714]') + ' #gray[%s) %s]');
            console.log(format, test.id, test.title);
        }
        else {
            if ((count - 1) % internals.width === 0) {
                process.stdout.write('\n  ');
            }

            process.stdout.write(Utils.color(test.err ? '#red[x]' : '.'));
        }
    });

    Summary(emitter, options);
};