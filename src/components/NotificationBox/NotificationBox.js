import React from 'react';
import './NotificationBox.css';

function NotificationBox(props) {
    let header = '';
    if(props.header) {
        header = <div className="NotificationBox-header">{props.header}</div>;
    }

    return (
        <div className={'NotificationBox NotificationBox-' + (props.type || 'success')}>
            {header}
            <div className="NotificationBox-text">
                {props.text}
            </div>
        </div>
    );
}

export default NotificationBox;