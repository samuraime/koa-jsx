const fs = require('fs');
const path = require('path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const invariant = require('invariant');

/**
 * 遍历给定目录的jsx文件
 */
const traverseJSX = (rootDir, extname) => {
  const files = [];
  const traverse = (dirname) => {
    const currentFiles = fs.readdirSync(dirname).forEach((file) => {
      const filePath = path.join(dirname, file);
      const stats = fs.statSync(filePath);
      console.log(path.extname(file), extname)
      if (stats.isDirectory()) {
        traverse(filePath);
      } else if (stats.isFile() && path.extname(file) === extname) {
        const relativePath = path.relative(rootDir, filePath);
        files.push({
          name: relativePath.replace(extname, ''),
          path: filePath,
        });
      }
    });
  }
  traverse(rootDir);
  console.log(files)
  return files;
};

const createRender = (ctx, options) => {
  const templates = {};
  traverseJSX(options.viewPath, options.extname).forEach(({ name, path }) => {
    templates[name] = require(path);
  });

  return (template, data) => {
    let Template;
    if (typeof template === 'string') {
      Template = templates[template];
      if (!Template) {
        invariant(true, `Template "${template}" not found`);
      }
    } else if (typeof template === 'function') {
      Template = template;
    } else {
      invariant(true, 'Template must be a React Component or a path string');
    }
    ctx.body = renderToStaticMarkup(<Template locals={options.locals} {...data} />);
    ctx.type = 'text/html';
  };
}

/**
 * JSX render middleware
 */
const middleware = (options = {}) => {
  const defaultOptions = {
    viewPath: '',
    locals: {},
    extname: '.jsx',
  };

  return async (ctx, next) => {
    const render = createRender(ctx, Object.assign({}, defaultOptions, options));
    ctx.render = render;
    await next();
  }
};

module.exports = middleware;
