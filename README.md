# Fund tools

## Description

A simple tool to provide user information of funds.

Information such as net asset value, accumulated net, value trend and so on.

## Function Todo List

Functions planned to complete right now:

* Basic information of fund
* Funds information search
* Fund net asset value trend

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