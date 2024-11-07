const path = require('path')

require('esbuild').build({
    entryPoints: [
        'assets/alfa.js',
        'assets/kayle.js',
        'assets/qualweb.js',
    ],
    bundle: true,
    format: 'iife',
    outdir: 'assets/build',
    // sourcemap: true,
    // absWorkingDir: path.join(__dirname, 'assets'),
})
