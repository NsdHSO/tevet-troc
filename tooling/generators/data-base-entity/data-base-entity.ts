import {
  addProjectConfiguration,
  formatFiles,
  generateFiles, names,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DataBaseEntityGeneratorSchema } from './schema';
import { EntityGeneratorSchema } from '../resource/schema';
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

function updateModelsIndexFile(
  tree: Tree,
  { variableCamelCase }: { variableCamelCase: string }
): void {
  const indexPath = 'libs/models/src/index.ts';
  const entityExport = `export * from './lib/entities/${variableCamelCase}.entity';\n`;

  if (tree.exists(indexPath)) {
    let content = tree.read(indexPath, 'utf-8') as string;

    // Avoid duplicate exports
    if (!content.includes(entityExport.trim())) {
      content += entityExport;
      tree.write(indexPath, content);
    }
  } else {
    // Create index.ts if it doesn't exist
    tree.write(indexPath, entityExport);
  }
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

export async function dataBaseEntityGenerator(
  tree: Tree,
  options: DataBaseEntityGeneratorSchema
) {
  const formattedName = names(options.name).className;

  const localOptions = generateLocalOptions(formattedName, options);
  const projectRoot = `libs/models/src/entities/${localOptions.path}.entity.ts`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, localOptions);
  updateModelsIndexFile(tree, localOptions);
  await formatFiles(tree);
}

export default dataBaseEntityGenerator;
