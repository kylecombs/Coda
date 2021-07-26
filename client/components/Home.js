import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Lottie from 'react-lottie'
import notes from '../../public/lotties/notes'
import laptop from '../../public/lotties/laptop'

/**
 * COMPONENT
 */
export const Home = props => {

  const {username} = props

  const notesOptions = {
    loop: true,
    autoplay: true,
    animationData: notes,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  const laptopOptions = {
    loop: true,
    autoplay: true,
    animationData: laptop,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h4>let's get started making some sounds with code</h4>
      <Link to='/loops'>Loops</Link>
      <Link to='/binaryTree'>Binary Tree</Link>
      <Link to='/aMatrix'>A-Matrix</Link>
      <Lottie 
	    options={notesOptions}
        height={400}
        width={400}
      />
      <Lottie 
	    options={laptopOptions}
        height={400}
        width={400}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
