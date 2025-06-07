import useFormattedDate from "../../services/useFormattedDate";
const NoticiaItem = ({ noticia }) => {
    console.log(noticia)
    return (
        <div className="rounded profile-card mt-3">
            <div className="info-profile px-3 py-2">
                <div className='postInfo'>
                    <strong>
                        {noticia?.medio}
                    </strong>
                </div>
            </div>
            <div className="postContent px-4 py-2">

                {noticia?.titulo}

            </div>
            <div className='social-buttons px-4 py-2'>
                <div className="d-flex justify-content-around button">
                    <span className='fecha'>{useFormattedDate(noticia?.created_at)}</span>
                    <a href={noticia?.url} className="badge text-bg-primary" target="_blank">Ver noticia completa aquí</a>
                </div>
            </div>
        </div>
    )
}

export default NoticiaItem;