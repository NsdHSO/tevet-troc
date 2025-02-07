import {
  formatFiles,
  generateFiles,
  names,
  Tree, updateJson
} from '@nx/devkit';
import * as path from 'path';
import { IndexGeneratorSchema } from './schema';

const base = 'apps/tevet-troc/src/app/entities/bus/';

function toCamelCase(str) {
  return str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase()); // Ensure first letter is lowercase

}

function toKebabCase(str) {
  if (str.includes('-')) {
    return str; // Already in kebab-case
  }
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export async function indexGenerator(
  tree: Tree,
  options: IndexGeneratorSchema
) {
  const formattedName = names(options.name).className;

  const projectRoot = `${base}${toKebabCase(options.name)}`;
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    name: formattedName,
    variableCamelCase: toCamelCase(options.name),
    variable: toKebabCase(options.name)
  });
  await formatFiles(tree);
}

async function addedLibraryIntoTsBase(tree: Tree, schema: { name: string }) {
  const libraryName = schema.name;
  const libraryPath = `${base}${libraryName}/src/index.ts`;
  const importPath = `@tevet-troc/${libraryName}`;

  // Update tsconfig.base.json to include the new path
  updateJson(tree, 'tsconfig.base.json', (json) => {
    if (!json.compilerOptions.paths) {
      json.compilerOptions.paths = {};
    }
    json.compilerOptions.paths[importPath] = [libraryPath];

    return json;
  });

  return () => {
  };
}

export default indexGenerator;
