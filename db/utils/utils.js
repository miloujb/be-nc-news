exports.formatDates = list => {
    if (list.length == 0) return [];
    const formattedList = list.map(({created_at, ...restofItem}) => {
        return {created_at: new Date(created_at), ... restofItem};
    })
    return formattedList
};

exports.makeRefObj = list => {
    if (list.length === 0) return {}
    let obj = {}
    list.forEach(item => {
        obj[item.title]=item.article_id
    })
    return obj;
};

exports.formatComments = (comments, articleRef) => {};
