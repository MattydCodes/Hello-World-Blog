import useFetch from './useFetch';
import BlogList from './BlogList';

function Home(){
    const {data: blogs, isPending, error} = useFetch("http://192.168.0.6:8000/blogs");

    return(
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"></BlogList>}
        </div>
    );
}

export default Home;