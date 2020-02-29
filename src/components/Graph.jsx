import React, { Component } from 'react'

import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import theme from '../theme/dark'

export default class Graph extends Component {

    getOption() {

        let xAxisLabels = [ ...Array(60).keys() ].map( i => i+1);
        // let seriesData = [...Array(60)].map(() => Math.floor(Math.random() * 9));
        let seriesData = this.props.wpmList.slice(-60)

        return {
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            xAxis: {
                boundaryGap: false,
                showGrid: false,
                data: xAxisLabels,
                splitLine: {
                   show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',   
                splitLine: {
                   show: false
                },
                axisLine: {
                    show: false
                }
            },
            series: [{
                data: seriesData,
                type: 'line',
                itemStyle: {
                    color: 'rgba(0, 152, 133, 0.8)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(80, 183, 100, 0.8)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 107, 175, 0)'
                    }])
                }
            }]
        };
        
    }

    render() {
        echarts.registerTheme('react', theme());
        return (
            <div id="graph">
                <ReactEcharts
                    option={this.getOption()}
                    style={{
                        height: '43vh',
                        width: '100%',
                        background: 'white'
                    }}
                    theme='react' 
                 />


            <style jsx>{`
                #graph { 
                    padding-top: 0px;
                    position: absolute;
                    width: 100%
                }
            `}</style>

            </div>
        )
    }
}
