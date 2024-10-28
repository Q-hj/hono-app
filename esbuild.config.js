import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/app.js',
    tsconfig: 'tsconfig.json',
  })
  .catch(() => process.exit(1));
