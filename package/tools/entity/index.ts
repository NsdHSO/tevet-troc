import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree, updateJson
} from '@nx/devkit';
import * as path from 'path';
import { IndexGeneratorSchema } from './schema';
const basePath =`package/bus`

export async function indexGenerator(
  tree: Tree,
  options: IndexGeneratorSchema
) {
  const formattedName = names(options.name).className;
  const projectRoot = `${basePath}/${options.name}`;
  addProjectConfiguration(tree, formattedName, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    name: formattedName,
    variable: options.name
  });
  await formatFiles(tree);
  await addedLibraryIntoTsBase(tree, { name: options.name });
}

async function addedLibraryIntoTsBase(tree: Tree, schema: { name: string }) {
  const libraryName = schema.name;
  const libraryPath = `${basePath}/${libraryName}/src/index.ts`;
  const importPath = `@tevet-troc/${libraryName}`;

  // Update tsconfig.base.json to include the new path
  updateJson(tree, 'tsconfig.base.json', (json) => {
    if (!json.compilerOptions.paths) {
      json.compilerOptions.paths = {};
    }
    json.compilerOptions.paths[importPath] = [libraryPath];

    return json;
  });

  return () => {};
}

export default indexGenerator;
