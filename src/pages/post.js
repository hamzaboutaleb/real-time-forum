import { h } from "../../core/view.js";

export function PostPage({params}) {
  console.log("PostPage", params.id);
  return (
    <div class="container">
      <div class="post-container">
        <div class="post">
          <div class="post-header">
            <h1 class="post-title">
              The Future of AI: How It's Shaping Tomorrow
            </h1>
            <div class="post-info">
              <span class="avatar avatar--large">H</span>
              <div class="post-details">
                <span class="post-author">Hassan</span>
                <span class="post-date">2 hours ago</span>
              </div>
            </div>
          </div>
          <div class="post-content">
            Artificial Intelligence (AI) is no longer just a buzzword—it's a
            driving force behind the next wave of innovation. In this post, we
            explore the transformative potential of AI, from self-driving cars
            to smarter healthcare systems. Discover how AI is revolutionizing
            industries, enhancing user experiences, and changing the way we
            interact with the world around us. Whats Inside: A look at AI's most
            recent advancements. Key industries being disrupted by AI. What AI
            means for the future of work and daily life. The Rise of 5G: What
            You Need to Know As we gear up for a fully connected world, 5G
            technology is on the horizon. The speed and capabilities of 5G will
            not only transform mobile networks but also drive innovation in
            smart cities, IoT devices, and even healthcare. Read our detailed
            analysis of how 5G is set to impact the way we live, work, and
            communicate. Trending Now: The top 5G-enabled devices to watch out
            for. How 5G is pushing the limits of mobile gaming and virtual
            reality. The challenges and opportunities of rolling out 5G
            globally.
          </div>
          <div class="post-tags">
            <div class="tag tag-lg">
              <i class="fa-solid fa-tag"></i> Technology
            </div>
            <div class="tag tag-lg">
              <i class="fa-solid fa-tag"></i> Programming
            </div>
          </div>
        </div>
        <div class="comment-form">
          <h2 class="comment-form-header">Leave a Comment</h2>
          <form action="#" method="POST">
            <textarea
              name="comment"
              rows="4"
              class="input"
              placeholder="Leave a comment"
            ></textarea>
            <button class="primary-btn" type="submit">
              <i class="fa-solid fa-location-arrow"></i> Comment
            </button>
          </form>
        </div>
        <div class="comments">
          <div class="comment-item">
            <div class="avatar avatar--large">H</div>
            <div class="commnet-content">
              <div class="comment-info">
                <span class="comment-author">Hassan</span>
                <span class="comment-date">2 hours ago</span>
              </div>
              <div class="comment-text">
                Really enjoyed this post! The impact of AI on the healthcare
                industry is mind-blowing. I think we're just scratching the
                surface of what AI can do. I'm excited to see where this tech
                will take us in the next 5-10 years. Also, 5G is going to
                completely change the game for mobile experiences—can’t wait for
                faster speeds!
              </div>
              <div class="comment-actions">
                <a class="react like active" href="#">
                  <i class="fa-solid fa-thumbs-up"></i> 105 likes
                </a>
                <a class="react dislike" href="#">
                  <i class="fa-solid fa-thumbs-down"></i> 3 dislikes
                </a>
              </div>
            </div>
          </div>
          <div class="comment-item">
            <div class="avatar avatar--large">H</div>
            <div class="commnet-content">
              <div class="comment-info">
                <span class="comment-author">Hassan</span>
                <span class="comment-date">2 hours ago</span>
              </div>
              <div class="comment-text">
                Really enjoyed this post! The impact of AI on the healthcare
                industry is mind-blowing. I think we're just scratching the
                surface of what AI can do. I'm excited to see where this tech
                will take us in the next 5-10 years. Also, 5G is going to
                completely change the game for mobile experiences—can’t wait for
                faster speeds!
              </div>
              <div class="comment-actions">
                <a class="react like" href="#">
                  <i class="fa-solid fa-thumbs-up"></i> 105 likes
                </a>
                <a class="react dislike active" href="#">
                  <i class="fa-solid fa-thumbs-down"></i> 3 dislikes
                </a>
              </div>
            </div>
          </div>
          <div class="comment-item">
            <div class="avatar avatar--large">H</div>
            <div class="commnet-content">
              <div class="comment-info">
                <span class="comment-author">Hassan</span>
                <span class="comment-date">2 hours ago</span>
              </div>
              <div class="comment-text">
                Really enjoyed this post! The impact of AI on the healthcare
                industry is mind-blowing. I think we're just scratching the
                surface of what AI can do. I'm excited to see where this tech
                will take us in the next 5-10 years. Also, 5G is going to
                completely change the game for mobile experiences—can’t wait for
                faster speeds!
              </div>
              <div class="comment-actions">
                <a class="react like active" href="#">
                  <i class="fa-solid fa-thumbs-up"></i> 105 likes
                </a>
                <a class="react dislike" href="#">
                  <i class="fa-solid fa-thumbs-down"></i> 3 dislikes
                </a>
              </div>
            </div>
          </div>
          <div class="comment-item">
            <div class="avatar avatar--large">H</div>
            <div class="commnet-content">
              <div class="comment-info">
                <span class="comment-author">Hassan</span>
                <span class="comment-date">2 hours ago</span>
              </div>
              <div class="comment-text">
                Really enjoyed this post! The impact of AI on the healthcare
                industry is mind-blowing. I think we're just scratching the
                surface of what AI can do. I'm excited to see where this tech
                will take us in the next 5-10 years. Also, 5G is going to
                completely change the game for mobile experiences—can’t wait for
                faster speeds!
              </div>
              <div class="comment-actions">
                <a class="react like" href="#">
                  <i class="fa-solid fa-thumbs-up"></i> 105 likes
                </a>
                <a class="react dislike active" href="#">
                  <i class="fa-solid fa-thumbs-down"></i> 3 dislikes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
