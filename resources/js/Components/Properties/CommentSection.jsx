import axios from 'axios';
import { useState } from 'react';
import { router } from "@inertiajs/react";
import Comment from "@/Components/Properties/Comment.jsx";

export default function CommentSection({ property, auth }) {
    const [newComment, setNewComment] = useState({ content: '', rating: 0 });
    const [comments, setComments] = useState(property.comments);
    const [commentLength, setCommentLength] = useState(0);

    const submitComment = (e) => {
        e.preventDefault();
        if (auth.user === null) {
            router.get(route('login'));
        }
        axios.post(route('comments.store', { id: property.id }), newComment)
            .then(response => {
                setComments(prevComments => [...prevComments, response.data.comment]);
                setNewComment({ content: '', rating: 0 });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleCommentChange = (e) => {
        setNewComment({...newComment, content: e.target.value});
        setCommentLength(e.target.value.length);
    };


    return (
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 w-full mt-10">
            <form onSubmit={submitComment} className="mt-4 flex flex-col sm:flex-row justify-center">
                <div className="relative flex flex-col sm:w-1/2 mr-0 sm:mr-4 items-center justify-start">
                    <label htmlFor="content" className="dark:text-gray-200 block text-sm font-medium text-gray-700">New
                        Comment</label>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        maxLength="100"
                        className="dark:bg-gray-900 dark:text-gray-200 mt-1 pb-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={newComment.content}
                        onChange={handleCommentChange}
                    />
                    <span className="absolute bottom-1.5 right-1.5 text-sm text-gray-500 self-end">{commentLength}/100</span>
                </div>

                <div className="flex flex-col items-center w-fit mx-auto sm:mx-6">
                    <label htmlFor="rating"
                           className="dark:text-gray-200 block text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex mt-1 border border-gray-300 py-3.5 px-4 rounded-md">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value}>
                                <input
                                    type="radio"
                                    name="rating"
                                    id={`star${value}`}
                                    value={value}
                                    checked={newComment.rating === value}
                                    onChange={e => setNewComment({...newComment, rating: parseInt(e.target.value)})}
                                    className="hidden"
                                />
                                <label htmlFor={`star${value}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                         width="24px" fill={newComment.rating >= value ? '#ffc107' : '#e8eaed'}
                                         className="hover:cursor-pointer"
                                    >
                                        <path
                                            d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                                    </svg>
                                </label>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className='sm:ml-4 mx-auto sm:mx-0 btn overflow-hidden relative w-48 h-14 mt-6 my-auto py-2 px-2 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-full before:bg-pink-600 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform bg-cyan-400 text-white'
                >
                    <span className="relative">Post</span>
                </button>
            </form>
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200 mt-8">Comments</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </div>
    );
}
