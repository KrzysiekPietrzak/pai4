import React from 'react';

function DetailsPostAuthorEmpty(props) {
    return (
        <div className="post">
            <div className="title"></div>
            <div className="content"></div>
            <div className="likes">
                <div className="author">Brak informacji o poście</div>
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default DetailsPostAuthorEmpty;