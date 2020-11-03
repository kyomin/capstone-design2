const { createProxyMiddleware } = require('http-proxy-middleware');

// 클라이언트 요청 : /api/**
// 실제 : http://localhost:5000/api/**
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};