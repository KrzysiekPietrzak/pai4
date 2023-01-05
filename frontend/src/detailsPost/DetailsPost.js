import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import DetailsPostAuthor from './DetailsPostAuthor';
import DetailsPostAuthorEmpty from './DetailsPostAuthorEmpty';
import DetailsPostComments from './DetailsPostComments';
import DetailsPostCommentsEmpty from './DetailsPostCommentsEmpty';

function DetailsPost(props) {
    const [state, setstate] = useState(null);
    const [comments, setComments] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const GetDetailsComments = () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch('http://localhost:5000/post_comments/'+id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setComments(data);
            });
        }
        const GetDetails = () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch('http://localhost:5000/posts/'+id, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setstate(data);
            });
        }
        GetDetails();
        GetDetailsComments();
    }, [])

    return (
        <div>
            <div className="main">
                <div className="main-wrapper">
                <div className="add"><Link className='link_color' to={'/comment/' + id} ><button>Dodaj komentarz</button></Link></div>
                    {state == null ? <DetailsPostAuthorEmpty /> : <DetailsPostAuthor 
                    title={state.title} post_id={state.post_id} content={state.body} author={state.author} likes={state.likes}/>}
                    {comments.length == 0 ? <DetailsPostCommentsEmpty/> : comments.map(i =>(
                        <DetailsPostComments comment_id={i.comment_id} key={i.comment_id} content={i.body} author={i.author} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailsPost;