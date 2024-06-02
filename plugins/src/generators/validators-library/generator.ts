import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  Tree,
} from '@nx/devkit';
import { libraryGenerator } from '@nx/node';
import { join, parse } from 'path';
import modelsValidatorsGenerator from '../models-validators/generator';
import { ValidatorsLibraryGeneratorSchema } from './schema';
import modelsSchemasGenerator from '../models-schemas/generator';

export async function validatorsLibraryGenerator(
  tree: Tree,
  options: ValidatorsLibraryGeneratorSchema
) {
  const OUTPUT_DIRECTORY = `${getWorkspaceLayout(tree).libsDir}/${
    options.modelsDirectory
  }`;
  await libraryGenerator(tree, {
    name: options.name,
    compiler: options.compiler,
  });

  const LIB_WORKING_DIRECTORY = `${getWorkspaceLayout(tree).libsDir}/${
    options.name
  }/src/lib`;
  const generatedFiles = tree.children(LIB_WORKING_DIRECTORY);
  for (const file of generatedFiles) {
    tree.delete(`${LIB_WORKING_DIRECTORY}/${file}`);
  }

  await modelsSchemasGenerator(tree, {
    collection: OUTPUT_DIRECTORY,
    output: `${getWorkspaceLayout(tree).libsDir}/${
      options.name
    }/src/lib/schemas`,
  });
  await modelsValidatorsGenerator(tree, {
    modelsDirectory: OUTPUT_DIRECTORY,
    output: `${getWorkspaceLayout(tree).libsDir}/${options.name}`,
    schemasDirectory: `${getWorkspaceLayout(tree).libsDir}/${
      options.name
    }/src/lib/schemas`,
  });

  const files = tree
    .children(`${getWorkspaceLayout(tree).libsDir}/${options.name}/src/lib`)
    .filter((file) => !['ajv-validators', 'schemas'].includes(file))
    .map((file) => parse(file).name);

  const INDEX_DIRECTORY = `${LIB_WORKING_DIRECTORY}/..`;
  addFiles(tree, {
    files,
    outputDirectory: INDEX_DIRECTORY,
  });
  await formatFiles(tree);
}

export default validatorsLibraryGenerator;

function addFiles(
  tree: Tree,
  options: {
    files: string[];
    outputDirectory: string;
  }
) {
  const templateOptions = {
    ...options,
  };
  generateFiles(
    tree,
    join(__dirname, 'files'),
    options.outputDirectory,
    templateOptions
  );
}
