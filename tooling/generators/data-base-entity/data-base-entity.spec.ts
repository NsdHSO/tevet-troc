import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { dataBaseEntityGenerator } from './data-base-entity';
import { DataBaseEntityGeneratorSchema } from './schema';

describe('data-base-entity generator', () => {
  let tree: Tree;
  const options: DataBaseEntityGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await dataBaseEntityGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
