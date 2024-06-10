export default function Comment({ comment }) {
    return (
        <div className="border rounded p-4 my-2">
            <h3 className="font-bold">{comment.user.name}</h3>
            <p>{comment.content}</p>
            <p>Rating: {comment.rating}</p>
        </div>
    );
}
