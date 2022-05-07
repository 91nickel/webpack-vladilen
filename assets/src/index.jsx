import * as $ from 'jquery'
import Post from '@models/post.js'
import Babel from './babel';
import json from './files/json'
import WebpackLogo from './images/logo.png'
import csv from './files/csv.csv'
import xml from './files/xml.xml'
import React from 'react';
import {render} from 'react-dom';
import './styles/style.css'
import './styles/less.less'
import './styles/scss.scss'

const post = new Post('Webpack Post Title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

const App = () => {
    return (<div className="container">
        <div className="row">
            <h1>Webpack Course</h1>
            <hr/>
            <div className="logo"></div>
            <hr/>
            <pre></pre>
            <hr/>
            <div className="box">
                <h2>LESS</h2>
            </div>
            <div className="card">
                <h2>SASS</h2>
            </div>
        </div>
    </div>)
};

render(<App/>, document.getElementById('app'));

console.log('Post to String:', post.toString());
console.log('JSON:', json);
console.log('CSV:', csv);
console.log('XML:', xml);