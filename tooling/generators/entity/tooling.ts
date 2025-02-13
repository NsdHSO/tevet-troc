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

  // Move the entity file to models/src/lib/
  moveEntityToModels(tree, localOptions);

  // Update models/src/index.ts to include the entity export
  updateModelsIndexFile(tree, localOptions);

  // Update tsconfig.base.json
  await addLibraryToTsConfig(tree, localOptions);

  // Add the new plugin import and registration to app.ts
  await updateAppFile(tree, localOptions);

  // Update the database config file to include the new entity
  updateDbConfig(tree, localOptions.name);

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

function moveEntityToModels(
  tree: Tree,
  { variableCamelCase, variable }: { variableCamelCase: string; variable: string }
): void {
  const sourcePath = `libs/bus/${variable}/src/lib/infrastructure/dao/${variableCamelCase}.entity.ts`;
  const destinationPath = `libs/models/src/lib/entities/${variableCamelCase}.entity.ts`;

  if (tree.exists(sourcePath)) {
    const content = tree.read(sourcePath, 'utf-8') as string;

    // Write the file to the new location
    tree.write(destinationPath, content);

    // Delete the original entity file
    tree.delete(sourcePath);
  } else {
    console.warn(`⚠️ Entity file not found: ${sourcePath}`);
  }
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


function updateDbConfig(tree: Tree, entityName: string) : void{
  const dbConfigPath = 'libs/utils/src/lib/data-base/db.config.ts';

  if (!tree.exists(dbConfigPath)) {
    console.warn(`⚠️ ${dbConfigPath} not found, skipping database config update.`);
    return;
  }

  let fileContent = tree.read(dbConfigPath, 'utf-8') as string;
  const entityImport = `import { ${entityName}Entity } from '@tevet-troc/models';\n`;

  // Ensure import exists
  if (!fileContent.includes(entityImport.trim())) {
    fileContent = entityImport + fileContent;
  }

  // Regex to find the entities array inside `registerDb`
  const entitiesRegex = /entities:\s*\[([\s\S]*?)\]/;
  const match = fileContent.match(entitiesRegex);

  if (match) {
    const existingEntities = match[1].trim();
    const newEntities = existingEntities
      ? `${existingEntities}, ${entityName}Entity`
      : `${entityName}Entity`;

    fileContent = fileContent.replace(entitiesRegex, `entities: [${newEntities}]`);
  }

  tree.write(dbConfigPath, fileContent);
}
export default indexGenerator;
