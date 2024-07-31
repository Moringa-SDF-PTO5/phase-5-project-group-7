import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from './commentsSlice';
import { TextInput, Button, Pane } from 'evergreen-ui';

const CreateComment = ({ postId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Comment content cannot be empty.');
            return;
        }
        dispatch(addComment({ post_id: postId, content }))
            .unwrap()
            .then(() => setContent(''))
            .catch(() => setError('Failed to add comment.'));
    };

    return (
        <Pane padding={20}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Comment Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    marginBottom={10}
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Button type="submit" appearance="primary">
                    Add Comment
                </Button>
            </form>
        </Pane>
    );
};

export default CreateComment;
