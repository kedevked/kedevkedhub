export interface ValidatorsLibraryGeneratorSchema {
  name: string;
  compiler: 'swc' | 'tsc';
  modelsDirectory: string;
}
