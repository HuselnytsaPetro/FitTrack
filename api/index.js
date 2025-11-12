import app from './app.js';
import { config } from './config/config.js';

app.listen(config.port, () => {
  console.log(`FitTrack API server running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
