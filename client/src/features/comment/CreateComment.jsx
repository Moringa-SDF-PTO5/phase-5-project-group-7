// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addComment } from './commentsSlice';
// import { TextInput, Button, Pane } from 'evergreen-ui';

// const CreateComment = ({ postId }) => {
//   const dispatch = useDispatch();
//   const [content, setContent] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addComment({ post_id: postId, content }));
//     setContent('');
//   };

//   return (
//     <Pane padding={20}>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           placeholder="Comment Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           marginBottom={10}
//         />
//         <Button type="submit" appearance="primary">
//           Add Comment
//         </Button>
//       </form>
//     </Pane>
//   );
// };

// export default CreateComment;
