import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";

function BlogDetails(){
    const {id} = useParams()
    const {data: blog, error, isPending} = useFetch("http://192.168.0.6:8000/blogs/"+id);
    const history = useHistory();
    const [isRemoving,setIsRemoving] = useState(false);

    function handleClick(){
        setIsRemoving(true);
        fetch("http://192.168.0.6:8000/blogs/"+id,{
            method: "DELETE"
        })
        .then(() => {
            history.push("/");
        });
    }

    return(
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    {!isRemoving && <button onClick={handleClick}>delete</button>}
                    {isRemoving && <button disabled>deleting...</button>}
                </article>
            )}
        </div>
    );
}

export default BlogDetails;