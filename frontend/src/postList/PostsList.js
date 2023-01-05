import React, {useEffect, useState} from 'react';
import Post from '../post/Post';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import PostEmpty from '../post/PostEmpty';

function PostsList(props) {
    const [state, setstate] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const GetList = () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch('http://localhost:5000/posts', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setstate(data);
            });
        }

        GetList();
    }, [])

    const detailsPost_ = (id) => {
        navigate('/details/' + id)        
    }
    return (
        <div className="main">
            <div className="main-wrapper">
                <div className="add"><Link className='link_color' to='/add'><button>Dodaj post</button></Link></div>
                {state.length == 0 ? <PostEmpty /> : state.map(i => (
                    <div key={i.post_id} onClick={() => detailsPost_(i.post_id)}>
                        <Post post_id={i.post_id} author={i.author} title={i.title} likes={i.likes} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostsList;