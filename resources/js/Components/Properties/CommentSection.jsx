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
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 w-full mt-10">
            <form onSubmit={submitComment} className="mt-4">
                <label htmlFor="content" className="dark:text-gray-200 block text-sm font-medium text-gray-700">New Comment</label>
                <textarea id="content" name="content" rows="3"
                          className="dark:bg-gray-900 dark:text-gray-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          value={newComment.content}
                          onChange={e => setNewComment({...newComment, content: e.target.value})}/>

                <label htmlFor="rating" className="dark:text-gray-200 block text-sm font-medium text-gray-700 mt-4">Rating</label>
                <input type="number" id="rating" name="rating" min="1" max="5"
                       className="dark:text-gray-200 dark:bg-gray-900 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                       value={newComment.rating}
                       onChange={e => setNewComment({...newComment, rating: e.target.value})}/>

                <button
                    type="submit"
                    className='my-10 mx-auto btn overflow-hidden relative w-64 py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-pink-600 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform bg-cyan-400 text-white'
                >
                    <span className="relative">Submit</span>
                </button>
            </form>
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Comments</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
    );
}
