import { useState } from "react";
import { useHistory } from "react-router-dom";

function Create(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        const blog = {title, body, author};
        
        setIsPending(true);

        fetch("http://192.168.0.6:8000/blogs",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(() =>{
            setIsPending(false);
            history.push("/");
        });


    }

    return(
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>Blog title:</div>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={function(e){setTitle(e.target.value)}}
                />
                <div>Blog body:</div>
                <textarea
                    required
                    value={body}
                    onChange={function(e){setBody(e.target.value)}}
                />
                <div>Blog author:</div>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={function(e){setAuthor(e.target.value)}} 
                />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );

}

export default Create;