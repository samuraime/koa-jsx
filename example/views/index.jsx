const React = require('react');
const Layout = require('./layout');

const Template = (props) => (
  <Layout title={props.title} scripts={['http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js']}>
    <h1 style={{ color: '#f00' }}>{props.title}</h1>
    <div>{props.slogan}</div>
    <a href="/summoner">Yasuo</a>
  </Layout>
);

module.exports = Template;
