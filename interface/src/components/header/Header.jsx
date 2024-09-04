import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Insight</span>
        <span className="headerTitleLg">Ink</span>
      </div>
      <img
        className="headerImg"
        src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
        alt=""
      />
    </div>
  );
}
