import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
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
  {
    variableCamelCase,
    directory,
  }: { variableCamelCase: string; directory: string }
): void {
  const indexPath = 'libs/models/src/index.ts';
  const entityExport = directory
    ? `export * from './lib/entities/${directory}/${variableCamelCase}.entity';\n`
    : `export * from './lib/entities/${variableCamelCase}.entity';\n`;

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

function updateDbConfig(tree: Tree, entityName: string): void {
  const dbConfigPath = 'libs/utils/src/lib/data-base/db.config.ts';

  if (!tree.exists(dbConfigPath)) {
    console.warn(
      `⚠️ ${dbConfigPath} not found, skipping database config update.`
    );
    return;
  }

  let fileContent = tree.read(dbConfigPath, 'utf-8') as string;

  // 1. Get existing imports
  const importRegex =
    /import\s*{\s*([^}]+)\s*}\s*from\s*'@tevet-troc\/models';/g;
  const existingImports: string[] = [];
  let match;
  while ((match = importRegex.exec(fileContent))) {
    existingImports.push(...match[1].split(',').map((s) => s.trim()));
  }

  // 2. Add the new entity and sort
  existingImports.push(entityName + 'Entity'); // Add the entity with 'Entity' suffix
  existingImports.sort();

  // 3. Reconstruct the import statement
  const newImportStatement =
    existingImports.length > 0
      ? `import { ${existingImports.join(', ')} } from '@tevet-troc/models';\n`
      : '';

  // 4. Remove old imports and add the new one (important to prevent duplicates)
  fileContent = fileContent.replace(importRegex, ''); // Remove all existing imports
  fileContent = newImportStatement + fileContent; // Add the combined import at the top

  // Regex to find the entities array inside `registerDb`
  const entitiesRegex = /entities:\s*\[([\s\S]*?)\]/;
  const entitiesMatch = fileContent.match(entitiesRegex);

  if (entitiesMatch) {
    const existingEntities = entitiesMatch[1].trim();
    const allEntities = existingEntities
      .split(',')
      .map((entity) => entity.trim());
    if (!allEntities.includes(entityName + 'Entity')) {
      allEntities.push(entityName + 'Entity');
    }
    const newEntities = allEntities.sort().join(', ');
    fileContent = fileContent.replace(
      entitiesRegex,
      `entities: [${newEntities}]`
    );
  }

  tree.write(dbConfigPath, fileContent);
}

export async function dataBaseEntityGenerator(
  tree: Tree,
  options: DataBaseEntityGeneratorSchema
) {
  const formattedName = names(options.name).className;

  const localOptions = generateLocalOptions(formattedName, options);
  const projectRoot = `libs/models/src/lib/entities/${localOptions.path}.entity.ts`;
  console.log(localOptions);
  if (!tree.exists(projectRoot)) {
    // Generate files from the 'files' directory, but place them directly in the target directory.
    if (options.directory) {
      generateFiles(
        tree,
        path.join(__dirname, 'files/src'),
        `libs/models/src/lib/entities/${options.directory}`,
        localOptions
      );
      // Rename the file after generation:
      tree.rename(
        `libs/models/src/lib/entities/${options.directory}/${localOptions.variableCamelCase}.entity.ts.template`,
        projectRoot
      );
    } else {
      generateFiles(
        tree,
        path.join(__dirname, 'files/src'),
        'libs/models/src/lib/entities',
        localOptions
      );
      // Rename the file after generation:
      tree.rename(
        `libs/models/src/lib/entities/${localOptions.variableCamelCase}.entity.ts.template`,
        projectRoot
      );
    }

    updateModelsIndexFile(tree, localOptions);
    updateDbConfig(tree, localOptions.name);

    await formatFiles(tree);
  } else {
    console.warn(`File already exists: ${projectRoot}. Skipping generation.`);
  }
}

export default dataBaseEntityGenerator;
