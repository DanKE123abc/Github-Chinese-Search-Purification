// ==UserScript==
// @name         Github中文搜索净化
// @namespace    http://danke666.top/
// @version      1.3
// @author       DanKe
// @description  Github中文搜索净化，屏蔽特定用户群
// @match        https://github.com/search*
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义要检测和删除的用户名列表
    const usernamesToRemove = [
        'cirosantilli', //我去你妈了个表就是你这私人东西祸害环境
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

    function addBlockedNotice() {
        const resultsList = document.querySelector('div[data-testid="results-list"]');
        if (resultsList) {
            const notice = document.createElement('div');
            notice.style.cssText = 'text-align: center; padding: 10px; margin: 10px; background-color: #f9f9f9; border: 1px solid #e1e4e8;';
            notice.textContent = '已屏蔽不受欢迎的仓库';
            resultsList.appendChild(notice);
        }
    }

    function removeElementsWithUsername() {
        const resultsList = document.querySelector('div[data-testid="results-list"]');
        if (resultsList) {
            const userElements = resultsList.querySelectorAll('.Box-sc-g0xbh4-0');
            let hasRemoved = false;
            userElements.forEach(element => {
                const usernameElement = element.querySelector('a[href^="/"]');
                if (usernameElement) {
                    const username = usernameElement.getAttribute('href').split('/')[1];
                    if (usernamesToRemove.includes(username)) {
                        element.remove();
                        hasRemoved = true;
                    }
                }
            });
            if (hasRemoved) {
                addBlockedNotice();
            }
        }
    }

    function observerCallback(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                removeElementsWithUsername();
            }
        }
    }

    const observer = new MutationObserver(observerCallback);
    window.onload = function() {
        removeElementsWithUsername();
        observer.observe(document.querySelector('div[data-testid="results-list"]'), {
            childList: true,
            subtree: true
        });
    };


})();
