import { useParams } from "react-router-dom";

function ProfilePage() {

    const { userId } = useParams();

    const userIdNum = userId ? parseInt(userId, 10) : null;
    return (
        <div className="profile_main_div">
            <div className="border profile_left">

            </div>
            <div className="border profile_right">
                <div className="profile_display">
                    <div className="profile_img_div">
                        <div className="rounded-circle border">
                            Profile image
                        </div>
                    </div>
                    <div className="profile_info">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;