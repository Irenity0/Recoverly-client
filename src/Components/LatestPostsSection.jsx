import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/UseAxiosSecure";

const LatestPostsSection = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/posts?sort=-date&limit=6")
      .then((res) => setLatestPosts(res.data))
      .catch((error) => console.error("Error fetching latest posts:", error));
  }, []);

  return (
    <div className="latest-posts">
      <h2 className="text-4xl font-bold mb-8 text-primary text-center">Latest Find & Lost Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestPosts.map((post) => (
          <div key={post._id} className="post-card bg-secondary/30 rounded-xl p-4 space-y-3 shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover mb-4 rounded"/>
            <h3 className="text-2xl font-extrabold">{post.title}</h3>
            <p className=""><strong>Type:</strong> {post.postType}</p>
            <p className=""><strong>Location:</strong> {post.location}</p>
            <Link to={`/items/${post._id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))}
      </div>
      <br />
        <div className="flex justify-center">
            <Link to={'/allitems'} className="btn btn-secondary btn-lg w-8/12">View All Posts</Link>
        </div>
    </div>
  );
};

export default LatestPostsSection;
