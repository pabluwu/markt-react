import SampleAvatar from '../../assets/SampleAvatar.png';
const ProfileCard = ({user}) => {
    return (
        <div className="rounded profile-card py-3">
            <div className="info-profile px-3">
                <img src={SampleAvatar} alt="" />
                <div>
                    <h4>{`${user?.first_name} ${user?.last_name}`}</h4>
                    <p>Descripcion</p>
                </div>
            </div>
            <p className="sub-info-profile px-3 pt-3">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Vehicula torquent himenaeos sodales enim dis elementum. Blandit fermentum montes lacus ornare nec feugiat nostra dis. Enim porttitor libero eu feugiat leo. Nulla auctor in habitant duis; ac neque. Hac vel dis donec vulputate taciti curabitur dapibus eleifend. Commodo pharetra lacus elementum, aenean luctus feugiat. Efficitur et enim parturient posuere lacus. Magna tincidunt laoreet consequat volutpat, sagittis ipsum ultrices. Tempor accumsan malesuada vestibulum penatibus adipiscing.
            </p>
        </div>
    )
}

export default ProfileCard;