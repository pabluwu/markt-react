import SampleAvatar from '../../assets/SampleAvatar.png';
import useFormattedDate from '../../services/useFormattedDate';
const PostItem = ({ item }) => {

    const created = useFormattedDate(item.created_at);
    return (
        <div className="rounded profile-card mt-3">
            <div className="info-profile px-3 py-2">
                <img src={SampleAvatar} alt="" />
                <div className='postInfo'>
                    {
                        item.author.username &&
                        <p><strong>{item.author.username}</strong></p>
                    }
                    {
                        item.author.nombre_fantasia &&
                        <p><strong>{item.author.nombre_fantasia}</strong></p>
                    }
                    <span className='fecha'>{created}</span>
                </div>
            </div>
            <div className="postContent px-4 py-2">

                <div
                    dangerouslySetInnerHTML={{
                        __html: item.content,
                    }}
                />
            </div>
        </div>
    )
}

export default PostItem;