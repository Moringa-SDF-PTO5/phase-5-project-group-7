import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PostCard = ({ post }) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
        <Typography variant="caption" color="text.secondary">
          Posted by User ID: {post.user_id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
