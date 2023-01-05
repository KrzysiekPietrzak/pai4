import React, { useState, useEffect } from 'react';

function PostEmpty() {
    return (
        <div className="post">
            <div className="title">Brak postów</div>
            <div className="clear"></div>
        </div>
    );
}
    
export default PostEmpty;