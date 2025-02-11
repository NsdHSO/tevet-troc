import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

// Constants
const BASE_PATH = 'libs/bus';
const APP_FILE_PATH = 'apps/tevet-troc/src/app/app.ts'; // Target file to modify

// Utility functions
function toCamelCase(str: string): string {
  return str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase()); // Ensure first letter is lowercase
}

function toKebabCase(str: string): string {
  return str.includes('-')
    ? str
    : str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Main generator function
export async function indexGenerator(
  tree: Tree,
  options: EntityGeneratorSchema
) {
  const formattedName = names(options.name).className;
  const projectRoot = `${BASE_PATH}/${options.name}`;
  const localOptions = generateLocalOptions(formattedName, options);

  // Add project configuration
  addProjectConfiguration(tree, formattedName, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  // Generate project files
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, localOptions);

  // Update tsconfig.base.json
  await addLibraryToTsConfig(tree, localOptions);

  // Add the new plugin import and registration to app.ts
  await updateAppFile(tree, localOptions);

  // Format files
  await formatFiles(tree);
}

// Helper functions
function generateLocalOptions(
  formattedName: string,
  options: EntityGeneratorSchema
) {
  return {
    ...options,
    variableCamelCase: toCamelCase(formattedName),
    variable: options.name,
    path: toKebabCase(formattedName),
    name: formattedName,
  };
}

async function addLibraryToTsConfig(
  tree: Tree,
  { variable }: { variable: string }
) {
  const libraryPath = `${BASE_PATH}/${variable}/src/index.ts`;
  const importPath = `@tevet-troc/${variable}`;

  // Update tsconfig.base.json to include the new path
  updateJson(tree, 'tsconfig.base.json', (json) => {
    if (!json.compilerOptions.paths) {
      json.compilerOptions.paths = {};
    }
    json.compilerOptions.paths[importPath] = [libraryPath];

    return json;
  });
}

// Add new plugin to app.ts
async function updateAppFile(
  tree: Tree,
  { name, variable }: { name: string; variable: string }
) {
  if (!tree.exists(APP_FILE_PATH)) {
    console.warn(
      `⚠️ Could not find ${APP_FILE_PATH}, skipping app.ts modification.`
    );
    return;
  }

  let fileContent = tree.read(APP_FILE_PATH, 'utf-8') as string;
  const pluginImport = `import { ${variable}Plugin } from '@tevet-troc/${toKebabCase(
    name
  )}';\n`;
  const pluginRegistration = `  await ${variable}Plugin.${name}Plugin.${toCamelCase(
    name
  )}Plugin(fastify);\n`;

  // Ensure import exists
  if (!fileContent.includes(pluginImport.trim())) {
    fileContent = pluginImport + fileContent;
  }

  // Insert before `fastify.ready(() => {})`
  const readyRegex = /\s+fastify\.ready\s*\(\s*\(\s*\)\s*=>\s*\{/;
  if (!fileContent.includes(pluginRegistration.trim())) {
    fileContent = fileContent.replace(readyRegex, `${pluginRegistration}\n$&`);
  }

  tree.write(APP_FILE_PATH, fileContent);
}

export default indexGenerator;
