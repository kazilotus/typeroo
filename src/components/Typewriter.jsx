import React, { Component } from 'react'
import randomWords from 'random-words'

const defaultPoolSize = 30;

export default class Typewriter extends Component {

    constructor(props) {
        super(props)

        this.fillPool = this.fillPool.bind(this)
        this.dump = this.dump.bind(this)
        this.wpm = this.wpm.bind(this)
        this.handleType = this.handleType.bind(this)

        this.timestamp_start = 0;

        this.state = {
            timestamps: [],
            pool: [],
            pipe: [],
            drain: [],
            buffer: [],
            wpm: [],
            typing: false
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
        clearInterval(this.interval);
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
                    this.setState(state => ({
                        typing: false,
                        timestamps: [ ...state.timestamps, [this.timestamp_start, Date.now()] ]
                    }));
                    this.dump()
                    this.wpm()
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
                    timestamps: [],
                    pool: [],
                    pipe: [],
                    drain: [],
                    buffer: [],
                    typing: false,
                    wpm: []
                });
                this.timestamp_start = 0
                this.dump()
                break;

            case "Shift":
                break;

            default:
                // notedown first keypress
                if (!this.state.typing) {
                    this.setState(state => ({
                        typing: true,
                        // timestamps: [ ...state.timestamps, [Date.now()] ]
                    }));
                    this.timestamp_start = Date.now();
                }

                // Add to key typed buffer
                if (shouldBuffer && this.state.buffer.length < this.state.pipe[0].length) {
                    this.setState(state => ({
                        buffer: [...state.buffer, key]
                    }));
                }
                break;
        }

    }

    wpm() {
        // Calculate Word per Minute
        let ts = this.state.timestamps;
        const wpm_words_count = 10
        let max = (ts.length > wpm_words_count) ? wpm_words_count : ts.length ;
        if (max) {
            let end = ts[ts.length - 1][1];
            let start = ts[ts.length - max][0];
            let minutes = ((end - start)/1000/60);
            this.setState({
                wpm: [...this.state.wpm, Math.floor( max / minutes )]
            })
            // wpm out
            this.props.wpmList(this.state.wpm)
            // console.log([max, end, start, minutes, wpm])
        }
    }

    keyboard() {
        document.getElementById('focusable').focus();
    }

    render() {

        let pool = this.state.pool.join(' ')

        console.log(this.state.timestamps)

        let pipe = this.state.pipe.map(word => {
            return word.split('').map((letter, i) => {
                if ((this.state.buffer.length > i)) {
                    if (this.state.buffer[i] === letter)
                    return <span key={i} className="success">{letter}</span>
                    else 
                    return <span key={i} className="fail">{letter}</span>
                } else {
                    return <span key={i}>{letter}</span>
                }
            })
        })

        let drain = this.state.drain.map((word, i) => {
            let ri = (i === 0) ? this.state.timestamps.length : i;
            let ms = Math.floor( 1 / ((this.state.timestamps[ri-1][1] - this.state.timestamps[ri-1][0]) / 1000/60) );
            return (
                <span key={i}>
                    <span className="wordSpeed">{ms} wpm</span>
                    {i>0 && <span>&nbsp;</span>}
                    {word}
                </span>
            )
        })
        
        let wpm = this.state.wpm[this.state.wpm.length - 1];

        return (
            <div id="typewriter" onClick={this.keyboard}>

                <input id="focusable" type="text" autofocus/>

                <div className="field">
                    <div className="left">
                        <span id="drain" className="success">&nbsp;{drain}</span>
                    </div>
                    <div className="right">
                        <span id="pipe">&nbsp;{pipe}&nbsp;</span>
                        <span id="pool">&nbsp;{pool}</span>
                    </div>
                </div>

                <div className="wpm">
                    {!!wpm && <div> {wpm} <span class="text">Average Words Per Minute</span></div>}
                </div>


                <style jsx>{`
                    #typewriter {
                        width: 100%;
                    }

                    #focusable {
                        transform: scale(0);
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

                    .wpm {
                        color: rgba(200,200,200,1);
                        position: absolute;
                        padding-left: 25%;
                        font-size: 0.9em;
                        margin: 25px;
                    }

                    .wpm .text {
                        color: rgba(125,125,125,0.8);
                        font-size: 0.75em;
                        text-transform: uppercase;
                        margin-left: 5px;
                    }

                    .wordSpeed {
                        position: absolute;
                        margin-top: -18px;
                        direction: ltr;
                        font-size: 9px;
                        color: #afafaf;
                        margin-right: 2px;
                    }

                `}</style>
            </div>
        )
    }
}
