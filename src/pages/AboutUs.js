import React from 'react'

import { Card } from 'react-bootstrap'

import { useSelector } from "react-redux"

const AboutUs = () => {
    const { theme } = useSelector(state => state)

    return (
        <div className='d-flex justify-content-center align-items-center px-3' style={{ minHeight: "calc(100vh - 56px", ...theme.secondary }}>
            <Card style={{ maxWidth: "55em", ...theme.primary }} className="text-center border border-primary">
                <Card.Body>
                    <Card.Title className="text-center">Hello</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia repudiandae ullam animi dignissimos deleniti laboriosam error unde ex dolorem nam, odio doloribus, nulla nobis possimus exercitationem at commodi et voluptates minus iste corporis fugit aperiam tenetur nisi. Quibusdam reprehenderit necessitatibus nesciunt, dolores totam blanditiis officia itaque magnam iusto, modi earum beatae doloremque sunt impedit perferendis doloribus in consectetur quidem atque facere nihil, aut laudantium aspernatur. In iure qui praesentium deserunt reprehenderit, veniam quibusdam facere sint temporibus non ex dolor id iste quam a. Officia officiis nemo debitis recusandae, alias quam amet temporibus quis natus, soluta veniam, non dolores nam aliquid laudantium assumenda tempora impedit asperiores qui id delectus. Facere quae veniam molestias illo odit sequi velit similique nemo fugiat debitis earum aliquid et repellendus necessitatibus illum ipsa, aperiam nihil, saepe beatae provident eum tenetur voluptatibus dignissimos. Harum itaque repellendus hic nam explicabo neque quae nemo natus, iusto, recusandae, possimus sequi. Incidunt sunt mollitia, minima quis non quo sequi modi eaque tenetur, exercitationem praesentium earum fugit cum quia ratione atque quos animi ex temporibus labore. Illo iusto architecto ipsam deserunt omnis enim beatae, dicta iure excepturi alias repellendus nobis. Pariatur animi laudantium qui labore fugiat quas perferendis unde, aperiam deleniti reprehenderit atque incidunt quam, quo quia cum iusto mollitia aspernatur debitis blanditiis earum at. Nam, doloribus molestias. Unde tempore quibusdam aspernatur, nulla earum placeat at quae deleniti optio tempora sed recusandae corporis facere! Voluptas, at?
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AboutUs