import React from 'react'

export const Managers = (props) => {
  const {managers} = props
  return (
    <div>
      {managers.map(manager => (
        <li key={manager.id}>{manager.name}</li>
      ))}
    </div>
  )
}