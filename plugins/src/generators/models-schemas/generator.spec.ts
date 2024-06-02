import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { modelsSchemasGenerator } from './generator';
import { ModelsSchemasGeneratorSchema } from './schema';

describe('models-schemas generator', () => {
  let tree: Tree;
  const options: ModelsSchemasGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await modelsSchemasGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
