export const Page_Keys = {
    USER_LIST: 'USER_LIST',
    INSPIRATION_LIST: 'INSPIRATION_LIST',
    REPLY_LIST: 'REPLY_LIST',
    SUBREPLY_LIST: 'SUBREPLY_LIST',
    INSPIRATION_REPO_LIST: 'INSPIRATION_REPO_LIST',
    INSPIRATION_DRAFT_LIST: 'INSPIRATION_DRAFT_LIST',
    INS_REPLY_REPO_LIST: 'INS_REPLY_REPO_LIST',
    STATIC_INSREPO_ARRANGE_LIST: 'STATIC_INSREPO_ARRANGE_LIST',
    TOPIC_INS_LIST: 'TOPIC_INS_LIST'
};

export const setCache = function (page, cache) {
    localStorage.setItem(page, cache);
}

export const getCache = function(page) {
    return localStorage.getItem(page);
}