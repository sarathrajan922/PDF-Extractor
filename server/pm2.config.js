module.exports = {
    apps: [
      {
        name: 'pdf-extract',
        script: 'build/index.js',
        env: {
          NODE_ENV: 'production', 
        },
        env_file: '.env', 
      },
    ],
  };
  