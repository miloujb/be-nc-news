exports.formatDates = list => {
    const formattedList = list.map(({created_at, ...restofItem}) => {
        return {created_at: new Date(created_at), ... restofItem};
    })
    return formattedList
};

exports.makeRefObj = list => {
    let obj = {}
    list.forEach(item => {
        obj[item.title]=item.article_id
    })
    return obj;
};

exports.formatComments = (comments, articleRef) => {
    return comments.map(comment => {
    const {created_by, created_at, belongs_to, ...restOfComment} = comment;
    const obj = { ...restOfComment };
    obj.author = created_by;
    obj.article_id = articleRef[belongs_to];
    obj.created_at = new Date(created_at);
    return obj;
    })
};
