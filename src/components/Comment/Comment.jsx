import "./Comment.css";

const Comment = ({review, profile, name, title}) => {
  return (
    <div className="reviewBlock" > 
      <span className="reviewContent">“{review}”</span>
      
      <div className="profile">
        <img src={profile} alt="" />
        <div className="profileInfo">
          <span>{name}</span>
          <span>{title}</span>
        </div>
      </div>
      
    </div>
  );
};

export default Comment;