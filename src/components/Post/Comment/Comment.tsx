import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import EditIcon from '../../../icons/edit.png';
import DeleteIcon from '../../../icons/delete.png';
import CancelIcon from '../../../icons/cancel.png';
import { CommentResponse } from '../../../types/commentmodel.ts';
import { useCommentDeleteMutation, useCommentPutMutation } from '../../../api/queries/commentqueries.ts';
import { queryClient } from '../../../config/queryclient.ts';
import { queryKeys } from '../../../constants/querykeys.ts';
import { Errors } from '../../General/Errors.tsx';
import { useUserContext } from '../../../hooks/useUserContext.tsx';

interface CommentProps {
    comment: CommentResponse;
}

export function Comment({ comment }: CommentProps) {
    const userContext = useUserContext();
    const commentPut = useCommentPutMutation();
    const commentDelete = useCommentDeleteMutation();
    const [editComment, setEditComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setEditComment(comment.content);
    }, [comment.content]);

    function handleSubmitEdit() {
        commentPut.mutate(
            {
                commentId: comment.id,
                content: editComment,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    queryClient.invalidateQueries({ queryKey: [queryKeys.comments] });
                },
            }
        );
    }

    function handleSubmitDelete() {
        commentDelete.mutate(
            {
                commentId: comment.id,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: [queryKeys.comments] });
                },
            }
        );
    }

    const isLoading = useMemo(
        () => commentPut.isPending || commentDelete.isPending,
        [commentDelete.isPending, commentPut.isPending]
    );

    if (!isEditing) {
        return (
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-comment" src={comment.author?.avatar?.url} />
                        <h4>{comment.author.firstName + ' ' + comment.author.lastName}</h4>
                    </div>
                    <h4 className="comment-timestamp">
                        <span className="comment-timestamp-original">
                            {DateTime.fromJSDate(new Date(comment.createdAt)).toLocaleString(DateTime.DATETIME_SHORT)}
                        </span>
                        {comment.updatedAt && '*'}
                        {comment.updatedAt ? (
                            <span className="comment-timestamp-edit-tooltip">
                                <p className="p-edit-timestamp">
                                    {'Edited: ' +
                                        DateTime.fromJSDate(new Date(comment.updatedAt)).toLocaleString(
                                            DateTime.DATETIME_SHORT
                                        )}
                                </p>
                            </span>
                        ) : (
                            <></>
                        )}
                    </h4>
                </div>
                <p className="comment-text">{comment.content}</p>
                {userContext.id === comment.author.id && (
                    <div className="comment-modification-buttons">
                        <button
                            type="button"
                            className="comment-modification-button"
                            onClick={() => setIsEditing(true)}>
                            <img className="icon" src={EditIcon} />
                            Edit
                        </button>
                        <button
                            className="comment-modification-button"
                            onClick={handleSubmitDelete}
                            disabled={isLoading}
                            style={isLoading ? { cursor: 'wait' } : {}}>
                            <img className="icon" src={DeleteIcon} />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="comment">
                <div className="info-box">
                    <div className="author-box">
                        {/*<img className="author-avatar-comment" src={comment.author.avatar.url} />*/}
                        <h3>{comment.author.firstName + ' ' + comment.author.lastName}</h3>
                    </div>
                    <h4>{DateTime.fromJSDate(new Date(comment.createdAt)).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
                </div>
                <form className="comment-creator-form">
                    <textarea
                        name="content"
                        value={editComment}
                        onChange={({ target }) => setEditComment(target.value)}
                        id="comment-creator-textarea"></textarea>
                    <Errors errors={commentPut.error} />
                    <div className="comment-creator-buttons">
                        <button
                            className="comment-modification-button"
                            type="button"
                            onClick={handleSubmitEdit}
                            disabled={isLoading}
                            style={isLoading ? { cursor: 'wait' } : {}}>
                            <img className="icon" src={EditIcon} />
                            Update
                        </button>
                        <button
                            className="comment-modification-button"
                            type="button"
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                            style={isLoading ? { cursor: 'wait' } : {}}>
                            <img className="icon" src={CancelIcon} />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
