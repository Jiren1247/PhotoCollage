import React, { useState } from "react";

import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
// import { useEffect } from "react";
// import { sendbirdSelectors } from "@sendbird/uikit-react";
// import { useSendbirdStateContext } from "@sendbird/uikit-react";

function DesktopView() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
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
    <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <GroupChannelList
            onChannelSelect={(channel) => {
              console.log("Selected channel:", channel);
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <GroupChannel
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
              renderSettingsBar();
            }}
            // onBeforeSendFileMessage={(file) => {
            //   sendFileMessage(file);
            // }}
          />
          {showSettings && (
            <div className="sendbird-app__settingspanel-wrap">
              <SBChannelSettings
                channelUrl={currentChannelUrl}
                onCloseClick={() => {
                  setShowSettings(false);
                  hideSettingsBar()
                }}
              />
            </div>
          )}
        </div>
    </div>
  );
}

export default DesktopView;
