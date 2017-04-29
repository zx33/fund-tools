var express = require('express');
var router = express.Router();
var Q = require('q');
var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var config = require('../../conf/conf');
var request = require('request');
var fund_util = require('../../utils/fund_util');
var common_util = require('../../utils/common');

function search_fund_by_key(req, res) {
    var word = req.query.word;
    var url = "http://quotes.money.163.com/stocksearch/json.do?type=FN&count=10";
    url += "&word=" + encodeURI(word);

    function fund_search() {
        var defer = Q.defer();
        http.get(url, (response) => {
            var html = "";
            response.on('data', (data) => {
                html += data;
            });
            response.on('end', () => {
                var st = html.indexOf('[');
                var en = html.indexOf(']');
                var result = JSON.parse(html.substring(st, en+1));
                defer.resolve(result);
            });
        }).on('error', () => {
            defer.reject('500 Internal server error.');
        });
        return defer.promise;
    }
    
    fund_search()
        .then(
            (result) => {
                var ret = {
                    fund_list: result
                };
                res.send(common_util.return_json_response('ok', '', ret));
            },
            common_util.on_error(res)
        );
}

function get_fund_tendency_chart(req, res) {
    var code = req.query.code || "";
    var time_interval = parseInt(req.query.time_interval) || config.default_time_interval;

    var url = 'http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz&code=' + code + '&page=1&per=' + time_interval;

    if (code == "") {
        res.send(common_util.return_json_response('error', 'Invalid code.', {}));
    }

    function get_tendency_info() {
        var defer = Q.defer();
        http.get(url, (response) => {
            var html = "";
            response.on('data', (data) => {
                html += data;
            });
            response.on('end', () => {
                var st = html.indexOf('"');
                var en = html.indexOf('"', st + 1);
                var $ = cheerio.load(html.substring(st+1, en));
                $ = cheerio.load($('tbody').html());
                var result = {
                    tendency: []
                };
                $('tr').each((i, tr_element) => {
                    var tr_$ = cheerio.load($(tr_element).html());
                    var ret = {};
                    tr_$('td').each((index, td_element) => {
                        ret[config.fund_tendency_map[index]] = tr_$(td_element).text();
                    });
                    result.tendency.push(ret);
                });
                if (result.tendency[0]['净值日期'] == "暂无数据!") {
                    defer.reject('Error code.');
                }
                defer.resolve(result);
            });
        }).on('error', () => {
            defer.reject('500 Internal server error.');
        });
        return defer.promise;
    }

    get_tendency_info()
        .then(
            (result) => {
                res.send(common_util.return_json_response('ok', '', result));
            },
            common_util.on_error(res)
        );
}

var get_map = [
    { cmd: '/search_fund', func: search_fund_by_key },
    { cmd: '/fund_tendency_chart', func: get_fund_tendency_chart },
];

var post_map = [];

common_util.init_router(router, get_map, post_map);

module.exports = router;