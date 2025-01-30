import React from "react";
import { Button } from "antd";
import { AudioOutlined, StopOutlined, SyncOutlined } from "@ant-design/icons";

const ListeningControls = ({ startListening, stopListening, restartListening, listening }) => (
    <div className="flex justify-between gap-4">
        <Button
            type="primary"
            icon={<AudioOutlined />}
            onClick={startListening}
            disabled={listening}
            className="w-full"
        >
            Start Listening
        </Button>
        <Button
            type="default"
            icon={<StopOutlined />}
            onClick={stopListening}
            disabled={!listening}
            className="w-full"
        >
            Stop Listening
        </Button>
        <Button
            type="default"
            icon={<SyncOutlined />}
            onClick={restartListening}
            className="w-full"
        >
            Restart Listening
        </Button>
    </div>
);

export default ListeningControls;
