import React from 'react';
import moment from 'moment';

const Comment = ({ comments }) => {
    return (
        <>
            {comments.length > 0 ? comments.map(
                comment => (
                    <div key={comment._id} className="comment__section">
                        <div className="post__card__header">
                            <div className="post__card__header__avator">
                                {comment.userName ? comment.userName[0] : ''}
                            </div>
                            <div className="post__card__header__user">
                                <span>{comment.userName}</span>
                                <span>{moment(comment.updatedAt).format("MMM Do YY")}</span>
                                <span></span>
                            </div>
                        </div>
                        <div className="comment__body">
                            {comment.comment}
                        </div>
                    </div>
                )
            ) : 'No Comments'
            }
        </>
    );
};

export default Comment;