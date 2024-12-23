/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../assets/fahim.png'

function Logo({ width = '100%' }) {
  return (
    <img src={logo} style ={{ width, borderRadius: '4%' }} alt="Logo Placeholder" />
  )
}

export default Logo