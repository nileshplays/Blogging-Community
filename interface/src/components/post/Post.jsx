import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  function htmlToText(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }

  const PF = "http://localhost:5000/images/";
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[450px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
      {post.photo && (
        <Link to={`/post/${post._id}`}>
          <img
            src={PF + post.photo}
            alt="post cover"
            className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          />
        </Link>
      )}
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <div className="postCats">
          {post.categories.map((c) => (
            <span
              key={post.categories.indexOf(c)}
              className="italic text-sm postCateg"
            >
              {c}
            </span>
          ))}
        </div>
        <span className="italic text-sm ">
          Posted on: {new Date(post.createdAt).toDateString()}
        </span>

        <p className="postDesc">{htmlToText(post.desc)}</p>
        <Link
          to={`/post/${post._id}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>

    // <div className="post">
    //   {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
    //   <div className="postInfo">
    //     <div className="postCats">
    //       {post.categories.map((c) => (
    //         <span key={post.categories.indexOf(c)} className="postCat">
    //           {c}
    //         </span>
    //       ))}
    //     </div>
    //     <Link to={`/post/${post._id}`} className="link">
    //       <span className="postTitle">{post.title}</span>
    //     </Link>
    //     <hr />
    //     <span className="postDate">
    //       {new Date(post.createdAt).toDateString()}
    //     </span>
    //   </div>
    //   <p className="postDesc">{htmlToText(post.desc)}</p>
    // </div>
  );
}
