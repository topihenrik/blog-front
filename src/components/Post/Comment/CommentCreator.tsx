import { useState } from 'react';
import AddIcon from '../../../icons/add.png';
import { useCommentPostMutation } from '../../../api/queries/commentqueries.ts';
import { useParams } from 'react-router';
import { queryClient } from '../../../config/queryclient.ts';
import { queryKeys } from '../../../constants/querykeys.ts';
import { Errors } from '../../General/Errors.tsx';
import { useUserContext } from '../../../hooks/useUserContext.tsx';

export function CommentCreator() {
    const { postid } = useParams();
    const userContext = useUserContext();
    const commentPost = useCommentPostMutation();
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        commentPost.mutate(
            {
                postId: postid ?? '',
                content: comment,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: [queryKeys.comments] });
                    setComment('');
                },
            }
        );
    };

    return (
        <div className="comment-creator">
            <h3>Author: {userContext.full_name}</h3>
            <form className="comment-creator-form">
                <textarea
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    name="content"
                    placeholder="Comment"
                    id="comment-creator-textarea"></textarea>
                <Errors errors={commentPost.error} />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="comment-creator-button"
                    disabled={commentPost.isPending}
                    style={commentPost.isPending ? { cursor: 'wait' } : {}}>
                    <img className="icon" src={AddIcon} />
                    Submit
                </button>
            </form>
        </div>
    );
}
