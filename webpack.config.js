module.exports = {
  // ... existing code ...
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use 'sass:math';`,
              sassOptions: {
                includePaths: ['node_modules']
              }
            }
          }
        ]
      },
      // Add this new rule for handling plain CSS files (like Swiper's CSS)
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  // ... existing code ...
};