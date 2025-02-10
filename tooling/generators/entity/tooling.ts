import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
  updateJson
} from '@nx/devkit';
import * as path from 'path';
import { EntityGeneratorSchema } from './schema';

// Constants
const BASE_PATH = 'libs/bus';

// Utility functions
function toCamelCase(str: string): string {
  return str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase()); // Ensure first letter is lowercase
}

function toKebabCase(str: string): string {
  return str.includes('-') ? str : str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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

  // Format files
  await formatFiles(tree);

  // Update tsconfig.base.json
  await addLibraryToTsConfig(tree, localOptions);
}

// Helper functions
function generateLocalOptions(formattedName: string, options: EntityGeneratorSchema) {
  return {
    ...options,
    variableCamelCase: toCamelCase(formattedName),
    variable: options.name,
    path: toKebabCase(formattedName),
    name: formattedName
  };
}

async function addLibraryToTsConfig(tree: Tree, { variable }: { variable:string }) {
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

export default indexGenerator;
