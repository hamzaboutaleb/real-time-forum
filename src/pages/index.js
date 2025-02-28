import { Fragment } from "../../core/Fragment.js";
import { h } from "../../core/index.js";
import { router } from "../app.js";
import { PostList } from "../components/postList.js";
import { initAuth } from "../utils/initAuth.js";

export function IndexPage() {
  return (
    <Fragment>
      <div class="container">
        <PostList />
      </div>

      {/* <div class="chat-windws-list">
        <div class="contacts">
          <header class="contact-header">
            <h2>Contacts</h2>
            <span>-</span>
          </header>
          <div class="contact-list">
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Last</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Last</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Last</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Hristo</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
            <div class="user-chat">
              <div class="avatar-status">
                <div class="avatar avatar--large">H</div>
                <span class="status"></span>
              </div>
              <div class="user-info">
                <span class="username">Last</span>
                <span class="last-message">Hey, how are you?</span>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-window">
          <div class="chat-header">
            <h2>hboutale</h2>
            <span>
              <i class="fa fa-times"></i>{" "}
            </span>
          </div>
          <div class="chat-zone">
            <div class="chat-body">
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
            </div>
            <form class="chat-footer">
              <input
                class="input full-width"
                type="text"
                placeholder="Type a message..."
              />
              <button class="primary-btn">
                <i class="fa-solid fa-location-arrow"></i>
              </button>
            </form>
          </div>
        </div>
        <div class="chat-window">
          <div class="chat-header">
            <h2>hboutale</h2>
            <span>
              <i class="fa fa-times"></i>{" "}
            </span>
          </div>
          <div class="chat-zone hidden ">
            <div class="chat-body ">
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
              <div class="chat-incoming">hello friend how are you</div>
              <div class="chat-outgoing">i am fine and you</div>
            </div>
            <form class="chat-footer">
              <input
                class="input"
                type="text"
                placeholder="Type a message..."
              />
              <button class="primary-btn">
                <i class="fa-solid fa-location-arrow"></i>
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
}
