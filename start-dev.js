process.chdir('C:/Users/sandwich/hue3');
import('vite').then(async ({ createServer }) => {
  const server = await createServer({ server: { port: 5173 } });
  await server.listen();
  server.printUrls();
});
