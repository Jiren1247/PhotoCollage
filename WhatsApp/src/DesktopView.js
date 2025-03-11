import React, { useState, useRef } from "react";

import CollageSelection from "./CollageSelection";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import GroupChannelList from "@sendbird/uikit-react/GroupChannelList";
import SBChannelSettings from "@sendbird/uikit-react/ChannelSettings";
import axios from "axios";

function DesktopView() {
  const [showSettings, setShowSettings] = useState(false);
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const conversationWrap = document.getElementsByClassName(
    "sendbird-app__conversation-wrap"
  )[0];
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showCollageOptions, setShowCollageOptions] = useState(false);
  const fileInputRef = useRef(null);

  const renderSettingsBar = () => {
    conversationWrap.style.marginRight = "318px";
  };
  const hideSettingsBar = () => {
    conversationWrap.style.marginRight = "0px";
  };

  const uploadToCloudinary = async (file) => {
    const CLOUD_NAME = "dpli3ucdg"; // 替换成你的 Cloud Name
    const UPLOAD_PRESET = "upload_image_present"; // 替换成你的上传预设
    const API_KEY = "266965252637429"; // 替换成你的 API Key
    const PUBLIC_ID = `image_${Date.now()}`; // 生成唯一 public_id

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("public_id", PUBLIC_ID);
    formData.append("api_key", API_KEY);

    console.log("🚀 开始上传文件到 Cloudinary:", file.name);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      console.log("✅ Cloudinary 上传成功:", response.data);
      return response.data.secure_url; // 返回上传后的 URL
    } catch (error) {
      console.error("❌ Cloudinary 上传失败:", error.response ? error.response.data : error);
      return null;
    }
  };

  const handleFileUpload = async (file) => {
    console.log("🚀 开始handle:", file);
    const cloudinaryUrl = await uploadToCloudinary(file);
    if (cloudinaryUrl) {
      setUploadedImages((prev) => [...prev, cloudinaryUrl]);
      setShowCollageOptions(true);
    }
  };

  const handleCollageSelect = (layout) => {
    console.log("用户选择的拼贴模板:", layout);
    setShowCollageOptions(false);
  };

  const handleFileInput = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("❌ 没有选择文件");
      return;
    }

    console.log("📂 用户选择的文件:", files);

    for (const file of files) {
      await handleFileUpload(file);
    }
  };

  const onSelectTemplate = (template) => {
    window.location.href = "http://localhost:8080/";
  }

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
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInput}
          ref={fileInputRef}
        />
        <GroupChannel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => {
            setShowSettings(true);
            setShowCollageOptions(true);
            renderSettingsBar();
          }}
          onBeforeSendFileMessage={async (...args) => {
            console.log("🚀 开始上传文件:", args);
            await handleFileUpload(args[0].file);
            return null;
          }}
        />
        <button onClick={() => fileInputRef.current.click()}>📂</button>
        {showCollageOptions && (
          <CollageSelection onSelectTemplate={onSelectTemplate}/>
        )}
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
