import React from 'react'
import { connect } from 'react-redux'

export const newControl = (props) => {
  return (
    <div>newControl</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(newControl)