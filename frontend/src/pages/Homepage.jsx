function Homepage() {

    return (
        <div className="">
            <div className="homepage_head w-100 border d-flex flex-row">
                <div className="homepage_head_one border d-flex justify-content-center align-items-center">
                    <h2>App Name</h2>
                </div>
                <div className="homepage_head_two border d-flex justify-content-center align-items-center">
                    <div className="homepage_head_center border"></div>
                </div>
                <div className="homepage_head_three border d-flex justify-content-around align-items-center">
                    <div className="homepage_head_features border"></div>
                    <div className="homepage_head_features border"></div>
                    <div className="homepage_head_features border"></div>
                </div>
            </div>
            <div className="homepage_body_div border d-flex flex-row">
                <div className="homepage_left border d-flex flex-column">
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                    </div>
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                    </div>
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                    </div>
                    <div className="homepage_left_sections border w-100"></div>
                </div>
                <div className="homepage_main_body border">
                    body
                </div>
            </div>
        </div>
    )
}

export default Homepage;