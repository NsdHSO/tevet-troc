import {
  formatFiles,
  generateFiles, names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { AddModelInfraGeneratorSchema } from './schema';
function toKebabCase(str: string): string {
  return str.includes('-')
    ? str
    : str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Utility functions
function toCamelCase(str: string): string {
  return str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^([A-Z])/, (_, letter) => letter.toLowerCase()); // Ensure first letter is lowercase
}

function generateLocalOptions(
  formattedName: string,
  options: AddModelInfraGeneratorSchema
) {
  return {
    ...options,
    variableCamelCase: toCamelCase(formattedName),
    variable: options.name,
    path: toKebabCase(formattedName),
    name: formattedName,
  };
}
export async function addModelInfraGenerator(
  tree: Tree,
  options: AddModelInfraGeneratorSchema
) {
  const formattedName = names(options.name).className;

  const localOptions = generateLocalOptions(formattedName, options);
  const projectRoot = `libs/models/src/lib/applications/${localOptions.directory}`;

  generateFiles(tree, path.join(__dirname, 'files/src'), projectRoot, localOptions);
  await formatFiles(tree);
}

export default addModelInfraGenerator;
