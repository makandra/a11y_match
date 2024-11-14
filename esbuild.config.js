const path = require('path')
const textReplace = require('esbuild-plugin-text-replace')

require('esbuild').build({
    entryPoints: [
        'assets/alfa.js',
        'assets/kayle.js',
        'assets/qualweb.js',
        'assets/axe.js',
    ],
    bundle: true,
    format: 'iife',
    outdir: 'assets/build',
    plugins: [
        textReplace(
            {
                include: /node_modules\/@qualweb\/wcag-techniques\/dist\/wcag.bundle.js/,
                pattern:[
                    // necessary because of one error message in QualWeb that then escapes the Rails JS tag helper
                    ['<head>','head'],
                    // They instantiate this object by default without providing the necessary arguments
                    // This leads to errors in the browser console so lets delete the call
                    [',window.wcag=new WCAGTechniques',''],
                ]
            }
        )
    ],
    treeShaking: true,
    // minify: true,
    // sourcemap: true,
    // absWorkingDir: path.join(__dirname, 'assets'),
})
