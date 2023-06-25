import { Fragment, useState, useEffect } from 'react'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import { Row, Col } from 'reactstrap'

import '@styles/react/pages/page-profile.scss'

import axios from 'axios'
import { base_url } from "@src/utility/baseUrl"
import { useParams } from 'react-router-dom'
import ProfileCompany from './ProfileCompany'

const Profile = () => {
  const [data, setData] = useState(null)
  const [block, setBlock] = useState(false)
  const {id} = useParams()

  const handleBlock = () => {
    setBlock(true)
    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  useEffect(() => {
    axios.get(`${base_url}partner/${id}`).then(response => setData(response.data))
  }, [])
  return (
    <Fragment>
      {data !== null ? (
        <div id='user-profile'>
          <section id='profile-info'>
            <Row>
              <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileAbout data={data} />
              </Col>
              <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                <ProfilePosts data={data} />
              </Col>
              <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileCompany data={data} setData = {setData} />
              </Col>
            </Row>
            
          </section>
        </div>
      ) : null}
    </Fragment>
  )
}

export default Profile
