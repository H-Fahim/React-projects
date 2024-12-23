/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'


function Protected ( { children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate();
  const[ loader , setLoader ] = useState(true)

  useEffect (()=>{
    if (authentication && authStatus !== authentication){
      navigate ( "/login" )
    }else if (!authentication && authStatus !== authentication ){
      navigate("/")
    }
    setLoader(false)

  }, [authStatus, authentication, navigate ])

  return (
    loader ? null : <> {children} </>
  )
}

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};

export default Protected
