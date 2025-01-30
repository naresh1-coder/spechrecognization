import React, { useState, useEffect } from "react";
import { Refine } from "@refinedev/core";
import { notificationProvider } from "@refinedev/antd";
import { ConfigProvider, theme, Button, Input, Card, Typography, Space } from "antd";
import { AudioOutlined, StopOutlined } from "@ant-design/icons";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import "./App.css";

const { Title, Text } = Typography;

const App = () => {
  // State Management
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Speech Recognition Hook
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Update the text dynamically while listening
  useEffect(() => {
    if (listening) {
      setText(transcript);
    }
  }, [transcript, listening]);

  // Start Listening Function
  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, interimResults: true });
    } else {
      notificationProvider.open({
        type: "error",
        message: "Speech Recognition",
        description: "Your browser does not support speech recognition.",
      });
    }
  };

  // Stop Listening Function
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  // Send Text to Backend
  const sendTextToBackend = async () => {
    if (!text.trim()) {
      notificationProvider.open({
        type: "warning",
        message: "Input Required",
        description: "Please provide some text to send.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/speech", { content: text });
      notificationProvider.open({
        type: "success",
        message: "Success",
        description: response.data.message || "Text sent successfully!",
      });
    } catch (error) {
      notificationProvider.open({
        type: "error",
        message: "Error",
        description: error.response?.data?.message || "Failed to send text to the backend.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Refine notificationProvider={notificationProvider}>
        <div
          className="bg-container app-container"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Card className="app-card" bodyStyle={{ padding: "24px 32px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title level={3} style={{ color: "white" }}>
                Speech to Text
              </Title>
              <Text type="secondary" style={{ color: "#1C325B" }}>
                Convert your speech to text effortlessly.
              </Text>

              {/* Input TextArea */}
              <Input.TextArea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Your transcribed text will appear here."
                style={{
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  width:"100%",
                  padding: "8px 12px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  color: "#1C325B", // Text color
                  backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
                  backdropFilter: "blur(8px)", // Apply blur to the background
                }}
              />

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <Button
                  className="start-listening"
                  type="primary"
                  icon={<AudioOutlined />}
                  onClick={startListening}
                  disabled={listening}
                  style={{ width: "48%" }}
                >
                  Start Listening
                </Button>
                <Button
                  className="stop-listening"
                  type="default"
                  icon={<StopOutlined />}
                  onClick={stopListening}
                  disabled={!listening}
                  style={{ width: "48%" }}
                >
                  Stop Listening
                </Button>
              </div>

              {/* Optional Button to send text */}
              {/* <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={isLoading}
                onClick={sendTextToBackend}
                className="w-full bg-blue-600 hover:bg-blue-700 border-none"
              >
                Send to Backend
              </Button> */}
            </Space>
          </Card>
        </div>
      </Refine>
    </ConfigProvider>
  );
};

export default App;
