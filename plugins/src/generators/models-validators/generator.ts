import {
  Tree,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
} from '@nx/devkit';
import { ast, query } from '@phenomnomnominal/tsquery';
import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone';
import {
  camelCase,
  kebabCase,
  lowerFirst,
  snakeCase,
  upperFirst,
} from 'lodash';
import { getProjectRoots } from 'nx/src/utils/command-line-utils';
import { parse } from 'path';
import { InterfaceDeclaration, isInterfaceDeclaration } from 'typescript';
import { ModelsValidatorsGeneratorSchema } from './schema';

import path = require('path');

function pascalCase(str: string) {
  return upperFirst(camelCase(str));
}
export async function modelsValidatorsGenerator(
  tree: Tree,
  options: ModelsValidatorsGeneratorSchema
) {
  const COLLECTIONS_SCHEMAS_DIRECTORY =
    options.schemasDirectory || 'libs/firestore/validators/src/lib/schemas';
  const OUTPUT_DIRECTORY = options.output || 'libs/firestore/validators';
  const COLLECTIONS_MODELS_DIRECTORY =
    options.modelsDirectory || 'libs/firestore/models/src/lib';
  const files = tree
    .children(COLLECTIONS_SCHEMAS_DIRECTORY)
    .filter((file) => file !== 'index.ts');
  for (const file of files) {
    const schema = JSON.parse(
      tree.read(`${COLLECTIONS_SCHEMAS_DIRECTORY}/${file}`).toString('utf8')
    );
    const ajv = new Ajv({
      schemas: [schema],
      code: {
        source: true,
        /* esm: true */
      },
    });
    const fileWithoutExtension = parse(file).name;

    const model = tree
      .read(`${COLLECTIONS_MODELS_DIRECTORY}/${fileWithoutExtension}.ts`)
      .toString('utf8');

    const abstractSyntaxTree = ast(model);
    const nodes = query(
      abstractSyntaxTree,
      'InterfaceDeclaration ExportKeyword'
    );
    const exportedInterfacesNames = nodes
      .filter((node) => {
        return isInterfaceDeclaration(node.parent);
      })
      .map((node) => (node.parent as InterfaceDeclaration).name.getText());
    const refs = exportedInterfacesNames.reduce(
      (acc, k) => {
        return {
          ...acc,
          [standaloneValidatorName(k)]: `#/definitions/${pascalCase(k)}`,
        };
      },
      {} as Record<string, string>
    );
    let moduleCode = standaloneCode(ajv, refs);
    tree.write(
      `${OUTPUT_DIRECTORY}/src/lib/ajv-validators/${fileWithoutExtension}.js`,
      moduleCode
    );

    for (const interfaceName of exportedInterfacesNames) {
      addFiles(tree, {
        model: interfaceName,
        outputDirectory: `${OUTPUT_DIRECTORY}/src/lib`,
        standaloneValidator: standaloneValidatorName(interfaceName),
        filename: kebabCase(interfaceName),
        standaloneValidatorFile: fileWithoutExtension,
      });
    }
    await formatFiles(tree);
  }
}
export default modelsValidatorsGenerator;

function standaloneValidatorName(k: string) {
  return `is${pascalCase(k)}Valid`;
}

function addFiles(
  tree: Tree,
  options: {
    model: string;
    outputDirectory: string;
    standaloneValidator: string;
    filename: string;
    standaloneValidatorFile: string;
  }
) {
  const templateOptions = {
    ...options,
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.outputDirectory,
    templateOptions
  );
}
