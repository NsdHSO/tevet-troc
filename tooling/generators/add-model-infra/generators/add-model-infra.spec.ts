import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { addModelInfraGenerator } from './add-model-infra';
import { AddModelInfraGeneratorSchema } from './schema';

describe('add-model-infra generator', () => {
  let tree: Tree;
  const options: AddModelInfraGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await addModelInfraGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
