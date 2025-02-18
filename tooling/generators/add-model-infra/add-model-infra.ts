import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
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

function updateModelsIndexFileInDataBase(
  tree: Tree,
  {
    variableCamelCase,
    directory,
  }: { variableCamelCase: string; directory: string }
): void {
  const indexPath = 'libs/models/src/lib/applications/index.ts';
  const entityExport = directory
    ? `export * from './${directory}'`
    : new Error('Provide a directory name');

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
  const projectRoot = `libs/models/src/lib/applications`;

  generateFiles(
    tree,
    path.join(__dirname, 'files/src'),
    projectRoot,
    localOptions
  );

  updateModelsIndexFileInDataBase(tree, localOptions);

  await formatFiles(tree);
}

export default addModelInfraGenerator;
