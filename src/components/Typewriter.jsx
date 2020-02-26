import React, { Component } from 'react'
import randomWords from 'random-words'

const defaultPoolSize = 30;

export default class Typewriter extends Component {

    constructor(props) {
        super(props)

        this.fillPool = this.fillPool.bind(this)
        this.dump = this.dump.bind(this)
        this.handleType = this.handleType.bind(this)

        this.state = {
            pool: [],
            pipe: [],
            drain: [],
            buffer: []
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleType)
        this.fillPool();
        this.dump();
    }
    
    componentDidUpdate() {
        this.fillPool();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleType)
    }

    // Fill Pool with poolSize:n words
    fillPool(poolSize = defaultPoolSize) {
        if (this.state.pool.length < poolSize) {
            this.setState(state => ({
                pool: [...state.pool, ...randomWords(poolSize - state.pool.length)]
            }));
        }
    }

    // returnToPool(word){
    //     this.setState(state => ({
    //         pool: state.pool.unshift(word)
    //     }));
    // }

    dump(){
        this.setState(state => ({
            drain: [...state.drain, ...state.pipe],
            pipe: [state.pool[0]],
            pool: state.pool.slice(1),
            buffer: []
        }));
    }

    handleType(event) {

        const key = event.key

        let shouldBuffer = true;
        switch (key) {
            case " ":
                if (this.state.buffer.join('') === this.state.pipe[0]) {
                    console.log('matched')
                    shouldBuffer = false;
                    this.dump()
                } else {
                    console.log('not matched')
                    console.log(this.state.buffer)
                }
                break;

            case "Backspace":
                this.setState(state => ({
                    buffer: state.buffer.splice(0, state.buffer.length - 1)
                }));
                break;

            case "Escape":
                this.setState({
                    pool: [],
                    pipe: [],
                    drain: [],
                    buffer: []
                });
                this.dump()
                break;
        
            default:
                // Add to key typed buffer
                if (shouldBuffer && this.state.buffer.length < this.state.pipe[0].length) {
                    this.setState(state => ({
                        buffer: [...state.buffer, key]
                    }));
                }
                break;
        }

    }

    render() {

        let drain = this.state.drain.join(' ')
        let pool = this.state.pool.join(' ')

        let pipe = this.state.pipe.map(word => {
            return word.split('').map((letter, i) => {
                if ((this.state.buffer.length > i)) {
                    if (this.state.buffer[i] == letter)
                        return <span key={i} className="success">{letter}</span>
                    else 
                        return <span key={i} className="fail">{letter}</span>
                } else {
                    return <span key={i}>{letter}</span>
                }
            })
        })

        return (
            <div id="typewriter">

                <div className="field">
                    <div className="left">
                        <span id="drain" className="success">&nbsp;{drain}</span>
                    </div>
                    <div className="right">
                        <span id="pipe">&nbsp;{pipe}&nbsp;</span>
                        <span id="pool">&nbsp;{pool}</span>
                    </div>
                </div>

                <style jsx>{`
                    #typewriter {
                        width: 100%;
                    }

                    .field {
                        border-radius: 4px;
                        background-color: rgba(125,125,125,0.1);
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 1.5em;
                        padding: 20px;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    .fail {
                        color: orangered;
                    }

                    .success {
                        color: seagreen;
                    }

                    .left, .right {
                        display: inline-block;
                        
                    }

                    .left {
                        width: 25%;
                        text-align: right;
                        direction: rtl;
                    }

                    .left:after {
                        content: '';
                        background-color: rgba(125,125,125,0.1);
                        width: 100%;
                        height: 100%;
                    }

                    #pipe {
                        background-color: rgba(125,125,125,0.15);
                        height: 100%;
                        padding: 25px 0;
                    }

                `}</style>
            </div>
        )
    }
}
