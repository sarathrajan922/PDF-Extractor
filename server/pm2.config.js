module.exports = {
    apps: [
      {
        name: '',
        script: 'build/index.js',
        env: {
          NODE_ENV: 'production', 
        },
        env_file: '.env', 
      },
    ],
  };
  