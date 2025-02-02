import Comment from './Comment';

const PostCard = ({
    postData,
    handleLikePost,
    setPostData,
    fetchPost,
    commentModal,
    handleComment,
    setCommentModal,
}) => {
    return (
        <div>
            {postData.length > 0 ? (
                postData.map((post) => (
                    <div key={post.post_id} className="w-full h-auto p-6 rounded-lg mt-6 bg-zinc-800 min-h-[300px]">
                        <div className="mb-8">
                            <div className="flex gap-4">
                                <figure className="img-box w-16 h-16 rounded-full">
                                    <img
                                        src={post.avatar_url}
                                        width={64}
                                        height={64}
                                        alt="Avatar"
                                        className="w-full h-full object-cover object-center rounded-full"
                                    />
                                </figure>
                                <div>
                                    <h1 className="text-lg font-normal">{post.full_name}</h1>
                                    <h1>{new Date(post.created_at).toLocaleDateString()}</h1>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-flow-row py-6 gap-4 border-b-2 border-zinc-400/20">
                                <div className="flex flex-col gap-5">
                                    <h1 className="text-xl font-normal">{post.title}</h1>
                                    <figure className="img-box w-full h-96 rounded-xl">
                                        <img
                                            className="w-full h-full object-cover object-center"
                                            src={post.post_url}
                                            alt="Post Image"
                                            loading="lazy"
                                        />
                                    </figure>
                                </div>
                                <div>
                                    <button className="px-4 border-2 border-amber-600 rounded-3xl">
                                        <h1 className="text-white font-medium">{post.category_name}</h1>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleLikePost(post.post_id)}
                                        className="px-4 bg-lime-300 rounded-3xl"
                                    >
                                        <h1 className="text-black font-medium">{post.is_liked ? 'UNLIKE' : 'LIKE'}</h1>
                                    </button>
                                    <h1>{post.like_count}</h1>
                                </div>
                                <button onClick={() => handleComment(post.post_id)}>
                                    {post.comment_count} comments
                                </button>
                                {commentModal === post.post_id && ( 
                                    <Comment
                                        setCommentModal={setCommentModal} 
                                        post_id={post.post_id}
                                        fetchPost={fetchPost}
                                        setPostData={setPostData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-gray-500">No posts available</h1>
            )}
        </div>
    );
};

export default PostCard;
