import React, { useState } from "react";
// import SBConversation from "@sendbird/uikit-react/Channel";
// import SBChannelList from "@sendbird/uikit-react/ChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";

import IconArrowLeft from "./icon-arrow-left.svg";
function MobileView() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");

  const onBack = () => {
    setCurrentChannelUrl("");
  };
  const conversationWrap = document.getElementsByClassName(
    "sendbird-app__conversation-wrap"
  )[0];

  const renderSettingsBar = () => {
    conversationWrap.style.marginRight = "318px";
  };
  const hideSettingsBar = () => {
    conversationWrap.style.marginRight = "0px";
  };

  return (
    <div className="mobile-view__wrap">
      {!currentChannelUrl ? (
        <div className="sendbird-app__channellist-wrap">
          <GroupChannelList
            onChannelSelect={(channel) => {
              console.log("Selected channel Mobile:", channel);
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
            disableAutoSelect
          />
        </div>
      ) : (
        <div className="sendbird-app__conversation-wrap">
          <button className="back-button" onClick={onBack}>
            <img width={20} heigth={20} src={IconArrowLeft} alt="Back button" />
          </button>
          <GroupChannel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
              renderSettingsBar();
            }}
          />
          {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
              <SBChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick={() => {
                  setShowSettings(false);
                  hideSettingsBar();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileView;
