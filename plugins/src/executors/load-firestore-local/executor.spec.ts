import { LoadFirestoreLocalExecutorSchema } from './schema';
import executor from './executor';

const options: LoadFirestoreLocalExecutorSchema = {};

describe('LoadFirestoreLocal Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});