// ==UserScript==
// @name         Github中文搜索净化
// @namespace    http://danke666.top/
// @version      1.0
// @author       DanKe
// @description  Github中文搜索净化，我不想讨论政治，屏蔽特定用户群
// @match        https://github.com/search*
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义要检测和删除的用户名列表
    const usernamesToRemove = [
        'cirosantilli', //我去你妈了个表Github是你们搞政治的地方吗
        'tjqJ62cESiHPj6DdR6vXDAcPp',
        'Bellum45',
        'Daravai1234',
        'cheezcharmer',
        'chinese-dictatorship',
        'Daravai1234',
        'b0LBwZ7r5HOeh6CBMuQIhVu3-s-random-fork',
        'random-fork',
        'zpc1314521',
        'jjzhang166',
        '1lixia',
        'panbinibn',
        'zaohmeing',
        'zhaohmng-outlook-com',
        ];


    const userElements = document.querySelectorAll('.Box-sc-g0xbh4-0 a[href^="/"]');

    userElements.forEach(usernameElement => {
        const username = usernameElement.getAttribute('href').split('/')[1];
        if (usernamesToRemove.includes(username)) {
            const divToRemove = usernameElement.closest('.Box-sc-g0xbh4-0');
            if (divToRemove) {
                divToRemove.remove();
            }
        }
    });
})();
