// contactUtils.js
import React from 'react';
import { PhoneIncoming, PhoneOutgoing } from 'feather-icons-react/build/IconComponents';

export const getIconComponent = (direction) => {
    switch (direction) {
        case 'inbound':
            return <PhoneIncoming />;
        case 'outbound':
            return <PhoneOutgoing />;
        default:
            return null;
    }
};

export const getCallTypeColor = (callType) => {
    switch (callType) {
        case 'missed':
            return 'text-red-500';
        case 'voicemail':
            return 'text-blue-500';
        default:
            return 'text-green-500';
    }
};
