import { Tree, readProjectConfiguration } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { validatorsLibraryGenerator } from './generator';
import { ValidatorsLibraryGeneratorSchema } from './schema';

describe('validators-library generator', () => {
  let tree: Tree;
  const options: ValidatorsLibraryGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await validatorsLibraryGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
