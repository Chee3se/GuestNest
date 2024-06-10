import axios from 'axios';
import { useState } from 'react';
import Comment from "@/Components/Properties/Comment.jsx";

export default function CommentSection({ property }) {
    const [newComment, setNewComment] = useState({ content: '', rating: 0 });
    const [comments, setComments] = useState(property.comments);

    const submitComment = (e) => {
        e.preventDefault();

        axios.post(route('comments.store', { id: property.id }), newComment)
            .then(response => {
                setComments(prevComments => [...prevComments, response.data.comment]);
                setNewComment({ content: '', rating: 0 });
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <form onSubmit={submitComment} className="mt-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">New Comment</label>
                <textarea id="content" name="content" rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          value={newComment.content}
                          onChange={e => setNewComment({...newComment, content: e.target.value})}/>

                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mt-4">Rating</label>
                <input type="number" id="rating" name="rating" min="1" max="5"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                       value={newComment.rating}
                       onChange={e => setNewComment({...newComment, rating: e.target.value})}/>

                <button type="submit"
                        className="mt-4 btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Submit
                </button>
            </form>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
    );
}
