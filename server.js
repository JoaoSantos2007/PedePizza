import app from './src/app.js';
import { PORT } from './src/utils/env.js';

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
