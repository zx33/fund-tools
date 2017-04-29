# Fund tools

## Description

A simple tool to provide user information of funds.

Information such as net asset value, accumulated net, value trend and so on.

## Function Todo List

Functions planned to complete right now:

* Basic information of fund
* Funds information search
* Fund net asset value trend

## Available APIs and Pages

### APIs

1. <code>/api/fund/search_fund</code>

    Search funds that are related to the word.

    Params:

    <code>word</code>: key word of the fund, it can be the title, code or spell.

    Example: <code>/api/fund/search_fund?word=161725</code>

2. <code>/api/fund/fund_tendency_chart</code>

    Get information of net asset value tendency of the fund.

    Params:

    <code>code</code>: the code of fund.

    <code>time_interval</code>: time interval of the result, default is 30 days.

    Example: <code>/api/fund/fund_tendency_chart?code=161725&time_interval=10</code>

### Pages

1. <code>/tendency_info.html</code>

    This page is used to show the chart of tendency of the fund.

    User input the code of fund and select the time interval, then generate the chart.

## Implement

Using ExpressJS and MongoDB.

## How to run

0. Install Node.js environment
1. First clone the repository.
2. Run command <code>npm install</code>
3. Create <code>conf</code> folder and write the config file. Content as follow:

``` Node
/*  ./conf/conf.js  */
var config = {
    port: xxxx, // app listening port
    default_time_interval: xx, //default time interval for trend graph.
    mongo_url: "xxxx", // MongoDB database url
    env: "xx", // project environment, if value is "testing", app will use logger middleware.
    fund_tendency_map: ['净值日期', '单位净值', '累计净值', '日增长率', '申购状态', '赎回状态', '分红送配'], // Do not modify this line.
};

module.exports = config;
```

4. run command <code>npm start</code> or <code>node app</code>

## Finally

Just have fun.