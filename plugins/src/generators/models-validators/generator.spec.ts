import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { modelsValidatorsGenerator } from './generator';
import { ModelsValidatorsGeneratorSchema } from './schema';

describe('models-validators generator', () => {
  let tree: Tree;
  const options: ModelsValidatorsGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await modelsValidatorsGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
