import React, { Component } from 'react'

import Typed from 'typed.js';

export default class Navbar extends Component {

    componentDidMount() {
        this.typed = new Typed('#navbar .typed', {
            strings: ['typeroo'],
            typeSpeed: 100,
            // cursorChar: '_',
            showCursor: false
        });
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <div id="navbar">

                <div className="brand">
                    <div className="logo">
                        <div className="typed"></div>
                        _
                    </div>
                    <div className="tag">
                        Continuous Typing Pratice
                    </div>
                </div>

                <div className="menu">

                    <div className="item"></div>
                </div>

                <style jsx>{`
                    #navbar {
                        position: fixed;
                        width: 60%;
                        background-color: #282c34;
                        border-bottom: 1px solid #ffffff0f;
                        height: 90px;
                        color: white;
                        display: flex;
                        padding: 0 20%;
                    }

                    .brand {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }

                    .logo {
                        display: flex;
                        font-size: 30px;
                        padding-bottom: 10px;
                    }

                    .tag {
                        color: #a9a9a9;
                        font-size: 12px;
                        padding-bottom: 8px;
                    }

                    .menu {
                        flex-grow: 1;
                        display: block;
                        text-align: right;
                    }

                    .item {

                    }
                `}</style>
            </div>
        )
    }
}
