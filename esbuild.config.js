import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: 'dist/index.js',
    tsconfig: 'tsconfig.json',
  })
  .catch(() => process.exit(1));
