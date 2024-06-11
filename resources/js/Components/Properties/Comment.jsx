export default function Comment({ comment }) {
    return (
        <div className="border rounded p-4 my-2 flex flex-row">
            <h3 className="font-bold dark:text-gray-200">{comment.user.name} posted: </h3>
            <p className="my-auto mx-5 dark:text-gray-200">{comment.content}</p>
            {[...Array(comment.rating)].map(()=> {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         className="fill-current text-yellow-500"
                    >
                        <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                    </svg>
                )
            })}
        </div>
    );
}
