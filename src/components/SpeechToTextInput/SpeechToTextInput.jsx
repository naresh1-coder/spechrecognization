import React from "react";
import { Input } from "antd";

const SpeechToTextInput = ({ text, setText }) => (
    <Input.TextArea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your transcribed text will appear here."
        className="rounded-lg border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
    />
);

export default SpeechToTextInput;
