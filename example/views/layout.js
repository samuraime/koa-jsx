const React = require('react');

const Layout = ({ title = '', styles = [], headerScripts = [], scripts = [], children = null }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      {styles.map(src => <link rel="stylesheet" href={src} />)}
      {headerScripts.map(src => <script src={src} />)}
    </head>
    <body>
      {children}
      {scripts.map(src => <script src={src} />)}
    </body>
  </html>
);

module.exports = Layout;
