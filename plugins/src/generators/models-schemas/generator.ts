import { Tree, formatFiles } from '@nx/devkit';
import { parse } from 'path';
import { Config, createGenerator } from 'ts-json-schema-generator';
import { ModelsSchemasGeneratorSchema } from './schema';

export async function modelsSchemasGenerator(
  tree: Tree,
  options: ModelsSchemasGeneratorSchema
) {
  const COLLECTIONS_MODELS_DIRECTORY =
    options.collection || 'firestore/models/src/lib';
  const OUTPUT_DIRECTORY =
    options.output || 'firestore/schemas/src/lib';
  const files = tree
    .children(COLLECTIONS_MODELS_DIRECTORY)
    .filter((file) => file !== 'index.ts');

  const tsconfig = 'tsconfig.base.json';
  for (const file of files) {
    const config: Config = {
      path: `${COLLECTIONS_MODELS_DIRECTORY}/${file}`,
      tsconfig,
      type: '*', // Or <type-name> if you want to generate schema for that one type only
      additionalProperties: true,
    };

    const schema = createGenerator(config).createSchema(config.type);
    const schemaString = JSON.stringify(schema, null, 2);

    tree.write(`${OUTPUT_DIRECTORY}/${parse(file).name}.json`, schemaString);
  }
  await formatFiles(tree);
}

export default modelsSchemasGenerator;
