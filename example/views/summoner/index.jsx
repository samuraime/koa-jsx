const React = require('react');
const Layout = require('../layout');

const Template = (props) => (
  <Layout title={props.title}>

    <div>{props.desc}</div>
  </Layout>
);

module.exports = Template;
