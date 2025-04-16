const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Config
const LIB_NAME = process.argv[2]; // First argument (e.g., "ambulance")
const NESTED_PATH = process.argv[3]; // Second argument (e.g., "buss/ambulance")

if (!LIB_NAME || !NESTED_PATH) {
  console.error('Usage: node scripts/create-nested-lib.js <lib-name> <nested-path>');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const libPath = `libs/${NESTED_PATH}`;
const targetPath = `${rootDir}/${libPath}`;

// 1. Generate library
execSync(`nest generate library ${LIB_NAME}`, { stdio: 'inherit' });

// 2. Move to nested path
const tempPath = `libs/${LIB_NAME}`;
execSync(`mkdir -p ${path.dirname(targetPath)}`);

const tsConfigPathLibrary = path.join(tempPath, 'tsconfig.lib.json');
const tsConfigPathLibraryConfig = JSON.parse(fs.readFileSync(tsConfigPathLibrary, 'utf8'));

tsConfigPathLibraryConfig['extends']= '../../../tsconfig.json'
fs.writeFileSync(tsConfigPathLibrary, JSON.stringify(tsConfigPathLibraryConfig, null, 2));
execSync(`mv ${tempPath} ${targetPath}`);

// 3. Update nest-cli.json
const nestCliPath = path.join(rootDir, 'nest-cli.json');
const nestCliConfig = JSON.parse(fs.readFileSync(nestCliPath, 'utf8'));

nestCliConfig.projects[LIB_NAME] = {
  type: 'library',
  root: libPath+'/'+LIB_NAME,
  entryFile: 'index',
  sourceRoot: `${libPath}/${LIB_NAME}/src`,
  compilerOptions: {
    tsConfigPath: `${libPath}/${LIB_NAME}/tsconfig.lib.json`
  }
};

fs.writeFileSync(nestCliPath, JSON.stringify(nestCliConfig, null, 2));



// 4. Update tsconfig.json
const tsConfigPath = path.join(rootDir, 'tsconfig.json');
const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

tsConfig.compilerOptions.paths[`@app/${LIB_NAME}`] = [`${libPath}/${LIB_NAME}/src`];
tsConfig.compilerOptions.paths[`@app/${LIB_NAME}/*`] = [`${libPath}/${LIB_NAME}/src/*`];

fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));


console.log(`✅ Library ${LIB_NAME} created at ${libPath}`);
